"use client";
import { useState } from "react";
import { Calendar } from "./components";
import { Customer } from "./components";
import { TimeStamps } from "./components";
import { Schedule } from "./components";
import axios from "axios";

export default function AgendaPage() {
  const [show, setShow] = useState("customer");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const fetchAppointment = async () => {
    if (selectedDate && selectedTime) {
      try {
        
        const formattedDate = selectedDate.toISOString().split("T")[0]; // "YYYY-MM-DD"
        const response = await axios.get(`/api/appointments`, {
          params: {
            date: formattedDate,
            time: selectedTime,
          },
        });
        setAppointment(response.data); 
      } catch (error) {
        console.error("Erro ao buscar o agendamento:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center  mt-20">
      <div className="flex">
        <div className="flex flex-col">
          <Calendar onDateSelect={setSelectedDate} />
          <TimeStamps onTimeSelect={setSelectedTime} />
        </div>
        {show === "customer" && <Customer setShow={setShow} />}

        {show === "schedule" && <Schedule setShow={setShow} />}
      </div>
    </div>
  );
}
