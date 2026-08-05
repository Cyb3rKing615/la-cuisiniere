import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import { IconFacebook, IconInstagram, IconTiktok } from "@/components/icons";
import { getPublishedProducts } from "@/lib/notion";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/lysdelamadoneagro",
    icon: IconFacebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/lysdelamadoneagro",
    icon: IconInstagram,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@lysdelamadoneagro",
    icon: IconTiktok,
  },
];

export default async function Footer() {
  const products = await getPublishedProducts();
  return (
    <footer className="bg-feuille-dark text-creme">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo size={92} />
            <p className="mt-4 max-w-xs text-base text-creme/80">
              La tomate béninoise, toute l&apos;année. Fabriqué à Cotonou,
              Bénin. Produits homologués ABSSA.
            </p>
            <div className="mt-5 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-creme/30 text-creme hover:border-jaune hover:text-jaune"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-creme/50">
              Nos produits
            </p>
            <ul className="mt-4 space-y-2.5 text-base">
              {products.length === 0 && (
                <li className="text-creme/50">Bientôt disponible</li>
              )}
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
            <p className="text-sm font-semibold uppercase tracking-wide text-creme/50">
              Découvrir
            </p>
            <ul className="mt-4 space-y-2.5 text-base">
              <li>
                <Link href="/recettes" className="hover:text-jaune">
                  Nos recettes
                </Link>
              </li>
              <li>
                <Link href="/astuces" className="hover:text-jaune">
                  Nos astuces
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
              <li>
                <Link href="/professionnels" className="hover:text-jaune">
                  Espace pro
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-creme/50">
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

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-creme/15 pt-6 text-sm text-creme/60 sm:flex-row">
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
