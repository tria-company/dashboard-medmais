"use client";

import { useState } from "react";
import CardBase from "@/components/dashboard/CardBase";
import { heatmapData, heatmapLegend, heatmapUnidadeOptions } from "@/lib/mock/ponto";

const DAYS = ["Segunda", "Terça", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];

function getHeatmapColor(value: number): string {
  if (value < 1) return "#DCFCE7";
  if (value < 2) return "#BBF7D0";
  if (value < 4) return "#FEF08A";
  if (value < 6) return "#FECACA";
  return "#DC2626";
}

export default function AbsenceHeatmap(): React.ReactElement {
  const [unidade, setUnidade] = useState(heatmapUnidadeOptions[0]);

  return (
    <CardBase className="overflow-hidden">
      <div className="mb-6 flex flex-col items-center gap-2 border-b border-gray-100 pb-6 text-center">
        <p className="text-lg font-semibold text-[#2c3545]">
          Mapa de Calor - Absenteísmo por Unidade
        </p>
        <select
          value={unidade}
          onChange={(e) => setUnidade(e.target.value)}
          className="rounded-lg border border-[#E4E4E7] bg-white px-4 py-2 text-lg font-bold text-[#2c3545]"
          aria-label="Unidade"
        >
          {heatmapUnidadeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div className="min-w-0 overflow-x-auto pt-1">
        <table className="w-full border-collapse" role="grid">
          <thead>
            <tr>
              <th className="w-24 border border-gray-200 bg-gray-50 p-2 text-left text-xs font-medium text-gray-600" />
              {DAYS.map((day) => (
                <th
                  key={day}
                  className="min-w-[80px] border border-gray-200 bg-gray-50 p-2 text-center text-xs font-medium text-gray-600"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {heatmapData.map((row, wi) => (
              <tr key={wi}>
                <td className="border border-gray-200 bg-gray-50 p-2 text-xs font-medium text-gray-600">
                  Semana {wi + 1}
                </td>
                {row.map((val, di) => (
                  <td
                    key={di}
                    className="border border-gray-200 p-2 text-center text-sm font-medium text-gray-800"
                    style={{ backgroundColor: getHeatmapColor(val) }}
                  >
                    {val.toFixed(1)}%
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
        {heatmapLegend.map((item) => (
          <span
            key={item.label}
            className="flex items-center gap-1.5 text-xs text-gray-600"
          >
            <span
              className="h-4 w-6 rounded border border-gray-200"
              style={{ backgroundColor: item.color }}
            />
            {item.label}
          </span>
        ))}
      </div>
    </CardBase>
  );
}
