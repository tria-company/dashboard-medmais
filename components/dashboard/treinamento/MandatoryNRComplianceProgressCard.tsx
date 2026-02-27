"use client";

import { useState } from "react";
import CardBase from "@/components/dashboard/CardBase";
import {
  mandatoryNRProgressList,
  nrsEmAtrasoRanking,
  type MandatoryNRProgressItem,
} from "@/lib/mock/training";

function getPillClass(status: MandatoryNRProgressItem["status"]): string {
  switch (status) {
    case "high":
      return "bg-green-600 text-white";
    case "medium":
      return "bg-amber-500 text-white";
    case "low":
      return "bg-red-600 text-white";
    default:
      return "bg-gray-200 text-gray-800";
  }
}

function getAtrasoPillClass(quantidade: number): string {
  if (quantidade >= 400) return "bg-red-600 text-white";
  if (quantidade >= 300) return "bg-orange-500 text-white";
  if (quantidade >= 100) return "bg-amber-400 text-gray-900";
  return "bg-amber-300 text-gray-900";
}

function formatCount(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(value);
}

type View = "conformidade" | "ranking";

export default function MandatoryNRComplianceProgressCard(): React.ReactElement {
  const [view, setView] = useState<View>("conformidade");

  const title =
    view === "ranking" ? "Ranking de NRs em Atraso" : "NRs Obrigatórias — Conformidade";

  const toggle = (
    <div className="flex shrink-0 overflow-hidden rounded-full border border-gray-200 bg-white p-0.5 shadow-sm">
      <button
        type="button"
        onClick={() => setView("conformidade")}
        className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
          view === "conformidade"
            ? "bg-[#E54C4C] text-white shadow"
            : "bg-transparent text-gray-600 hover:bg-gray-100"
        }`}
      >
        NRs Obrigatórias
      </button>
      <button
        type="button"
        onClick={() => setView("ranking")}
        className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
          view === "ranking"
            ? "bg-[#E54C4C] text-white shadow"
            : "bg-transparent text-gray-600 hover:bg-gray-100"
        }`}
      >
        Ranking de NRs em Atraso
      </button>
    </div>
  );

  return (
    <CardBase title={title} titleAction={toggle} compact className="flex flex-col">
      {view === "conformidade" && (
        <ul className="flex flex-col gap-5">
          {mandatoryNRProgressList.map((item) => (
            <li key={item.label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-3">
                <span className="min-w-0 shrink-0 text-sm font-medium text-gray-800">
                  {item.label}
                </span>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${getPillClass(item.status)}`}
                >
                  {item.percent}%
                </span>
              </div>
              <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-gray-300"
                  style={{
                    width: `${item.percent}%`,
                    backgroundImage:
                      "repeating-linear-gradient(90deg, transparent, transparent 4px, #9CA3AF 4px, #9CA3AF 6px)",
                  }}
                />
                <span
                  className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
                  style={{ left: `${item.percent}%` }}
                  aria-hidden
                />
              </div>
              <p className="text-center text-xs text-gray-500">
                {formatCount(item.current)} / {formatCount(item.total)} colaboradores
              </p>
            </li>
          ))}
        </ul>
      )}
      {view === "ranking" && (
        <ul className="flex max-h-[320px] flex-col gap-2 overflow-y-auto">
          {nrsEmAtrasoRanking.map((item) => (
            <li
              key={item.empresa}
              className="flex items-center justify-between gap-3 rounded-lg bg-gray-50 px-3 py-2"
            >
              <span className="text-sm font-medium text-gray-800">
                {item.empresa}
              </span>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${getAtrasoPillClass(item.quantidade)}`}
              >
                {formatCount(item.quantidade)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </CardBase>
  );
}
