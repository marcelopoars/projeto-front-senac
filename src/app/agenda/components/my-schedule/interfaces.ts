export interface Appointment {
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

export interface AppointmentResponse {
  message: string;
  count: number;
  totalRegistros: number;
  totalPaginas: number;
  currentPage: number;
  agendamentos: Appointment[];
}
