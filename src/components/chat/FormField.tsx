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
      <label className="text-xs leading-snug text-grey_300" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`h-11 rounded-xl bg-black px-3 text-[16px] text-white ring-1 placeholder:text-grey_300/70
                    focus:outline-none focus:ring-2 ${
                      error ? "ring-error_700 focus:ring-error_500" : "ring-grey_500 focus:ring-green_500"
                    } ${className ?? ""}`}
        {...inputProps}
      />
      {error && (
        <div id={`${id}-error`} className="text-xs leading-snug text-error_400">
          {error}
        </div>
      )}
    </>
  );
}
