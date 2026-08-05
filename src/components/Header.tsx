"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

const HERO_PATHS = ["/", "/notre-histoire", "/nos-produits"];

export type HeaderProduct = { name: string; slug: string };

export default function Header({ products }: { products: HeaderProduct[] }) {
  const pathname = usePathname();
  const [productsOpen, setProductsOpen] = useState(false);
  const [recettesOpen, setRecettesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hasHero = HERO_PATHS.includes(pathname);
  const transparent = hasHero && !scrolled;

  const linkColor = transparent
    ? "text-white hover:text-jaune"
    : "text-foreground hover:text-feuille";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        transparent
          ? "bg-transparent"
          : "border-b border-black/5 bg-creme/95 backdrop-blur"
      }`}
    >
      <div className="mx-auto grid h-28 max-w-7xl grid-cols-2 items-center px-4 sm:px-6 md:grid-cols-[1fr_auto_1fr] lg:px-8">
        {/* Mobile logo (left) */}
        <Link href="/" className="md:hidden" onClick={() => setMobileOpen(false)}>
          <Logo size={68} variant={transparent ? "plain" : "badge"} />
        </Link>

        {/* Desktop nav — left group */}
        <nav className={`hidden items-center gap-8 text-base font-semibold tracking-wide md:flex ${linkColor}`}>
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              className="flex items-center gap-1.5 py-2"
              onClick={() => setProductsOpen((open) => !open)}
              aria-expanded={productsOpen}
            >
              Nos produits
              <span aria-hidden>▾</span>
            </button>
            {productsOpen && (
              <div className="absolute left-0 top-full w-64 rounded-2xl border border-black/5 bg-white p-3 shadow-xl">
                {products.length === 0 && (
                  <p className="px-4 py-2 text-sm text-foreground/50">
                    Bientôt disponible
                  </p>
                )}
                {products.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/nos-produits/${product.slug}`}
                    className="block rounded-xl px-4 py-2 text-base text-foreground hover:bg-creme-deep hover:text-tomate"
                    onClick={() => setProductsOpen(false)}
                  >
                    {product.name}
                  </Link>
                ))}
                <Link
                  href="/nos-produits"
                  className="mt-1 block rounded-xl px-4 py-2 text-base text-feuille hover:bg-creme-deep"
                  onClick={() => setProductsOpen(false)}
                >
                  Tous nos produits
                </Link>
              </div>
            )}
          </div>
          <div
            className="relative"
            onMouseEnter={() => setRecettesOpen(true)}
            onMouseLeave={() => setRecettesOpen(false)}
          >
            <button
              className="flex items-center gap-1.5 py-2"
              onClick={() => setRecettesOpen((open) => !open)}
              aria-expanded={recettesOpen}
            >
              Recettes &amp; astuces
              <span aria-hidden>▾</span>
            </button>
            {recettesOpen && (
              <div className="absolute left-0 top-full w-56 rounded-2xl border border-black/5 bg-white p-3 shadow-xl">
                <Link
                  href="/recettes"
                  className="block rounded-xl px-4 py-2 text-base text-foreground hover:bg-creme-deep hover:text-tomate"
                  onClick={() => setRecettesOpen(false)}
                >
                  Nos recettes
                </Link>
                <Link
                  href="/astuces"
                  className="block rounded-xl px-4 py-2 text-base text-foreground hover:bg-creme-deep hover:text-tomate"
                  onClick={() => setRecettesOpen(false)}
                >
                  Nos astuces
                </Link>
              </div>
            )}
          </div>
          <Link href="/professionnels" className="py-2">
            Professionnels
          </Link>
        </nav>

        {/* Desktop centered logo */}
        <Link
          href="/"
          className="hidden justify-self-center md:block"
          onClick={() => setMobileOpen(false)}
        >
          <Logo size={100} variant={transparent ? "plain" : "badge"} />
        </Link>

        {/* Desktop nav — right group */}
        <nav
          className={`hidden items-center justify-end gap-8 text-base font-semibold tracking-wide md:flex ${linkColor}`}
        >
          <Link href="/notre-histoire" className="py-2">
            Notre histoire
          </Link>
          <Link href="/ou-nous-trouver" className="py-2">
            Où nous trouver
          </Link>
          <Link href="/contact" className="py-2">
            Contact
          </Link>
        </nav>

        {/* Mobile burger (right) */}
        <button
          className="flex h-10 w-10 flex-col items-center justify-center justify-self-end gap-1.5 md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label="Ouvrir le menu"
        >
          <span
            className={`h-0.5 w-6 transition-transform ${transparent ? "bg-white" : "bg-foreground"} ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 transition-opacity ${transparent ? "bg-white" : "bg-foreground"} ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 transition-transform ${transparent ? "bg-white" : "bg-foreground"} ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-black/5 bg-creme px-4 pb-6 pt-2 text-base font-semibold text-foreground md:hidden">
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
          <span className="pt-3 pb-1 text-xs uppercase tracking-wide text-foreground/50">
            Recettes &amp; astuces
          </span>
          <Link
            href="/recettes"
            className="rounded-lg px-2 py-2 hover:bg-creme-deep hover:text-tomate"
            onClick={() => setMobileOpen(false)}
          >
            Nos recettes
          </Link>
          <Link
            href="/astuces"
            className="rounded-lg px-2 py-2 hover:bg-creme-deep hover:text-tomate"
            onClick={() => setMobileOpen(false)}
          >
            Nos astuces
          </Link>
          <Link
            href="/professionnels"
            className="mt-2 rounded-lg px-2 py-2 hover:bg-creme-deep hover:text-tomate"
            onClick={() => setMobileOpen(false)}
          >
            Professionnels
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
