import Link from "next/link";

interface ProjectBreadcrumbProps {
  title: string;
  parent?: { label: string; href: string };
}

export function ProjectBreadcrumb({
  title,
  parent = { label: "Work", href: "/projects" },
}: ProjectBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-3 font-mono text-xs text-grey_400 pt-8 pb-6 tracking-[0.04em] uppercase"
    >
      <Link
        href={parent.href}
        className="text-grey_400 no-underline transition-colors duration-200 hover:text-black_900 rounded-sm focus-ring"
      >
        {parent.label}
      </Link>
      <span className="text-grey_400">/</span>
      <span className="text-grey_400">{title}</span>
    </nav>
  );
}
