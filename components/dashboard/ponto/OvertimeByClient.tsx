"use client";

import CardBase from "@/components/dashboard/CardBase";
import { overtimeByClientData } from "@/lib/mock/ponto";

const MAX_H = Math.max(...overtimeByClientData.map((d) => d.horas));

export default function OvertimeByClient(): React.ReactElement {
  return (
    <CardBase className="flex flex-col">
      <div className="mb-6 border-b border-gray-100 pb-6">
        <h2 className="font-semibold text-lg text-[#2c3545]">Horas Extras / Cliente</h2>
      </div>
      <ul className="space-y-4 pt-1">
        {overtimeByClientData.map((item, index) => (
          <li key={index} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-sm text-gray-700">{item.cliente}</span>
            <div className="relative h-6 flex-1 overflow-hidden rounded bg-gray-200">
              <div
                className="absolute left-0 top-0 h-full rounded bg-gray-600"
                style={{ width: `${(item.horas / MAX_H) * 100}%` }}
              />
              <span
                className="absolute top-1/2 h-2 w-2 -translate-y-1/2 -translate-x-1/2 rounded-full border-2 border-white bg-gray-800 shadow-sm"
                style={{ left: `${(item.horas / MAX_H) * 100}%` }}
              />
            </div>
            <span className="shrink-0 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
              {item.horas}h
            </span>
          </li>
        ))}
      </ul>
    </CardBase>
  );
}
