import { User } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

interface ServiceProviderProps {
  name: string;
  role: string;
}

export function ServiceProvidersCard({ name, role }: ServiceProviderProps) {
  return (
    <Link
      href="/prestador"
      className="group inline-block border rounded-lg overflow-hidden w-full hover:border-sky-500 transition"
    >
      <div className="w-full h-[200px] bg-zinc-100 flex items-center justify-center group-hover:opacity-80 transition">
        <User className="size-24 text-sky-500" />
      </div>
      <header className="py-2 px-4">
        <h2 className="font-semibold text-xl text-zinc-600 group-hover:text-sky-500 transition">
          {name}
        </h2>
        <strong className="text-sky-500">{role}</strong>
      </header>
    </Link>
  );
}
