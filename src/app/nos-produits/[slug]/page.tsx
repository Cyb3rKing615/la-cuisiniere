import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import ReassuranceBadges from "@/components/ReassuranceBadges";
import { getProductBySlug, products } from "@/lib/products";
import { recipes } from "@/lib/recipes";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | La Cuisinière`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedRecipes = recipes.filter((recipe) =>
    recipe.relatedProductSlugs.includes(product.slug),
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
          <Image
            src={product.packshot}
            alt={product.name}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-tomate">
            {product.category}
          </span>
          <h1 className="mt-2 font-display text-5xl text-foreground">
            {product.name}
          </h1>
          <p className="mt-4 text-foreground/80">{product.description}</p>
          <p className="mt-4 text-sm font-semibold text-foreground/60">
            Format : {product.weight}
          </p>
          <div className="mt-6">
            <ReassuranceBadges />
          </div>
          <a
            href="https://wa.me/22900000000"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 w-fit rounded-full bg-tomate px-8 py-4 text-sm font-bold uppercase tracking-wide text-white hover:bg-tomate-dark"
          >
            Commandez sur WhatsApp
          </a>
        </div>
      </section>

      <section className="bg-creme-deep py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-feuille sm:text-4xl">
            Du champ à l&apos;assiette
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {product.keyPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-2xl bg-white p-5"
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-feuille text-xs text-white"
                  aria-hidden
                >
                  ✓
                </span>
                <span className="text-sm text-foreground/80">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl text-foreground sm:text-4xl">
          Mode de cuisson
        </h2>
        <div className="mt-8 grid gap-10 sm:grid-cols-2">
          {product.cookingMethods.map((method) => (
            <div key={method.label}>
              <h3 className="font-display text-xl text-tomate">
                {method.label}
              </h3>
              <ol className="mt-4 space-y-4">
                {method.steps.map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-feuille text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-sm text-foreground/80">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {relatedRecipes.length > 0 && (
        <section className="bg-creme-deep py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl text-foreground sm:text-4xl">
              Recettes avec ce produit
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedRecipes.map((recipe) => (
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
      )}
    </>
  );
}
