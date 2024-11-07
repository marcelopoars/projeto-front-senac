"use client";

import { useFormat } from "@/hooks";
import { useEffect, useMemo, useState } from "react";

import { api } from "@/lib";
import { Calendar } from "../calendar";
import { TimeStamps } from "../timestamps";

import { AppointmentDetails } from "../appointment-details";
import { Appointment, AppointmentResponse } from "./interfaces";

export function MySchedule() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { toISO } = useFormat();

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // setSelectedTime(null);
    setAppointment(null);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      if (selectedDate) {
        const formattedDate = toISO(selectedDate); // Formata a data como "YYYY-MM-DD"

        setLoading(true);

        try {
          const response = await api.get<AppointmentResponse>(
            `/gestao/api/management/agendamentos/62/${formattedDate}/${formattedDate}`
          );
          setAppointments(response.data.agendamentos);
          console.log(response.data.agendamentos);
        } catch (error) {
          console.error("Erro ao buscar os agendamentos:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAppointments();
  }, [selectedDate]);

  const handleTimeSelect = (time: string) => {
    // setSelectedTime(time);
    setAppointment(null);

    if (appointments.length > 0) {
      const matchingAppointment = appointments.find(
        (appointment) =>
          appointment.agendamento.hora_inicio === time &&
          appointment.agendamento.data_agendamento.startsWith(
            selectedDate?.toISOString().split("T")[0] || ""
          )
      );

      setAppointment(matchingAppointment || null);
    }
  };

  const mappedAppointments = useMemo(
    () =>
      appointments.map((appointment) => ({
        hora_inicio: appointment.agendamento.hora_inicio,
        cliente: {
          nome: appointment.cliente.nome,
          data_agendamento: appointment.agendamento.data_agendamento,
        },
      })),
    [appointments]
  );

  return (
    <section className="h-full">
      <div className="container px-6 py-12">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl md:text-3xl mb-8 text-zinc-700">
            Minha agenda
          </h1>
          {loading && (
            <span className="text-zinc-600 animate-pulse">Carregando...</span>
          )}
        </div>

        <div className="flex gap-8">
          <Calendar onDateSelect={handleDateSelect} />
          <TimeStamps
            onTimeSelect={handleTimeSelect}
            selectedDate={selectedDate}
            appointments={mappedAppointments}
          />
        </div>

        {appointment && <AppointmentDetails appointment={appointment} />}
      </div>
    </section>
  );
}
