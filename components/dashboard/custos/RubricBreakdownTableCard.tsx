"use client";

import CardBase from "@/components/dashboard/CardBase";
import {
  rubricDetailsRows,
  type RubricDetailRow,
} from "@/lib/mock/costs";

const MONTHS_OPTIONS = [
  "Janeiro/2025",
  "Fevereiro/2025",
  "Março/2025",
  "Abril/2025",
  "Maio/2025",
  "Junho/2025",
  "Julho/2025",
  "Agosto/2025",
  "Setembro/2025",
  "Outubro/2025",
  "Novembro/2025",
  "Dezembro/2025",
];

function formatValor(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function TendenciaIcon({
  tendencia,
}: {
  tendencia: RubricDetailRow["tendencia"];
}): React.ReactElement {
  if (tendencia === "up") {
    return (
      <span className="text-red-600" aria-label="Tendência de alta">
        ↑
      </span>
    );
  }
  if (tendencia === "down") {
    return (
      <span className="text-green-600" aria-label="Tendência de baixa">
        ↓
      </span>
    );
  }
  return (
    <span className="text-gray-500" aria-label="Tendência neutra">
      →
    </span>
  );
}

export default function RubricBreakdownTableCard(): React.ReactElement {
  return (
    <CardBase className="flex flex-col pb-0">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Detalhamento por Rubrica — Janeiro/2025
        </h2>
        <div className="flex items-center gap-2">
          <label htmlFor="rubric-month" className="text-sm text-gray-600">
            Mês
          </label>
          <select
            id="rubric-month"
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
            defaultValue="Janeiro/2025"
          >
            {MONTHS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="min-w-0 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="pb-4 pr-4 text-left font-semibold text-gray-700">
                Rubrica
              </th>
              <th className="pb-4 pr-4 text-right font-semibold text-gray-700">
                Valor (R$)
              </th>
              <th className="pb-4 pr-4 text-right font-semibold text-gray-700">
                % da Folha
              </th>
              <th className="pb-4 pr-4 text-right font-semibold text-gray-700">
                Var. vs Anterior
              </th>
              <th className="pb-4 pl-4 text-center font-semibold text-gray-700">
                Tendência
              </th>
            </tr>
          </thead>
          <tbody>
            {rubricDetailsRows.map((row) => (
              <tr
                key={row.rubrica}
                className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/80"
              >
                <td className="py-5 pr-4 font-medium text-gray-800">
                  {row.rubrica}
                </td>
                <td className="py-5 pr-4 text-right text-gray-700">
                  {formatValor(row.valor)}
                </td>
                <td className="py-5 pr-4 text-right text-gray-700">
                  {row.percentFolha.toFixed(1)}%
                </td>
                <td
                  className={`py-5 pr-4 text-right font-medium ${
                    row.varVsAnterior >= 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {row.varVsAnterior >= 0 ? "+" : ""}
                  {row.varVsAnterior.toFixed(1)}%
                </td>
                <td className="py-5 pl-4 text-center">
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
