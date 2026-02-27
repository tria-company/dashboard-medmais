"use client";

import { useEffect, useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import CardBase from "@/components/dashboard/CardBase";
import {
  vacationStatusData,
  vacationStatusDonutTotal,
} from "@/lib/mock/ferias";

const chartData = vacationStatusData.map((d) => ({
  name: d.label,
  value: d.count,
  fill: d.color,
  tooltipLabel: d.tooltipLabel ?? `${d.label} - ${d.count}`,
}));

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ tooltipLabel?: string; name?: string; value?: number; payload?: { tooltipLabel?: string } }>;
}): React.ReactElement | null {
  if (!active || !payload?.length) return null;
  const first = payload[0];
  const text =
    first?.tooltipLabel ?? first?.payload?.tooltipLabel ?? (first ? `${first.name} - ${first.value}` : "");
  return (
    <div
      className="relative rounded-lg border border-gray-200 bg-gray-200/95 px-3 py-2 text-sm font-medium text-gray-800 shadow-md"
      role="tooltip"
    >
      <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-gray-200 bg-gray-200/95" />
      <span className="relative z-10">{text}</span>
    </div>
  );
}

const PIE_SMALL = { innerRadius: 38, outerRadius: 55 };
const PIE_LARGE = { innerRadius: 48, outerRadius: 70 };

export default function VacationStatusCard(): React.ReactElement {
  const [isLg, setIsLg] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsLg(mq.matches);
    const handler = (): void => setIsLg(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  const pieRadius = isLg ? PIE_LARGE : PIE_SMALL;
  return (
    <CardBase className="flex min-h-0 w-full flex-1 flex-col">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Férias por Status
        </h2>
        <select
          className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
          aria-label="Cliente"
        >
          <option>Cliente</option>
        </select>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-4 pt-1 md:flex-row md:items-center">
        <div className="relative h-[140px] min-h-[140px] w-full max-w-[140px] shrink-0 md:mx-auto lg:h-[180px] lg:min-h-[180px] lg:max-w-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={pieRadius.innerRadius}
                outerRadius={pieRadius.outerRadius}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] text-gray-500">Total</span>
            <span className="text-base font-bold text-[#2c3545]">
              {vacationStatusDonutTotal}
            </span>
          </div>
        </div>
        <ul className="flex flex-1 flex-col gap-2">
          {vacationStatusData.map((item) => (
            <li
              key={item.label}
              className="flex items-center justify-between gap-3 rounded-lg bg-gray-100/80 px-3 py-2.5"
            >
              <span className="min-w-0 flex-1 text-sm font-medium text-gray-800">
                {item.label}
              </span>
              <span
                className="h-3 w-3 shrink-0 animate-pulse rounded-full"
                style={{
                  backgroundColor: item.color,
                  boxShadow: `0 0 10px 3px ${item.color}60`,
                }}
                aria-hidden
              />
              <span className="rounded-full bg-gray-200/90 px-2.5 py-1 text-sm font-semibold text-gray-800">
                {item.count}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </CardBase>
  );
}
