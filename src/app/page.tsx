import { categories } from "@/lib";

import { CardCategory } from "../components";

export default function Home() {
  return (
    <section>
      <div className="container px-6 py-12">
        <h1 className="font-bold text-2xl text-center mb-8 md:text-3xl lg:mb-12">
          Qual categoria de serviço você deseja utilizar?
        </h1>

        <div className="grid justify-around content-around grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-12">
          {categories.map((category) => (
            <CardCategory key={category} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
