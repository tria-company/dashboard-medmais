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
import { custoPorContratoData } from "@/lib/mock/recrutamento";

const BAR_COLOR = "#3B82F6";
const AXIS_LABEL_COLOR = "#63716E";
const TICK_FONT_SIZE = 10;

function formatCurrency(value: number): string {
  if (value >= 1_000) {
    return `R$ ${(value / 1_000).toFixed(0)}k`;
  }
  return `R$ ${value}`;
}

function darkenHex(hex: string, percent: number): string {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.max(0, ((num >> 16) & 0xff) * (1 - percent / 100));
  const g = Math.max(0, ((num >> 8) & 0xff) * (1 - percent / 100));
  const b = Math.max(0, (num & 0xff) * (1 - percent / 100));
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: { cliente: string; valor: number } }>;
}): React.ReactElement | null {
  if (!active || !payload?.length) return null;
  const p = payload[0]?.payload;
  if (!p) return null;
  return (
    <div
      className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-md"
      role="tooltip"
    >
      <p className="mb-1 font-medium text-gray-800">{p.cliente}</p>
      <p className="text-gray-600">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(p.valor)}
      </p>
    </div>
  );
}

export default function CostPerContractCard(): React.ReactElement {
  const maxVal = Math.max(...custoPorContratoData.map((d) => d.valor));
  const xDomain: [number, number] = [0, Math.ceil(maxVal / 10_000) * 10_000];
  const xTicks = [0, 5_000, 10_000, 15_000, 20_000, 50_000].filter(
    (t) => t <= xDomain[1]
  );
  if (xTicks[xTicks.length - 1] !== xDomain[1]) {
    xTicks.push(xDomain[1]);
  }

  return (
    <CardBase className="flex flex-col">
      <div className="mb-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Custo por Contrato
        </h2>
      </div>
      <div className="h-[320px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={custoPorContratoData}
            margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
            barCategoryGap="12%"
            barGap={4}
          >
            <defs>
              <linearGradient
                id="cost-per-contract-bar"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor={darkenHex(BAR_COLOR, 25)} />
                <stop offset="100%" stopColor={BAR_COLOR} />
              </linearGradient>
            </defs>
            <XAxis
              type="number"
              domain={xDomain}
              ticks={xTicks}
              tick={{ fontSize: TICK_FONT_SIZE, fill: AXIS_LABEL_COLOR }}
              axisLine={{ stroke: "#E4E4E7" }}
              tickLine={false}
              tickFormatter={(v) => formatCurrency(v)}
            />
            <YAxis
              type="category"
              dataKey="cliente"
              tick={{ fontSize: TICK_FONT_SIZE, fill: AXIS_LABEL_COLOR }}
              axisLine={false}
              tickLine={false}
              width={72}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
            <Bar
              dataKey="valor"
              fill="url(#cost-per-contract-bar)"
              radius={[0, 6, 6, 0]}
              maxBarSize={28}
              name="Custo"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardBase>
  );
}
