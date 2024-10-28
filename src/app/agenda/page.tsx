"use client";

import {Calendar} from "@nextui-org/calendar";
import {parseDate} from '@internationalized/date';

export default function Home() {
  return (
    <section>
        <div className="flex-auto gap-x-4 bg-gray-200 text-black">
            <Calendar aria-label="Date (Controlled)" />
        </div>
    </section>
  );
}