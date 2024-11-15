import { format } from "date-fns";

export function useFormat() {
  function toISO(date: Date | string | null): string {
    if (!date) return "";

    const parsedDate = typeof date === "string" ? new Date(date) : date;

    return format(parsedDate, "yyyy-MM-dd");
  }

  function toLongDate(date: Date | string | null): string {
    if (!date) return "";

    const parsedDate = typeof date === "string" ? new Date(date) : date;

    return format(parsedDate, "dd/MM/yyyy");
  }

  const formatHour = (hour: string | null): string => {
    if (!hour) return "";

    return hour.split(":").slice(0, 2).join(":");
  };

  return { toISO, toLongDate, formatHour };
}
