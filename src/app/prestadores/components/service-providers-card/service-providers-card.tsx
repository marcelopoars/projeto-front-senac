import Link from "next/link";

interface ServiceProviderProps {
  name: string;
  image: string;
}

export function ServiceProvidersCard({ name }: ServiceProviderProps) {
  return (
    <Link
      href="/prestador"
      className="group inline-block border rounded-lg overflow-hidden w-full hover:border-sky-500 transition"
    >
      <div className="w-full h-[200px] bg-zinc-200 flex items-center justify-center group-hover:opacity-80 transition">
        LOGO
      </div>
      <header className="py-2 px-4">
        <h2 className="font-semibold text-xl text-zinc-600 group-hover:text-sky-500 transition">
          {name}
        </h2>
      </header>
    </Link>
  );
}
