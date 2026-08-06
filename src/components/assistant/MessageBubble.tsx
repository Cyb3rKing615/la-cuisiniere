export default function MessageBubble({
  from,
  children,
}: {
  from: "assistant" | "user";
  children: React.ReactNode;
}) {
  const isAssistant = from === "assistant";
  return (
    <div className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isAssistant
            ? "rounded-bl-sm bg-creme-deep text-foreground"
            : "rounded-br-sm bg-feuille text-white"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
