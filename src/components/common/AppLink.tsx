"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { useDemo } from "@/context/DemoContext";

export type AppLinkProps = LinkProps & {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  target?: string;
  rel?: string;
  id?: string;
  "aria-label"?: string;
  title?: string;
};

export default function AppLink({ href, children, ...props }: AppLinkProps) {
  const { appendQuery } = useDemo();
  const targetHref = typeof href === "string" ? appendQuery(href) : href;

  return (
    <Link href={targetHref} {...props}>
      {children}
    </Link>
  );
}
