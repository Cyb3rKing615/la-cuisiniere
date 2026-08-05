export type Feature = {
  icon: string;
  title: string;
  text: string;
};

export default function ThreeColumnFeatures({
  title,
  features,
}: {
  title: string;
  features: Feature[];
}) {
  return (
    <section className="bg-feuille py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-4xl sm:text-5xl">
          {title}
        </h2>
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <span className="text-5xl" aria-hidden>
                {feature.icon}
              </span>
              <h3 className="mt-4 font-display text-2xl">{feature.title}</h3>
              <p className="mt-2 text-base text-white/85">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
