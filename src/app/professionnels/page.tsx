import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ThreeColumnFeatures from "@/components/ThreeColumnFeatures";
import { IconArrowUpRight, IconWhatsapp } from "@/components/icons";
import { getPublishedProducts } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Professionnels | La Cuisinière",
  description:
    "Supermarchés, restaurants, hôtels : découvrez les produits La Cuisinière pour votre activité professionnelle.",
};

const advantages = [
  {
    icon: "🛡️",
    title: "Fiabilité",
    text: "Des produits homologués ABSSA, avec autorisation de mise sur le marché béninois — une qualité constante, lot après lot.",
  },
  {
    icon: "🍅",
    title: "Origine locale",
    text: "Une tomate béninoise transformée sur place, pour une offre locale que vous pouvez valoriser auprès de vos clients.",
  },
  {
    icon: "📦",
    title: "Disponibilité",
    text: "Une production pensée pour la longue conservation, disponible toute l'année, sans dépendre des saisons.",
  },
];

const segments = [
  {
    icon: "🛒",
    title: "Supermarchés / alimentations",
    text: "Des formats adaptés à la revente (350 g à 1000 g selon les produits), pour proposer à vos clients une option locale et constante à côté de l'offre importée.",
  },
  {
    icon: "🍽️",
    title: "Restaurants",
    text: "Une base tomate fiable et savoureuse, en grand format, pour des plats réguliers, service après service — sans compromis sur le goût.",
  },
  {
    icon: "🏨",
    title: "Hôtels",
    text: "Valorisez le local dans votre carte : une tomate béninoise transformée avec soin, pour une restauration qui a une vraie histoire à raconter à vos clients.",
  },
];

const WHATSAPP_HREF =
  "https://wa.me/22969983030?text=" +
  encodeURIComponent(
    "Bonjour, je représente [nom de l'établissement] et je souhaite en savoir plus sur vos produits La Cuisinière pour mon activité professionnelle.",
  );

function largestFormat(weights: string[]): string | null {
  if (weights.length === 0) return null;
  return [...weights].sort((a, b) => {
    const na = parseInt(a, 10) || 0;
    const nb = parseInt(b, 10) || 0;
    return nb - na;
  })[0];
}

export default async function ProfessionnelsPage() {
  const products = await getPublishedProducts();
  const proProducts = [...products].sort((a, b) => {
    const na = parseInt(largestFormat(a.weights) ?? "0", 10);
    const nb = parseInt(largestFormat(b.weights) ?? "0", 10);
    return nb - na;
  });

  return (
    <>
      <section className="relative -mt-28 flex h-[380px] items-end overflow-hidden">
        <Image
          src="/images/Boite-sauce-1.jpg"
          alt="Produits La Cuisinière pour professionnels"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/15" />
        <div className="relative z-10 w-full px-6 pb-10 sm:px-12">
          <div className="text-white/80">
            <Breadcrumb
              items={[{ label: "Accueil", href: "/" }, { label: "Professionnels" }]}
            />
          </div>
          <h1 className="mt-4 font-display text-5xl text-white sm:text-6xl">
            La Cuisinière pour les professionnels
          </h1>
          <p className="mt-3 max-w-xl text-lg text-white/90">
            Une tomate locale, fiable pour votre activité, toute l&apos;année.
          </p>
        </div>
      </section>

      <ThreeColumnFeatures
        title="Pourquoi travailler avec nous"
        features={advantages}
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl text-foreground sm:text-4xl">
          Adapté à votre activité
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {segments.map((segment) => (
            <div key={segment.title} className="rounded-3xl bg-creme-deep p-8">
              <span className="text-4xl" aria-hidden>
                {segment.icon}
              </span>
              <h3 className="mt-4 font-display text-2xl text-foreground">
                {segment.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-foreground/70">
                {segment.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {proProducts.length > 0 && (
        <section className="bg-creme-deep py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-3xl text-foreground sm:text-4xl">
              Nos produits pour les professionnels
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base text-foreground/70">
              Les mêmes fiches produits, avec les formats les plus adaptés à
              votre activité mis en avant.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {proProducts.map((product) => {
                const format = largestFormat(product.weights);
                return (
                  <Link
                    key={product.slug}
                    href={`/nos-produits/${product.slug}`}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white transition-shadow hover:shadow-xl"
                  >
                    <div className="relative aspect-square bg-creme">
                      {product.packshot && (
                        <Image
                          src={product.packshot}
                          alt={product.name}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-1 p-4">
                      <span className="text-sm font-semibold uppercase tracking-wide text-tomate">
                        {product.category}
                      </span>
                      <h3 className="font-display text-xl text-foreground">
                        {product.name}
                      </h3>
                      {format && (
                        <span className="mt-2 w-fit rounded-full border-2 border-feuille/30 px-3 py-1 text-sm font-semibold text-feuille-dark">
                          Format pro : {format}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border-2 border-feuille-dark bg-white p-8 text-center sm:p-12">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            Devenir partenaire
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-foreground/70">
            Vous êtes un supermarché, un restaurant ou un hôtel ?
            Contactez-nous pour discuter de vos besoins et de nos conditions
            professionnelles.
          </p>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-feuille-dark px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-feuille"
          >
            <IconWhatsapp className="h-5 w-5" />
            Nous contacter
            <IconArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  );
}
