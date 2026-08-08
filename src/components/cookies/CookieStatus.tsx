"use client";

import { useCookieConsent } from "./CookieConsentProvider";

export default function CookieStatus() {
  const { consent, openBanner } = useCookieConsent();

  const label =
    consent === "accepted"
      ? "Accepté"
      : consent === "refused"
        ? "Refusé"
        : "Pas encore choisi";

  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl border border-feuille/20 bg-creme-deep p-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-base text-foreground">
        Statut actuel&nbsp;: <strong>{label}</strong>
      </p>
      <button
        type="button"
        onClick={openBanner}
        className="rounded-full bg-feuille-dark px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-feuille"
      >
        Modifier mon choix
      </button>
    </div>
  );
}
