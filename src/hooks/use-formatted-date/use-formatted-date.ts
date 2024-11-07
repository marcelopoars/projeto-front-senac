import { format } from "date-fns";

export function useFormattedDate() {
  function toISO(date: Date | string): string {
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    return format(parsedDate, "yyyy-MM-dd");
  }

  function toLongDate(date: Date | string): string {
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    return format(parsedDate, "dd/MM/yyyy");
  }

  return { toISO, toLongDate };
}
