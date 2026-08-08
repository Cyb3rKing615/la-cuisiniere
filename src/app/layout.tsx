import type { Metadata } from "next";
import { Lobster, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinUs from "@/components/home/JoinUs";
import ChatBubbleButton from "@/components/assistant/ChatBubbleButton";
import { CookieConsentProvider } from "@/components/cookies/CookieConsentProvider";
import CookieBanner from "@/components/cookies/CookieBanner";
import GoogleAnalytics from "@/components/cookies/GoogleAnalytics";
import { getPublishedProducts } from "@/lib/notion";
import "./globals.css";

const lobster = Lobster({
  variable: "--font-lobster",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La Cuisinière — La tomate béninoise, toute l'année",
  description:
    "La Cuisinière transforme la tomate locale en sauces et purées prêtes à l'emploi. Fabriqué à Cotonou, Bénin.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await getPublishedProducts();
  const headerProducts = products.map((p) => ({ name: p.name, slug: p.slug }));

  return (
    <html
      lang="fr"
      className={`${lobster.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <CookieConsentProvider>
          <Header products={headerProducts} />
          <main className="flex-1 pt-28">{children}</main>
          <JoinUs />
          <Footer />
          <ChatBubbleButton products={headerProducts} />
          <CookieBanner />
          <GoogleAnalytics />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
