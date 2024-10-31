"use client";
import React, { useState } from "react";

interface ScheduleProps {
  setShow: (type: string) => void;
}

export function Schedule({ setShow }: ScheduleProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [obs, setObs] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nome:", name);
    console.log("Telefone:", phone);
    console.log("E-mail:", email);
    console.log("Observacoes:", obs);
    // Aqui você pode adicionar lógica para enviar os dados do formulário
  };

  return (
    <div className="bg-gray-200 p-6">
      <h2 className="text-lg font-bold mb-4"> Cliente</h2>
      <form onSubmit={handleSubmit} className="w-64 flex flex-col gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm mb-2">
            Nome:
          </label>
          <input
            className="w-full py-2 px-4"
            type="text"
            placeholder="Digite o nome do Cliente"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            className="w-full py-2 px-4"
            placeholder="Observações"
            id="obs"
            value={obs}
            onChange={(e) => setObs(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-slate-500 text-white py-2 px-4 rounded-lg font-bold text-sm w-full hover:bg-slate-600"
          type="button"
          onClick={() => setShow("customer")}
        >
          Agendar
        </button>
      </form>
    </div>
  );
}
