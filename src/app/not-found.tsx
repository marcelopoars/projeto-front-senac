import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Erro 404",
  description: "Ops! Esta página não existe",
};

export default function Error404() {
  return (
    <div className="flex flex-col items-center justify-center align-center min-h-full f-column">
      <h2 className="font-bold text-9xl text-sky-500 mb-4">404</h2>
      <p className="text-3xl mb-4">Ops! Esta página não existe</p>
      <Link
        href={"/"}
        className="text-sky-500 text-lg underline underline-offset-4"
      >
        Voltar para página inicial
      </Link>
    </div>
  );
}
