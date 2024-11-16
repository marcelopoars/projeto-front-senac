"use client";

import { useFormat } from "@/hooks";
import { useEffect, useState } from "react";

import { api } from "@/lib";
import { Calendar } from "../calendar";
import { TimeStamps } from "../timestamps";

import { AppointmentDetails } from "../appointment-details";
import { AppointmentForm } from "../appointment-form";
import { Appointment, AppointmentResponse } from "./interfaces";
import { isWeekend } from "date-fns";

type RenderContent = "appointmentDetails" | "appointmentForm" | "timeStamps";

export function MySchedule() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [renderContent, setRenderContent] =
    useState<RenderContent>("timeStamps");

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
    setRenderContent("timeStamps");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);

    const matchingAppointment = appointments.find(
      (appointment) =>
        appointment.agendamento.hora_inicio === time &&
        appointment.agendamento.data_agendamento.startsWith(
          selectedDate?.toISOString().split("T")[0] || ""
        )
    );

    if (!matchingAppointment) {
      setRenderContent("appointmentForm");
    } else {
      setAppointment(matchingAppointment);
      setRenderContent("appointmentDetails");
    }
  };

  const handleBack = () => {
    setRenderContent("timeStamps");

    if (selectedDate) {
      fetchAppointments(selectedDate);
    }
    setSelectedTime(null);
  };

  const mappedAppointments = appointments.map((appointment) => ({
    hora_inicio: appointment.agendamento.hora_inicio,
    cliente: {
      nome: appointment.cliente.nome,
      data_agendamento: appointment.agendamento.data_agendamento,
    },
    status: appointment.agendamento.status,
  }));

  const isWeekendDate = (date: Date | null): boolean => {
    return date ? isWeekend(date) : false;
  };

  return (
    <section className="h-full">
      <div className="container px-6 py-12">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl md:text-3xl mb-8 text-zinc-700">
            Minha agenda
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:flex-row">
          <Calendar onDateSelect={handleDateSelect} />

          {renderContent === "timeStamps" && (
            <>
              {isWeekendDate(selectedDate) ? (
                <div className="flex items-center justify-center">
                  <p className="text-xl text-zinc-500 text-center text-balance">
                    Os agendamentos não estão disponíveis aos finais de semana.
                    Por favor, selecione um dia útil.
                  </p>
                </div>
              ) : (
                <TimeStamps
                  onTimeSelect={handleTimeSelect}
                  selectedDate={selectedDate}
                  appointments={mappedAppointments}
                  isLoading={loading}
                />
              )}
            </>
          )}

          {renderContent === "appointmentForm" && (
            <AppointmentForm
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onBack={handleBack}
            />
          )}

          {renderContent === "appointmentDetails" && appointment && (
            <AppointmentDetails appointment={appointment} onBack={handleBack} />
          )}
        </div>
      </div>
    </section>
  );
}
