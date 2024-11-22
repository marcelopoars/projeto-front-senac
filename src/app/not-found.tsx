import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Erro 404",
  description: "Ops! Esta página não existe",
};

export default function Error404() {
  return (
    <section className="px-6 py-20 lg:py-32">
      <div className="container text-center">
        <h2 className="font-bold text-6xl text-sky-500 mb-4 lg:text-9xl">
          404
        </h2>

        <p className="text-2xl mb-4 lg:text-3xl">Ops! Esta página não existe</p>

        <Link
          href={"/"}
          className="text-sky-500 text-lg underline underline-offset-4"
        >
          Voltar para página inicial
        </Link>
      </div>
    </section>
  );
}
