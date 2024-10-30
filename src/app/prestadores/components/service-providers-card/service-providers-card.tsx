import Image from "next/image";
import Link from "next/link";

interface ServiceProviderProps {
  name: string;
  image: string;
}

export function ServiceProvidersCard({ image, name }: ServiceProviderProps) {
  return (
    <Link
      href="/prestador"
      className="group inline-block border rounded-lg overflow-hidden w-full hover:border-sky-500 transition"
    >
      <Image
        src={image}
        alt={name}
        width={150}
        height={200}
        className="w-full h-[200px] object-cover group-hover:opacity-80 transition"
      />
      <header className="py-2 px-4">
        <h2 className="font-semibold text-xl text-zinc-600 group-hover:text-sky-500 transition">
          {name}
        </h2>
      </header>
    </Link>
  );
}
