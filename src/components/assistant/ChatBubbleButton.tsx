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
        className={`fixed bottom-3 right-3 z-50 h-20 w-16 transition-transform hover:scale-105 sm:bottom-4 sm:right-6 sm:h-44 sm:w-36 ${
          open ? "hidden" : "block"
        }`}
      >
        <span
          className="block h-full w-full"
          style={{
            animation:
              "mascotte-enter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both, mascotte-idle 3.2s ease-in-out 0.8s infinite",
          }}
        >
          <span
            className="relative block h-full w-full drop-shadow-[0_12px_18px_rgba(0,0,0,0.35)]"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 72%, transparent 96%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 72%, transparent 96%)",
            }}
          >
            <Image
              src="/images/mascotte-barbara.png"
              alt={ASSISTANT_NAME}
              fill
              className="object-cover object-[62%_0%]"
              sizes="(min-width: 640px) 144px, 96px"
              priority
            />
          </span>
        </span>
      </button>
    </>
  );
}
