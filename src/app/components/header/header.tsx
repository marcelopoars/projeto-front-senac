import Link from "next/link";

export function Header() {
  return (
    <header className="bg-sky-500">
      <div className="container flex items-center justify-between py-4 px-6">
        <h1 className="font-bold text-white text-2xl">
          <span className="text-3xl">🗓️</span> Agendar
        </h1>

        <nav className="flex gap-4">
          <Link href="/login" className="rounded-lg py-2 px-4">
            Entrar
          </Link>
          <Link
            href="/login"
            className="bg-sky-800 rounded-lg text-white py-2 px-4"
          >
            Cadastrar
          </Link>
        </nav>
      </div>
    </header>
  );
}
