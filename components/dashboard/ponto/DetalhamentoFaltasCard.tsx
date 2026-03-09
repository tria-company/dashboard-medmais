"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import CardBase from "@/components/dashboard/CardBase";
import {
  detalhamentoFaltasData,
  detalhamentoFaltasTotal,
} from "@/lib/mock/ponto";

export default function DetalhamentoFaltasCard(): React.ReactElement {
  return (
    <CardBase
      title="Detalhamento de Faltas"
      titleAction={
        <div className="flex gap-2">
          <select className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700">
            <option>Contrato</option>
          </select>
          <select className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700">
            <option>Posto</option>
          </select>
        </div>
      }
      compact
    >
      <div className="flex flex-wrap items-center justify-center gap-8 pt-2">
        <div className="relative h-[200px] w-[200px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                formatter={(value) => [
                  Number(value).toLocaleString("pt-BR"),
                ]}
              />
              <Pie
                data={detalhamentoFaltasData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                dataKey="value"
                nameKey="label"
                stroke="none"
              >
                {detalhamentoFaltasData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] text-gray-500">Total</span>
            <span className="text-lg font-bold text-[#2c3545]">
              {detalhamentoFaltasTotal.toLocaleString("pt-BR")}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {detalhamentoFaltasData.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5 text-sm">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
                aria-hidden
              />
              <span className="text-gray-700">
                {item.label} —{" "}
                <strong>{item.value.toLocaleString("pt-BR")}</strong>
              </span>
            </div>
          ))}
        </div>
      </div>
    </CardBase>
  );
}
