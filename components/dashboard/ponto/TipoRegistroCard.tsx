"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import CardBase from "@/components/dashboard/CardBase";
import { tipoRegistroData } from "@/lib/mock/ponto";

export default function TipoRegistroCard(): React.ReactElement {
  return (
    <CardBase title="Tipo de Registro" compact className="flex flex-col">
      <div className="flex flex-1 items-center justify-center gap-8">
        <div className="relative h-[180px] w-[180px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={tipoRegistroData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                dataKey="value"
                stroke="none"
              >
                {tipoRegistroData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-2">
          {tipoRegistroData.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-sm">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
                aria-hidden
              />
              <span className="text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </CardBase>
  );
}
