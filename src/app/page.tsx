import { CardCategory } from "./components";

export default function Home() {
  return (
    <section className="w-[98%] m-4 p-6 h-90 flex flex-col justify-center items-center">
      <div className="w-[50%] h-10 text-lg font-bold mb-6">
        <h2 className="text-center h-14 font-bold text-3xl">
          Qual categoria de serviço você deseja utilizar?
        </h2>
      </div>
      <div className="w-[96%] flex flex-wrap justify-center">
        <CardCategory />
        <CardCategory />
        <CardCategory />
        <CardCategory />
        <CardCategory />
        <CardCategory />
        <CardCategory />
        <CardCategory />
      </div>
    </section>
  );
}
