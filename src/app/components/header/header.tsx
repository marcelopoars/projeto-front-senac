import Link from "next/link";

export function Header() {
  return (
    <header className="bg-sky-500">
      <div className="container flex items-center justify-between py-4 px-6">
        <h1 className="font-bold text-white text-xl">
          <span className="text-2xl">🗓️</span> Agendar
        </h1>

        <nav className="flex gap-3">
          <Link href="/login" className="text-sm rounded-lg py-2 px-3 md:text-base">
            Entrar
          </Link>
          <Link
            href="/login"
            className="bg-sky-800 text-sm  rounded-lg text-white py-2 px-3 md:text-base"
          >
            Cadastrar
          </Link>
        </nav>
      </div>
    </header>
  );
}
