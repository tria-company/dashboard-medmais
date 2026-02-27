"use client";

import { useState } from "react";
import CardBase from "@/components/dashboard/CardBase";
import type { AbsenceRow } from "@/lib/mock/ponto";
import { absenceTableData } from "@/lib/mock/ponto";

export default function AbsenceTable(): React.ReactElement {
  const [data] = useState<AbsenceRow[]>(absenceTableData);

  return (
    <CardBase className="flex flex-1 flex-col">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <h2 className="font-semibold text-lg text-[#2c3545]">Controle de Faltas</h2>
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
            aria-label="Cliente"
          >
            <option>Cliente</option>
          </select>
          <select
            className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
            aria-label="Tipo"
          >
            <option>Tipo</option>
          </select>
          <select
            className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
            aria-label="Mês"
          >
            <option>Mês</option>
          </select>
        </div>
      </div>
      <div className="min-w-0 overflow-x-auto pt-1">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs font-medium uppercase text-gray-500">
              <th className="pb-3 pr-4">Colaborador</th>
              <th className="pb-3 pr-4">Posto por Cliente</th>
              <th className="pb-3 pr-4">Turno</th>
              <th className="pb-3 pr-4 text-right">Faltas (mês)</th>
              <th className="pb-3">Tipo</th>
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
                <td className="py-3 pr-4 text-gray-600">{row.postoCliente}</td>
                <td className="py-3 pr-4 text-gray-600">{row.turno}</td>
                <td className="py-3 pr-4 text-right">
                  <span className="inline-flex rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                    {row.faltasMes}
                  </span>
                </td>
                <td className="py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      row.tipo === "Justificada"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {row.tipo}
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
