import { format } from "date-fns";

export function useFormat() {
  function toISO(date: Date | string): string {
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    return format(parsedDate, "yyyy-MM-dd");
  }

  function toLongDate(date: Date | string): string {
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    return format(parsedDate, "dd/MM/yyyy");
  }

  const formatHour = (hour: string): string => {
    return hour.split(":").slice(0, 2).join(":");
  };

  return { toISO, toLongDate, formatHour };
}
