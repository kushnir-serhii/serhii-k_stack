"use client";

import type { InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

export function FormField({ id, label, className, error, ...inputProps }: FormFieldProps) {
  return (
    <>
      <label className="text-[12px] leading-snug text-grey_300" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`h-10 rounded-xl bg-black px-3 text-[14px] text-textLight ring-1 placeholder:text-textGrey
                    focus:outline-none focus:ring-2 ${
                      error ? "ring-red-700 focus:ring-red-500" : "ring-grey_500 focus:ring-accentGreen"
                    } ${className ?? ""}`}
        {...inputProps}
      />
      {error && (
        <div id={`${id}-error`} className="text-[12px] leading-snug text-red-400">
          {error}
        </div>
      )}
    </>
  );
}
