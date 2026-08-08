import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import NotionBlocks from "@/components/notion/NotionBlocks";
import ReassuranceBadges from "@/components/ReassuranceBadges";
import RecipeCard from "@/components/RecipeCard";
import {
  getProductBySlug,
  getPublishedProducts,
  getPublishedRecipes,
} from "@/lib/notion";
import { formatFCFA } from "@/lib/format";

export async function generateStaticParams() {
  const products = await getPublishedProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getProductBySlug(slug);
  if (!result) return {};
  return {
    title: `${result.product.name} | La Cuisinière`,
    description: result.product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getProductBySlug(slug);
  if (!result) notFound();
  const { product, blocks } = result;

  const allRecipes = await getPublishedRecipes();
  const relatedRecipes = allRecipes.filter((r) =>
    product.relatedRecipeIds.includes(r.id),
  );

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Nos produits", href: "/nos-produits" },
            { label: product.name },
          ]}
        />
      </div>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-creme-deep">
          {product.packshot && (
            <Image
              src={product.packshot}
              alt={product.name}
              fill
              unoptimized
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          )}
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-tomate">
            {product.category}
          </span>
          <h1 className="mt-2 font-display text-5xl text-foreground">
            {product.name}
          </h1>
          {product.description && (
            <p className="mt-4 text-lg text-foreground/80">{product.description}</p>
          )}
          {product.weights.length > 0 && (
            <div className="mt-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-foreground/45">
                {product.weights.length > 1 ? "Formats disponibles" : "Format"}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.weights.map((w, i) => (
                  <span
                    key={w}
                    className="rounded-full border-2 border-feuille/30 px-4 py-1.5 text-sm font-semibold text-feuille-dark"
                  >
                    {w}
                    {product.prices[i] !== undefined && (
                      <span className="ml-2 text-tomate">
                        {formatFCFA(product.prices[i])}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="mt-6">
            <ReassuranceBadges />
          </div>
          <a
            href="https://wa.me/22969983030"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 w-fit rounded-full bg-tomate px-8 py-4 text-base font-bold uppercase tracking-wide text-white hover:bg-tomate-dark"
          >
            Commandez sur WhatsApp
          </a>
        </div>
      </section>

      {blocks.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <NotionBlocks blocks={blocks} />
        </section>
      )}

      {relatedRecipes.length > 0 && (
        <section className="bg-creme-deep py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl text-foreground sm:text-4xl">
              Recettes avec ce produit
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedRecipes.map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
