"use client";

import { cn } from "@/app/utils/cn";
import React from "react";

export interface InputTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  width?: "max" | "full";
}

export default function Input({
  setValue,
  width = "max",
  className,
  onChange,
  type = "text",
  ...props
}: InputTypes) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    setValue?.(event.target.value);
  };

  return (
    <div className={cn("min-w-0", width === "full" ? "w-full" : "w-fit")}>
      <input
        type={type}
        onChange={handleChange}
        className={cn(
          // Layout
          "h-10 rounded-lg border px-3 py-2",
          "text-sm leading-normal",

          // Colors
          "border-neutral-300 bg-white text-neutral-900",
          "placeholder:text-neutral-400",

          // Interaction
          "outline-none transition-all duration-200",
          "hover:border-neutral-400",
          "focus:border-neutral-900",
          "focus:ring-2 focus:ring-neutral-900/10",

          // Disabled
          "disabled:cursor-not-allowed",
          "disabled:border-neutral-200",
          "disabled:bg-neutral-100",
          "disabled:text-neutral-400",

          // Width
          width === "max" ? "w-full max-w-[500px]" : "w-full",

          className,
        )}
        {...props}
      />
    </div>
  );
}
