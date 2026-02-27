"use client";

import { useState } from "react";
import CardBase from "@/components/dashboard/CardBase";
import type { ExpiredVacationRow } from "@/lib/mock/ferias";
import { expiredVacationTableData } from "@/lib/mock/ferias";

export default function ExpiredVacationTableCard(): React.ReactElement {
  const [data] = useState<ExpiredVacationRow[]>(expiredVacationTableData);

  return (
    <CardBase className="flex flex-1 flex-col">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Colaboradores com Férias Vencidas
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
            aria-label="Cliente"
          >
            <option>Cliente</option>
          </select>
          <select
            className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
            aria-label="Risco"
          >
            <option>Risco</option>
          </select>
          <div className="relative">
            <span
              className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              aria-hidden
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Buscar"
              className="w-36 rounded-lg border border-[#E4E4E7] bg-white py-1.5 pl-8 pr-3 text-sm text-gray-700 placeholder:text-gray-400"
              aria-label="Buscar"
            />
          </div>
          <button
            type="button"
            className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Exportar CSV
          </button>
        </div>
      </div>
      <div className="min-w-0 overflow-x-auto pt-1">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs font-medium uppercase text-gray-500">
              <th className="pb-3 pr-4">Colaborador</th>
              <th className="pb-3 pr-4">Matricula</th>
              <th className="pb-3 pr-4">Unidade</th>
              <th className="pb-3 pr-4">Cliente</th>
              <th className="pb-3 pr-4 text-right">Dias Vencidos</th>
              <th className="pb-3 pr-4">Período Aquisitivo</th>
              <th className="pb-3">Risco</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={`border-b border-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50/50" : ""
                }`}
              >
                <td className="py-3 pr-4 font-medium text-gray-800">
                  {row.colaborador}
                </td>
                <td className="py-3 pr-4 text-gray-600">{row.matricula}</td>
                <td className="py-3 pr-4 text-gray-600">{row.unidade}</td>
                <td className="py-3 pr-4 text-gray-600">{row.cliente}</td>
                <td className="py-3 pr-4 text-right font-medium text-red-600">
                  {row.diasVencidos}
                </td>
                <td className="py-3 pr-4 text-gray-600">
                  {row.periodoAquisitivo}
                </td>
                <td className="py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${
                      row.risco === "Alto" ? "bg-red-600" : "bg-orange-500"
                    }`}
                  >
                    {row.risco}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardBase>
  );
}
