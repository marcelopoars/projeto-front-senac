import { useState } from "react";

export function TimeStamps({ onTimeSelect }: { onTimeSelect: (time: string) => void }) {
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
    setSelectedTime(time);
    onTimeSelect(time); 
  };

  return (
    <div className="grid grid-cols-5 gap-2 w-full p-3 bg-zinc-200">
      {hours.map((hour, index) => (
        <div
          key={index}
          onClick={() => handleTimeClick(hour)}
          className={`text-center bg-zinc-300 text-black font-bold py-2 rounded-lg hover:bg-zinc-500 cursor-pointer ${
            selectedTime === hour ? "bg-blue-500 text-white" : ""
          }`}
        >
          {hour}
        </div>
      ))}
    </div>
  );
}