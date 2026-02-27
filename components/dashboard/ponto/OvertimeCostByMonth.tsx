"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import CardBase from "@/components/dashboard/CardBase";
import {
  overtimeCostByMonthData,
  overtimeCostTotalAno,
} from "@/lib/mock/ponto";

export default function OvertimeCostByMonth(): React.ReactElement {
  const maxVal = Math.max(...overtimeCostByMonthData.map((d) => d.valor));

  return (
    <CardBase className="flex flex-col">
      <div className="mb-6 border-b border-gray-100 pb-6">
        <h2 className="font-semibold text-lg text-[#2c3545]">Custo de H.E. / Mês</h2>
      </div>
      <p className="pt-1 text-2xl font-bold text-[#2c3545]">
        R$ {overtimeCostTotalAno}
      </p>
      <p className="mb-6 text-sm text-gray-500">Total no ano</p>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={overtimeCostByMonthData}
            margin={{ top: 8, right: 8, left: 0, bottom: 24 }}
          >
            <XAxis
              dataKey="mes"
              tick={{ fontSize: 11, fill: "#71717A" }}
              axisLine={{ stroke: "#E4E4E7" }}
              tickLine={false}
            />
            <YAxis
              domain={[0, Math.ceil(maxVal / 5000) * 5000]}
              tick={{ fontSize: 10, fill: "#71717A" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `R$ ${v / 1000}k`}
              width={40}
            />
            <Bar
              dataKey="valor"
              fill="#9CA3AF"
              radius={[4, 4, 0, 0]}
              name="Custo"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardBase>
  );
}
