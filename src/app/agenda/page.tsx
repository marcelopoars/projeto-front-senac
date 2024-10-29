import { Calendar } from "./components";
import { Customer } from "./components";

export default function AgendaPage() {
  return (
    <div className="h-fit w-fit flex my-auto mx-auto">
      <Calendar />

      <Customer />
    </div>
  );
}
