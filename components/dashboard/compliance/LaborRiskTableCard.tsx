"use client";

import { useState } from "react";
import CardBase from "@/components/dashboard/CardBase";
import type { LaborRiskRow } from "@/lib/mock/compliance";
import { laborRiskTableData } from "@/lib/mock/compliance";

function getRiskBadgeClass(risco: LaborRiskRow["riscoGeral"]): string {
  switch (risco) {
    case "Alto":
      return "bg-red-600 text-white";
    case "Médio":
      return "bg-amber-500 text-white";
    case "Baixo":
      return "bg-green-600 text-white";
    default:
      return "bg-gray-200 text-gray-800";
  }
}

function getValueClass(
  value: number,
  column: "feriasVencidas" | "asosVencidos" | "nrsPendentes" | "jornadaIrregular" | "processos",
): string {
  if (value >= 5) return "text-red-600 font-medium";
  if (value >= 2) return "text-amber-600 font-medium";
  return "text-green-600 font-medium";
}

export default function LaborRiskTableCard(): React.ReactElement {
  const [data] = useState<LaborRiskRow[]>(laborRiskTableData);

  return (
    <CardBase className="flex flex-col">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Riscos Trabalhistas por Unidade
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
              <th className="pb-3 pr-4">Unidade</th>
              <th className="pb-3 pr-4 text-right">Férias Vencidas</th>
              <th className="pb-3 pr-4 text-right">ASOs Vencidos</th>
              <th className="pb-3 pr-4 text-right">NRs Pendentes</th>
              <th className="pb-3 pr-4 text-right">Jornada Irregular</th>
              <th className="pb-3 pr-4 text-right">Processos</th>
              <th className="pb-3 text-right">Risco Geral</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.unidade}
                className={`border-b border-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50/50" : ""
                }`}
              >
                <td className="py-3 pr-4 font-medium text-gray-800">
                  {row.unidade}
                </td>
                <td
                  className={`py-3 pr-4 text-right ${getValueClass(row.feriasVencidas, "feriasVencidas")}`}
                >
                  {row.feriasVencidas}
                </td>
                <td
                  className={`py-3 pr-4 text-right ${getValueClass(row.asosVencidos, "asosVencidos")}`}
                >
                  {row.asosVencidos}
                </td>
                <td
                  className={`py-3 pr-4 text-right ${getValueClass(row.nrsPendentes, "nrsPendentes")}`}
                >
                  {row.nrsPendentes}
                </td>
                <td
                  className={`py-3 pr-4 text-right ${getValueClass(row.jornadaIrregular, "jornadaIrregular")}`}
                >
                  {row.jornadaIrregular}
                </td>
                <td
                  className={`py-3 pr-4 text-right ${getValueClass(row.processos, "processos")}`}
                >
                  {row.processos}
                </td>
                <td className="py-3 text-right">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getRiskBadgeClass(row.riscoGeral)}`}
                  >
                    {row.riscoGeral}
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
