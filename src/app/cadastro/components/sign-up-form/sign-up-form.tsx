"use client";

import { useState } from "react";

import { normalizeCpfOrCnpj, normalizePhoneNumber } from "@/utils";

export function SignUpForm() {
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = normalizePhoneNumber(event.target.value);
    setPhone(formattedPhone);
  };

  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCpf = normalizeCpfOrCnpj(event.target.value);
    setCpf(formattedCpf);
  };

  return (
    <form className="flex gap-5 flex-col max-w-[400px]">
      <input
        className="border p-3 rounded-lg"
        type="text"
        placeholder="Nome"
        autoComplete="name"
      />
      <input
        className="border p-3 rounded-lg"
        type="email"
        placeholder="Email"
        autoComplete="email"
      />
      <input
        className="border p-3 rounded-lg"
        type="tel"
        placeholder="Telefone / WhatsApp"
        autoComplete="phone"
        value={phone}
        onChange={handlePhoneChange}
      />
      <input
        className="border p-3 rounded-lg"
        type="text"
        placeholder="CPF ou CNPJ"
        autoComplete="off"
        value={cpf}
        onChange={handleCpfChange}
      />
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-zinc-600">
          Categoria:
        </label>
        <select
          id="category"
          className="cursor-pointer border py-2 px-3 hover:bg-zinc-100/80 text-base"
          name="category"
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
        id="category"
        className="border p-3 rounded-lg"
        name="category"
        placeholder="Descreva aqui os seus serviços."
      />
      <button className="bg-sky-500 p-3 rounded-lg font-semibold" type="button">
        Cadastrar
      </button>
    </form>
  );
}
