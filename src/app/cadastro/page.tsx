export default function Cadastro() {
  return (
    <section>
      <div className="container px-6 py-12">
        <h1 className="font-bold text-3xl mb-8">Cadastro de Prestador</h1>
        <form className="flex gap-5 flex-col max-w-md">
          <input
            type="text"
            placeholder="Nome"
            className="border p-3 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
          />
          <input
            type="tel"
            placeholder="Telefone"
            className="border p-3 rounded-lg"
          />
          <input
            type="number"
            placeholder="CPF"
            className="border p-3 rounded-lg"
          />
          <textarea
            name="category"
            id="category"
            className="border p-3 rounded-lg"
            placeholder="Descreva aqui os seus serviços."
          ></textarea>
          <button className="bg-sky-500 p-3 rounded-lg" type="button">
            Cadastrar
          </button>
        </form>
      </div>
    </section>
  );
}
