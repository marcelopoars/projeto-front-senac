export function toLongDate(date: string | null | Date): string {
  if (!date) return "";

  const dateString =
    date instanceof Date
      ? date.toISOString().split("T")[0]
      : date.split("T")[0];

  const [year, month, day] = dateString.split("-");

  return `${day}/${month}/${year}`;
}
