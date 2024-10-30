import Card from "./components/card/card";

export default function Categoria() {
    return (
        <section className="w-[96%] m-4 p-6 w-1/2 h-90 bg-gray-200 flex flex-col justify-center items-center">
            <div className="w-[50%] bg-gray-100 h-10 text-lg font-bold mb-6">
                <h2 className="text-center h-14 font-bold text-2xl">
                    Qual serviço você deseja utilizar?
                </h2>
            </div>
            <div>
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </section>
    );
  }
  