import Image from "next/image";
import Link from "next/link";
import { getPublishedProducts } from "@/lib/notion";

export default async function ProductsShowcase() {
  const products = await getPublishedProducts();
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl text-feuille sm:text-5xl">
          Découvrez nos produits
        </h2>
        <p className="mt-4 text-lg text-foreground/70">
          Des références pensées pour cuisiner simple, local et généreux,
          toute l&apos;année.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
              <h3 className="font-display text-xl text-foreground">
                {product.name}
              </h3>
              <p className="mt-auto text-base text-foreground/60">
                {product.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
