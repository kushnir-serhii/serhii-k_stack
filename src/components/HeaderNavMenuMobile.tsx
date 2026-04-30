import Link from "next/link";
import { Icon } from "./ui/Icon";
import { NavItem } from "./HeaderNavItem";
import { MainLogo } from "./MainLogo";
import { LinkBtn } from "./ui/LinkBtn";
import { navLinks, cvPath } from "../constants/navLinks";

interface HeaderNavMenuMobileProps {
  onClose: () => void;
}

export const HeaderNavMenuMobile: React.FC<HeaderNavMenuMobileProps> = ({
  onClose,
}) => {
  return (
    <nav
      aria-label="Nav Mobile menu"
      onClick={onClose}
      className="relative z-20 flex flex-col justify-between items-center text-2xl text-textDark bg-bg gap-10 px-4 pt-14 pb-4"
    >
      <MainLogo classNameLogo="text-2xl text-textDark" />
      {navLinks
        .filter(({ label }) => label !== "My CV")
        .map(({ label, href, external }) => (
          <NavItem key={label}>
            <Link
              href={href}
              aria-label={`Link to ${label}`}
              className="p-2"
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
            >
              {label}
            </Link>
          </NavItem>
        ))}

      <LinkBtn
        href={cvPath}
        ariaLabel="Download CV"
        clasName="downloadLinkBtn w-full flex"
      >
        Open CV
      </LinkBtn>
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute top-4 right-4"
      >
        <Icon
          id="icon-cross"
          width={24}
          height={24}
          className="text-textDark"
        />
      </button>
    </nav>
  );
};
