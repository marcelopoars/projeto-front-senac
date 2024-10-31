export function TimeStamps() {
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

  return (
    <div className="grid grid-cols-5 gap-2 w-full p-3 bg-zinc-200">
      {hours.map((hour, index) => (
        <div
          key={index}
          className="text-center bg-zinc-300 text-black font-bold py-2 rounded-lg hover:bg-zinc-500 cursor-pointer"
        >
          {hour}
        </div>
      ))}
    </div>
  );
}
