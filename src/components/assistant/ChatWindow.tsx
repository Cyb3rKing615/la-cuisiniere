"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import MessageBubble from "./MessageBubble";
import QuickReplies, { type QuickReplyOption } from "./QuickReplies";
import { IconWhatsapp } from "@/components/icons";
import {
  ASSISTANT_NAME,
  BACK_TO_MAIN_MESSAGE,
  HUMAN_CONTACT_LABEL,
  HUMAN_CONTACT_WHATSAPP_MESSAGE,
  PRODUCTS_MENU_MESSAGE,
  WELCOME_MESSAGE,
  whatsappHref,
} from "@/lib/assistant/quick-replies";

type ChatMessage = { id: number; from: "assistant" | "user"; text: string };
type Menu = "main" | "products";

export default function ChatWindow({
  products,
  onClose,
}: {
  products: { name: string; slug: string }[];
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, from: "assistant", text: WELCOME_MESSAGE },
  ]);
  const [menu, setMenu] = useState<Menu>("main");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function pushMessage(from: ChatMessage["from"], text: string) {
    setMessages((current) => [...current, { id: current.length, from, text }]);
  }

  function openProductsMenu() {
    pushMessage("user", "Voir nos produits");
    pushMessage("assistant", PRODUCTS_MENU_MESSAGE);
    setMenu("products");
  }

  function backToMain() {
    pushMessage("user", "← Retour");
    pushMessage("assistant", BACK_TO_MAIN_MESSAGE);
    setMenu("main");
  }

  const mainOptions: QuickReplyOption[] = [
    { label: "Voir nos produits", onClick: openProductsMenu },
    { label: "Découvrir une recette", href: "/recettes", onClick: onClose },
    { label: "Où nous trouver", href: "/ou-nous-trouver", onClick: onClose },
    {
      label: "Nous contacter",
      href: whatsappHref(HUMAN_CONTACT_WHATSAPP_MESSAGE),
      external: true,
    },
  ];

  const productOptions: QuickReplyOption[] = [
    ...products.map((product) => ({
      label: product.name,
      href: `/nos-produits/${product.slug}`,
      onClick: onClose,
    })),
    { label: "← Retour", onClick: backToMain },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex h-[85vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[32rem] sm:w-96 sm:rounded-3xl">
      <div className="flex items-center gap-3 bg-feuille px-4 py-3 text-white">
        <span className="relative block h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-white/40">
          <Image
            src="/images/mascotte-barbara.png"
            alt={ASSISTANT_NAME}
            fill
            className="object-cover object-top"
            sizes="40px"
          />
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold">{ASSISTANT_NAME}</p>
          <p className="text-xs text-white/80">La Cuisinière</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la conversation"
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/15"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} from={message.from}>
            {message.text}
          </MessageBubble>
        ))}
      </div>

      <div className="space-y-3 border-t border-black/5 px-4 py-3">
        <QuickReplies options={menu === "main" ? mainOptions : productOptions} />
        <a
          href={whatsappHref(HUMAN_CONTACT_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-feuille py-2.5 text-sm font-semibold text-white transition-colors hover:bg-feuille-dark"
        >
          <IconWhatsapp className="h-4 w-4" />
          {HUMAN_CONTACT_LABEL}
        </a>
      </div>
    </div>
  );
}
