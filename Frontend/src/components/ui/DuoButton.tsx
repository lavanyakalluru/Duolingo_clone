"use client";

import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type DuoButtonVariant =
  | "primary"
  | "secondary"
  | "guidebook"
  | "profile"
  | "signin"
  | "outline-blue";

type DuoButtonProps = {
  children: ReactNode;
  variant?: DuoButtonVariant;
  href?: string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantStyles: Record<DuoButtonVariant, string> = {
  primary:
    "bg-duo-green text-white border-duo-green-dark hover:bg-[#61e002] active:bg-duo-green active:border-b-2 active:translate-y-[2px]",
  secondary:
    "bg-white text-duo-blue border-duo-gray-border hover:bg-[#f7f7f7] active:bg-white active:border-b-2 active:translate-y-[2px]",
  guidebook:
    "bg-duo-green-darker text-white border-[#419100] hover:bg-[#61e002] active:bg-duo-green-darker active:border-b-2 active:translate-y-[2px]",
  profile:
    "bg-duo-green text-[#4b4b4b] border-duo-green-dark hover:bg-[#61e002] active:bg-duo-green active:border-b-2 active:translate-y-[2px]",
  signin:
    "bg-duo-blue text-[#4b4b4b] border-duo-blue-dark hover:bg-[#2fc3ff] active:bg-duo-blue active:border-b-2 active:translate-y-[2px]",
  "outline-blue":
    "bg-transparent text-duo-blue border-duo-blue hover:bg-[#1a2c33] active:border-b-2 active:translate-y-[2px]",
};

export function DuoButton({
  children,
  variant = "primary",
  href,
  className = "",
  ...props
}: DuoButtonProps) {
  const classes = [
    "inline-flex w-full items-center justify-center rounded-2xl border-2 border-b-4 px-4 py-2.5 text-[13px] font-extrabold uppercase tracking-wide transition-all duration-75",
    variantStyles[variant],
    className,
  ].join(" ");

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
