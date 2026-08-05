import Image from "next/image";

export default function Logo({
  size = 64,
  variant = "badge",
}: {
  size?: number;
  variant?: "badge" | "plain";
}) {
  return (
    <div
      className={
        variant === "badge"
          ? "relative shrink-0 overflow-hidden rounded-2xl bg-tomate shadow-md"
          : "relative shrink-0"
      }
      style={{ height: size, width: size }}
    >
      <Image
        src="/images/logo-la-cuisiniere-dore.png"
        alt="La Cuisinière"
        fill
        priority
        className={variant === "badge" ? "object-contain p-2" : "object-contain"}
        sizes={`${size}px`}
      />
    </div>
  );
}
