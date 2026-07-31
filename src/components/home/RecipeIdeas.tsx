import Image from "next/image";
import Link from "next/link";
import { recipes } from "@/lib/recipes";
import { getProductBySlug } from "@/lib/products";

export default function RecipeIdeas() {
  return (
    <section className="bg-creme-deep py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl sm:text-5xl">
            <span className="text-feuille">Nos idées recettes,</span>{" "}
            <span className="text-tomate">prêtes à cuisiner</span>
          </h2>
          <p className="mt-4 text-foreground/70">
            Des recettes simples, pensées pour nos sauces et purées locales.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recipes.map((recipe) => {
            const product = getProductBySlug(recipe.relatedProductSlugs[0]);
            return (
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
                  {product && (
                    <div className="absolute bottom-3 right-3 h-12 w-12 overflow-hidden rounded-xl border-2 border-white bg-white shadow">
                      <Image
                        src={product.packshot}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  )}
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
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/recettes"
            className="inline-block rounded-full border-2 border-feuille px-8 py-3 text-sm font-bold uppercase tracking-wide text-feuille hover:bg-feuille hover:text-white"
          >
            Toutes nos recettes
          </Link>
        </div>
      </div>
    </section>
  );
}
