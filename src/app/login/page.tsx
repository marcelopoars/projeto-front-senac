import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl font-bold mb-6">
        Faz um PIX para logar no sistema
      </h1>
      <Link href="/" className="bg-red-700 rounded-lg">
        VOltar
      </Link>
    </main>
  );
}
