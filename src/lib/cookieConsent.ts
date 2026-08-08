export const CONSENT_COOKIE_NAME = "cookie_consent";
export const CONSENT_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 12 mois

export type ConsentValue = "accepted" | "refused";

export function isConsentValue(value: string | undefined): value is ConsentValue {
  return value === "accepted" || value === "refused";
}
