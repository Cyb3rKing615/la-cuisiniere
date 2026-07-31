import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

const socialLinks = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-feuille-dark text-creme">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl text-white">La Cuisinière</p>
            <p className="mt-3 max-w-xs text-sm text-creme/80">
              La tomate béninoise, toute l&apos;année. Fabriqué à Cotonou,
              Bénin. Produits homologués ABSSA.
            </p>
            <div className="mt-5 flex gap-4 text-sm font-semibold">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="rounded-full border border-creme/30 px-4 py-1.5 hover:border-jaune hover:text-jaune"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-creme/50">
              Nos produits
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/nos-produits/${product.slug}`}
                    className="hover:text-jaune"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-creme/50">
              Découvrir
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/recettes" className="hover:text-jaune">
                  Nos recettes
                </Link>
              </li>
              <li>
                <Link href="/notre-histoire" className="hover:text-jaune">
                  Notre histoire
                </Link>
              </li>
              <li>
                <Link href="/ou-nous-trouver" className="hover:text-jaune">
                  Où nous trouver
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-jaune">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-creme/50">
              Qualité &amp; confiance
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className="relative h-10 w-20 overflow-hidden rounded bg-white/90 p-1">
                  <Image
                    src="/images/logo_abssa.jpg"
                    alt="Logo ABSSA"
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
                <span className="text-[10px] text-creme/60">
                  Homologué ABSSA
                </span>
              </div>
              <div className="relative h-10 w-20 overflow-hidden rounded bg-white/90 p-1">
                <Image
                  src="/images/logo_benibiz.jpg"
                  alt="Logo Benibiz"
                  fill
                  className="object-contain"
                  sizes="80px"
                />
              </div>
              <div className="relative h-14 w-14 overflow-hidden rounded">
                <Image
                  src="/images/moisduconsommonslocal.png"
                  alt="Badge campagne Consommons local"
                  fill
                  className="object-contain"
                  sizes="56px"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-creme/15 pt-6 text-xs text-creme/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} La Cuisinière — Fabriqué à Cotonou,
            Bénin.
          </p>
          <p>Site conçu par Novavox</p>
        </div>
      </div>
    </footer>
  );
}
