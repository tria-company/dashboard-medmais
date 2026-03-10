"use client";

import { useState } from "react";
import CardBase from "@/components/dashboard/CardBase";
import { pendingDocsData } from "@/lib/mock/compliance";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const FILTER_OPTIONS = ["Contrato", "Unidade", "Cliente"] as const;

export default function PendingDocsDonutCard(): React.ReactElement {
  const [filter, setFilter] = useState<string>("Contrato");
  const total = pendingDocsData.reduce((sum, d) => sum + d.value, 0);

  return (
    <CardBase
      title="Documentos Pendentes"
      titleAction={
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 outline-none"
        >
          {FILTER_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      }
    >
      <div className="flex items-center gap-6">
        {/* Donut */}
        <div className="relative h-[200px] w-[200px] flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pendingDocsData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                dataKey="value"
                stroke="none"
                paddingAngle={2}
              >
                {pendingDocsData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.[0]) return null;
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-md">
                      <span
                        className="text-xs font-semibold"
                        style={{ color: data.color }}
                      >
                        {data.label}: {data.value.toLocaleString("pt-BR")}
                      </span>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend Table */}
        <div className="flex flex-1 flex-col gap-0">
          {pendingDocsData.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-gray-100 py-3 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">{item.label}</span>
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
              <span className="text-sm font-medium text-gray-900">
                {item.value.toLocaleString("pt-BR")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </CardBase>
  );
}
