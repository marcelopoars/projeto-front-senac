import Link from "next/link";

export function Header() {
  return (
    <header className="bg-sky-500">
      <div className="container flex items-center justify-between py-4 px-6">
        <Link href={"/"} className="font-bold text-white text-xl">
          <span className="text-2xl">🗓️</span> Agendar
        </Link>

        <nav className="flex gap-3">
          <Link
            href="/login"
            className="text-sm font-semibold rounded-lg py-2 px-3 md:text-base underline underline-offset-4"
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="bg-sky-900 text-sm rounded-lg text-white py-2 px-3 md:text-base hover:bg-sky-950 transition"
          >
            Cadastrar
          </Link>
        </nav>
      </div>
    </header>
  );
}
