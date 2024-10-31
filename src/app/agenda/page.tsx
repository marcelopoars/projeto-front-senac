"use client";
import { useState } from "react";
import { Calendar } from "./components";
import { Customer } from "./components";
import { TimeStamps } from "./components";
import { Schedule } from "./components";

export default function AgendaPage() {
  const [show, setShow] = useState("customer");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen my-10">
      <div className="flex">
        <div className="flex flex-col items-center">
          <Calendar />

          <div className="border-t border-gray-500 w-4/5"></div>

          <TimeStamps />
        </div>
        {show === "customer" && <Customer setShow={setShow} />}

        {show === "schedule" && <Schedule />}
      </div>
    </div>
  );
}
