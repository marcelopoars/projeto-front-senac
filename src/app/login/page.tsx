import Link from "next/link";

export default function Home() {
  return (
    <section className="flex h-full">
      <div className="bg-gray-300 flex-1 flex items-center justify-center">
        IMAGEM
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div>
          <h1 className="text-center font-semibold mb-5">Login</h1>
          <form className="flex gap-5 flex-col">
            <input
              type="email"
              placeholder="Email"
              className="border p-3 rounded-lg"
            />
            <input
              type="password"
              placeholder="Senha"
              className="border p-3 rounded-lg"
            />
            <Link
              href={"/"}
              className="bg-sky-500 p-3 rounded-lg text-center font-semibold"
              type="button"
            >
              Entrar
            </Link>
          </form>
          <Link href="/cadastro" className="text-center block mt-2 underline underline-offset-2">
            Cadastrar
          </Link>
        </div>
      </div>
    </section>
  );
}
