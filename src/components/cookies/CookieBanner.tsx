"use client";

import Link from "next/link";
import { useCookieConsent } from "./CookieConsentProvider";

export default function CookieBanner() {
  const { bannerVisible, accept, refuse } = useCookieConsent();

  if (!bannerVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Gestion des cookies"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-black/10 bg-white px-4 py-5 shadow-[0_-8px_24px_rgba(0,0,0,0.12)] sm:px-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-xl text-feuille-dark">Cookies</p>
          <p className="mt-1 text-sm text-foreground/75">
            Nous utilisons Google Analytics pour mesurer la fréquentation de
            notre site (nombre de visites, pages consultées) et mieux
            comprendre comment nos visiteurs utilisent le site. Ces données
            sont traitées par Google, y compris hors du Bénin. Vous pouvez
            accepter ou refuser ce suivi&nbsp;; votre choix reste modifiable
            à tout moment en cliquant sur «&nbsp;Cookies&nbsp;» en bas de
            chaque page. Pour en savoir plus, consultez notre{" "}
            <Link
              href="/politique-de-confidentialite"
              className="underline hover:no-underline"
            >
              Politique de confidentialité
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={refuse}
            className="flex-1 rounded-full bg-black/10 px-6 py-3 text-sm font-bold uppercase tracking-wide text-foreground hover:bg-black/15 sm:flex-none"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={accept}
            className="flex-1 rounded-full bg-feuille-dark px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-feuille sm:flex-none"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
