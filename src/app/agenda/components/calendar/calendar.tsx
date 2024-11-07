import { useState } from "react";
import ReactCalendar from "react-calendar";

import "./styles.css";

interface CalendarProps {
  onDateSelect: (date: Date) => void;
}

export function Calendar({ onDateSelect }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    console.log(date);
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <div suppressHydrationWarning className="flex-1">
      <ReactCalendar
        locale="pt-BR"
        onClickDay={handleDateChange}
        value={selectedDate}
      />
    </div>
  );
}
