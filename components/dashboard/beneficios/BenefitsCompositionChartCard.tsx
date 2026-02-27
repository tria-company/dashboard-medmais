"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CardBase from "@/components/dashboard/CardBase";
import { benefitsComposition12m } from "@/lib/mock/beneficios";

const STACK_KEYS = [
  { key: "planoSaude", name: "Plano de saúde", color: "#22C55E" },
  { key: "valeTransporte", name: "Vale transporte", color: "#3B82F6" },
  { key: "valeRefeicao", name: "Vale refeição", color: "#EAB308" },
  { key: "seguroVida", name: "Seguro de vida", color: "#DC2626" },
] as const;

function formatCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `R$ ${(value / 1_000_000).toFixed(0)}M`;
  }
  if (value >= 1_000) {
    return `R$ ${(value / 1_000).toFixed(0)}k`;
  }
  return `R$ ${value}`;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
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
          <li key={entry.name} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: entry.color }}
              aria-hidden
            />
            <span className="text-gray-700">
              {entry.name}: {formatCurrency(entry.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const Y_TICKS = [0, 500_000, 1_000_000, 5_000_000, 10_000_000];
const Y_DOMAIN: [number, number] = [0, 10_000_000];

export default function BenefitsCompositionChartCard(): React.ReactElement {
  return (
    <CardBase className="flex flex-col">
      <div className="mb-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Composição de Custos — 12 meses
        </h2>
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-5">
        {STACK_KEYS.map(({ name, color }) => (
          <span key={name} className="flex items-center gap-2">
            <span
              className="h-3 w-4 shrink-0 rounded-sm"
              style={{ backgroundColor: color }}
              aria-hidden
            />
            <span className="text-sm text-gray-700">{name}</span>
          </span>
        ))}
      </div>
      <div className="h-[420px] w-full min-w-0 lg:h-[460px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={benefitsComposition12m}
            margin={{ top: 56, right: 16, left: 8, bottom: 24 }}
            barCategoryGap="12%"
            barGap={2}
          >
            <XAxis
              dataKey="mes"
              tick={{ fontSize: 10, fill: "#63716E" }}
              axisLine={{ stroke: "#E4E4E7" }}
              tickLine={false}
            />
            <YAxis
              domain={Y_DOMAIN}
              ticks={Y_TICKS}
              tick={{ fontSize: 10, fill: "#63716E" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => formatCurrency(v)}
              width={48}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
            />
            {STACK_KEYS.map(({ key, name, color }) => (
              <Bar
                key={key}
                dataKey={key}
                name={name}
                stackId="stack"
                fill={color}
                radius={key === "seguroVida" ? [6, 6, 0, 0] : [0, 0, 0, 0]}
                maxBarSize={40}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardBase>
  );
}

