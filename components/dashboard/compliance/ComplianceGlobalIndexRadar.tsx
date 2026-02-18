"use client";

import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import CardBase from "@/components/dashboard/CardBase";
import { radarSeriesData } from "@/lib/mock/compliance";

const CONFORMIDADE_STROKE = "#3B82F6";
const META_STROKE = "#9CA3AF";

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
      <p className="mb-1 font-medium text-gray-800">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {p.value}%
        </p>
      ))}
    </div>
  );
}

export default function ComplianceGlobalIndexRadar(): React.ReactElement {
  return (
    <CardBase className="flex flex-col">
      <div className="mb-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Índice de Compliance Global
        </h2>
      </div>
      <div className="h-[320px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            data={radarSeriesData}
            margin={{ top: 16, right: 16, left: 16, bottom: 16 }}
          >
            <PolarGrid stroke="#E4E4E7" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fontSize: 10, fill: "#63716E" }}
            />
            <Radar
              name="Conformidade Atual"
              dataKey="atual"
              stroke={CONFORMIDADE_STROKE}
              fill={CONFORMIDADE_STROKE}
              fillOpacity={0.25}
              strokeWidth={2}
            />
            <Radar
              name="Meta"
              dataKey="meta"
              stroke={META_STROKE}
              fill="transparent"
              strokeWidth={1.5}
              strokeDasharray="4 4"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12 }}
              formatter={(value) => (
                <span className="text-sm text-gray-700">{value}</span>
              )}
              iconType="circle"
              iconSize={8}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </CardBase>
  );
}
