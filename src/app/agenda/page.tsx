import { Calendar } from "./components";
import { Customer } from "./components";
import { TimeStamps } from "./components";

export default function AgendaPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen my-10">
      <div className="flex">
        <div className="flex flex-col items-center">
          <Calendar />

          <div className="border-t border-gray-500 w-4/5"></div>

          <TimeStamps />
        </div>
      
        <Customer />
      </div>
    </div>
  );
}
