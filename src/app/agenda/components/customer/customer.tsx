"use client";

interface CustomerProps {
  setShow: (type: string) => void;
}

export function Customer({ setShow }: CustomerProps) {
  return (
    <div className="bg-gray-200 p-6 w-64 flex flex-col">
      <h2 className="text-lg font-bold mb-6">Cliente</h2>

      <div className="mb-3">
        <strong>Nome:</strong> João da Silva
      </div>

      <div className="mb-3">
        <strong>Telefone:</strong> (51) 99999-9999
      </div>

      <div className="mb-6">
        <strong>E-mail</strong> joaodasilva@gmail.com
      </div>

      <button
        type="button"
        onClick={() => setShow("schedule")}
        className="bg-red-500 p-3 rounded-lg text-center text-white font-semibold hover:bg-red-600 transition"
      >
        Cancelar agendamento
      </button>
    </div>
  );
}
