"use client";

import CardBase from "@/components/dashboard/CardBase";
import { pendingDocsByClientData } from "@/lib/mock/compliance";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function getBarColor(value: number, max: number): string {
  const ratio = value / max;
  if (ratio > 0.7) return "#EF4444";
  if (ratio > 0.5) return "#F59E0B";
  return "#22C55E";
}

export default function PendingDocsByClientCard(): React.ReactElement {
  const max = Math.max(...pendingDocsByClientData.map((d) => d.value));

  return (
    <CardBase title="Documentos Pendentes por Cliente">
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={pendingDocsByClientData}
            margin={{ top: 10, right: 10, left: -10, bottom: 10 }}
          >
            <XAxis
              dataKey="cliente"
              tick={{ fontSize: 11, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
              angle={-35}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value: number) => [
                value.toLocaleString("pt-BR"),
                "Documentos",
              ]}
              contentStyle={{
                borderRadius: "8px",
                fontSize: "12px",
                border: "1px solid #E4E4E7",
              }}
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
              {pendingDocsByClientData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={getBarColor(entry.value, max)}
                  fillOpacity={0.85}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardBase>
  );
}
