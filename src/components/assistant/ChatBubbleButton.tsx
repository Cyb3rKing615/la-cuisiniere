"use client";

import { useState } from "react";
import Image from "next/image";
import ChatWindow from "./ChatWindow";
import { ASSISTANT_NAME } from "@/lib/assistant/quick-replies";

export default function ChatBubbleButton({
  products,
}: {
  products: { name: string; slug: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ChatWindow products={products} onClose={() => setOpen(false)} />}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? `Fermer la conversation avec ${ASSISTANT_NAME}` : `Discuter avec ${ASSISTANT_NAME}`}
        aria-expanded={open}
        className={`fixed bottom-5 right-5 z-50 h-16 w-16 rounded-full border-4 border-white shadow-xl transition-transform hover:scale-105 sm:bottom-6 sm:right-6 ${
          open ? "hidden" : "block"
        }`}
      >
        <span className="relative block h-full w-full overflow-hidden rounded-full">
          <Image
            src="/images/mascotte-barbara.png"
            alt={ASSISTANT_NAME}
            fill
            className="object-cover object-top"
            sizes="64px"
          />
        </span>
      </button>
    </>
  );
}
