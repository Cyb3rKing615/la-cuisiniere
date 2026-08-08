"use client";

import Script from "next/script";
import { useCookieConsent } from "./CookieConsentProvider";

// A renseigner dans les variables d'environnement (Vercel + .env.local)
// une fois le compte Google Analytics 4 créé : NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXX
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  const { consent } = useCookieConsent();

  // Tant que le visiteur n'a pas cliqué sur "Accepter", ce composant ne
  // rend rien : aucune balise <script> n'existe dans le DOM, donc aucune
  // requête vers googletagmanager.com/google-analytics.com ne part.
  if (consent !== "accepted" || !GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
