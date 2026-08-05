import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import MapEmbed from "@/components/MapEmbed";
import { IconArrowUpRight, IconMail, IconMapPin, IconWhatsapp } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact | La Cuisinière",
  description:
    "Contactez Lys de la Madone Agro, fabricant de La Cuisinière : adresse, téléphone, WhatsApp et email.",
};

const WHATSAPP_HREF =
  "https://wa.me/22969983030?text=" +
  encodeURIComponent("Bonjour, j'aimerais avoir des informations sur La Cuisinière.");

const contactInfo = [
  {
    icon: IconMapPin,
    label: "Adresse",
    value:
      "Gondouana, Fidjrossè, Cotonou — fin goudron, commissariat de Fidjrossè puis première rue à gauche",
  },
  {
    icon: IconWhatsapp,
    label: "Téléphone / WhatsApp",
    value: "+229 69 98 30 30",
    href: WHATSAPP_HREF,
  },
  {
    icon: IconMail,
    label: "Email",
    value: "lyslamadone@gmail.com",
    href: "mailto:lyslamadone@gmail.com",
  },
];

const legalInfo = [
  { label: "N° RCCM", value: "RB/COT/21 A 67864" },
  { label: "N° IFU", value: "2200901480262" },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative -mt-28 flex h-[380px] items-end overflow-hidden">
        <Image
          src="/images/heros1-carrousel-nosrecettes.jpg"
          alt="Contactez La Cuisinière"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
        <div className="relative z-10 w-full px-6 pb-10 sm:px-12">
          <div className="text-white/80">
            <Breadcrumb
              items={[{ label: "Accueil", href: "/" }, { label: "Contact" }]}
            />
          </div>
          <h1 className="mt-4 font-display text-5xl text-white sm:text-6xl">
            Contact
          </h1>
          <p className="mt-3 max-w-xl text-lg text-white/90">
            Une question, un partenariat, une commande ? Lys de la Madone
            Agro vous répond.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="flex flex-col rounded-3xl border border-black/5 bg-white p-8 sm:p-10">
          <h2 className="font-display text-3xl text-feuille">
            Nos coordonnées
          </h2>

          <div className="mt-8 space-y-6">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              const row = (
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-feuille/10 text-feuille">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold uppercase tracking-wide text-foreground/45">
                      {item.label}
                    </p>
                    <p className="mt-1 text-base font-medium leading-relaxed text-foreground">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="block"
                >
                  {row}
                </a>
              ) : (
                <div key={item.label}>{row}</div>
              );
            })}
          </div>

          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex items-center justify-center gap-2 rounded-full bg-feuille py-4 text-base font-semibold text-white transition-colors hover:bg-feuille-dark"
          >
            <IconWhatsapp className="h-5 w-5" />
            Discuter sur WhatsApp
          </a>

          <div className="mt-8 flex gap-8 border-t border-black/5 pt-6">
            {legalInfo.map((item) => (
              <div key={item.label}>
                <p className="text-sm font-semibold uppercase tracking-wide text-foreground/45">
                  {item.label}
                </p>
                <p className="mt-1 text-base text-foreground/75">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <MapEmbed
          title="Lys de la Madone Agro"
          subtitle="Gondouana, Fidjrossè, Cotonou"
          src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d15860.069916725224!2d2.35175365!3d6.39174585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x1023576aebc0cfb3%3A0x5926e1f69a995ad4!2sLYS%20DE%20LA%20MADONE%20AGRO%2C%20Cotonou!3m2!1d6.3577245!2d2.3721289!5e0!3m2!1sfr!2sbj!4v1785936265234!5m2!1sfr!2sbj"
          mapsHref="https://www.google.com/maps/search/?api=1&query=Lys%20de%20la%20Madone%20Agro%20Cotonou"
        />
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20 text-center sm:px-6 lg:px-8">
        <p className="text-lg text-foreground/70">
          Vous cherchez plutôt où acheter nos produits ?
        </p>
        <a
          href="/ou-nous-trouver"
          className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-tomate px-8 py-4 text-base font-semibold text-tomate transition-colors hover:bg-tomate hover:text-white"
        >
          Voir nos points de vente
          <IconArrowUpRight className="h-4 w-4" />
        </a>
      </section>
    </>
  );
}
