"use client";

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CardBase from "@/components/dashboard/CardBase";
import { trainingCostByCategory } from "@/lib/mock/training";

const REALIZADOS_COLOR = "#B45309";
const PENDENTES_COLOR = "#D4B896";

const AXIS_LABEL_COLOR = "#63716E";
const TICK_FONT_SIZE = 10;

function formatYAxis(value: number): string {
  if (value >= 1000) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return value.toString();
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
  label?: string;
}): React.ReactElement | null {
  if (!active || !payload?.length || !label) return null;
  return (
    <div
      className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-md"
      role="tooltip"
    >
      <p className="mb-2 font-medium text-gray-800">{label}</p>
      <ul className="flex flex-col gap-1">
        {payload.map((entry) => (
          <li key={entry.name} className="text-gray-700">
            {entry.name}: {entry.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

function darkenHex(hex: string, percent: number): string {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.max(0, ((num >> 16) & 0xff) * (1 - percent / 100));
  const g = Math.max(0, ((num >> 8) & 0xff) * (1 - percent / 100));
  const b = Math.max(0, (num & 0xff) * (1 - percent / 100));
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

export default function CostByClientGroupedBarsCard(): React.ReactElement {
  const maxVal = Math.max(
    ...trainingCostByCategory.flatMap((d) => [d.realizados, d.pendentes])
  );
  const yDomain: [number, number] = [0, 1600];
  const yTicks = [0, 500, 1100, 1300, 1500];

  return (
    <CardBase className="flex flex-col">
      <div className="mb-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Custo por Cliente
        </h2>
      </div>
      <div className="h-[320px] w-full min-w-0 lg:h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={trainingCostByCategory}
            margin={{ top: 8, right: 16, left: 8, bottom: 32 }}
            barCategoryGap="20%"
            barGap={8}
          >
            <defs>
              <linearGradient
                id="realizados-bar"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={REALIZADOS_COLOR} stopOpacity={0.9} />
                <stop offset="100%" stopColor={darkenHex(REALIZADOS_COLOR, 20)} />
              </linearGradient>
              <linearGradient
                id="pendentes-bar"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={PENDENTES_COLOR} stopOpacity={0.95} />
                <stop offset="100%" stopColor={darkenHex(PENDENTES_COLOR, 15)} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="categoria"
              tick={{ fontSize: TICK_FONT_SIZE, fill: AXIS_LABEL_COLOR }}
              axisLine={{ stroke: "#E4E4E7" }}
              tickLine={false}
              height={40}
              interval={0}
            />
            <YAxis
              domain={yDomain}
              ticks={yTicks}
              tick={{ fontSize: TICK_FONT_SIZE, fill: AXIS_LABEL_COLOR }}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatYAxis}
              width={36}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
            <Legend
              align="right"
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: 8 }}
              formatter={(value) => (
                <span className="text-sm text-gray-700">{value}</span>
              )}
              iconType="square"
              iconSize={10}
            />
            <Bar
              dataKey="realizados"
              name="Realizados"
              fill="url(#realizados-bar)"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="pendentes"
              name="Pendentes"
              fill="url(#pendentes-bar)"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardBase>
  );
}
