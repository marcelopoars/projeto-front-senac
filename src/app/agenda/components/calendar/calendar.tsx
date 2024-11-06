import React, { useState } from "react";
import ReactCalendar from "react-calendar";
import "./styles.css";

export function Calendar({ onDateSelect }: { onDateSelect: (date: Date) => void }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <div suppressHydrationWarning>
      <ReactCalendar
        locale="pt-BR"
        onClickDay={handleDateChange}
        value={selectedDate}
      />
    </div>
  );
}
