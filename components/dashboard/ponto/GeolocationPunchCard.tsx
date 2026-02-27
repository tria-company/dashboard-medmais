"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import CardBase from "@/components/dashboard/CardBase";
import {
  geolocationPunchSummary,
  pontoForaZonaRanking,
} from "@/lib/mock/ponto";

const COR_DENTRO = "#22c55e";
const COR_FORA = "#ef4444";

const PIE_SMALL = { innerRadius: 50, outerRadius: 75 };
const PIE_LARGE = { innerRadius: 62, outerRadius: 92 };

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number;
    payload?: { tooltipLabel?: string };
  }>;
}): React.ReactElement | null {
  if (!active || !payload?.length) return null;
  const first = payload[0];
  const tooltipLabel =
    first?.payload?.tooltipLabel ??
    (first ? `${first.name} - ${first.value}` : "");
  return (
    <div
      className="relative rounded-lg border border-gray-200 bg-gray-200/95 px-3 py-2 text-sm font-medium text-gray-800 shadow-md"
      role="tooltip"
    >
      <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-gray-200 bg-gray-200/95" />
      <span className="relative z-10">{tooltipLabel}</span>
    </div>
  );
}

export default function GeolocationPunchCard(): React.ReactElement {
  const [isLg, setIsLg] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsLg(mq.matches);
    const handler = (): void => setIsLg(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const chartData = useMemo(
    () => [
      {
        name: "Dentro da geolocalização",
        value: geolocationPunchSummary.dentro,
        fill: COR_DENTRO,
        tooltipLabel: `Dentro - ${geolocationPunchSummary.dentro.toLocaleString("pt-BR")}`,
      },
      {
        name: "Fora da geolocalização",
        value: geolocationPunchSummary.fora,
        fill: COR_FORA,
        tooltipLabel: `Fora - ${geolocationPunchSummary.fora.toLocaleString("pt-BR")}`,
      },
    ],
    []
  );

  const total = geolocationPunchSummary.dentro + geolocationPunchSummary.fora;
  const pieRadius = isLg ? PIE_LARGE : PIE_SMALL;

  return (
    <CardBase
      title="Pontos batidos dentro/fora da geolocalização"
      compact
      className="flex min-h-0 flex-col"
    >
      <div className="flex flex-col gap-4 pt-1">
        <div className="relative mx-auto h-[200px] w-full max-w-[240px] shrink-0 lg:h-[220px] lg:max-w-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={pieRadius.innerRadius}
                outerRadius={pieRadius.outerRadius}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] text-gray-500">Total</span>
            <span className="text-base font-bold text-[#2c3545]">
              {total.toLocaleString("pt-BR")}
            </span>
          </div>
        </div>
        <div className="min-h-0 flex-1">
          <p className="mb-2 text-xs font-medium text-gray-500">
            Ranking — quem bateu fora da zona
          </p>
          <ul className="flex max-h-48 flex-col gap-1.5 overflow-y-auto pr-1">
            {pontoForaZonaRanking.map((item, index) => (
              <li
                key={`${item.nome}-${index}`}
                className="flex items-center justify-between gap-3 rounded-lg bg-gray-50 px-3 py-1.5"
              >
                <span className="min-w-0 flex-1 truncate text-sm font-medium text-[#2c3545]">
                  {item.nome}
                  <span className="mx-1.5 text-gray-500">—</span>
                  <span className="text-gray-500">{item.posto}</span>
                </span>
                <span className="shrink-0 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800">
                  {item.quantidadePontosFora} pontos
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CardBase>
  );
}
