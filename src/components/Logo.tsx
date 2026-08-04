import Image from "next/image";

export default function Logo({ size = 64 }: { size?: number }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-2xl bg-tomate shadow-md"
      style={{ height: size, width: size }}
    >
      <Image
        src="/images/logo-la-cuisiniere-dore.png"
        alt="La Cuisinière"
        fill
        priority
        className="object-contain p-2"
        sizes={`${size}px`}
      />
    </div>
  );
}
