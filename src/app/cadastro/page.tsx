export default function SignUpPage() {
  return (
    <section>
      <div className="container px-6 py-12">
        <h1 className="font-bold text-3xl mb-8">Cadastro de Prestador</h1>
        <form className="flex gap-5 flex-col max-w-[400px]">
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
          <select
            name="type-person"
            id="type-person"
            className="cursor-pointer border py-2 px-3 hover:bg-zinc-100/80 text-base"
          >
            <option value="fisica">Pessoa Física</option>
            <option value="juridica">Pessoa Jurídica</option>
          </select>
          <input
            type="number"
            placeholder="CPF"
            className="border p-3 rounded-lg"
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-zinc-600">
              Categoria:
            </label>
            <select
              name="category"
              id="category"
              className="cursor-pointer border py-2 px-3 hover:bg-zinc-100/80 text-base"
            >
              <option value="Automotivo">Automotivo</option>
              <option value="Beleza">Beleza</option>
              <option value="Consultoria">Consultoria</option>
              <option value="Fotografia">Fotografia</option>
              <option value="Jardinagem">Jardinagem</option>
              <option value="Limpeza">Limpeza</option>
              <option value="Manutenção">Manutenção</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
          <textarea
            name="category"
            id="category"
            className="border p-3 rounded-lg"
            placeholder="Descreva aqui os seus serviços."
          />
          <button
            className="bg-sky-500 p-3 rounded-lg font-semibold"
            type="button"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </section>
  );
}
