"use server";

import { notion, DATA_SOURCES } from "@/lib/notion";

export type ProContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

const ACTIVITES = ["Supermarché", "Restaurant", "Hôtel", "Autre"];

export async function submitProContact(
  _prevState: ProContactState,
  formData: FormData,
): Promise<ProContactState> {
  const entreprise = String(formData.get("entreprise") ?? "").trim();
  const nom = String(formData.get("nom") ?? "").trim();
  const activite = String(formData.get("activite") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const telephone = String(formData.get("telephone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!entreprise || !nom || (!email && !telephone)) {
    return {
      status: "error",
      message:
        "Merci de renseigner au moins votre nom, votre entreprise et un email ou téléphone.",
    };
  }

  try {
    await notion.pages.create({
      parent: { data_source_id: DATA_SOURCES.demandesPro },
      properties: {
        Entreprise: { title: [{ text: { content: entreprise } }] },
        "Nom du contact": { rich_text: [{ text: { content: nom } }] },
        ...(ACTIVITES.includes(activite)
          ? { "Type d'activité": { select: { name: activite } } }
          : {}),
        ...(email ? { Email: { email } } : {}),
        ...(telephone ? { Téléphone: { phone_number: telephone } } : {}),
        ...(message
          ? { Message: { rich_text: [{ text: { content: message } }] } }
          : {}),
        Statut: { select: { name: "Nouveau" } },
      },
    });
    return {
      status: "success",
      message:
        "Merci ! Votre demande a bien été envoyée, nous vous répondrons rapidement.",
    };
  } catch (error) {
    console.error("submitProContact failed", error);
    return {
      status: "error",
      message:
        "Une erreur est survenue lors de l'envoi. Vous pouvez aussi nous écrire directement sur WhatsApp.",
    };
  }
}
