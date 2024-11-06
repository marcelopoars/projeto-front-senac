"use client";

import { useState } from "react";

import { Calendar } from "../calendar";
import { TimeStamps } from "../timestamps";

export function MySchedule() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // const fetchAppointment = async () => {
  //   if (selectedDate && selectedTime) {
  //     try {
  //       const formattedDate = selectedDate.toISOString().split("T")[0]; // "YYYY-MM-DD"
  //       const response = await axios.get(`/api/appointments`, {
  //         params: {
  //           date: formattedDate,
  //           time: selectedTime,
  //         },
  //       });
  //       setAppointment(response.data);
  //     } catch (error) {
  //       console.error("Erro ao buscar o agendamento:", error);
  //     }
  //   }
  // };

  return (
    <section className="h-full">
      <div className="container px-6 py-12">
        <div className="flex justify-between items-baseline mb-12">
          <h1 className="font-bold text-2xl md:text-3xl">Minha agenda</h1>
          <button className="bg-green-500 text-sm font-semibold rounded-lg text-white py-4 px-6 md:text-lg hover:bg-green-700 transition">
            + Novo agendamento
          </button>
        </div>

        <div className="flex gap-8">
          <Calendar onDateSelect={setSelectedDate} />
          <TimeStamps onTimeSelect={setSelectedTime} />
        </div>
      </div>
    </section>
  );
}
