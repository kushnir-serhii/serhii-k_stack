import Link from "next/link";
import { NavItem } from "./HeaderNavItem";
import { navLinks } from "../constants/navLinks";

export const HeaderNavMenu: React.FC = () => {
  return (
    <nav
      aria-label="Nav menu"
      className="hidden md:flex justify-between items-center text-black_900 gap-5 lg:gap-10"
    >
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
    </nav>
  );
};
