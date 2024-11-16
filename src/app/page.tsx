import { CategoryList } from "@/components";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center h-full">
      <div className="container px-6 py-8 lg:py-12">
        <CategoryList />
      </div>
    </section>
  );
}
