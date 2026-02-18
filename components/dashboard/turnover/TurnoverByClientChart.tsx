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
import { turnoverByClientData } from "@/lib/mock/turnover";

const chartData = turnoverByClientData.map((d, i) => ({ ...d, _gid: i }));

const Y_TICKS = [0, 1, 2, 3, 4, 5];
const AXIS_LABEL_COLOR = "#63716E";
const TICK_FONT_SIZE = 10;
/** Espaço extra entre a base das barras e os rótulos do eixo X */
const X_LABEL_OFFSET = 28;

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
        transform="rotate(-45, 0, 0)"
        textAnchor="end"
        fill={AXIS_LABEL_COLOR}
        fontSize={TICK_FONT_SIZE}
      >
        {label}
      </text>
    </g>
  );
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: { cliente: string; turnover: number } }>;
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
        {p.cliente}: {p.turnover}%
      </span>
    </div>
  );
}

/** Escurece cor para gradiente (topo da barra) */
function darkenHex(hex: string, percent: number): string {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.max(0, ((num >> 16) & 0xff) * (1 - percent / 100));
  const g = Math.max(0, ((num >> 8) & 0xff) * (1 - percent / 100));
  const b = Math.max(0, (num & 0xff) * (1 - percent / 100));
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

function getInitialMaxBarSize(): number {
  if (typeof window === "undefined") return 48;
  return window.matchMedia("(min-width: 1024px)").matches ? 56 : 48;
}

export default function TurnoverByClientChart(): React.ReactElement {
  const [maxBarSize, setMaxBarSize] = useState(getInitialMaxBarSize);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (): void => setMaxBarSize(mq.matches ? 56 : 48);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return (
    <CardBase className="flex flex-col">
      <div className="mb-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Turnover por Cliente
        </h2>
      </div>
      <div className="h-[420px] w-full min-w-0 lg:h-[440px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 12, right: 12, left: 0, bottom: 80 }}
            barCategoryGap="12%"
            barGap={2}
          >
            <defs>
              {chartData.map((item, i) => (
                <linearGradient
                  key={i}
                  id={`turnover-bar-${i}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={darkenHex(item.color, 18)} />
                  <stop offset="100%" stopColor={item.color} />
                </linearGradient>
              ))}
            </defs>
            <XAxis
              dataKey="cliente"
              tick={renderXAxisTick}
              axisLine={{ stroke: "#E4E4E7" }}
              tickLine={false}
              height={64}
              interval={0}
            />
            <YAxis
              domain={[0, 5.5]}
              ticks={Y_TICKS}
              tick={{ fontSize: TICK_FONT_SIZE, fill: AXIS_LABEL_COLOR }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
              width={36}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
            <Bar
              dataKey="turnover"
              radius={[6, 6, 0, 0]}
              maxBarSize={maxBarSize}
              isAnimationActive={true}
              shape={(props) => {
                const { x, y, width, height, payload } = props;
                const gid = (payload as { _gid?: number })._gid ?? 0;
                return (
                  <g>
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      fill={`url(#turnover-bar-${gid})`}
                      rx={6}
                      ry={6}
                    />
                  </g>
                );
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardBase>
  );
}
