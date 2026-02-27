"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CardBase from "@/components/dashboard/CardBase";
import { payrollEvolution12m } from "@/lib/mock/costs";

const REAL_COLOR = "#374151";
const ORCADO_COLOR = "#F97316";

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

export default function PayrollEvolutionCard(): React.ReactElement {
  const maxVal = Math.max(
    ...payrollEvolution12m.flatMap((d) => [d.folhaReal, d.orcado])
  );
  const yDomain = [0, Math.ceil(maxVal / 2_000_000) * 2_000_000];

  return (
    <CardBase className="flex flex-col">
      <div className="mb-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Evolução da Folha de Pagamento
        </h2>
      </div>
      <div className="h-[200px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={payrollEvolution12m}
            margin={{ top: 8, right: 8, left: 0, bottom: -10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" />
            <XAxis
              dataKey="mes"
              tick={{ fontSize: 10, fill: "#63716E" }}
              axisLine={{ stroke: "#E4E4E7" }}
              tickLine={false}
            />
            <YAxis
              domain={yDomain}
              tick={{ fontSize: 10, fill: "#63716E" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => formatCurrency(v)}
              width={44}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingBottom: 4 }}
              formatter={(value) => (
                <span className="text-sm text-gray-700">{value}</span>
              )}
              iconType="circle"
              iconSize={8}
            />
            <Line
              type="monotone"
              dataKey="folhaReal"
              name="Folha Real"
              stroke={REAL_COLOR}
              strokeWidth={2}
              dot={{ fill: REAL_COLOR, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="orcado"
              name="Orçado"
              stroke={ORCADO_COLOR}
              strokeWidth={2}
              dot={{ fill: ORCADO_COLOR, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardBase>
  );
}
