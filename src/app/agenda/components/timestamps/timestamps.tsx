import { twMerge } from "tailwind-merge";

interface TimeStampsProps {
  onTimeSelect: (time: string) => void;
}

export function TimeStamps({ onTimeSelect }: TimeStampsProps) {
  const hours = [
    { hour: "08:00", client: "Fulano" },
    { hour: "09:00", client: "" },
    { hour: "10:00", client: "Antonio Camargo" },
    { hour: "11:00", client: "José Daniel" },
    { hour: "12:00", client: "" },
    { hour: "13:00", client: "Maria da Silva" },
    { hour: "14:00", client: "Camila Santos" },
    { hour: "15:00", client: "Miguel Luiz" },
    { hour: "16:00", client: "" },
    { hour: "17:00", client: "Pedrinho" },
  ];

  const handleTimeClick = (time: string) => {
    console.log(time);
    onTimeSelect(time);
  };

  return (
    <div className="flex-1 grid grid-cols-2 gap-3">
      {hours.map(({ hour, client }) => (
        <button
          key={hour}
          onClick={() => handleTimeClick(hour)}
          className={twMerge(
            "flex items-center bg-green-200 font-bold text-sky-800 px-5 rounded-lg hover:bg-green-300 transition",
            client
              ? "bg-zinc-200 text-zinc-500 hover:bg-zinc-300 focus-visible:border"
              : ""
          )}
        >
          {hour} - {client || 'Livre'}
        </button>
      ))}
    </div>
  );
}
