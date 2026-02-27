"use client";

import { useState } from "react";
import CardBase from "@/components/dashboard/CardBase";
import type { VagaPorUnidadeRow, SlaStatus } from "@/lib/mock/recrutamento";
import { vagasPorUnidadeData } from "@/lib/mock/recrutamento";

function getSlaClass(status: SlaStatus): string {
  switch (status) {
    case "Fora do SLA":
      return "text-red-600 font-medium";
    case "No Prazo":
      return "text-green-600 font-medium";
    case "Em Risco":
      return "text-amber-600 font-medium";
    default:
      return "text-gray-600";
  }
}

function formatCusto(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function PositionsByUnitTableCard(): React.ReactElement {
  const [data] = useState<VagaPorUnidadeRow[]>(vagasPorUnidadeData);

  return (
    <CardBase className="flex flex-col">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Vagas por Unidade
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
            aria-label="Vaga"
          >
            <option>Vaga</option>
          </select>
          <select
            className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
            aria-label="Unidade"
          >
            <option>Unidade</option>
          </select>
          <select
            className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
            aria-label="SLA"
          >
            <option>SLA</option>
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
            aria-label="Exportar CSV"
          >
            Exportar CSV
          </button>
        </div>
      </div>
      <div className="min-w-0 overflow-x-auto pt-1">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-xs font-medium uppercase text-gray-500">
              <th className="pb-3 pr-4 text-left">Vaga</th>
              <th className="pb-3 pr-4 text-center">Unidade</th>
              <th className="pb-3 pr-4 text-center">Dias em Aberto</th>
              <th className="pb-3 pr-4 text-center">Candidatos</th>
              <th className="pb-3 pr-4 text-center">SLA</th>
              <th className="pb-3 pr-4 text-center">Custo</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={`${row.vaga}-${row.unidade}-${index}`}
                className={`border-b border-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50/50" : ""
                }`}
              >
                <td className="py-3 pr-4 text-left font-medium text-gray-800">
                  {row.vaga}
                </td>
                <td className="py-3 pr-4 text-center text-gray-600">
                  {row.unidade}
                </td>
                <td className="py-3 pr-4 text-center text-gray-600">
                  {row.diasEmAberto} dias
                </td>
                <td className="py-3 pr-4 text-center text-gray-600">
                  {row.candidatos}
                </td>
                <td
                  className={`py-3 pr-4 text-center ${getSlaClass(
                    row.slaStatus
                  )}`}
                >
                  {row.slaStatus}
                </td>
                <td className="py-3 pr-4 text-center font-medium text-gray-800">
                  {formatCusto(row.custo)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardBase>
  );
}
