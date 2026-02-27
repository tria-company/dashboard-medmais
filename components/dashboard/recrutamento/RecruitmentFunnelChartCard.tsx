"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CardBase from "@/components/dashboard/CardBase";
import { recruitmentFunnelData } from "@/lib/mock/recrutamento";

const FUNNEL_COLORS = [
  "#1e3a5f",
  "#5b4d8c",
  "#8b6914",
  "#166534",
  "#c2410c",
];

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload?: { etapa: string; quantidade: number } }>;
}): React.ReactElement | null {
  if (!active || !payload?.length) return null;
  const p = payload[0]?.payload;
  if (!p) return null;
  return (
    <div
      className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-md"
      role="tooltip"
    >
      <p className="font-medium text-gray-800">{p.etapa}</p>
      <p className="text-gray-600">{p.quantidade.toLocaleString("pt-BR")}</p>
    </div>
  );
}

export default function RecruitmentFunnelChartCard(): React.ReactElement {
  const maxQty = Math.max(...recruitmentFunnelData.map((d) => d.quantidade));
  const yDomain: [number, number] = [0, Math.ceil(maxQty / 500) * 500 || 1500];

  return (
    <CardBase className="flex flex-col">
      <div className="mb-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Fluxo do Processo Seletivo
        </h2>
      </div>
      <div className="h-[260px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={recruitmentFunnelData}
            margin={{ top: 12, right: 12, left: 0, bottom: 32 }}
            barCategoryGap="16%"
            barGap={4}
          >
            <XAxis
              dataKey="etapa"
              tick={{ fontSize: 10, fill: "#71717A" }}
              axisLine={{ stroke: "#E4E4E7" }}
              tickLine={false}
              height={44}
              interval={0}
            />
            <YAxis
              domain={yDomain}
              tick={{ fontSize: 10, fill: "#71717A" }}
              axisLine={false}
              tickLine={false}
              width={36}
              tickFormatter={(v) => v.toLocaleString("pt-BR")}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
            <Bar dataKey="quantidade" name="Quantidade" radius={[6, 6, 0, 0]} maxBarSize={56}>
              {recruitmentFunnelData.map((_, index) => (
                <Cell key={index} fill={FUNNEL_COLORS[index % FUNNEL_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardBase>
  );
}
