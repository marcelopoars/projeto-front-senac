import { useFormat } from "@/hooks";
import { Trash, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { useCallback } from "react";
import { api } from "@/lib";

import { Appointment } from "../my-schedule/interfaces";

interface AppointmentDetailsProps {
  appointment: Appointment;
}

export function AppointmentDetails({
  appointment: { agendamento, cliente, prestador},
}: AppointmentDetailsProps) {
  const { toLongDate, formatHour } = useFormat();

  const whatsAppUrl = useCallback(
    (name: string, date: string, hour: string) => {
      const phoneNumber = "5551981838118";

      const message = encodeURIComponent(
        `Olá ${name}! \n\nGostaria de confirmar o seu agendamento para o dia ${toLongDate(
          date
        )} às ${hour}. \n\nPosso confirmar? \n1 - Sim \n2 - Não`
      );

      return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    },
    [toLongDate]
  );
  
  return (
    <div className="flex flex-col mt-4 py-8 px-6 bg-zinc-100 rounded-md">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-lg">Detalhes do Agendamento:</h2>

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

      <div className="flex items-end justify-between">
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
            <strong>Telefone:</strong> {cliente.telefone}
          </p>
        </div>

        <button 
          onClick={ async() => {
            try {
              const res = await api.put(
                `/gestao/api/management/agendamentos/${agendamento.id}`,
                {
                  cliente_id: cliente.id,
                  prestador_id: prestador.id,
                  data_agendamento: agendamento.data_agendamento,
                  hora_inicio: agendamento.hora_inicio,
                  hora_fim: agendamento.hora_fim,
                  assunto: agendamento.assunto,
                  status: "cancelado"
                },
                {
                  headers: { "Content-Type": "application/json" }
                }
              );

              console.log("Status do agendamento atualizado!", res.data);

            } catch (error) {
              console.error("Erro ao cancelar o agendamento!", error);
              console.log(agendamento.id, cliente.id, prestador.id, agendamento.data_agendamento, agendamento.hora_inicio, agendamento.hora_fim, agendamento.assunto);
            }
          }}

          className="flex items-center justify-center gap-2 bg-red-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-700 transition">
          
          <Trash className="size-5" /> Cancelar agendamento
        </button>
      </div>
    </div>
  );
}
