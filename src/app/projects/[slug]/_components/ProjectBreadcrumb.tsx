import Link from "next/link";

export function ProjectBreadcrumb({ title }: { title: string }) {
  return (
    <nav className="flex items-center gap-3 font-mono text-xs text-textGrey pt-8 pb-6 tracking-[0.04em] uppercase">
      <Link
        href="/#projects"
        className="text-textGrey no-underline transition-colors duration-200 hover:text-textDark"
      >
        Work
      </Link>
      <span className="text-textGrey">/</span>
      <span className="text-textGrey">{title}</span>
    </nav>
  );
}
