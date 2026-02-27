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
import { admissionsVsDismissalsData } from "@/lib/mock/turnover";

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; dataKey: string }>;
  label?: string;
}): React.ReactElement | null {
  if (!active || !payload?.length || !label) return null;
  const adm = payload.find((p) => p.dataKey === "admissoes");
  const des = payload.find((p) => p.dataKey === "desligamentos");
  return (
    <div
      className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-md"
      role="tooltip"
    >
      <p className="mb-1 font-medium text-gray-800">{label}</p>
      {adm && (
        <p className="text-[#3B82F6]">
          Admissões: <span className="font-semibold">{adm.value}</span>
        </p>
      )}
      {des && (
        <p className="text-[#EF4444]">
          Desligamentos: <span className="font-semibold">{des.value}</span>
        </p>
      )}
    </div>
  );
}

export default function AdmissionsVsDismissalsChart(): React.ReactElement {
  return (
    <CardBase className="flex flex-col">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Admissões vs Desligamentos — 12 meses
        </h2>
      </div>
      <div className="mb-2 flex items-center justify-start gap-6">
        <span className="flex items-center gap-2 text-xs text-gray-600">
          <span className="h-2.5 w-2.5 rounded-full bg-[#3B82F6]" />
          Admissões
        </span>
        <span className="flex items-center gap-2 text-xs text-gray-600">
          <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
          Desligamentos
        </span>
      </div>
      <div className="h-[260px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={admissionsVsDismissalsData}
            margin={{ top: 8, right: 8, left: 0, bottom: 24 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E4E4E7"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="mes"
              tick={{ fontSize: 11, fill: "#71717A" }}
              axisLine={{ stroke: "#E4E4E7" }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 400]}
              tick={{ fontSize: 10, fill: "#71717A" }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#E4E4E7", strokeDasharray: "3 3" }} />
            <Area
              type="monotone"
              dataKey="admissoes"
              name="Admissões"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.35}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="desligamentos"
              name="Desligamentos"
              stroke="#EF4444"
              fill="#EF4444"
              fillOpacity={0.35}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </CardBase>
  );
}
