import { randomUUID } from "crypto";

interface ServiceProvider {
  id: string;
  name: string;
  image: string;
  categoria: string;
}

const categories = [
  "Automotivo",
  "Beleza",
  "Consultoria",
  "Fotografia",
  "Jardinagem",
  "Limpeza",
  "Manutenção",
  "Outros",
];

const getRandomCategory = () =>
  categories[Math.floor(Math.random() * categories.length)];

export const serviceProviders: ServiceProvider[] = [
  {
    id: randomUUID(),
    name: "João Silva",
    image: "https://via.placeholder.com/150",
    categoria: getRandomCategory(),
  },
  {
    id: randomUUID(),
    name: "Maria Oliveira",
    image: "https://via.placeholder.com/150",
    categoria: getRandomCategory(),
  },
  {
    id: randomUUID(),
    name: "Pedro Santos",
    image: "https://via.placeholder.com/150",
    categoria: getRandomCategory(),
  },
  {
    id: randomUUID(),
    name: "Ana Paula",
    image: "https://via.placeholder.com/150",
    categoria: getRandomCategory(),
  },
  {
    id: randomUUID(),
    name: "Carlos Mendes",
    image: "https://via.placeholder.com/150",
    categoria: getRandomCategory(),
  },
  {
    id: randomUUID(),
    name: "Bianca Costa",
    image: "https://via.placeholder.com/150",
    categoria: getRandomCategory(),
  },
  {
    id: randomUUID(),
    name: "Lucas Moreira",
    image: "https://via.placeholder.com/150",
    categoria: getRandomCategory(),
  },
  {
    id: randomUUID(),
    name: "Fernanda Sousa",
    image: "https://via.placeholder.com/150",
    categoria: getRandomCategory(),
  },
  {
    id: randomUUID(),
    name: "Mateus Rocha",
    image: "https://via.placeholder.com/150",
    categoria: getRandomCategory(),
  },
  {
    id: randomUUID(),
    name: "Juliana Martins",
    image: "https://via.placeholder.com/150",
    categoria: getRandomCategory(),
  },
  {
    id: randomUUID(),
    name: "Ricardo Lima",
    image: "https://via.placeholder.com/150",
    categoria: getRandomCategory(),
  },
  {
    id: randomUUID(),
    name: "Patrícia Gomes",
    image: "https://via.placeholder.com/150",
    categoria: getRandomCategory(),
  },
  {
    id: randomUUID(),
    name: "Bruno Fernandes",
    image: "https://via.placeholder.com/150",
    categoria: getRandomCategory(),
  },
  {
    id: randomUUID(),
    name: "Mariana Alves",
    image: "https://via.placeholder.com/150",
    categoria: getRandomCategory(),
  },
  {
    id: randomUUID(),
    name: "Renata Ribeiro",
    image: "https://via.placeholder.com/150",
    categoria: getRandomCategory(),
  },
];
