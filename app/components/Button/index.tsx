"use client";
import { cn } from "@/app/utils/cn";
import React from "react";

export interface ButtonTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: "max" | "full";
}

export default function Button({
  width = "max",
  className,
  type = "button",
  children,
  ...props
}: ButtonTypes) {
  return (
    <button
      type={type}
      className={cn(
        // Layout
        "inline-flex items-center justify-center gap-2",
        "rounded-lg border px-4 py-2",
        "text-sm font-medium",

        // Default style
        "border-black bg-transparent text-black",

        // Hover
        "transition-colors duration-200",
        "hover:bg-black hover:text-white hover:cursor-pointer",

        // Focus
        "outline-none focus-visible:ring-2",
        "focus-visible:ring-black focus-visible:ring-offset-2",

        // Active
        "active:scale-[0.98]",

        // Disabled
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        "disabled:hover:bg-transparent",
        "disabled:hover:text-black",

        // Width
        width === "full" ? "w-full" : "w-fit",

        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
