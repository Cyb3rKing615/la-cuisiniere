"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { products } from "@/lib/products";

export default function Header() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-creme/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="relative h-14 w-14 shrink-0"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/images/logo-la-cuisiniere-rouge.png"
            alt="La Cuisinière"
            fill
            priority
            className="object-contain"
            sizes="56px"
          />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold tracking-wide text-foreground md:flex">
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              className="flex items-center gap-1 py-2 hover:text-feuille"
              onClick={() => setProductsOpen((open) => !open)}
              aria-expanded={productsOpen}
            >
              Nos produits
              <span aria-hidden>▾</span>
            </button>
            {productsOpen && (
              <div className="absolute left-1/2 top-full w-64 -translate-x-1/2 rounded-2xl border border-black/5 bg-white p-3 shadow-xl">
                {products.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/nos-produits/${product.slug}`}
                    className="block rounded-xl px-4 py-2 text-foreground hover:bg-creme-deep hover:text-tomate"
                    onClick={() => setProductsOpen(false)}
                  >
                    {product.name}
                  </Link>
                ))}
                <Link
                  href="/nos-produits"
                  className="mt-1 block rounded-xl px-4 py-2 text-feuille hover:bg-creme-deep"
                  onClick={() => setProductsOpen(false)}
                >
                  Tous nos produits
                </Link>
              </div>
            )}
          </div>

          <Link href="/recettes" className="py-2 hover:text-feuille">
            Recettes
          </Link>
          <Link href="/notre-histoire" className="py-2 hover:text-feuille">
            Notre histoire
          </Link>
          <Link href="/ou-nous-trouver" className="py-2 hover:text-feuille">
            Où nous trouver
          </Link>
          <Link href="/contact" className="py-2 hover:text-feuille">
            Contact
          </Link>
        </nav>

        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label="Ouvrir le menu"
        >
          <span
            className={`h-0.5 w-6 bg-foreground transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-foreground transition-opacity ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-foreground transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-black/5 bg-creme px-4 pb-6 pt-2 text-base font-semibold md:hidden">
          <span className="pt-3 pb-1 text-xs uppercase tracking-wide text-foreground/50">
            Nos produits
          </span>
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/nos-produits/${product.slug}`}
              className="rounded-lg px-2 py-2 hover:bg-creme-deep hover:text-tomate"
              onClick={() => setMobileOpen(false)}
            >
              {product.name}
            </Link>
          ))}
          <Link
            href="/recettes"
            className="mt-2 rounded-lg px-2 py-2 hover:bg-creme-deep hover:text-tomate"
            onClick={() => setMobileOpen(false)}
          >
            Recettes
          </Link>
          <Link
            href="/notre-histoire"
            className="rounded-lg px-2 py-2 hover:bg-creme-deep hover:text-tomate"
            onClick={() => setMobileOpen(false)}
          >
            Notre histoire
          </Link>
          <Link
            href="/ou-nous-trouver"
            className="rounded-lg px-2 py-2 hover:bg-creme-deep hover:text-tomate"
            onClick={() => setMobileOpen(false)}
          >
            Où nous trouver
          </Link>
          <Link
            href="/contact"
            className="rounded-lg px-2 py-2 hover:bg-creme-deep hover:text-tomate"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
