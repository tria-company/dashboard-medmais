"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import CardBase from "@/components/dashboard/CardBase";
import { dismissalReasonsData } from "@/lib/mock/turnover";

const chartData = dismissalReasonsData.map((d) => ({
  name: d.label,
  value: d.percent,
  fill: d.color,
}));

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { fill: string } }>;
}): React.ReactElement | null {
  if (!active || !payload?.length) return null;
  const first = payload[0];
  return (
    <div
      className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-md"
      role="tooltip"
    >
      <span className="font-medium text-gray-800">
        {first?.name}: {first?.value}%
      </span>
    </div>
  );
}

export default function DismissalReasonsCard(): React.ReactElement {
  return (
    <CardBase className="flex flex-col">
      <div className="mb-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Motivos de Desligamento
        </h2>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative mx-auto h-[200px] w-full max-w-[200px] shrink-0 md:mx-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="flex flex-1 flex-col gap-3">
          {dismissalReasonsData.map((item) => (
            <li
              key={item.label}
              className="flex items-center justify-between gap-3 rounded-lg bg-gray-100/90 px-3 py-2.5"
            >
              <span className="flex min-w-0 flex-1 items-center gap-2">
                <span className="text-sm text-gray-800">{item.label}</span>
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                  aria-hidden
                />
              </span>
              <span className="shrink-0 rounded-md bg-gray-200/90 px-2.5 py-1 text-sm font-medium text-gray-800">
                {item.percent}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </CardBase>
  );
}
