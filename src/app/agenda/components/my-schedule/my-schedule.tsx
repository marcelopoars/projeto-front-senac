"use client";

import { useEffect, useState } from "react";

import { api } from "@/lib";
import { Calendar } from "../calendar";
import { TimeStamps } from "../timestamps";

interface Appointment {
  agendamento: {
    id: number;
    data_agendamento: string;
    hora_inicio: string;
    hora_fim: string;
    assunto: string;
    status: string;
    criado_em: string;
    atualizado_em: string;
  };
  cliente: {
    id: number;
    nome: string;
    email: string;
    telefone: string;
  };
  prestador: {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    cpf_cnpj: string;
    atividade: string;
    services: string;
    instagram: string;
    website: string;
  };
}

interface AppointmentResponse {
  message: string;
  count: number;
  totalRegistros: number;
  totalPaginas: number;
  currentPage: number;
  agendamentos: Appointment[];
}

export function MySchedule() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      if (selectedDate) {
        const formattedDate = selectedDate.toISOString().split("T")[0]; // Formata a data como "YYYY-MM-DD"
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

  const handleTimeSelect = async (time: string) => {
    setSelectedTime(time);
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

  const mappedAppointments = appointments.map((appointment) => ({
    hora_inicio: appointment.agendamento.hora_inicio,
    cliente: {
      nome: appointment.cliente.nome,
      data_agendamento: appointment.agendamento.data_agendamento,
    },
  }));

  return (
    <section className="h-full">
      <div className="container px-6 py-12">
        <h1 className="font-bold text-2xl md:text-3xl mb-8 text-zinc-700">
          Minha agenda
        </h1>

        <div className="flex gap-8">
          <Calendar onDateSelect={handleDateSelect} />
          <TimeStamps
            onTimeSelect={handleTimeSelect}
            selectedDate={selectedDate}
            appointments={mappedAppointments}
          />
        </div>

        {loading && <div>Carregando...</div>}

        {appointments.length === 0 && !loading && (
          <div className="mt-8 p-4 bg-gray-100 rounded-md">
            <p>Nenhum agendamento encontrado para este dia.</p>
          </div>
        )}

        {appointment ? (
          <div className="mt-8 p-4 bg-gray-100 rounded-md">
            <h2 className="font-semibold text-lg">Detalhes do Agendamento:</h2>
            <p>Cliente: {appointment.cliente.nome}</p>
            <p>Horário: {appointment.agendamento.hora_inicio}</p>
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
