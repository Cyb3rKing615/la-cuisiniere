"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitProContact, type ProContactState } from "./actions";

const initialState: ProContactState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-feuille-dark px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-feuille disabled:opacity-60"
    >
      {pending ? "Envoi en cours…" : "Envoyer la demande"}
    </button>
  );
}

export default function ProContactForm() {
  const [state, formAction] = useActionState(submitProContact, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-3xl border-2 border-feuille bg-feuille/5 p-8 text-center">
        <p className="font-display text-2xl text-feuille-dark">Merci !</p>
        <p className="mt-2 text-base text-foreground/70">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="entreprise"
            className="text-sm font-semibold text-foreground/70"
          >
            Entreprise *
          </label>
          <input
            id="entreprise"
            name="entreprise"
            required
            className="mt-1.5 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base text-foreground focus:border-feuille focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="nom"
            className="text-sm font-semibold text-foreground/70"
          >
            Votre nom *
          </label>
          <input
            id="nom"
            name="nom"
            required
            className="mt-1.5 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base text-foreground focus:border-feuille focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="activite"
          className="text-sm font-semibold text-foreground/70"
        >
          Type d&apos;activité
        </label>
        <select
          id="activite"
          name="activite"
          defaultValue="Supermarché"
          className="mt-1.5 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base text-foreground focus:border-feuille focus:outline-none"
        >
          <option value="Supermarché">Supermarché / alimentation</option>
          <option value="Restaurant">Restaurant</option>
          <option value="Hôtel">Hôtel</option>
          <option value="Autre">Autre</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="email"
            className="text-sm font-semibold text-foreground/70"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1.5 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base text-foreground focus:border-feuille focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="telephone"
            className="text-sm font-semibold text-foreground/70"
          >
            Téléphone
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            className="mt-1.5 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base text-foreground focus:border-feuille focus:outline-none"
          />
        </div>
      </div>
      <p className="text-sm text-foreground/50">
        Renseignez au moins un email ou un téléphone.
      </p>

      <div>
        <label
          htmlFor="message"
          className="text-sm font-semibold text-foreground/70"
        >
          Votre message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="mt-1.5 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base text-foreground focus:border-feuille focus:outline-none"
        />
      </div>

      {state.status === "error" && (
        <p className="text-sm font-semibold text-tomate" role="alert">
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
