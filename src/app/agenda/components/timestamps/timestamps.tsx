import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface TimeStampsProps {
  onTimeSelect: (time: string) => void;
}

export function TimeStamps({ onTimeSelect }: TimeStampsProps) {
  const hours = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleTimeClick = (time: string) => {
    console.log(time);
    setSelectedTime(time);
    onTimeSelect(time);
  };

  return (
    <div className="flex-1 grid grid-cols-2 gap-3">
      {hours.map((hour) => (
        <div
          key={hour}
          onClick={() => handleTimeClick(hour)}
          className={twMerge(
            "flex items-center justify-center bg-sky-100 font-bold text-sky-800 rounded-lg hover:bg-sky-200 cursor-pointer transition",
            selectedTime === hour ? "bg-sky-200 text-zinc-900" : ""
          )}
        >
          {hour}
        </div>
      ))}
    </div>
  );
}
