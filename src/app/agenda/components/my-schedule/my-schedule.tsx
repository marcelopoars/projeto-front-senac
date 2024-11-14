"use client";

import { useFormat } from "@/hooks";
import { useEffect, useState } from "react";

import { api } from "@/lib";
import { Calendar } from "../calendar";
import { TimeStamps } from "../timestamps";

import { AppointmentDetails } from "../appointment-details";
import { Appointment, AppointmentResponse } from "./interfaces";
import { AppointmentForm } from "../appointment-form";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";

export function MySchedule() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toISO } = useFormat();

  const getAuthTokenFromCookies = () => {
    const cookieString = document.cookie;
    const cookies = cookieString
      .split("; ")
      .reduce((acc: Record<string, string>, cookie) => {
        const [name, value] = cookie.split("=");
        acc[name] = value;
        return acc;
      }, {});
    return cookies.authToken || null;
  };

  const fetchAppointments = async (date: Date) => {
    const formattedDate = toISO(date);
    const providerId = localStorage.getItem("providerId");
    const token = getAuthTokenFromCookies();

    if (!providerId || !token) {
      console.error("Usuário não autenticado.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.get<AppointmentResponse>(
        `/agendamentos/${providerId}/${formattedDate}/${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAppointments(response.data.agendamentos);
    } catch (error) {
      console.error("Erro ao buscar os agendamentos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchAppointments(selectedDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setAppointment(null);
    setShowForm(false);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setShowForm(true);

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

  const handleBack = () => {
    if (selectedDate) {
      fetchAppointments(selectedDate);
    }
    setSelectedTime(null);
    setShowForm(false);
  };

  const mappedAppointments = appointments.map((appointment) => ({
    hora_inicio: appointment.agendamento.hora_inicio,
    cliente: {
      nome: appointment.cliente.nome,
      data_agendamento: appointment.agendamento.data_agendamento,
    },
    status: appointment.agendamento.status,
  }));

  return (
    <section className="h-full">
      <div className="container px-6 py-12">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl md:text-3xl mb-8 text-zinc-700">
            Minha agenda
          </h1>
          {loading && (
            <div className="flex items-center gap-1 animate-pulse">
              <CircleNotch className="size-6 text-zinc-500 animate-spin" />
              <span className="text-zinc-500">Carregando...</span>
            </div>
          )}
        </div>

        <div className="flex gap-8">
          <Calendar onDateSelect={handleDateSelect} />

          {showForm && !appointment ? (
            <AppointmentForm
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onBack={handleBack}
            />
          ) : (
            <TimeStamps
              onTimeSelect={handleTimeSelect}
              selectedDate={selectedDate}
              appointments={mappedAppointments}
              isLoading={loading}
            />
          )}
        </div>

        {appointment && <AppointmentDetails appointment={appointment} />}
      </div>
    </section>
  );
}
