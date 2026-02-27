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
import { evolucaoVagasData } from "@/lib/mock/recrutamento";

const VAGAS_ABERTAS_COLOR = "#374151";
const VAGAS_PREENCHIDAS_COLOR = "#B45309";

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
          <li key={entry.name} className="flex items-center gap-2 text-gray-700">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: entry.color }}
              aria-hidden
            />
            {entry.name}: {entry.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PositionsEvolutionCard(): React.ReactElement {
  const maxVal = Math.max(
    ...evolucaoVagasData.flatMap((d) => [d.vagasAbertas, d.vagasPreenchidas])
  );
  const yDomain: [number, number] = [0, Math.ceil(maxVal / 20) * 20 + 10];

  return (
    <CardBase className="flex flex-col">
      <div className="mb-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Evolução das vagas
        </h2>
      </div>
      <div className="h-[260px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={evolucaoVagasData}
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
              width={36}
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
              dataKey="vagasAbertas"
              name="Vagas Abertas"
              stroke={VAGAS_ABERTAS_COLOR}
              strokeWidth={2}
              dot={{ fill: VAGAS_ABERTAS_COLOR, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="vagasPreenchidas"
              name="Vagas Preenchidas"
              stroke={VAGAS_PREENCHIDAS_COLOR}
              strokeWidth={2}
              dot={{ fill: VAGAS_PREENCHIDAS_COLOR, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardBase>
  );
}
