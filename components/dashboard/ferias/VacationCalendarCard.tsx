"use client";

import { useMemo, useState } from "react";
import CardBase from "@/components/dashboard/CardBase";
import {
  calendarEventDays,
  MONTHS,
  MONTHS_SHORT,
  WEEKDAY_LETTERS,
} from "@/lib/mock/ferias";

type DayStatus = "ferias" | "medio" | "alto" | null;

function getStatusForDay(day: number, events: { day: number; status: DayStatus }[]): DayStatus {
  const found = events.find((e) => e.day === day);
  return found?.status ?? null;
}

export default function VacationCalendarCard(): React.ReactElement {
  const [current, setCurrent] = useState(() => new Date(2026, 1, 1));
  const [selectedYear] = useState(2026);

  const year = current.getFullYear();
  const month = current.getMonth();
  const monthName = MONTHS[month];

  const eventsByDay = useMemo(() => {
    return calendarEventDays.map((e) => ({ day: e.day, status: e.status }));
  }, []);

  const { firstDayOfWeek, daysInMonth } = useMemo(() => {
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    return {
      firstDayOfWeek: first.getDay(),
      daysInMonth: last.getDate(),
    };
  }, [year, month]);

  const blanks = Array.from({ length: firstDayOfWeek }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <CardBase className="flex h-full w-full flex-col">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Calendário de Férias
        </h2>
        <select
          className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
          aria-label="Cliente"
        >
          <option>Cliente</option>
        </select>
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-4 overflow-x-auto px-3 pt-3 sm:overflow-visible sm:px-4 md:flex-row md:items-center md:gap-5 md:px-6">
        <div className="mx-auto w-full min-w-[260px] md:mx-0 md:min-w-0 md:flex-1">
          <div className="mb-2 flex items-center justify-between sm:mb-4">
            <button
              type="button"
              onClick={() =>
                setCurrent((d) => new Date(d.getFullYear(), d.getMonth() - 1))
              }
              className="rounded p-1.5 text-gray-600 hover:bg-gray-100 sm:p-2.5"
              aria-label="Mês anterior"
            >
              <span className="text-xl sm:text-2xl">‹</span>
            </button>
            <span className="text-sm font-medium text-[#2c3545] sm:text-lg">
              {monthName} {year}
            </span>
            <button
              type="button"
              onClick={() =>
                setCurrent((d) => new Date(d.getFullYear(), d.getMonth() + 1))
              }
              className="rounded p-1.5 text-gray-600 hover:bg-gray-100 sm:p-2.5"
              aria-label="Próximo mês"
            >
              <span className="text-xl sm:text-2xl">›</span>
            </button>
          </div>
          <div className="grid w-full grid-cols-7 gap-1 text-center sm:gap-2 [min-inline-size:0]">
            {WEEKDAY_LETTERS.map((letter, i) => (
              <div
                key={i}
                className="py-1 text-xs font-medium text-gray-500 sm:py-2 sm:text-base"
              >
                {letter}
              </div>
            ))}
            {blanks.map((i) => (
              <div key={`b-${i}`} className="aspect-square min-w-0" />
            ))}
            {days.map((day) => {
              const status = getStatusForDay(day, eventsByDay);
              const bg =
                status === "ferias"
                  ? "bg-blue-500 text-white"
                  : status === "medio"
                    ? "bg-amber-400 text-gray-900"
                    : status === "alto"
                      ? "bg-red-500 text-white"
                      : "border border-gray-200 bg-white text-gray-800";
              return (
                <div
                  key={day}
                  className={`flex aspect-square min-w-0 items-center justify-center rounded-full text-xs font-medium sm:text-base ${bg}`}
                >
                  {day}
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-600 sm:mt-5 sm:gap-6 sm:text-base">
            <span className="flex items-center gap-1.5 sm:gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500 sm:h-3.5 sm:w-3.5" />
              Férias
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400 sm:h-3.5 sm:w-3.5" />
              Médio
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500 sm:h-3.5 sm:w-3.5" />
              Alto volume
            </span>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-center gap-2 border-l-0 border-gray-100 pt-2 md:min-w-[110px] md:border-l md:pl-5 md:pr-2 md:pt-0 lg:min-w-[130px] lg:gap-2.5 lg:pl-6 lg:pr-3">
          <span className="border-b border-gray-200 pb-1 text-sm font-medium text-[#2c3545] sm:pb-2 sm:text-lg">
            {selectedYear}
          </span>
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5">
            {MONTHS_SHORT.map((m, i) => (
              <button
                key={m}
                type="button"
                onClick={() =>
                  setCurrent(new Date(selectedYear, i, 1))
                }
                className={`rounded-lg px-2.5 py-1 text-xs font-medium sm:px-4 sm:py-2 sm:text-base ${
                  i === month && year === selectedYear
                    ? "bg-[#2c3545] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>
    </CardBase>
  );
}
