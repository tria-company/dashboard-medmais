"use client";

import { useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { headcountRegiaoData } from "@/lib/mock/dashboard";
import CardBase from "./CardBase";

const REGIAO_LABEL: Record<string, string> = {
  "Centro-Oeste": "Centro - Oeste",
};

function formatColaboradores(valor: number): string {
  return valor.toLocaleString("pt-BR");
}

export default function HeadcountRegiao(): React.ReactElement {
  const [activeRegion, setActiveRegion] = useState(headcountRegiaoData[0]);
  const chartData = headcountRegiaoData.map((r) => ({
    name: r.nome,
    value: r.valor,
    color: r.cor,
  }));

  return (
    <CardBase title="Headcount por Região">
      <div className="-mt-2 mb-4 border-b border-gray-200 pb-4" />
      <div className="flex flex-col items-center gap-4">
        <div className="flex w-full flex-wrap justify-center gap-x-5 gap-y-2.5 text-base text-gray-600">
          {headcountRegiaoData.map((r) => (
            <span key={r.nome} className="flex items-center gap-2">
              <span
                className="h-4 w-4 shrink-0 rounded-sm"
                style={{ backgroundColor: r.cor }}
              />
              {REGIAO_LABEL[r.nome] ?? r.nome}
            </span>
          ))}
        </div>
        <div className="relative h-[300px] w-full max-w-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={72}
                outerRadius={115}
                paddingAngle={0}
                dataKey="value"
                onMouseEnter={(_, index) =>
                  setActiveRegion(headcountRegiaoData[index])
                }
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ payload }) => {
                  if (!payload?.[0]) return null;
                  const nome = payload[0].payload?.name ?? activeRegion.nome;
                  const valor =
                    payload[0].value ?? payload[0].payload?.value ?? 0;
                  return (
                    <div className="rounded-lg border border-gray-100 bg-white px-3 py-2 text-base font-medium text-gray-800 shadow-sm">
                      Colaboradores - {formatColaboradores(Number(valor))}
                    </div>
                  );
                }}
                cursor={false}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-lg font-semibold text-[#2c3545]">
              {REGIAO_LABEL[activeRegion.nome] ?? activeRegion.nome}
            </span>
          </div>
        </div>
      </div>
    </CardBase>
  );
}
