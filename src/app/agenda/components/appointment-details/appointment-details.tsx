import { useFormat } from "@/hooks";
import { api } from "@/lib";
import { createWhatsAppLink, normalizePhoneNumber, toLongDate } from "@/utils";
import { CaretLeft, Trash, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Appointment } from "../my-schedule/interfaces";

interface AppointmentDetailsProps {
  appointment: Appointment;
  onBack: () => void;
}

export function AppointmentDetails({
  appointment: { agendamento, cliente },
  onBack,
}: AppointmentDetailsProps) {
  const { formatHour } = useFormat();
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const whatsappLink = createWhatsAppLink({
    phone: cliente.telefone,
    message: `Olá ${
      cliente.nome
    }! \n\nGostaria de confirmar o seu agendamento para o dia ${toLongDate(
      agendamento.data_agendamento
    )} às ${agendamento.hora_inicio}. \n\nPosso confirmar? \n1 - Sim \n2 - Não`,
  });

  const authToken =
    document.cookie.match(/(?:^|;\s*)authToken=([^;]*)/)?.[1] || null;

  const deleteAppointment = async () => {
    setLoading(true);
    setFeedbackMessage(null);

    try {
      await api.delete(`/agendamentos/${agendamento.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setFeedbackMessage({ type: "success", text: "Agendamento cancelado!" });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Erro ao cancelar o agendamento.";
      setFeedbackMessage({ type: "error", text: message });
      console.error("Erro ao cancelar o agendamento!", error);
    } finally {
      setLoading(false);
    }
  };

  const isPastHour = (hour: string): boolean => {
    if (!agendamento.data_agendamento) return false;

    const now = new Date();

    const agendamentoDate = agendamento.data_agendamento.split("T")[0];

    const agendamentoDateTime = new Date(`${agendamentoDate}T${hour}:00`);

    return agendamentoDateTime <= now;
  };

  return (
    <div className="flex flex-col py-8 px-6 bg-zinc-100/80">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Detalhes do Agendamento</h2>

        <a
          className="flex items-center justify-center gap-2 bg-green-500 font-semibold py-2 px-4 rounded-full hover:bg-green-700 hover:text-white transition"
          href={whatsappLink}
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

      {feedbackMessage && (
        <div
          className={twMerge(
            "mt-6 text-lg font-bold",
            feedbackMessage.type === "success"
              ? "text-green-500"
              : "text-red-500"
          )}
        >
          {feedbackMessage.text}
        </div>
      )}

      <div className="grid gap-6 mt-auto pt-8 md:grid-cols-2">
        <button
          type="button"
          className={twMerge(
            "relative bg-sky-200 text-center font-semibold p-3 rounded-lg hover:bg-sky-300 transition",
            false ? "disabled:bg-slate-300" : ""
          )}
          onClick={onBack}
          disabled={false}
        >
          <CaretLeft className="absolute size-6" /> Voltar
        </button>

        {!feedbackMessage && !isPastHour(agendamento.hora_inicio) && (
          <button
            onClick={deleteAppointment}
            className="relative bg-red-500 text-white font-semibold p-3 rounded-lg hover:bg-red-700 transition disabled:bg-red-300"
            disabled={loading}
          >
            {loading ? (
              <span className="loader">Cancelando...</span>
            ) : (
              <>
                <Trash className="absolute size-6 hidden xl:block" />
                <span className="">Cancelar agendamento</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
