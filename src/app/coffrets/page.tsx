import type { Metadata } from "next";
import Image from "next/image";
import { IconWhatsapp } from "@/components/icons";
import Breadcrumb from "@/components/Breadcrumb";
import { getPublishedCoffrets } from "@/lib/notion";
import { formatFCFA } from "@/lib/format";

export const metadata: Metadata = {
  title: "Nos coffrets | La Cuisinière",
  description:
    "Des coffrets cadeaux La Cuisinière pour le Ramadan, le Carême ou une occasion de partage — à commander directement sur WhatsApp.",
};

function whatsappHref(coffretName: string, price: number | null) {
  const message = price
    ? `Bonjour, je suis intéressé(e) par le ${coffretName} à ${formatFCFA(price)}.`
    : `Bonjour, je suis intéressé(e) par le ${coffretName}.`;
  return `https://wa.me/22969983030?text=${encodeURIComponent(message)}`;
}

export default async function CoffretsPage() {
  const coffrets = await getPublishedCoffrets();

  return (
    <>
      <section className="relative -mt-28 bg-feuille px-6 pb-16 pt-24 text-white sm:px-12 lg:pb-24 lg:pt-32">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Nos coffrets" },
            ]}
          />
          <h1 className="font-display text-5xl sm:text-6xl">Nos coffrets</h1>
          <p className="max-w-xl text-lg text-white/90">
            Des paniers garnis pensés pour les grandes occasions — Ramadan,
            Carême, charité ou simplement l&apos;envie de partager.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {coffrets.length === 0 ? (
          <p className="text-center text-foreground/60">
            Nos coffrets arrivent très bientôt.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {coffrets.map((coffret) => {
              const hasPromo =
                coffret.promoPrice !== null &&
                coffret.price !== null &&
                coffret.promoPrice < coffret.price;

              return (
                <div
                  key={coffret.slug}
                  className="flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm"
                >
                  <div className="relative aspect-[4/3] bg-creme-deep">
                    {coffret.photo && (
                      <Image
                        src={coffret.photo}
                        alt={coffret.name}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    )}
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      {coffret.occasion && (
                        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-feuille-dark">
                          {coffret.occasion}
                        </span>
                      )}
                      {coffret.availability === "Saisonnier - limité" && (
                        <span className="rounded-full bg-tomate px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                          Édition limitée
                        </span>
                      )}
                    </div>
                    {hasPromo && (
                      <span className="absolute right-4 top-4 rounded-full bg-jaune px-3 py-1 text-xs font-bold uppercase tracking-wide text-foreground">
                        Promo
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h2 className="font-display text-2xl text-foreground">
                      {coffret.name}
                    </h2>

                    {coffret.contents.length > 0 && (
                      <p className="line-clamp-3 text-sm text-foreground/70">
                        {coffret.contents.join(" · ")}
                      </p>
                    )}

                    <div className="mt-1 flex items-baseline gap-2">
                      {hasPromo ? (
                        <>
                          <span className="text-lg text-foreground/40 line-through">
                            {formatFCFA(coffret.price!)}
                          </span>
                          <span className="text-2xl font-bold text-tomate">
                            {formatFCFA(coffret.promoPrice!)}
                          </span>
                        </>
                      ) : (
                        coffret.price !== null && (
                          <span className="text-2xl font-bold text-feuille-dark">
                            {formatFCFA(coffret.price)}
                          </span>
                        )
                      )}
                    </div>

                    <a
                      href={whatsappHref(
                        coffret.name,
                        hasPromo ? coffret.promoPrice : coffret.price,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto flex items-center justify-center gap-2 rounded-full bg-tomate py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-tomate-dark"
                    >
                      <IconWhatsapp className="h-4 w-4" />
                      Commander sur WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
