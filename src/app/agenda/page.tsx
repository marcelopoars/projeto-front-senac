import { Metadata } from "next";
import { MySchedule } from "./components";

export const metadata: Metadata = {
  title: "Minha Agenda",
  description: "Aqui você faz a gestão de todos os seus agendamentos.",
};

export default function AgendaPage() {
  return <MySchedule />;
}
