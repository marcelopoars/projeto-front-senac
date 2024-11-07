"use client";

import { useState } from "react";
import axios from "axios";
import { Calendar } from "../calendar";
import { TimeStamps } from "../timestamps";

export function MySchedule() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointment, setAppointment] = useState(null);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Limpa o horário quando uma nova data é selecionada
  };

  const handleTimeSelect = async (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0]; // Formata a data como "YYYY-MM-DD"
        const response = await axios.get(`http://localhost:3001/gestao/api/management/agendamentos/62/${formattedDate}/${formattedDate}`);
        
        const matchingAppointment = response.data.find(
          (appointment) => appointment.hora_inicio === time
        );

        setAppointment(matchingAppointment || null);
      } catch (error) {
        console.error("Erro ao buscar o agendamento:", error);
      }
    }
  };

  return (
    <section className="h-full">
      <div className="container px-6 py-12">
        <h1 className="font-bold text-2xl md:text-3xl mb-8 text-zinc-700">Minha agenda</h1>

        <div className="flex gap-8">
          <Calendar onDateSelect={handleDateSelect} />
          <TimeStamps onTimeSelect={handleTimeSelect} />
        </div>

        {appointment ? (
          <div className="mt-8 p-4 bg-gray-100 rounded-md">
            <h2 className="font-semibold text-lg">Detalhes do Agendamento:</h2>
            <p>Cliente: {appointment.cliente.nome}</p>
            <p>Horário: {appointment.hora_inicio}</p>
            <p>Telefone: {appointment.cliente.telefone}</p>
          </div>
        ) : (
          selectedTime && (
            <div className="mt-8 p-4 bg-gray-100 rounded-md">
              <p>Nenhum agendamento encontrado para este horário.</p>
            </div>
          )
        )}
      </div>
    </section>
  );
}

