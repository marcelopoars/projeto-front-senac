export interface ServiceProviderResponse {
  prestador: {
    atividade: string;
    services: string;
    logo: string;
    instagram: string;
    website: string;
  };
  usuario: {
    nome: string;
    email: string;
    telefone: string;
  };
  categoria: {
    nome: string;
  };
}
