"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CardBase from "@/components/dashboard/CardBase";
import { trainingHoursEvolution12m } from "@/lib/mock/training";

const AREA_FILL = "#FCA5A5";
const AREA_STROKE = "#EF4444";

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}): React.ReactElement | null {
  if (!active || !payload?.length || !label) return null;
  const value = payload[0]?.value;
  return (
    <div
      className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-md"
      role="tooltip"
    >
      <span className="font-medium text-gray-800">
        {label}: {value != null ? `${value}h` : ""}
      </span>
    </div>
  );
}

export default function TrainingHoursEvolutionAreaCard(): React.ReactElement {
  const maxVal = Math.max(...trainingHoursEvolution12m.map((d) => d.horas));
  const yDomain = [0, Math.ceil(maxVal / 200) * 200];

  return (
    <CardBase className="flex flex-col">
      <div className="mb-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Evolução de Horas de Treinamento
        </h2>
      </div>
      <div className="h-[260px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={trainingHoursEvolution12m}
            margin={{ top: 8, right: 8, left: 0, bottom: 24 }}
          >
            <defs>
              <linearGradient id="training-area-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={AREA_FILL} stopOpacity={0.8} />
                <stop offset="100%" stopColor={AREA_FILL} stopOpacity={0.1} />
              </linearGradient>
            </defs>
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
              tickFormatter={(v) => `${v}h`}
              width={44}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="horas"
              stroke={AREA_STROKE}
              strokeWidth={2}
              fill="url(#training-area-fill)"
              name="Horas"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </CardBase>
  );
}
