"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import CardBase from "@/components/dashboard/CardBase";
import {
  absenceStatsFeminino,
  absenceStatsMasculino,
  absenceStatsTotals,
} from "@/lib/mock/ponto";

/** Cores duplas: linha externa (mais escura) e interna (mais clara) para efeito duas linhas */
const MASCULINO_COLORS = [
  { outer: "#2563EB", inner: "#93C5FD" },
  { outer: "#9CA3AF", inner: "#E5E7EB" },
];
const FEMININO_COLORS = [
  { outer: "#EA580C", inner: "#FDBA74" },
  { outer: "#9CA3AF", inner: "#E5E7EB" },
];

export default function AbsenceStatsCard(): React.ReactElement {
  const dataM = absenceStatsMasculino.map((d, i) => ({
    name: d.label,
    value: d.value,
    fill: d.color,
    fillOuter: MASCULINO_COLORS[i]?.outer ?? d.color,
    fillInner: MASCULINO_COLORS[i]?.inner ?? d.color,
  }));
  const dataF = absenceStatsFeminino.map((d, i) => ({
    name: d.label,
    value: d.value,
    fill: d.color,
    fillOuter: FEMININO_COLORS[i]?.outer ?? d.color,
    fillInner: FEMININO_COLORS[i]?.inner ?? d.color,
  }));

  return (
    <CardBase className="flex flex-1 flex-col">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <h2 className="font-semibold text-lg text-[#2c3545]">Estatísticas de Faltas</h2>
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
            aria-label="Período"
          >
            <option>Janeiro 26</option>
          </select>
          <select
            className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
            aria-label="Unidade"
          >
            <option>Petrobrás</option>
          </select>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-8 pt-1 md:flex-row md:justify-around">
        <div className="relative h-[220px] w-full max-w-[220px] mx-auto md:mx-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataM}
                cx="50%"
                cy="50%"
                innerRadius={68}
                outerRadius={80}
                dataKey="value"
                stroke="none"
              >
                {dataM.map((entry, i) => (
                  <Cell key={`m-outer-${i}`} fill={entry.fillOuter} />
                ))}
              </Pie>
              <Pie
                data={dataM}
                cx="50%"
                cy="50%"
                innerRadius={56}
                outerRadius={66}
                dataKey="value"
                stroke="none"
              >
                {dataM.map((entry, i) => (
                  <Cell key={`m-inner-${i}`} fill={entry.fillInner} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-gray-500">Masculino</span>
            <span className="text-lg font-semibold text-[#2c3545]">5423</span>
          </div>
        </div>
        <div className="relative h-[220px] w-full max-w-[220px] mx-auto md:mx-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataF}
                cx="50%"
                cy="50%"
                innerRadius={68}
                outerRadius={80}
                dataKey="value"
                stroke="none"
              >
                {dataF.map((entry, i) => (
                  <Cell key={`f-outer-${i}`} fill={entry.fillOuter} />
                ))}
              </Pie>
              <Pie
                data={dataF}
                cx="50%"
                cy="50%"
                innerRadius={56}
                outerRadius={66}
                dataKey="value"
                stroke="none"
              >
                {dataF.map((entry, i) => (
                  <Cell key={`f-inner-${i}`} fill={entry.fillInner} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-gray-500">Feminino</span>
            <span className="text-lg font-semibold text-[#2c3545]">4820</span>
          </div>
        </div>
      </div>
      <ul className="mt-6 space-y-2 border-t border-gray-100 pt-4">
        <li className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total de Faltas</span>
          <span className="font-medium text-gray-800">
            {absenceStatsTotals.totalFaltas}
          </span>
        </li>
        <li className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Justificadas</span>
          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            {absenceStatsTotals.justificadas}
          </span>
        </li>
        <li className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Injustificadas</span>
          <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
            {absenceStatsTotals.injustificadas}
          </span>
        </li>
        <li className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Horas Extras</span>
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
            {absenceStatsTotals.horasExtras}
          </span>
        </li>
      </ul>
    </CardBase>
  );
}
