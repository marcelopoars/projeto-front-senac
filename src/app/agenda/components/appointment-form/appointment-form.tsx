"use client";

import { normalizePhoneNumber } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { ErrorMessage } from "@/components";
import { useFormat } from "@/hooks";
import { api } from "@/lib";
import { twMerge } from "tailwind-merge";

interface AppointmentFormProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onBack: () => void;
}

const appointmentFormSchema = z.object({
  name: z.string().min(1, { message: "Por favor, insira o seu nome." }),
  phone: z
    .string()
    .min(14, { message: "Por favor, insira um número de telefone válido." }),
});

type AppointmentFormInputs = z.infer<typeof appointmentFormSchema>;

export function AppointmentForm({
  selectedDate,
  selectedTime,
  onBack,
}: AppointmentFormProps) {
  const { toLongDate, toISO, formatHour } = useFormat();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<AppointmentFormInputs>({
    mode: "onTouched",
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const data = watch();

  const { phone } = data;

  useEffect(() => {
    if (phone) setValue("phone", normalizePhoneNumber(phone));
  }, [phone, setValue]);

  const onSubmitForm: SubmitHandler<AppointmentFormInputs> = async (data) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    const cleanedPhone = data.phone.replace(/\D/g, "");

    const cleanedData = {
      ...data,
      phone: cleanedPhone,
    };

    console.log({ cleanedData });

    const newAppointment = {
      cliente_id: 151,
      prestador_id: 53,
      data_agendamento: toISO(selectedDate),
      hora_inicio: selectedTime,
      hora_fim: selectedTime,
      assunto: "Consulta de rotina",
      status: "pendente",
    };

    try {
      const response = await api.post("/agendamentos", newAppointment);

      console.log(response.data);

      setSuccessMessage("Agendamento realizado com sucesso!");

      reset();
      console.log("Agendamento criado com sucesso:", response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Erro ao criar o agendamento.";
      setErrorMessage(message);
      console.error("Erro ao criar o agendamento:", error);
    }
  };

  return (
    <div className="flex-1">
      <h2 className="text-xl font-bold mb-6"> Cadastro de Agendamento</h2>
      <p className="mb-6">
        Cadastrar agendamento para dia{" "}
        <strong>{toLongDate(selectedDate)}</strong> às{" "}
        <strong>{formatHour(selectedTime)}</strong>
      </p>

      {errorMessage && (
        <div className="mb-4 text-red-500 font-semibold">
          <p className="text-lg font-bold">{errorMessage}</p>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 text-green-500 font-semibold">
          <p className="text-lg font-bold">{successMessage}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="w-full max-w-[400px] flex flex-col"
      >
        <div className="pb-8">
          <label htmlFor="name" className="block text-zinc-600 mb-2">
            Nome
          </label>
          <input
            className={`w-full border p-3 rounded-lg ${
              errors.name ? "border-red-500" : ""
            }`}
            type="text"
            id="name"
            placeholder="Ex.: Maria da Silva"
            autoComplete="name"
            disabled={!!successMessage}
            {...register("name")}
          />
          <ErrorMessage error={errors.name?.message} />
        </div>

        <div className="pb-8">
          <label htmlFor="phone" className="block text-zinc-600 mb-2">
            Telefone ou WhatsApp
          </label>
          <input
            className={`w-full border p-3 rounded-lg ${
              errors.phone ? "border-red-500" : ""
            }`}
            id="phone"
            type="tel"
            placeholder="(51) 99999-9999"
            autoComplete="phone"
            aria-describedby={errors.phone ? "phone-error" : undefined}
            disabled={!!successMessage}
            {...register("phone")}
          />
          <ErrorMessage error={errors.phone?.message} />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            className={twMerge(
              "relative flex-1 gap-1 bg-sky-200 p-3 rounded-lg text-center font-semibold hover:bg-sky-300  transition",
              isSubmitting ? "disabled:bg-slate-300" : ""
            )}
            onClick={onBack}
            disabled={isSubmitting}
          >
            <CaretLeft className="absolute size-6" /> Voltar
          </button>
          <button
            type="submit"
            className={twMerge(
              "flex-1 p-3 rounded-lg text-white text-center font-semibold transition",
              isSubmitting
                ? "bg-sky-400 animate-pulse"
                : "bg-sky-500 hover:bg-sky-600",
              !isValid || isSubmitting ? "disabled:bg-slate-300" : ""
            )}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Agendar"}
          </button>
        </div>
      </form>
    </div>
  );
}
