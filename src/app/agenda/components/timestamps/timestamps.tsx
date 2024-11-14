import { useFormat } from "@/hooks";
import { isBefore, parse, set } from "date-fns";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface TimeStampsProps {
  onTimeSelect: (time: string) => void;
  selectedDate: Date | null;
  isLoading: boolean;
  appointments: {
    hora_inicio: string;
    cliente: { nome: string; data_agendamento: string };
  }[];
}

const hours = [
  "08:00:00",
  "09:00:00",
  "10:00:00",
  "11:00:00",
  "12:00:00",
  "13:00:00",
  "14:00:00",
  "15:00:00",
  "16:00:00",
  "17:00:00",
];

export function TimeStamps({
  onTimeSelect,
  selectedDate,
  appointments,
  isLoading,
}: TimeStampsProps) {
  const { formatHour } = useFormat();

  useEffect(() => {}, [appointments, selectedDate]);

  const updatedHours = hours.map((hour) => {
    const appointment = appointments.find(
      (appointment) =>
        appointment.hora_inicio === hour &&
        selectedDate?.toISOString().split("T")[0] ===
          new Date(appointment.cliente.data_agendamento)
            .toISOString()
            .split("T")[0]
    );

    return {
      hour,
      client: appointment ? appointment.cliente.nome : "Livre",
    };
  });

  const handleTimeClick = (time: string) => {
    if (selectedDate) {
      onTimeSelect(time);
    } else {
      console.log(
        "Por favor, selecione uma data antes de escolher um horário."
      );
    }
  };

  const isPastHour = (hour: string): boolean => {
    if (!selectedDate) return false;

    const selectedHour = parse(hour, "HH:mm:ss", new Date());

    const buttonTime = set(selectedDate, {
      hours: selectedHour.getHours(),
      minutes: selectedHour.getMinutes(),
      seconds: 0,
      milliseconds: 0,
    });

    return isBefore(buttonTime, new Date());
  };

  return (
    <div className="flex-1 grid grid-cols-2 gap-3">
      {updatedHours.map(({ hour, client }) => (
        <button
          key={hour}
          onClick={() => handleTimeClick(hour)}
          className={twMerge(
            "flex items-center justify-center  bg-green-200 text-sky-800 px-5 rounded-lg hover:bg-green-300 transition lg: gap-2 lg:justify-start disabled:text-zinc-400 disabled:bg-zinc-100",
            client === "Livre"
              ? ""
              : "bg-sky-200 hover:bg-sky-300 focus-visible:border",
            isLoading ? "animate-pulse" : ""
          )}
          title={
            client === "Livre"
              ? "Clique para agendar"
              : "Ver detalhes do agendamento"
          }
          disabled={(isPastHour(hour) && client === "Livre") || isLoading}
        >
          {!isLoading && <span className="font-bold">{formatHour(hour)}</span>}
          {!isLoading && (
            <span className="hidden lg:block">
              - {isPastHour(hour) && client === "Livre" ? "" : client}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
