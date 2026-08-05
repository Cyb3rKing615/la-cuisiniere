import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import NotionBlocks from "@/components/notion/NotionBlocks";
import RecipeCard from "@/components/RecipeCard";
import {
  getTipBySlug,
  getPublishedTips,
  getPublishedRecipes,
} from "@/lib/notion";

export async function generateStaticParams() {
  const tips = await getPublishedTips();
  return tips.map((tip) => ({ slug: tip.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getTipBySlug(slug);
  if (!result) return {};
  return {
    title: `${result.tip.title} | La Cuisinière`,
    description: result.tip.excerpt || undefined,
  };
}

export default async function AstucePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getTipBySlug(slug);
  if (!result) notFound();
  const { tip, blocks } = result;

  const allRecipes = await getPublishedRecipes();
  const relatedRecipes = allRecipes.filter((r) =>
    tip.relatedRecipeIds.includes(r.id),
  );

  return (
    <>
      <section className="relative -mt-28 flex h-[460px] items-end overflow-hidden">
        {tip.cover && (
          <Image
            src={tip.cover}
            alt={tip.title}
            fill
            unoptimized
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
        <div className="relative z-10 w-full px-6 pb-12 sm:px-12">
          <div className="text-white/80">
            <Breadcrumb
              items={[
                { label: "Accueil", href: "/" },
                { label: "Nos astuces", href: "/astuces" },
                { label: tip.title },
              ]}
            />
          </div>
          {tip.category && (
            <span className="mt-4 inline-block rounded-full bg-jaune px-4 py-1 text-xs font-bold uppercase tracking-wide text-foreground">
              {tip.category}
            </span>
          )}
          <h1 className="mt-4 font-display text-4xl text-white sm:text-5xl">
            {tip.title}
          </h1>
          {tip.excerpt && (
            <p className="mt-3 max-w-2xl text-lg text-white/90">{tip.excerpt}</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <NotionBlocks blocks={blocks} />
      </section>

      {relatedRecipes.length > 0 && (
        <section className="bg-creme-deep py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl text-foreground sm:text-4xl">
              Découvrez aussi
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
