"use client";

import { useState } from "react";
import CardBase from "@/components/dashboard/CardBase";
import type { OverdueTrainingRow } from "@/lib/mock/training";
import { overdueTrainingRows } from "@/lib/mock/training";

function getRiscoBadgeClass(risco: OverdueTrainingRow["risco"]): string {
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

function getDiasAtrasadoClass(dias: number): string {
  if (dias >= 60) return "font-medium text-red-600";
  return "font-medium text-amber-600";
}

export default function OverdueTrainingTableCard(): React.ReactElement {
  const [data] = useState<OverdueTrainingRow[]>(overdueTrainingRows);

  return (
    <CardBase className="flex flex-col">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Colaboradores com Treinamentos Vencidos
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
            aria-label="Unidade"
          >
            <option value="">Unidade</option>
            <option value="petrobras">Petrobras SP</option>
            <option value="vale">Vale RJ</option>
            <option value="jbs">JBS GO</option>
          </select>
          <select
            className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
            aria-label="Risco"
          >
            <option value="">Risco</option>
            <option value="alto">Alto</option>
            <option value="medio">Médio</option>
            <option value="baixo">Baixo</option>
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
              className="w-36 rounded-lg border border-[#E4E4E7] bg-white py-2 pl-8 pr-3 text-sm text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
              aria-label="Buscar"
            />
          </div>
          <button
            type="button"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Exportar CSV
          </button>
        </div>
      </div>
      <div className="min-w-0 overflow-x-auto pt-1">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="pb-3 pr-4 text-left font-semibold text-gray-700">
                Colaborador
              </th>
              <th className="pb-3 pr-4 text-left font-semibold text-gray-700">
                Unidade
              </th>
              <th className="pb-3 pr-4 text-left font-semibold text-gray-700">
                Treinamento
              </th>
              <th className="pb-3 pr-4 text-left font-semibold text-gray-700">
                Vencido em
              </th>
              <th className="pb-3 pr-4 text-right font-semibold text-gray-700">
                Dias Atrasado
              </th>
              <th className="pb-3 pl-4 text-center font-semibold text-gray-700">
                Risco
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={`${row.colaborador}-${row.treinamento}-${index}`}
                className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/80"
              >
                <td className="py-4 pr-4 font-medium text-gray-800">
                  {row.colaborador}
                </td>
                <td className="py-4 pr-4 text-gray-700">{row.unidade}</td>
                <td className="py-4 pr-4 text-gray-700">{row.treinamento}</td>
                <td className="py-4 pr-4 text-gray-700">{row.vencidoEm}</td>
                <td
                  className={`py-4 pr-4 text-right ${getDiasAtrasadoClass(row.diasAtrasado)}`}
                >
                  {row.diasAtrasado} dias
                </td>
                <td className="py-4 pl-4 text-center">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getRiscoBadgeClass(row.risco)}`}
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
