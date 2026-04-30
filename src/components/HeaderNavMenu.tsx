import Link from "next/link";
import { NavItem } from "./HeaderNavItem";
import { navLinks } from "../constants/navLinks";

export const HeaderNavMenu: React.FC = () => {
  return (
    <nav
      aria-label="Nav menu"
      className="hidden md:flex justify-between items-center text-textDark gap-5 lg:gap-10"
    >
      {navLinks.map(({ label, href, external }) => (
        <NavItem key={label}>
          <Link
            aria-label={`Link to ${label}`}
            href={href}
            className="p-2"
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          >
            {label}
          </Link>
        </NavItem>
      ))}
    </nav>
  );
};
