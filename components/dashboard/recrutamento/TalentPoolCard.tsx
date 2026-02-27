"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CardBase from "@/components/dashboard/CardBase";
import { talentPoolData } from "@/lib/mock/recrutamento";

const VAGAS_COLOR = "#3B82F6";
const CONTRATACOES_COLOR = "#22C55E";

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

export default function TalentPoolCard(): React.ReactElement {
  const ultimoMes = talentPoolData[talentPoolData.length - 1];
  return (
    <CardBase className="flex flex-col">
      <div className="mb-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Banco de Talentos — Vagas x Contratações
        </h2>
      </div>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2 text-sm text-gray-600">
        <span>
          Acompanhe o equilíbrio entre{" "}
          <span className="font-semibold text-[#3B82F6]">vagas abertas</span> e{" "}
          <span className="font-semibold text-[#22C55E]">contratações</span> ao longo dos
          meses.
        </span>
        {ultimoMes && (
          <span className="text-xs text-gray-500">
            Mês atual: {ultimoMes.mes} — {ultimoMes.vagasAbertas} vagas abertas,{" "}
            {ultimoMes.contratacoes} contratações
          </span>
        )}
      </div>
      <div className="h-[260px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={talentPoolData}
            margin={{ top: 8, right: 12, left: 0, bottom: 12 }}
          >
            <defs>
              <linearGradient id="talent-vagas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={VAGAS_COLOR} stopOpacity={0.7} />
                <stop offset="100%" stopColor={VAGAS_COLOR} stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="talent-contratacoes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CONTRATACOES_COLOR} stopOpacity={0.7} />
                <stop offset="100%" stopColor={CONTRATACOES_COLOR} stopOpacity={0.1} />
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
              tick={{ fontSize: 10, fill: "#63716E" }}
              axisLine={false}
              tickLine={false}
              width={32}
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
            <Area
              type="monotone"
              dataKey="vagasAbertas"
              name="Vagas abertas"
              stroke={VAGAS_COLOR}
              fill="url(#talent-vagas)"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Area
              type="monotone"
              dataKey="contratacoes"
              name="Contratações"
              stroke={CONTRATACOES_COLOR}
              fill="url(#talent-contratacoes)"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </CardBase>
  );
}

