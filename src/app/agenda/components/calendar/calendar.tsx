import { useState } from "react";
import ReactCalendar from "react-calendar";

import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react/dist/ssr";

import "./styles.css";

interface CalendarProps {
  onDateSelect: (date: Date) => void;
}

export function Calendar({ onDateSelect }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  const disableWeekends = ({ date }: { date: Date }) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 = domingo, 6 = sábado
  };

  const tileClassName = ({ date }: { date: Date }) => {
    const day = date.getDay();
    return day === 0 || day === 6 ? "opacity-50 pointer-events-none" : "";
  };

  return (
    <ReactCalendar
      className="flex-1 bg-red-700"
      locale="pt-BR"
      onClickDay={handleDateChange}
      value={selectedDate}
      prevLabel={<CaretLeft />}
      nextLabel={<CaretRight />}
      prev2Label={<CaretDoubleLeft />}
      next2Label={<CaretDoubleRight />}
      tileDisabled={disableWeekends}
      tileClassName={tileClassName}
      goToRangeStartOnSelect
    />
  );
}
