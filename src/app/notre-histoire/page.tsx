import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import ThreeColumnFeatures from "@/components/ThreeColumnFeatures";

export const metadata: Metadata = {
  title: "Notre histoire | La Cuisinière",
  description:
    "Depuis 2020, La Cuisinière transforme la tomate béninoise pour soutenir nos producteurs et nourrir vos familles, toute l'année.",
};

const valeurs = [
  {
    icon: "✨",
    title: "Qualité et authenticité",
    text: "Fraîcheur et goût naturel, sans artifices, dans le respect des normes d'hygiène et de qualité.",
  },
  {
    icon: "💡",
    title: "Innovation",
    text: "Une maîtrise constante de la transformation, pour des produits savoureux et toujours constants.",
  },
  {
    icon: "🤝",
    title: "Ancrage social",
    text: "Le soutien aux agriculteurs et maraîchers, et la création d'emplois pour les jeunes et les femmes.",
  },
];

const engagements = [
  "Réduire les pertes post-récoltes des maraîchers",
  "Contribuer à une alimentation saine des ménages",
  "Soutenir une production biologique et durable",
  "Élargir l'accès à nos produits, du marché local au marché sous-régional",
];

export default function NotreHistoirePage() {
  return (
    <>
      <section className="relative flex h-[440px] items-end overflow-hidden">
        <Image
          src="/images/heros1-carrousel-culturetomate.webp"
          alt="Culture de la tomate au Bénin"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
        <div className="relative z-10 w-full px-6 pb-12 sm:px-12">
          <div className="text-white/80">
            <Breadcrumb
              items={[{ label: "Accueil", href: "/" }, { label: "Notre histoire" }]}
            />
          </div>
          <h1 className="mt-4 font-display text-5xl text-white sm:text-6xl">
            Notre histoire
          </h1>
          <p className="mt-3 max-w-xl text-white/90">
            Depuis 2020, nous transformons la tomate béninoise pour soutenir
            nos producteurs et nourrir vos familles, toute l&apos;année.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image
            src="/images/heros2-carrousel-culturetomate.jpg"
            alt="Récolte de tomates chez nos producteurs béninois"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div>
          <h2 className="font-display text-3xl text-feuille sm:text-4xl">
            D&apos;où vient La Cuisinière
          </h2>
          <p className="mt-5 text-foreground/80">
            Lys de la Madone Agro est née d&apos;une conviction simple : trop
            de tomates cultivées localement se perdent après la récolte,
            faute de débouché. Depuis 2020, nous transformons cette
            production en conserves de qualité, sous la marque La Cuisinière
            — pour que rien ne se perde, et que chaque foyer profite du goût
            de la tomate béninoise, toute l&apos;année.
          </p>
          <p className="mt-4 text-foreground/80">
            Ce projet est né d&apos;une volonté forte de soutenir les
            planteurs et de réduire le gaspillage alimentaire, en valorisant
            en particulier la production locale de tomates.
          </p>
        </div>
      </section>

      <section className="bg-creme-deep py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white p-8">
            <h2 className="font-display text-2xl text-tomate">
              Notre vision
            </h2>
            <p className="mt-4 text-sm text-foreground/80">
              Devenir une référence de la transformation agroalimentaire au
              Bénin et dans la sous-région, en valorisant les produits locaux
              pour contribuer à la sécurité alimentaire et au développement
              économique.
            </p>
            <p className="mt-3 text-sm text-foreground/80">
              Nous encourageons aussi les agriculteurs à adopter une
              agriculture biologique, pour un développement durable de la
              filière.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-8">
            <h2 className="font-display text-2xl text-tomate">
              Notre mission
            </h2>
            <p className="mt-4 text-sm text-foreground/80">
              Mettre à la disposition des consommateurs des produits de
              qualité, respectant les normes de l&apos;alimentation, à des
              prix accessibles.
            </p>
          </div>
        </div>
      </section>

      <ThreeColumnFeatures title="Ce qui nous guide" features={valeurs} />

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl text-foreground sm:text-4xl">
          Nos engagements
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {engagements.map((engagement) => (
            <li
              key={engagement}
              className="flex items-start gap-3 rounded-2xl bg-creme-deep p-5"
            >
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-feuille text-xs text-white"
                aria-hidden
              >
                ✓
              </span>
              <span className="text-sm text-foreground/80">{engagement}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-feuille/30 bg-white p-8 text-center sm:flex-row sm:text-left">
          <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded">
            <Image
              src="/images/logo_abssa.jpg"
              alt="Logo ABSSA"
              fill
              className="object-contain"
              sizes="112px"
            />
          </div>
          <p className="text-sm text-foreground/80">
            Nos produits sont homologués par l&apos;ABSSA (Agence Béninoise
            de Sécurité Sanitaire des Aliments) et disposent des
            autorisations de mise sur le marché béninois.
          </p>
        </div>
      </section>
    </>
  );
}
