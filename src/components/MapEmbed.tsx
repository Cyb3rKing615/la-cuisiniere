import { IconArrowUpRight, IconMapPin } from "@/components/icons";

export default function MapEmbed({
  title,
  subtitle,
  src,
  mapsHref,
}: {
  title: string;
  subtitle?: string;
  src: string;
  mapsHref: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-black/5 px-6 py-6">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-feuille/10 text-feuille">
          <IconMapPin className="h-6 w-6" />
        </span>
        <div>
          <p className="text-lg font-semibold leading-tight text-foreground">
            {title}
          </p>
          {subtitle && (
            <p className="mt-0.5 text-sm text-foreground/55">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
        <iframe
          src={src}
          className="absolute inset-0 h-full w-full"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title={title}
        />
      </div>
      <a
        href={mapsHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 px-6 py-4 text-base font-semibold text-feuille-dark transition-colors hover:bg-creme-deep"
      >
        Ouvrir dans Google Maps
        <IconArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}
