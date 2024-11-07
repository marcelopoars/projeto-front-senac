import { twMerge } from "tailwind-merge";

interface TimeStampsProps {
  onTimeSelect: (time: string) => void;
  selectedDate: Date | null;
  appointments: {
    hora_inicio: string;
    cliente: { nome: string; data_agendamento: string };
  }[];
}

export function TimeStamps({
  onTimeSelect,
  selectedDate,
  appointments,
}: TimeStampsProps) {
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
      console.log("Data selecionada:", selectedDate);
      console.log("Horário selecionado:", time);
    } else {
      console.log(
        "Por favor, selecione uma data antes de escolher um horário."
      );
    }
  };

  return (
    <div className="flex-1 grid grid-cols-2 gap-3">
      {updatedHours.map(({ hour, client }) => (
        <button
          key={hour}
          onClick={() => handleTimeClick(hour)}
          className={twMerge(
            "flex items-center bg-green-200 font-bold text-sky-800 px-5 rounded-lg hover:bg-green-300 transition",
            client !== "Livre"
              ? "bg-zinc-200 text-zinc-500 hover:bg-zinc-300 focus-visible:border"
              : ""
          )}
        >
          {hour.split(":").slice(0, 2).join(":")} - {client}
        </button>
      ))}
    </div>
  );
}
