import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import NotionBlocks from "@/components/notion/NotionBlocks";
import RecipeActions from "@/components/RecipeActions";
import TipCard from "@/components/TipCard";
import {
  getRecipeBySlug,
  getPublishedRecipes,
  getPublishedProducts,
  getPublishedTips,
} from "@/lib/notion";

export async function generateStaticParams() {
  const recipes = await getPublishedRecipes();
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getRecipeBySlug(slug);
  if (!result) return {};
  return { title: `${result.recipe.title} | La Cuisinière` };
}

export default async function RecettePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getRecipeBySlug(slug);
  if (!result) notFound();
  const { recipe, blocks } = result;

  const [allProducts, allTips] = await Promise.all([
    getPublishedProducts(),
    getPublishedTips(),
  ]);
  const relatedProducts = allProducts.filter((p) =>
    recipe.relatedProductIds.includes(p.id),
  );
  const relatedTips = allTips.filter((t) =>
    recipe.relatedTipIds.includes(t.id),
  );

  const meta = [recipe.difficulty, recipe.prepTimeMinutes ? `${recipe.prepTimeMinutes} min` : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Nos recettes", href: "/recettes" },
            { label: recipe.title },
          ]}
        />
      </div>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-creme-deep">
          {recipe.photo && (
            <Image
              src={recipe.photo}
              alt={recipe.title}
              fill
              unoptimized
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          )}
        </div>
        <div className="flex flex-col justify-center">
          {meta && (
            <span className="text-sm font-semibold uppercase tracking-wide text-tomate">
              {meta}
            </span>
          )}
          <h1 className="mt-2 font-display text-5xl text-foreground">
            {recipe.title}
          </h1>
          {recipe.servings && (
            <p className="mt-4 text-base font-semibold text-foreground/60">
              Pour {recipe.servings} personnes
            </p>
          )}
          <div className="mt-8">
            <RecipeActions title={recipe.title} />
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="bg-creme-deep py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl text-foreground sm:text-4xl">
              Les produits qu&apos;il vous faut
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((product) => (
                <Link
                  key={product.slug}
                  href={`/nos-produits/${product.slug}`}
                  className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow hover:shadow-xl"
                >
                  <div className="relative aspect-square bg-creme-deep">
                    {product.packshot && (
                      <Image
                        src={product.packshot}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(min-width: 1024px) 20vw, 40vw"
                      />
                    )}
                  </div>
                  <p className="p-3 text-base font-semibold text-foreground">
                    {product.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {blocks.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <NotionBlocks blocks={blocks} />
        </section>
      )}

      {relatedTips.length > 0 && (
        <section className="bg-creme-deep py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl text-foreground sm:text-4xl">
              Découvrez aussi
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedTips.map((tip) => (
                <TipCard key={tip.slug} tip={tip} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
