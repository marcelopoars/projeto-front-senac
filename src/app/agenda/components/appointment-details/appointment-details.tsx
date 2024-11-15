import { useFormat } from "@/hooks";
import { CaretLeft, Trash, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { useCallback, useState } from "react";
import { api } from "@/lib";

import { Appointment } from "../my-schedule/interfaces";
import { normalizePhoneNumber } from "@/utils";
import { twMerge } from "tailwind-merge";

interface AppointmentDetailsProps {
  appointment: Appointment;
  onBack: () => void;
}

export function AppointmentDetails({
  appointment: { agendamento, cliente },
  onBack,
}: AppointmentDetailsProps) {
  const { toLongDate, formatHour } = useFormat();
  const [loading, setLoading] = useState(false);

  const whatsAppUrl = useCallback(
    (name: string, date: string, hour: string) => {
      const phoneNumber = `55${cliente.telefone}`;

      const message = encodeURIComponent(
        `Olá ${name}! \n\nGostaria de confirmar o seu agendamento para o dia ${toLongDate(
          date
        )} às ${hour}. \n\nPosso confirmar? \n1 - Sim \n2 - Não`
      );

      return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    },
    [cliente.telefone, toLongDate]
  );

  const authToken =
    document.cookie.match(/(?:^|;\s*)authToken=([^;]*)/)?.[1] || null;

  const deleteAppointment = async () => {
    setLoading(true);

    try {
      const res = await api.delete(`/agendamentos/${agendamento.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("Status do agendamento atualizado!", res.data);
    } catch (error) {
      console.error("Erro ao cancelar o agendamento!", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col py-8 px-6 bg-zinc-100/80">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Detalhes do Agendamento</h2>

        <a
          className="flex items-center justify-center gap-2 bg-green-500 font-semibold py-2 px-4 rounded-full hover:bg-green-700 hover:text-white transition"
          href={whatsAppUrl(
            cliente.nome,
            agendamento.data_agendamento,
            formatHour(agendamento.hora_inicio)
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          {<WhatsappLogo className="size-6" />} WhatsApp
        </a>
      </div>

      <div className="space-y-2">
        <p>
          <strong>Data:</strong> {toLongDate(agendamento.data_agendamento)}
        </p>
        <p>
          <strong>Horário:</strong> {formatHour(agendamento.hora_inicio)}
        </p>
        <p>
          <strong>Cliente:</strong> {cliente.nome}
        </p>
        <p>
          <strong>Telefone:</strong> {normalizePhoneNumber(cliente.telefone)}
        </p>
      </div>

      <div className="grid gap-6 mt-auto pt-8 md:grid-cols-2">
        <button
          type="button"
          className={twMerge(
            "relative bg-sky-200 text-center font-semibold p-3 rounded-lg hover:bg-sky-300  transition",
            false ? "disabled:bg-slate-300" : ""
          )}
          onClick={onBack}
          disabled={false}
        >
          <CaretLeft className="absolute size-6" /> Voltar
        </button>
        <button
          onClick={deleteAppointment}
          className="relative bg-red-500 text-white font-semibold p-3 rounded-lg hover:bg-red-700 transition"
          disabled={loading}
        >
          {loading ? (
            <span className="loader">Cancelando...</span>
          ) : (
            <>
              <Trash className="absolute size-6" /> Cancelar agendamento
            </>
          )}
        </button>
      </div>
    </div>
  );
}
