import { Metadata } from "next";
import Link from "next/link";

import { FormLogin } from "./components";

export const metadata: Metadata = {
  title: "Login",
  description: "Entre com email e senha para acessar o sistema.",
};

export default function LoginPage() {
  return (
    <section className="px-6 py-20 lg:py-32">
      <div className="container flex-1 flex flex-col items-center">
        <h1 className="text-xl text-center font-semibold mb-5">Login</h1>

        <FormLogin />

        <Link
          href="/cadastro"
          className="text-center block mt-5 underline underline-offset-2"
        >
          Cadastrar
        </Link>
      </div>
    </section>
  );
}
