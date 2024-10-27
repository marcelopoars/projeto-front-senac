import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl font-bold mb-6">Faz um PIX</h1>
      <Link href="/login" className="bg-red-700 rounded-lg">Logar</Link>
    </main>
  );
}
