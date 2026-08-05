import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import CategoryFilter from "@/components/CategoryFilter";
import RecipeCard from "@/components/RecipeCard";
import { getPublishedRecipes } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Nos recettes | La Cuisinière",
  description:
    "Des idées recettes simples et gourmandes, pensées pour nos sauces et purées de tomate béninoises.",
};

export default async function RecettesPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { categorie } = await searchParams;
  const recipes = await getPublishedRecipes();
  const categories = Array.from(
    new Set(recipes.map((r) => r.category).filter((c): c is string => !!c)),
  ).sort();
  const visible = categorie
    ? recipes.filter((r) => r.category === categorie)
    : recipes;

  return (
    <>
      <section className="relative -mt-28 flex h-[380px] items-end overflow-hidden">
        <Image
          src="/images/heros2-carrousel-nosrecettes.jpg"
          alt="Idées recettes La Cuisinière"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
        <div className="relative z-10 w-full px-6 pb-10 sm:px-12">
          <Breadcrumb
            items={[{ label: "Accueil", href: "/" }, { label: "Nos recettes" }]}
          />
          <h1 className="mt-4 font-display text-5xl text-white sm:text-6xl">
            Nos recettes
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <CategoryFilter
          basePath="/recettes"
          categories={categories}
          active={categorie}
        />

        {visible.length === 0 ? (
          <p className="mt-16 text-center text-foreground/60">
            {recipes.length === 0
              ? "Nos premières recettes arrivent bientôt."
              : "Aucune recette dans cette catégorie pour le moment."}
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
