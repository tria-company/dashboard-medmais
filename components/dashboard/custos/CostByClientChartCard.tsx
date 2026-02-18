"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CardBase from "@/components/dashboard/CardBase";
import {
  COST_COMPOSITION_COLORS,
  costByClientDetail,
  type CostByClientDetailItem,
} from "@/lib/mock/costs";

const BAR_COLOR = "#B45309";
const AXIS_LABEL_COLOR = "#63716E";
const TICK_FONT_SIZE = 10;
const X_LABEL_OFFSET = 28;

function formatCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `R$ ${(value / 1_000_000).toFixed(0)}M`;
  }
  if (value >= 1_000) {
    return `R$ ${(value / 1_000).toFixed(0)}k`;
  }
  return `R$ ${value}`;
}

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
  payload?: Array<{ payload: CostByClientDetailItem }>;
}): React.ReactElement | null {
  if (!active || !payload?.length) return null;
  const p = payload[0]?.payload;
  if (!p) return null;
  return (
    <div
      className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-md"
      role="tooltip"
    >
      <p className="mb-2 font-medium text-gray-800">{p.cliente}</p>
      <ul className="flex flex-col gap-1">
        <li className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: COST_COMPOSITION_COLORS.salarios }}
          />
          Salários: {formatCurrency(p.salarios)}
        </li>
        <li className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: COST_COMPOSITION_COLORS.encargos }}
          />
          Encargos: {formatCurrency(p.encargos)}
        </li>
        <li className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: COST_COMPOSITION_COLORS.beneficios }}
          />
          Benefícios: {formatCurrency(p.beneficios)}
        </li>
        <li className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: COST_COMPOSITION_COLORS.horasExtras }}
          />
          Horas Extras: {formatCurrency(p.horasExtras)}
        </li>
      </ul>
    </div>
  );
}

function darkenHex(hex: string, percent: number): string {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.max(0, ((num >> 16) & 0xff) * (1 - percent / 100));
  const g = Math.max(0, ((num >> 8) & 0xff) * (1 - percent / 100));
  const b = Math.max(0, (num & 0xff) * (1 - percent / 100));
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

function DetailRow({ item }: { item: CostByClientDetailItem }): React.ReactElement {
  return (
    <div className="border-b border-gray-100 py-3 last:border-b-0">
      <p className="mb-2 font-medium text-[#2c3545]">{item.cliente}</p>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
        <span className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: COST_COMPOSITION_COLORS.salarios }}
          />
          Salários: {formatCurrency(item.salarios)}
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: COST_COMPOSITION_COLORS.encargos }}
          />
          Encargos: {formatCurrency(item.encargos)}
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: COST_COMPOSITION_COLORS.beneficios }}
          />
          Benefícios: {formatCurrency(item.beneficios)}
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: COST_COMPOSITION_COLORS.horasExtras }}
          />
          Horas Extras: {formatCurrency(item.horasExtras)}
        </span>
      </div>
    </div>
  );
}

export default function CostByClientChartCard(): React.ReactElement {
  const maxVal = Math.max(...costByClientDetail.map((d) => d.valor));
  const yDomain = [0, Math.ceil(maxVal / 1_000_000) * 1_000_000];
  const yTicks = [0, 1_000_000, 2_000_000, 5_000_000, 9_000_000].filter(
    (t) => t <= yDomain[1]
  );
  if (yTicks[yTicks.length - 1] !== yDomain[1]) {
    yTicks.push(yDomain[1]);
  }

  return (
    <CardBase className="flex flex-col pb-0">
      <div className="mb-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Custo por Cliente
        </h2>
      </div>
      <div className="h-[320px] w-full min-w-0 lg:h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={costByClientDetail}
            margin={{ top: 12, right: 12, left: 0, bottom: 56 }}
            barCategoryGap="12%"
            barGap={2}
          >
            <defs>
              <linearGradient
                id="cost-by-client-bar"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={darkenHex(BAR_COLOR, 18)} />
                <stop offset="100%" stopColor={BAR_COLOR} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="cliente"
              tick={renderXAxisTick}
              axisLine={{ stroke: "#E4E4E7" }}
              tickLine={false}
              height={52}
              interval={0}
            />
            <YAxis
              domain={yDomain}
              ticks={yTicks}
              tick={{ fontSize: TICK_FONT_SIZE, fill: AXIS_LABEL_COLOR }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => formatCurrency(v)}
              width={44}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
            <Bar
              dataKey="valor"
              fill="url(#cost-by-client-bar)"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
              name="Custo"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 max-h-[280px] overflow-y-auto border-t border-gray-100 pt-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-500">
          Detalhamento por cliente
        </p>
        {costByClientDetail.map((item) => (
          <DetailRow key={item.cliente} item={item} />
        ))}
      </div>
    </CardBase>
  );
}
