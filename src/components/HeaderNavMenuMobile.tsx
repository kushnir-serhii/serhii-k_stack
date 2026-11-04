import Link from "next/link";
import type { RefObject } from "react";
import { Icon } from "./ui/Icon";
import { NavItem } from "./HeaderNavItem";
import { MainLogo } from "./MainLogo";
import { navLinks } from "../constants/navLinks";

interface HeaderNavMenuMobileProps {
  onClose: () => void;
  closeButtonRef?: RefObject<HTMLButtonElement | null>;
}

export const HeaderNavMenuMobile: React.FC<HeaderNavMenuMobileProps> = ({
  onClose,
  closeButtonRef,
}) => {
  return (
    <nav
      aria-label="Nav Mobile menu"
      onClick={onClose}
      className="relative z-20 flex flex-col justify-between items-center text-2xl text-black_900 bg-bg gap-10 px-4 pt-14 pb-4"
    >
      <MainLogo classNameLogo="text-2xl text-black_900" classNameLink="focus-ring rounded-md" />
      {navLinks.map(({ label, href, external }) => (
        <NavItem key={label}>
          <Link
            href={href}
            className="p-2 rounded-md focus-ring"
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          >
            {label}
          </Link>
        </NavItem>
      ))}
      <button
        ref={closeButtonRef}
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute top-1.5 right-1.5 flex size-11 items-center justify-center rounded-full focus-ring"
      >
        <Icon
          id="icon-cross"
          width={24}
          height={24}
          className="text-black_900"
        />
      </button>
    </nav>
  );
};
