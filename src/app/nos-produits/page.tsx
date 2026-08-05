import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import RecipeCard from "@/components/RecipeCard";
import ThreeColumnFeatures from "@/components/ThreeColumnFeatures";
import { getPublishedProducts, getPublishedRecipes } from "@/lib/notion";

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

export default async function NosProduitsPage() {
  const [products, recipes] = await Promise.all([
    getPublishedProducts(),
    getPublishedRecipes(),
  ]);

  return (
    <>
      <section className="relative -mt-28 grid grid-cols-1 lg:grid-cols-2">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="flex flex-col justify-center gap-6 bg-feuille px-6 pb-16 pt-24 text-white sm:px-12 lg:pb-24 lg:pt-32">
          <Breadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Nos produits" },
            ]}
          />
          <h1 className="font-display text-5xl sm:text-6xl">Nos produits</h1>
          <p className="max-w-md text-lg text-white/90">
            Des références 100% tomates béninoises, homologuées ABSSA, pour
            cuisiner simple, local et généreux, toute l&apos;année.
          </p>
          {products.length > 0 && (
            <div className="mt-2 flex -space-x-6">
              {products.slice(0, 3).map((product, i) => (
                <div
                  key={product.slug}
                  className="relative h-28 w-28 overflow-hidden rounded-2xl border-4 border-feuille bg-white/10 shadow-lg"
                  style={{ transform: `rotate(${(i - 1) * 6}deg)` }}
                >
                  {product.packshot && (
                    <Image
                      src={product.packshot}
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="112px"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
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
        {products.length === 0 ? (
          <p className="text-center text-foreground/60">
            Notre gamme arrive très bientôt.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/nos-produits/${product.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white transition-shadow hover:shadow-xl"
              >
                <div className="relative aspect-square bg-creme-deep">
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
                  <h2 className="font-display text-xl text-foreground">
                    {product.name}
                  </h2>
                  <p className="mt-auto text-base font-semibold text-feuille">
                    Découvrir →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <ThreeColumnFeatures
        title="3 bonnes raisons de choisir La Cuisinière"
        features={advantages}
      />

      {recipes.length > 0 && (
        <section className="bg-creme-deep py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-4xl sm:text-5xl">
              <span className="text-feuille">Des recettes</span>{" "}
              <span className="text-tomate">pour toute la gamme</span>
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {recipes.slice(0, 4).map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-3xl px-4 py-16 text-center text-base text-foreground/70 sm:px-6 lg:px-8">
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
