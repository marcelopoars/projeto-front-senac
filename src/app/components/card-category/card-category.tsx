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
      <div className="w-full h-[200px] bg-zinc-200 flex items-center justify-center group-hover:opacity-80 transition">
        IMAGE
      </div>
      <header className="py-2 px-4">
        <h2 className="font-semibold text-xl text-zinc-600 text-center group-hover:text-sky-500 transition">
          {category}
        </h2>
      </header>
    </Link>
  );
}
