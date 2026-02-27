"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import {
  visaoGeralOperacionalData,
  postosDescobertosData,
} from "@/lib/mock/dashboard";
import CardBase from "./CardBase";

const STATUS_COLORS: Record<string, string> = {
  success: "bg-green-500",
  warning: "bg-amber-500",
  info: "bg-blue-500",
  orange: "bg-orange-500",
};

type View = "operacional" | "postos";

export default function VisaoGeralOperacional(): React.ReactElement {
  const [view, setView] = useState<View>("operacional");

  const title = view === "postos" ? "Postos Descobertos" : "Visão Geral Operacional";

  const toggle = (
    <div className="flex shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-100 p-0.5 shadow-sm">
      <button
        type="button"
        onClick={() => setView("operacional")}
        className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
          view === "operacional"
            ? "bg-[#E54C4C] text-white shadow"
            : "bg-transparent text-gray-600 hover:bg-gray-200"
        }`}
      >
        Visão Geral Operacional
      </button>
      <button
        type="button"
        onClick={() => setView("postos")}
        className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
          view === "postos"
            ? "bg-[#E54C4C] text-white shadow"
            : "bg-transparent text-gray-600 hover:bg-gray-200"
        }`}
      >
        Postos Descobertos
      </button>
    </div>
  );

  return (
    <CardBase title={title} titleAction={toggle} compact>
      {view === "operacional" && (
        <ul className="flex flex-col gap-2">
          {visaoGeralOperacionalData.map((item) => (
            <li
              key={item.label}
              className="relative flex items-center justify-between gap-3 rounded-lg bg-gray-50 px-3 py-2 pr-8"
            >
              <span
                className={`absolute right-2.5 top-1/2 h-2 w-2 -translate-y-1/2 shrink-0 rounded-full animate-blink-dot sm:h-2.5 sm:w-2.5 ${STATUS_COLORS[item.status] ?? "bg-gray-400"}`}
                aria-hidden
              />
              <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-1.5">
                <p className="text-sm font-semibold text-[#2c3545]">
                  {item.label}
                </p>
                <p className="truncate text-xs text-gray-500">{item.subtitulo}</p>
              </div>
              <span className="text-base font-bold text-gray-800 sm:text-lg">
                {item.valor}
              </span>
            </li>
          ))}
        </ul>
      )}
      {view === "postos" && (
        <ul className="flex max-h-[320px] flex-col gap-2 overflow-y-auto">
          {postosDescobertosData.map((item, index) => (
            <li
              key={`${item.role}-${index}`}
              className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50/80 px-3 py-2.5 shadow-sm"
            >
              <span
                className={`mt-0.5 shrink-0 ${
                  item.severidade === "red"
                    ? "text-red-500"
                    : "text-amber-500"
                }`}
                aria-hidden
              >
                <AlertTriangle className="h-5 w-5" strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500">{item.localizacao}</p>
                <p className="text-sm font-semibold text-[#2c3545]">
                  {item.role}
                </p>
                <p className="mt-0.5 text-xs text-gray-600">
                  Saiu: {item.saiu}
                </p>
                <p
                  className={`text-xs font-medium ${
                    item.severidade === "red"
                      ? "text-red-600"
                      : "text-amber-600"
                  }`}
                >
                  {item.naoChegou} <span className="font-semibold">Não chegou</span>
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold text-white ${
                  item.severidade === "red"
                    ? "bg-red-500"
                    : "bg-amber-500"
                }`}
              >
                {item.duracao}
              </span>
            </li>
          ))}
        </ul>
      )}
    </CardBase>
  );
}
