import Link from "next/link";

export type Crumb = {
  label: string;
  href?: string;
};

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'ariane" className="text-base">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="underline hover:no-underline">
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
            {i < items.length - 1 && <span aria-hidden>|</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
