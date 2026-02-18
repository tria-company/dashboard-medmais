"use client";

import { useState } from "react";
import CardBase from "@/components/dashboard/CardBase";
import type { TurnoverUnitRow } from "@/lib/mock/turnover";
import { turnoverUnitsTableData } from "@/lib/mock/turnover";

function TendenciaIcon({ tendencia }: { tendencia: TurnoverUnitRow["tendencia"] }): React.ReactElement {
  if (tendencia === "up") {
    return (
      <span className="text-red-600" aria-label="Tendência alta">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17l10-10M7 7v10h10" />
        </svg>
      </span>
    );
  }
  if (tendencia === "down") {
    return (
      <span className="text-green-600" aria-label="Tendência baixa">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 7l10 10M7 17V7h10" />
        </svg>
      </span>
    );
  }
  return (
    <span className="text-gray-400" aria-label="Estável">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14" />
      </svg>
    </span>
  );
}

function getTurnoverBadgeClass(turnover: number): string {
  if (turnover >= 4) return "bg-red-600 text-white";
  if (turnover >= 2) return "bg-amber-500 text-white";
  return "bg-green-600 text-white";
}

export default function TurnoverUnitsTableCard(): React.ReactElement {
  const [data] = useState<TurnoverUnitRow[]>(turnoverUnitsTableData);

  return (
    <CardBase className="flex flex-col">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Unidades com Maior Turnover
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
            aria-label="Unidade"
          >
            <option>Unidade</option>
          </select>
          <select
            className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
            aria-label="Cliente"
          >
            <option>Cliente</option>
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
              <th className="pb-3 pr-4">Unidade</th>
              <th className="pb-3 pr-4">Cliente</th>
              <th className="pb-3 pr-4 text-right">Headcount</th>
              <th className="pb-3 pr-4 text-right">Admissões</th>
              <th className="pb-3 pr-4 text-right">Desligamentos</th>
              <th className="pb-3 pr-4 text-right">Turnover</th>
              <th className="pb-3 text-center">Tendência</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={`${row.unidade}-${row.cliente}`}
                className={`border-b border-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50/50" : ""
                }`}
              >
                <td className="py-3 pr-4 font-medium text-gray-800">
                  {row.unidade}
                </td>
                <td className="py-3 pr-4 text-gray-600">{row.cliente}</td>
                <td className="py-3 pr-4 text-right text-gray-600">
                  {row.headcount}
                </td>
                <td className="py-3 pr-4 text-right font-medium text-green-600">
                  {row.admissoes}
                </td>
                <td className="py-3 pr-4 text-right font-medium text-red-600">
                  {row.desligamentos}
                </td>
                <td className="py-3 pr-4 text-right">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getTurnoverBadgeClass(row.turnover)}`}
                  >
                    {row.turnover}%
                  </span>
                </td>
                <td className="py-3 text-center">
                  <TendenciaIcon tendencia={row.tendencia} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardBase>
  );
}
