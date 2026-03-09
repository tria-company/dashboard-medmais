"use client";

import { useState } from "react";
import CardBase from "@/components/dashboard/CardBase";
import {
  overtimeByClientData,
  overtimeByColaboradorData,
} from "@/lib/mock/ponto";

const MAX_H = Math.max(...overtimeByClientData.map((d) => d.horas));

type Tab = "cliente" | "colaborador";

export default function OvertimeByClient(): React.ReactElement {
  const [tab, setTab] = useState<Tab>("cliente");

  return (
    <CardBase className="flex flex-col">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-[#2c3545]">
            Horas Extras por Cliente
          </h2>
          <select className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700">
            <option>Cliente</option>
          </select>
        </div>
        <div className="flex items-center overflow-hidden rounded-full border border-[#E4E4E7]">
          <button
            type="button"
            onClick={() => setTab("cliente")}
            className={`px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === "cliente"
                ? "bg-white text-[#2c3545]"
                : "bg-gray-50 text-gray-500 hover:text-gray-700"
            }`}
          >
            Por Cliente
          </button>
          <button
            type="button"
            onClick={() => setTab("colaborador")}
            className={`px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === "colaborador"
                ? "bg-[#C44B6A] text-white"
                : "bg-gray-50 text-gray-500 hover:text-gray-700"
            }`}
          >
            Por Colaborador
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      {tab === "cliente" ? (
        <ul className="space-y-4 pt-1">
          {overtimeByClientData.map((item, index) => (
            <li key={index} className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-sm text-gray-700">
                {item.cliente}
              </span>
              <div className="relative h-6 flex-1 overflow-hidden rounded bg-gray-200">
                <div
                  className="absolute left-0 top-0 h-full rounded bg-gray-600"
                  style={{ width: `${(item.horas / MAX_H) * 100}%` }}
                />
                <span
                  className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-gray-800 shadow-sm"
                  style={{ left: `${(item.horas / MAX_H) * 100}%` }}
                />
              </div>
              <span className="shrink-0 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                {item.horas}h
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="max-h-[360px] space-y-2 overflow-y-auto pr-1 pt-1">
          {overtimeByColaboradorData.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gray-300 to-gray-200 text-xs font-semibold text-[#2c3545]">
                  {item.nome
                    .split(" ")
                    .map((p) => p[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#2c3545]">
                    {item.nome}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {item.funcao} - {item.cliente}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">{item.custo}</span>
                <span className="shrink-0 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800">
                  {item.horas}h
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </CardBase>
  );
}
