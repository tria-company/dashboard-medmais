"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import CardBase from "@/components/dashboard/CardBase";
import {
  costProjectionData,
  costProjectionTotal,
} from "@/lib/mock/ferias";

export default function VacationCostProjectionCard(): React.ReactElement {
  return (
    <CardBase className="flex min-h-0 w-full flex-1 flex-col">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Projeção de Custos com Férias — 6 meses
        </h2>
        <select
          className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
          aria-label="Cliente"
        >
          <option>Cliente</option>
        </select>
      </div>
      <div className="flex flex-col gap-3 pt-1 md:flex-row md:items-center">
        <div className="shrink-0">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-xl font-bold text-[#2c3545]">
            R$ {costProjectionTotal}
          </p>
        </div>
        <div className="h-[160px] min-h-[160px] min-w-[180px] flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={costProjectionData}
              margin={{ top: 8, right: 8, left: 0, bottom: 24 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E4E4E7"
                horizontal={true}
                vertical={false}
              />
              <XAxis
                dataKey="mes"
                tick={{ fontSize: 11, fill: "#71717A" }}
                axisLine={{ stroke: "#E4E4E7" }}
                tickLine={false}
              />
              <YAxis
                domain={[0, 4000]}
                ticks={[0, 1000, 2000, 3000, 4000]}
                tick={{ fontSize: 10, fill: "#71717A" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `R$ ${v / 1000}k`}
                width={45}
              />
              <Line
                type="monotone"
                dataKey="valor1"
                stroke="#374151"
                strokeWidth={2}
                dot={{ r: 4, fill: "#374151", strokeWidth: 0 }}
                name="Série 1"
              />
              <Line
                type="monotone"
                dataKey="valor2"
                stroke="#22C55E"
                strokeWidth={2}
                dot={{ r: 4, fill: "#22C55E", strokeWidth: 0 }}
                name="Série 2"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CardBase>
  );
}
