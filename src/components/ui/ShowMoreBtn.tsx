import type { ButtonHTMLAttributes } from "react";

interface ShowMoreBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  ariaLabel?: string;
  className: string;
  onClick: () => void;
}
export const ShowMoreBtn: React.FC<ShowMoreBtnProps> = ({
  children,
  onClick,
  ariaLabel,
  className,
  ...rest
}) => {

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`flex items-center justify-between gap-3 w-fit text-lg text-white border-none ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};