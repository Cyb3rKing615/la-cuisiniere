import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import DistributorCard from "@/components/DistributorCard";
import MapEmbed from "@/components/MapEmbed";
import { IconArrowUpRight, IconWhatsapp } from "@/components/icons";

export const metadata: Metadata = {
  title: "Où nous trouver | La Cuisinière",
  description:
    "Retrouvez les produits La Cuisinière chez nos distributeurs partenaires : Supermarché Nol Market, Gozem et ShopAfrico, ou commandez directement sur WhatsApp.",
};

const WHATSAPP_HREF =
  "https://wa.me/22969983030?text=" +
  encodeURIComponent(
    "Bonjour, je souhaite commander des produits La Cuisinière.",
  );

export default function OuNousTrouverPage() {
  return (
    <>
      <section className="relative -mt-28 flex h-[380px] items-end overflow-hidden">
        <Image
          src="/images/heros2-carousel-zerospesticide.jpg"
          alt="Points de vente La Cuisinière"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
        <div className="relative z-10 w-full px-6 pb-10 sm:px-12">
          <div className="text-white/80">
            <Breadcrumb
              items={[{ label: "Accueil", href: "/" }, { label: "Où nous trouver" }]}
            />
          </div>
          <h1 className="mt-4 font-display text-5xl text-white sm:text-6xl">
            Où nous trouver
          </h1>
          <p className="mt-3 max-w-xl text-lg text-white/90">
            En rayon, en livraison ou en ligne : voici tous les moyens de
            commander vos produits La Cuisinière.
          </p>
        </div>
      </section>

      {/* Commande directe WhatsApp */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-feuille px-8 py-9 text-white sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15">
              <IconWhatsapp className="h-7 w-7" />
            </span>
            <div>
              <h2 className="font-display text-2xl leading-tight sm:text-3xl">
                Commandez sur WhatsApp
              </h2>
              <p className="mt-1 text-base text-white/85">
                On vous répond et on organise la livraison —{" "}
                <span className="font-semibold">+229 69 98 30 30</span>
              </p>
            </div>
          </div>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-feuille-dark transition-colors hover:bg-creme"
          >
            Discuter maintenant
            <IconArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Nol Market — distributeur phare, avec carte */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl text-foreground sm:text-4xl">
          Notre distributeur partenaire
        </h2>
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col justify-center rounded-3xl border border-black/5 bg-white p-8 sm:p-10">
            <div className="relative h-20 w-full max-w-[280px]">
              <Image
                src="/images/logo-nol-market.webp"
                alt="Supermarché Nol Market"
                fill
                className="object-contain object-left"
                sizes="280px"
              />
            </div>
            <p className="mt-7 text-base leading-relaxed text-foreground/70">
              Retrouvez toute la gamme La Cuisinière en rayon au Supermarché
              Nol Market, le carrefour des produits locaux, ou commandez-la
              directement sur leur site.
            </p>
            <a
              href="https://nolmarket.com/searchProduct?query=la%20cuisini%C3%A8re"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 flex w-fit items-center gap-2 rounded-full bg-tomate px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-tomate-dark"
            >
              Commander sur Nol Market
              <IconArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <MapEmbed
            title="Supermarché Nol Market"
            subtitle="Cotonou, Bénin"
            src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d15860.069916725224!2d2.35175365!3d6.39174585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x1023576c6ad8d417%3A0x73409770c025122f!2sSUPERMARCH%C3%89%20NOL%20MARKET%2C%2001%20BP.%20123%20Cotonou!3m2!1d6.3538676999999995!2d2.3653689!5e0!3m2!1sfr!2sbj!4v1785936156797!5m2!1sfr!2sbj"
            mapsHref="https://www.google.com/maps/search/?api=1&query=Supermarch%C3%A9%20Nol%20Market%20Cotonou"
          />
        </div>
      </section>

      {/* Autres canaux de commande */}
      <section className="bg-creme-deep py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl text-foreground sm:text-4xl">
            Aussi disponible sur
          </h2>
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
            <DistributorCard
              name="Supermarché Nol Market"
              logo="/images/logo-nol-market.webp"
              description="Le carrefour des produits locaux. Livraison possible dans tout Cotonou."
              href="https://nolmarket.com/searchProduct?query=la%20cuisini%C3%A8re"
              ctaLabel="Voir sur Nol Market"
              featured
            />
            <DistributorCard
              name="Gozem"
              logo="/images/logo-gozem.jpg"
              description="Commandez vos produits La Cuisinière et faites-vous livrer en quelques clics."
              href="https://pagelink.gozem.co/7yUg"
              ctaLabel="Commander sur Gozem"
            />
            <DistributorCard
              name="ShopAfrico"
              logo="/images/logo-shopafrico.webp"
              description="La marketplace panafricaine qui référence toute la gamme Lys de la Madone."
              href="https://shopafrico.com/marque/lys-de-la-madoine/lys-de-la-madone/"
              ctaLabel="Commander sur ShopAfrico"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-lg text-foreground/70">
          Vous êtes une boutique ou un supermarché et souhaitez distribuer nos
          produits ?
        </p>
        <a
          href="/contact"
          className="mt-5 inline-block rounded-full border-2 border-feuille px-8 py-4 text-base font-semibold text-feuille transition-colors hover:bg-feuille hover:text-white"
        >
          Contactez-nous
        </a>
      </section>
    </>
  );
}
