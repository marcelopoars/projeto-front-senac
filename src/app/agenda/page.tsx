import { Calendar } from "./components";

export default function AgendaPage() {
  return (
    <div className="flex gap-6">
      <Calendar />

      <div className="bg-gray-300">
        <h2 className="font-bold">Cliente</h2>
      </div>
    </div>
  );
}
