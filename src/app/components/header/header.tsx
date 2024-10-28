import Link from "next/link";

export function Header() {
  return (
    <header className="bg-slate-300">
      <div className="container flex justify-between p-6">
        <h1>LOGO do App</h1>

        <nav className="flex gap-4">
          <Link href="/login" className="rounded-lg p-2">
            Entrar
          </Link>
          <Link href="/login" className="bg-gray-600 rounded-lg text-white p-2">
            Cadastrar
          </Link>
        </nav>
      </div>
    </header>
  );
}
