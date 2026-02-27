"use client";

import CardBase from "@/components/dashboard/CardBase";
import { benefitsTotalRows } from "@/lib/mock/beneficios";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function BenefitsTotalByBenefitTableCard(): React.ReactElement {
  return (
    <CardBase className="flex flex-col pb-0">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Custo Total por Benefício
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700"
            aria-label="Benefício"
          >
            <option>Benefício</option>
            {benefitsTotalRows.map((row) => (
              <option key={row.beneficio}>{row.beneficio}</option>
            ))}
          </select>
          <div className="relative">
            <span
              className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              aria-hidden
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Buscar"
              className="w-40 rounded-lg border border-gray-200 bg-white py-1.5 pl-8 pr-3 text-sm text-gray-700 placeholder:text-gray-400"
              aria-label="Buscar benefício"
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
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="pb-3 pr-4 text-left font-semibold text-gray-700">
                Benefício
              </th>
              <th className="pb-3 pr-4 text-right font-semibold text-gray-700">
                Custo Total
              </th>
              <th className="pb-3 pr-4 text-right font-semibold text-gray-700">
                % da Folha
              </th>
              <th className="pb-3 pr-4 text-right font-semibold text-gray-700">
                Colaboradores
              </th>
              <th className="pb-3 pr-4 text-right font-semibold text-gray-700">
                Custo Médio
              </th>
              <th className="pb-3 text-right font-semibold text-gray-700">
                Coparticipação
              </th>
            </tr>
          </thead>
          <tbody>
            {benefitsTotalRows.map((row, index) => (
              <tr
                key={row.beneficio}
                className={`border-b border-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50/60" : ""
                }`}
              >
                <td className="py-3 pr-4 text-gray-800">{row.beneficio}</td>
                <td className="py-3 pr-4 text-right text-gray-700">
                  {formatCurrency(row.custoTotal)}
                </td>
                <td className="py-3 pr-4 text-right text-gray-700">
                  {row.percentFolha.toFixed(1)}%
                </td>
                <td className="py-3 pr-4 text-right text-gray-700">
                  {row.colaboradores.toLocaleString("pt-BR")}
                </td>
                <td className="py-3 pr-4 text-right text-gray-700">
                  {formatCurrency(row.custoMedio)}
                </td>
                <td className="py-3 pr-4 text-right text-gray-700">
                  {formatCurrency(row.coparticipacao)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardBase>
  );
}

