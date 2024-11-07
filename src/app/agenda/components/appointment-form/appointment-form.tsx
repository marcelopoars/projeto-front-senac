export function AppointmentForm() {
  return (
    <div className="bg-gray-200 p-6">
      <h2 className="text-lg font-bold mb-4"> Cliente</h2>
      <form className="w-64 flex flex-col gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm mb-2">
            Nome:
          </label>
          <input
            className="w-full py-2 px-4"
            type="text"
            placeholder="Digite o nome do Cliente"
            id="name"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm mb-2">
            Telefone:
          </label>
          <input
            className="w-full py-2 px-4"
            type="tel"
            placeholder="Digite o Telefone do Cliente"
            id="phone"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm mb-2">
            E-mail:
          </label>
          <input
            className="w-full py-2 px-4"
            type="email"
            placeholder="Digite o Email do Cliente"
            id="email"
            required
          />
        </div>
        <div>
          <textarea
            className="w-full py-2 px-4"
            placeholder="Observações"
            id="obs"
            required
          />
        </div>
        <button
          className="bg-sky-500 p-3 rounded-lg text-center font-semibold hover:bg-sky-600"
          type="button"
        >
          Agendar
        </button>
      </form>
    </div>
  );
}
