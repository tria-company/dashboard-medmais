"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import CardBase from "@/components/dashboard/CardBase";
import { salaryBenefitsBreakdown } from "@/lib/mock/costs";

const chartData = salaryBenefitsBreakdown.map((d) => ({
  name: d.label,
  value: d.value,
  fill: d.color,
}));

function formatCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `R$ ${(value / 1_000_000).toFixed(1).replace(".", ",")}M`;
  }
  if (value >= 1_000) {
    return `R$ ${(value / 1_000).toFixed(0)}k`;
  }
  return `R$ ${value}`;
}

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
        {first?.name}: {first?.value != null ? formatCurrency(first.value) : ""}
      </span>
    </div>
  );
}

export default function SalaryBenefitsDonutCard(): React.ReactElement {
  return (
    <CardBase className="flex flex-col" compact>
      <div className="mb-3 border-b border-gray-100 pb-3">
        <h2 className="font-semibold text-base text-[#2c3545]">
          Salário e Benefícios
        </h2>
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative mx-auto h-[120px] w-full max-w-[120px] shrink-0 md:mx-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={28}
                outerRadius={45}
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
        <ul className="flex flex-1 flex-col gap-2">
          {salaryBenefitsBreakdown.map((item) => (
            <li
              key={item.label}
              className="flex items-center justify-between gap-2 rounded-lg bg-gray-100/90 px-2.5 py-2"
            >
              <span className="flex min-w-0 flex-1 items-center gap-2">
                <span className="text-sm text-gray-800">{item.label}</span>
                <span
                  className="h-3 w-3 shrink-0 rounded-full animate-pulse"
                  style={{ backgroundColor: item.color }}
                  aria-hidden
                />
              </span>
              <span className="shrink-0 text-right text-sm font-medium text-gray-800">
                {formatCurrency(item.value)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </CardBase>
  );
}
