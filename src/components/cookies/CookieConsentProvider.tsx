"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  CONSENT_COOKIE_MAX_AGE_SECONDS,
  CONSENT_COOKIE_NAME,
  isConsentValue,
  type ConsentValue,
} from "@/lib/cookieConsent";

type CookieConsentContextValue = {
  consent: ConsentValue | null;
  bannerVisible: boolean;
  accept: () => void;
  refuse: () => void;
  openBanner: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function persist(value: ConsentValue) {
  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; path=/; max-age=${CONSENT_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
}

function readStoredConsent(): ConsentValue | null {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE_NAME}=`));
  const value = match?.split("=")[1];
  return isConsentValue(value) ? value : null;
}

// La lecture du cookie se fait côté client (et non via next/headers côté
// serveur) pour que le layout racine reste statiquement pré-rendu — lire
// les cookies dans un composant serveur forcerait tout le site en rendu
// dynamique à chaque requête.
export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentValue | null>(null);
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    setConsent(stored);
    setBannerVisible(stored === null);
  }, []);

  const accept = useCallback(() => {
    persist("accepted");
    setConsent("accepted");
    setBannerVisible(false);
  }, []);

  const refuse = useCallback(() => {
    persist("refused");
    setConsent("refused");
    setBannerVisible(false);
  }, []);

  const openBanner = useCallback(() => setBannerVisible(true), []);

  return (
    <CookieConsentContext.Provider
      value={{ consent, bannerVisible, accept, refuse, openBanner }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent doit être utilisé sous CookieConsentProvider");
  }
  return ctx;
}
