import { twMerge } from "tailwind-merge";

interface TimeStampsProps {
  onTimeSelect: (time: string) => void;
}

export function TimeStamps({ onTimeSelect }: TimeStampsProps) {
  const hours = [
    { hour: "08:00", status: "free" },
    { hour: "09:00", status: "free" },
    { hour: "10:00", status: "busy" },
    { hour: "11:00", status: "free" },
    { hour: "12:00", status: "busy" },
    { hour: "13:00", status: "busy" },
    { hour: "14:00", status: "busy" },
    { hour: "15:00", status: "free" },
    { hour: "16:00", status: "free" },
    { hour: "17:00", status: "busy" },
  ];

  const handleTimeClick = (time: string) => {
    console.log(time);
    onTimeSelect(time);
  };

  return (
    <div className="flex-1 grid grid-cols-2 gap-3">
      {hours.map(({ hour, status }) => (
        <button
          key={hour}
          onClick={() => handleTimeClick(hour)}
          className={twMerge(
            "flex items-center justify-center bg-green-200 font-bold text-sky-800 rounded-lg hover:bg-green-300 transition",
            status === "busy"
              ? "bg-zinc-200 text-zinc-500 hover:bg-zinc-300 focus-visible:border"
              : ""
          )}
        >
          {hour}
        </button>
      ))}
    </div>
  );
}
