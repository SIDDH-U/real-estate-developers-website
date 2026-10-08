/**
 * Lightweight Client-Side Analytics Event Tracker
 * Dispatches custom events and logs to Google Tag Manager / Meta Pixel / CRM hooks if present.
 */

export type AnalyticsEventName =
  | "form_open"
  | "form_submit"
  | "lead_submit"
  | "call_click"
  | "whatsapp_click"
  | "brochure_download"
  | "walkthrough_play"
  | "filter_change"
  | "tab_change";

export interface AnalyticsEventPayload {
  source?: string;
  project?: string;
  phone?: string;
  label?: string;
  url?: string;
  category?: string;
  intent?: string;
  [key: string]: unknown;
}

export function trackAnalyticsEvent(eventName: AnalyticsEventName, payload?: AnalyticsEventPayload) {
  if (typeof window === "undefined") return;

  const eventData = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...payload,
  };

  // 1. Log in console during development
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.info(`[Analytics Event] ${eventName}:`, eventData);
  }

  // 2. Push to window.dataLayer if Google Tag Manager is configured
  const win = window as unknown as { dataLayer?: unknown[] };
  if (win.dataLayer && Array.isArray(win.dataLayer)) {
    win.dataLayer.push(eventData);
  }

  // 3. Dispatch standard CustomEvent for third-party listeners
  try {
    const customEvent = new CustomEvent(`glorious:${eventName}`, { detail: eventData });
    window.dispatchEvent(customEvent);
  } catch {
    // Ignore legacy browser issues
  }
}
