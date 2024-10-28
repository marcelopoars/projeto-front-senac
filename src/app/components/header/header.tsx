import Link from "next/link";

export function Header() {
  return (
    <header className="bg-slate-300">
      <div className="container flex items-center justify-between py-4 px-6">
        <h1 className="font-bold">LOGO do App</h1>

        <nav className="flex gap-4">
          <Link href="/login" className="rounded-lg py-2 px-4">
            Entrar
          </Link>
          <Link href="/login" className="bg-gray-600 rounded-lg text-white py-2 px-4">
            Cadastrar
          </Link>
        </nav>
      </div>
    </header>
  );
}
