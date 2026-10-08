import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs";
import path from "path";

// Rate limiting in-memory store: 5 submissions per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (entry.count >= 5) {
    return true;
  }

  entry.count += 1;
  return false;
}

// Helper to generate reference ID: GL-YYMM-XXXX
function generateRef(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `GL-${yy}${mm}-${randomChars}`;
}

// String sanitizer
function sanitize(str?: string | null): string {
  if (!str) return "";
  return str
    .replace(/[<>]/g, "") // strip angle brackets
    .trim();
}

// Zod validation schema
const leadSchema = z.object({
  intent: z.enum([
    "site_visit",
    "walkthrough",
    "banking",
    "brochure",
    "pricing",
    "callback",
    "general",
  ]),
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().regex(/^(?:\+91|91)?[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  project: z.string().optional().default("Greenview Heights"),
  date: z.string().optional().default(""),
  slot: z.string().optional().default(""),
  mode: z.string().optional().default(""),
  loanRange: z.string().optional().default(""),
  employment: z.string().optional().default(""),
  bestTime: z.string().optional().default(""),
  message: z.string().optional().default(""),
  page: z.string().optional().default("/"),
  sourceButton: z.string().optional().default(""),
  utm_source: z.string().optional().default(""),
  utm_medium: z.string().optional().default(""),
  utm_campaign: z.string().optional().default(""),
  referrer: z.string().optional().default(""),
  device: z.string().optional().default(""),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to receive project details",
  }),
  honeypot: z.string().optional().default(""), // bot detection
});

export async function POST(req: NextRequest) {
  try {
    // 1. IP identification & rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Please try again after a few minutes or message us on WhatsApp.",
        },
        { status: 429 }
      );
    }

    // 2. Parse & validate request body
    const body = await req.json();

    // Honeypot check: reject bots silently
    if (body.honeypot && body.honeypot.trim().length > 0) {
      return NextResponse.json({ success: true, ref: generateRef() });
    }

    const validation = leadSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.issues[0]?.message || "Invalid submission data",
        },
        { status: 400 }
      );
    }

    const data = validation.data;
    // Format clean 10-digit phone
    const cleanPhone = data.phone.replace(/\D/g, "").slice(-10);

    // Compute IST formatted timestamp
    const now = new Date();
    const istTime = new Date(now.getTime() + 5.5 * 3600000);
    const createdAtIST = istTime.toISOString().replace("Z", "+05:30");

    const ref = generateRef();

    const payload = {
      ref,
      createdAt: createdAtIST,
      intent: data.intent,
      name: sanitize(data.name),
      phone: cleanPhone,
      project: sanitize(data.project),
      date: sanitize(data.date),
      slot: sanitize(data.slot),
      mode: sanitize(data.mode),
      loanRange: sanitize(data.loanRange),
      employment: sanitize(data.employment),
      bestTime: sanitize(data.bestTime),
      message: sanitize(data.message),
      page: sanitize(data.page),
      sourceButton: sanitize(data.sourceButton),
      utm_source: sanitize(data.utm_source),
      utm_medium: sanitize(data.utm_medium),
      utm_campaign: sanitize(data.utm_campaign),
      referrer: sanitize(data.referrer),
      device: sanitize(data.device),
      consent: {
        agreed: true,
        statement:
          "I authorize Glorious Real Estates & its representatives to contact me via Call, SMS, WhatsApp & Email regarding properties & project updates.",
        timestamp: createdAtIST,
      },
    };

    // 3. Local fallback logging (.data/leads.json)
    try {
      const dataDir = path.join(process.cwd(), ".data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const leadsFile = path.join(dataDir, "leads.json");
      let existingLeads = [];
      if (fs.existsSync(leadsFile)) {
        try {
          existingLeads = JSON.parse(fs.readFileSync(leadsFile, "utf-8"));
        } catch {
          existingLeads = [];
        }
      }
      existingLeads.unshift(payload);
      fs.writeFileSync(leadsFile, JSON.stringify(existingLeads, null, 2));
      console.log(`[LEAD SAVED] [${payload.ref}] ${payload.intent} - ${payload.name} (${payload.phone})`);
    } catch (fsErr) {
      console.warn("Could not write to local leads.json:", fsErr);
    }

    // 4. Remote destinations (Run in parallel, never fail user)
    const promises: Promise<unknown>[] = [];

    // Destination 1: Google Sheet via Apps Script
    const sheetWebhook = process.env.LEADS_SHEET_WEBHOOK_URL;
    const sheetSecret = process.env.LEADS_SHEET_SECRET;
    if (sheetWebhook) {
      promises.push(
        fetch(sheetWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: sheetSecret,
            ref: payload.ref,
            createdAt: payload.createdAt,
            intent: payload.intent,
            name: payload.name,
            phone: payload.phone,
            project: payload.project,
            date: payload.date,
            slot: payload.slot,
            loanRange: payload.loanRange,
            employment: payload.employment,
            message: payload.message,
            page: payload.page,
            utm: {
              source: payload.utm_source,
              medium: payload.utm_medium,
              campaign: payload.utm_campaign,
            },
            consent: true,
          }),
        }).catch((err) => console.error("Sheet Webhook error:", err))
      );
    }

    // Destination 2: Email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.LEADS_NOTIFY_EMAIL;
    if (resendKey && notifyEmail) {
      const emailHtml = `
        <h2>New Lead Received: ${payload.intent.toUpperCase()}</h2>
        <p><strong>Ref:</strong> ${payload.ref}</p>
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Phone:</strong> <a href="tel:+91${payload.phone}">+91 ${payload.phone}</a> | <a href="https://wa.me/91${payload.phone}?text=Hello%20${encodeURIComponent(payload.name)},%20thank%20you%20for%20contacting%20Glorious%20Real%20Estates.">WhatsApp Chat</a></p>
        <p><strong>Project:</strong> ${payload.project}</p>
        ${payload.date ? `<p><strong>Preferred Date:</strong> ${payload.date} (${payload.slot})</p>` : ""}
        ${payload.mode ? `<p><strong>Mode:</strong> ${payload.mode}</p>` : ""}
        ${payload.loanRange ? `<p><strong>Loan Needed:</strong> ${payload.loanRange} (${payload.employment})</p>` : ""}
        ${payload.message ? `<p><strong>Notes:</strong> ${payload.message}</p>` : ""}
        <p><strong>Source Page:</strong> ${payload.page}</p>
        <p><small>Consent recorded at ${payload.createdAt}</small></p>
      `;

      promises.push(
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Glorious Leads <onboarding@resend.dev>",
            to: notifyEmail,
            subject: `New [${payload.intent}] lead - ${payload.name} - ${payload.project}`,
            html: emailHtml,
          }),
        }).catch((err) => console.error("Resend notification error:", err))
      );
    }

    // Destination 3: Telegram Alert
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChatId = process.env.TELEGRAM_CHAT_ID;
    if (tgToken && tgChatId) {
      const tgMsg = `🏢 *New Glorious Lead*\n*Ref:* ${payload.ref}\n*Type:* ${payload.intent}\n*Name:* ${payload.name}\n*Phone:* +91 ${payload.phone}\n*Project:* ${payload.project}\n${payload.date ? `*Date:* ${payload.date} ${payload.slot}\n` : ""}${payload.loanRange ? `*Loan:* ${payload.loanRange}\n` : ""}`;
      promises.push(
        fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: tgChatId,
            text: tgMsg,
            parse_mode: "Markdown",
          }),
        }).catch((err) => console.error("Telegram error:", err))
      );
    }

    // Destination 4: CRM Webhook
    const crmWebhook = process.env.CRM_WEBHOOK_URL;
    if (crmWebhook) {
      promises.push(
        fetch(crmWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).catch((err) => console.error("CRM webhook error:", err))
      );
    }

    // Wait for all remote webhooks without blocking client response
    if (promises.length > 0) {
      await Promise.allSettled(promises);
    }

    // Next step guidance per intent
    const nextSteps: Record<string, string> = {
      site_visit: "Our sales desk will call you within 30 minutes to confirm your pickup & appointment time.",
      walkthrough: "Our architect consultant will send your Google Meet / WhatsApp video invite link shortly.",
      banking: "Our senior banking manager from partner banks (SBI/HDFC) will reach out with customized loan schemes.",
      brochure: "Your download is ready. We've also queued the brochure and price sheet to your WhatsApp.",
      pricing: "Unit-wise pricing matrix and sanctioned floor plans are being dispatched to your phone.",
      callback: "Our senior sales officer will call you back during office hours (9:30 AM – 6:30 PM).",
      general: "Thank you for reaching out. We will address your specific inquiry promptly.",
    };

    return NextResponse.json({
      success: true,
      ref,
      intent: payload.intent,
      nextStep: nextSteps[payload.intent] || "Our team will connect with you promptly.",
      whatsappPrefilledText: `Hi Glorious Real Estates, I submitted an inquiry for ${payload.project} (Ref: ${ref}).`,
    });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "We could not process your submission. Please connect directly via WhatsApp.",
      },
      { status: 500 }
    );
  }
}
