"use client";

import axios from "axios";
import { useState } from "react";
// import { Metadata } from "next";

import { Calendar, Customer, Schedule, TimeStamps } from "./components";

// export const metadata: Metadata = {
//   title: "Prestadores",
//   description: "Encontre um prestador de serviço.",
// };

export default function AgendaPage() {
  const [show, setShow] = useState("customer");
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
    <div className="flex flex-col items-center  mt-20">
      <div className="flex">
        <div className="flex flex-col">
          <Calendar onDateSelect={setSelectedDate} />
          <TimeStamps onTimeSelect={setSelectedTime} />
        </div>

        <Customer setShow={setShow} />

        <Schedule setShow={setShow} />
      </div>
    </div>
  );
}
