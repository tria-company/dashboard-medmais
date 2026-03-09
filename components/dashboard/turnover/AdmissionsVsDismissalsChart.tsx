"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
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
  const media =
    adm && des ? Math.round((adm.value + des.value) / 2) : null;
  return (
    <div
      className="rounded-lg border border-gray-200 bg-white/95 px-3 py-2.5 text-sm shadow-lg backdrop-blur-sm"
      role="tooltip"
    >
      {adm && (
        <p className="font-medium text-[#3B82F6]">
          {adm.value} Admissões
        </p>
      )}
      {des && (
        <p className="font-medium text-[#EF4444]">
          {des.value} Desligamentos
        </p>
      )}
      {media !== null && (
        <p className="mt-1 text-xs text-gray-500">
          Média: {media}
        </p>
      )}
    </div>
  );
}

export default function AdmissionsVsDismissalsChart(): React.ReactElement {
  const data = useMemo(
    () =>
      admissionsVsDismissalsData.map((d) => ({
        ...d,
        media: Math.round((d.admissoes + d.desligamentos) / 2),
      })),
    []
  );

  return (
    <CardBase className="flex flex-col">
      <div className="mb-4 border-b border-gray-100 pb-4">
        <h2 className="text-lg font-semibold text-[#2c3545]">
          Admissões vs Desligamentos — 12 meses
        </h2>
      </div>
      <div className="mb-3 flex items-center justify-end gap-6">
        <span className="flex items-center gap-2 text-xs text-gray-600">
          <span className="h-2.5 w-2.5 rounded-full bg-[#3B82F6]" />
          Admissões
        </span>
        <span className="flex items-center gap-2 text-xs text-gray-600">
          <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
          Desligamentos
        </span>
      </div>
      <div className="h-[280px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 24 }}
          >
            <defs>
              <linearGradient id="gradAdmissoes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="gradDesligamentos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EF4444" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#EF4444" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="mes"
              tick={{ fontSize: 12, fill: "#71717A" }}
              axisLine={{ stroke: "#E4E4E7" }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 400]}
              ticks={[0, 100, 200, 300, 400]}
              tick={{ fontSize: 11, fill: "#71717A" }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#D4D4D8", strokeDasharray: "4 4" }}
            />
            {/* Admissões - área com gradiente */}
            <Area
              type="monotone"
              dataKey="admissoes"
              name="Admissões"
              stroke="#3B82F6"
              fill="url(#gradAdmissoes)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6, fill: "#3B82F6", stroke: "#fff", strokeWidth: 2 }}
            />
            {/* Desligamentos - área com gradiente */}
            <Area
              type="monotone"
              dataKey="desligamentos"
              name="Desligamentos"
              stroke="#EF4444"
              fill="url(#gradDesligamentos)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6, fill: "#EF4444", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </CardBase>
  );
}
