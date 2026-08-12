import Image from "next/image";
import Link from "next/link";
import type { NotionTip } from "@/lib/notion";

export default function TipCard({ tip }: { tip: NotionTip }) {
  return (
    <Link
      href={`/astuces/${tip.slug}`}
      className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] bg-creme-deep">
        {tip.cover && (
          <Image
            src={tip.cover}
            alt={tip.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
        )}
      </div>
      <div className="p-4">
        {tip.category && (
          <span className="text-sm font-semibold uppercase tracking-wide text-tomate">
            {tip.category}
          </span>
        )}
        <h3 className="mt-1 font-display text-lg leading-snug text-foreground">
          {tip.title}
        </h3>
      </div>
    </Link>
  );
}
