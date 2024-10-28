"use client";

import {Calendar} from "@nextui-org/calendar";
import {parseDate} from '@internationalized/date';

export default function Home() {
  return (
    <section>
        <div className="flex gap-x-4">
            <Calendar aria-label="Date (No Selection)" />
        </div>
    </section>
  );
}