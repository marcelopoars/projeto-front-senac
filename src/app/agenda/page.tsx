"use client";
import { useState } from "react";
import { Calendar } from "./components";
import { Customer } from "./components";
import { TimeStamps } from "./components";
import { Schedule } from "./components";

export default function AgendaPage() {
  const [show, setShow] = useState("customer");
  return (
    <div className="flex flex-col items-center  mt-20">
      <div className="flex">
        <div className="flex flex-col">
          <Calendar />
          <TimeStamps />
        </div>
        {show === "customer" && <Customer setShow={setShow} />}

        {show === "schedule" && <Schedule setShow={setShow} />}
      </div>
    </div>
  );
}
