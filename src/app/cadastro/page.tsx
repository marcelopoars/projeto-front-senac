import { SignUpForm } from "./components";

export default function SignUpPage() {
  return (
    <section>
      <div className="container px-6 py-12">
        <h1 className="font-bold text-3xl mb-8">Cadastro de Prestador</h1>
        <SignUpForm />
      </div>
    </section>
  );
}
