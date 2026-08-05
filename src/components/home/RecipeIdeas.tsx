import Link from "next/link";
import RecipeCard from "@/components/RecipeCard";
import { getPublishedRecipes } from "@/lib/notion";

export default async function RecipeIdeas() {
  const recipes = await getPublishedRecipes();
  if (recipes.length === 0) return null;

  return (
    <section className="bg-creme-deep py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl sm:text-5xl">
            <span className="text-feuille">Nos idées recettes,</span>{" "}
            <span className="text-tomate">prêtes à cuisiner</span>
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Des recettes simples, pensées pour nos sauces et purées locales.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recipes.slice(0, 4).map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/recettes"
            className="inline-block rounded-full border-2 border-feuille px-8 py-3.5 text-base font-bold uppercase tracking-wide text-feuille hover:bg-feuille hover:text-white"
          >
            Toutes nos recettes
          </Link>
        </div>
      </div>
    </section>
  );
}
