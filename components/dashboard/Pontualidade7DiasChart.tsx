"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { pontualidade7DiasData } from "@/lib/mock/dashboard";
import CardBase from "./CardBase";

const BAR_SIZE_SMALL = 14;
const BAR_SIZE_LARGE = 20;
const BREAKPOINT_PX = 768;

const COLORS = {
  noHorario: "#22C55E",
  atrasados: "#EAB308",
  naoCompareceu: "#EF4444",
} as const;

function useBarSize(): number {
  const [barSize, setBarSize] = useState(BAR_SIZE_SMALL);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${BREAKPOINT_PX}px)`);
    const update = (): void => {
      setBarSize(mq.matches ? BAR_SIZE_LARGE : BAR_SIZE_SMALL);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return barSize;
}

export default function Pontualidade7DiasChart(): React.ReactElement {
  const barSize = useBarSize();
  return (
    <CardBase
      title="Pontualidade na Rendição por Posto — 7 dias"
      className="flex min-h-0 flex-1 flex-col"
    >
      <div className="min-h-[150px] flex-1 w-full sm:min-h-[180px] lg:min-h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={pontualidade7DiasData}
            margin={{ top: 6, right: 4, left: 0, bottom: 38 }}
            barSize={barSize}
            barCategoryGap="20%"
            barGap={4}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#EEEEEF"
              vertical={false}
            />
            <XAxis
              dataKey="dia"
              tick={{ fontSize: 11, fill: "#71717A" }}
              axisLine={{ stroke: "#E4E4E7", strokeWidth: 1 }}
              tickLine={false}
              tickMargin={10}
              padding={{ left: 8, right: 8 }}
            />
            <YAxis
              domain={[0, 700]}
              tick={{ fontSize: 11, fill: "#71717A" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => v}
              allowDecimals={false}
              ticks={[0, 100, 200, 300, 400, 500, 600, 700]}
              width={28}
            />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.04)", stroke: "none" }}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #E4E4E7",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                padding: "8px 12px",
                fontSize: "12px",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: 11 }}
              iconType="square"
              iconSize={10}
              formatter={(value) => (
                <span className="text-zinc-600">{value}</span>
              )}
            />
            <Bar
              dataKey="noHorario"
              name="No horário"
              fill={COLORS.noHorario}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="atrasados"
              name="Atrasados"
              fill={COLORS.atrasados}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="naoCompareceu"
              name="Não compareceu"
              fill={COLORS.naoCompareceu}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardBase>
  );
}
