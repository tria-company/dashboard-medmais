"use client";

import CardBase from "@/components/dashboard/CardBase";
import { rankingVagasAbertas } from "@/lib/mock/recrutamento";

const maxQuantidade = Math.max(...rankingVagasAbertas.map((r) => r.quantidade));

function getBarColor(quantidade: number): string {
  const pct = quantidade / maxQuantidade;
  if (pct >= 0.9) return "bg-gray-700";
  if (pct >= 0.6) return "bg-gray-600";
  if (pct >= 0.4) return "bg-gray-500";
  return "bg-gray-400";
}

export default function OpenPositionsRankingCard(): React.ReactElement {
  return (
    <CardBase className="flex flex-col">
      <div className="mb-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Ranking de Vagas Abertas
        </h2>
      </div>
      <ul className="flex flex-col gap-4">
        {rankingVagasAbertas.map((item) => {
          const pct = maxQuantidade > 0 ? (item.quantidade / maxQuantidade) * 100 : 0;
          const barColor = getBarColor(item.quantidade);
          return (
            <li key={item.cargo} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-gray-800">
                  {item.cargo}
                </span>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${barColor} text-white`}
                >
                  {item.quantidade.toLocaleString("pt-BR")}
                </span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`absolute left-0 top-0 h-full rounded-full ${barColor}`}
                  style={{ width: `${pct}%` }}
                />
                <span
                  className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-white bg-gray-600 shadow-sm"
                  style={{ left: `calc(${pct}% - 5px)` }}
                  aria-hidden
                />
              </div>
            </li>
          );
        })}
      </ul>
    </CardBase>
  );
}
