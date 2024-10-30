import Image from "next/image";

interface ServiceProviderProps {
  name: string;
  image: string;
}

export function ServiceProvidersCard({ image, name }: ServiceProviderProps) {
  return (
    <article className="border rounded-lg overflow-hidden">
      <Image
        src={image}
        alt={name}
        width={150}
        height={150}
        className="w-full h-auto object-cover"
      />
      <header className="py-2 px-4">
        <h2 className="font-semibold text-xl text-zinc-600">{name}</h2>
      </header>
    </article>
  );
}
