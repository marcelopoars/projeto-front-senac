import Link from "next/link";

interface CardCategoryProps {
  category: string;
}

export function CardCategory({ category }: CardCategoryProps) {
  return (
    <Link
      href="/prestadores"
      className="group inline-block border rounded-lg overflow-hidden w-full hover:border-sky-500 transition"
    >
      <header className="py-8 px-4 md:py-12">
        <h2 className="font-semibold text-xl text-zinc-600 text-center group-hover:text-sky-500 transition">
          {category}
        </h2>
      </header>
    </Link>
  );
}
