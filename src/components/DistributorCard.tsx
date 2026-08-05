import Image from "next/image";
import { IconArrowUpRight } from "@/components/icons";

export default function DistributorCard({
  name,
  logo,
  description,
  href,
  ctaLabel,
  featured = false,
}: {
  name: string;
  logo: string;
  description: string;
  href: string;
  ctaLabel: string;
  featured?: boolean;
}) {
  return (
    <div className="relative flex flex-col rounded-3xl border border-black/5 bg-white p-7 shadow-sm">
      {featured && (
        <span className="absolute right-6 top-6 rounded-full bg-jaune/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-jaune-dark">
          Partenaire
        </span>
      )}
      <div className="flex h-32 w-full items-center justify-center rounded-2xl bg-creme-deep p-5">
        <div className="relative h-full w-full">
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain"
            sizes="260px"
          />
        </div>
      </div>
      <p className="mt-6 text-base leading-relaxed text-foreground/65">
        {description}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex items-center justify-center gap-1.5 rounded-full bg-feuille py-3.5 text-base font-semibold text-white transition-colors hover:bg-feuille-dark"
      >
        {ctaLabel}
        <IconArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}
