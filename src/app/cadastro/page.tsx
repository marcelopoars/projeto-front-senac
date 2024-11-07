import { Metadata } from "next";
import { FormSignUp } from "./components";

export const metadata: Metadata = {
  title: "Cadastro",
  description:
    "Preencha o formulário para efetuar o seu cadastro no sistema.",
};

export default function SignUpPage() {
  return (
    <section>
      <div className="container px-6 py-12">
        <h1 className="font-bold text-3xl mb-8">Cadastro de Prestador</h1>
        <FormSignUp />
      </div>
    </section>
  );
}
