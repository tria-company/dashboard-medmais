"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CardBase from "@/components/dashboard/CardBase";
import { tenureAtDismissalData } from "@/lib/mock/turnover";

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: { faixa: string; quantidade: number } }>;
}): React.ReactElement | null {
  if (!active || !payload?.length) return null;
  const p = payload[0]?.payload;
  if (!p) return null;
  return (
    <div
      className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-md"
      role="tooltip"
    >
      <span className="font-medium text-gray-800">
        {p.faixa}: {p.quantidade}
      </span>
    </div>
  );
}

/** Coral/laranja — Figma */
const NORMAL_BAR = "#FC8452";
/** Marrom escuro destaque (3-5 anos) — Figma */
const DESTAQUE_BAR = "#6B2323";
const AXIS_LABEL_COLOR = "#63716E";
const VALUE_LABEL_COLOR = "#8A8A8A";
const TICK_FONT_SIZE = 10;
/** Espaço entre a base das barras e os rótulos do eixo X */
const X_LABEL_OFFSET = 24;

function renderXAxisTick(props: {
  x: string | number;
  y: string | number;
  payload?: { value?: string };
}): React.ReactElement {
  const { x, y, payload } = props;
  const label = payload?.value ?? "";
  const xNum = typeof x === "number" ? x : Number(x);
  const yNum = typeof y === "number" ? y : Number(y);
  return (
    <g transform={`translate(${xNum}, ${yNum + X_LABEL_OFFSET})`}>
      <text
        transform="rotate(-24, 0, 0)"
        textAnchor="end"
        fill={AXIS_LABEL_COLOR}
        fontSize={TICK_FONT_SIZE}
      >
        {label}
      </text>
    </g>
  );
}

export default function TenureAtDismissalChart(): React.ReactElement {
  const [maxBarSize, setMaxBarSize] = useState(48);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setMaxBarSize(mq.matches ? 56 : 48);
    const handler = (): void => setMaxBarSize(mq.matches ? 56 : 48);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return (
    <CardBase className="flex flex-col">
      <div className="mb-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Tempo de Casa no Desligamento
        </h2>
      </div>
      <div className="h-[420px] w-full min-w-0 lg:h-[440px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={tenureAtDismissalData}
            margin={{ top: 28, right: 12, left: 0, bottom: 64 }}
            barCategoryGap="12%"
            barGap={2}
          >
            <XAxis
              dataKey="faixa"
              tick={renderXAxisTick}
              axisLine={{ stroke: "#E4E4E7" }}
              tickLine={false}
              interval={0}
              height={64}
            />
            <YAxis
              domain={[0, 50]}
              ticks={[0, 10, 20, 30, 40, 50]}
              tick={{ fontSize: 10, fill: AXIS_LABEL_COLOR }}
              axisLine={false}
              tickLine={false}
              width={36}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
            <Bar
              dataKey="quantidade"
              radius={[6, 6, 0, 0]}
              maxBarSize={maxBarSize}
              isAnimationActive={true}
              shape={(props) => {
                const { x, y, width, height, payload } = props;
                const fill = payload.destaque ? DESTAQUE_BAR : NORMAL_BAR;
                return (
                  <g>
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      fill={fill}
                      rx={6}
                      ry={6}
                    />
                  </g>
                );
              }}
              label={{
                position: "top",
                fontSize: 11,
                fill: VALUE_LABEL_COLOR,
                formatter: (v: unknown) => (v != null ? String(v) : ""),
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardBase>
  );
}
