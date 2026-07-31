import type { Metadata } from "next";
import { Lobster, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${lobster.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
