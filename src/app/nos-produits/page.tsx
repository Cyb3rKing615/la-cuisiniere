import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ThreeColumnFeatures from "@/components/ThreeColumnFeatures";
import { products } from "@/lib/products";
import { recipes } from "@/lib/recipes";

export const metadata: Metadata = {
  title: "Nos produits | La Cuisinière",
  description:
    "Découvrez toute la gamme La Cuisinière : purée de tomates, tomates pelées, sauce tomate assaisonnée et sauce bolognaise, 100% tomates béninoises homologuées ABSSA.",
};

const advantages = [
  {
    icon: "🍅",
    title: "100% tomates locales",
    text: "Nos tomates sont cultivées par des producteurs béninois, récoltées et transformées près de chez vous.",
  },
  {
    icon: "🌿",
    title: "Sans conservateurs",
    text: "Des recettes simples, sans artifice, pour retrouver le vrai goût de la tomate.",
  },
  {
    icon: "🏭",
    title: "Fait à Cotonou",
    text: "Chaque pot est préparé au Bénin, pour soutenir une filière locale du champ à l'assiette.",
  },
];

export default function NosProduitsPage() {
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-6 bg-feuille px-6 py-16 text-white sm:px-12 lg:py-24">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Nos produits" },
            ]}
          />
          <h1 className="font-display text-5xl sm:text-6xl">Nos produits</h1>
          <p className="max-w-md text-white/90">
            Des références 100% tomates béninoises, homologuées ABSSA, pour
            cuisiner simple, local et généreux, toute l&apos;année.
          </p>
          <div className="mt-2 flex -space-x-6">
            {products.slice(0, 3).map((product, i) => (
              <div
                key={product.slug}
                className="relative h-28 w-28 overflow-hidden rounded-2xl border-4 border-feuille shadow-lg"
                style={{ transform: `rotate(${(i - 1) * 6}deg)` }}
              >
                <Image
                  src={product.packshot}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[280px]">
          <Image
            src="/images/heros2-carrousel-nosrecettes.jpg"
            alt="Ingrédients La Cuisinière prêts à cuisiner"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/nos-produits/${product.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-square bg-creme-deep">
                <Image
                  src={product.packshot}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1 p-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-tomate">
                  {product.category}
                </span>
                <h2 className="font-display text-xl text-foreground">
                  {product.name}
                </h2>
                <p className="mt-auto text-sm font-semibold text-feuille">
                  Découvrir →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ThreeColumnFeatures
        title="3 bonnes raisons de choisir La Cuisinière"
        features={advantages}
      />

      <section className="bg-creme-deep py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-4xl sm:text-5xl">
            <span className="text-feuille">Des recettes</span>{" "}
            <span className="text-tomate">pour toute la gamme</span>
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recipes.map((recipe) => (
              <Link
                key={recipe.slug}
                href={`/recettes/${recipe.slug}`}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow hover:shadow-xl"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={recipe.photo}
                    alt={recipe.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg leading-snug text-foreground">
                    {recipe.title}
                  </h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-feuille">
                    {recipe.difficulty} · {recipe.prepTimeMinutes} min
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center text-sm text-foreground/70 sm:px-6 lg:px-8">
        <p>
          Toute la gamme La Cuisinière est préparée à Cotonou à partir de
          tomates cultivées par des producteurs béninois. Purée de tomates,
          tomates pelées, sauce tomate assaisonnée et sauce bolognaise
          partagent la même promesse&nbsp;: une tomate d&apos;ici, homologuée
          ABSSA, disponible toute l&apos;année, sans conservateurs.
        </p>
      </section>
    </>
  );
}
