"use client";

import { useFormat } from "@/hooks";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { useCallback, useEffect, useMemo, useState } from "react";

import { api } from "@/lib";
import { Calendar } from "../calendar";
import { TimeStamps } from "../timestamps";

import { Appointment, AppointmentResponse } from "./interfaces";

export function MySchedule() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { toLongDate, toISO, formatHour } = useFormat();

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
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
    setSelectedTime(time);
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

  const whatsAppUrl = useCallback(
    (name: string, date: string, hour: string) => {
      const phoneNumber = "5551981838118";

      const message = encodeURIComponent(
        `Olá ${name}! \n\nGostaria de confirmar o seu agendamento para o dia ${toLongDate(
          date
        )} às ${hour}. \n\nPosso confirmar? \n1 - Sim \n2 - Não`
      );

      return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    },
    [toLongDate]
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

        {appointment && (
          <div className="flex flex-col mt-4 py-8 px-6 bg-zinc-100/85 rounded-md">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold text-lg">
                Detalhes do Agendamento:
              </h2>

              <a
                className="flex items-center justify-center gap-2 bg-green-500 font-semibold py-2 px-4 rounded-full hover:bg-green-700 hover:text-white transition"
                href={whatsAppUrl(
                  appointment.cliente.nome,
                  appointment.agendamento.data_agendamento,
                  formatHour(appointment.agendamento.hora_inicio)
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                {<WhatsappLogo className="size-6" />} WhatsApp
              </a>
            </div>

            <div className="space-y-2">
              <p>
                <strong>Data:</strong>{" "}
                {toLongDate(appointment.agendamento.data_agendamento)}
              </p>
              <p>
                <strong>Horário:</strong>{" "}
                {formatHour(appointment.agendamento.hora_inicio)}
              </p>
              <p>
                <strong>Cliente:</strong> {appointment.cliente.nome}
              </p>
              <p>
                <strong>Telefone:</strong> {appointment.cliente.telefone}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
