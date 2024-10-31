import ReactCalendar from "react-calendar";

import "./styles.css";

export function Calendar() {
  return (
    <div suppressHydrationWarning>
      <ReactCalendar locale="pt-BR" />
    </div>
  );
}
