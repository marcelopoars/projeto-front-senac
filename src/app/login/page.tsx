import Link from "next/link";
import { FormLogin } from "./components";

export default function LoginPage() {
  return (
    <section className="flex h-full">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-xl text-center font-semibold mb-5">Login</h1>

        <FormLogin />

        <Link
          href="/cadastro"
          className="text-center block mt-2 underline underline-offset-2"
        >
          Cadastrar
        </Link>
      </div>
    </section>
  );
}
