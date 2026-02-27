"use client";

import { useMemo, useState } from "react";
import CardBase from "@/components/dashboard/CardBase";
import type { ProcessoTrabalhistaRow } from "@/lib/mock/costs";
import { processosTrabalhistasData } from "@/lib/mock/costs";

const FILTER_ALL = "";

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export default function LaborLawsuitsCard(): React.ReactElement {
  const [searchNome, setSearchNome] = useState("");
  const [filtroPosto, setFiltroPosto] = useState(FILTER_ALL);
  const [filtroCliente, setFiltroCliente] = useState(FILTER_ALL);
  const [filtroTipo, setFiltroTipo] = useState(FILTER_ALL);
  const [filtroOndeFoi, setFiltroOndeFoi] = useState(FILTER_ALL);

  const opcoesPosto = useMemo(() => {
    const set = new Set(processosTrabalhistasData.map((r) => r.posto));
    return [FILTER_ALL, ...Array.from(set).sort()];
  }, []);
  const opcoesCliente = useMemo(() => {
    const set = new Set(processosTrabalhistasData.map((r) => r.cliente));
    return [FILTER_ALL, ...Array.from(set).sort()];
  }, []);
  const opcoesTipo = useMemo(() => {
    const set = new Set(processosTrabalhistasData.map((r) => r.tipoProcesso));
    return [FILTER_ALL, ...Array.from(set).sort()];
  }, []);
  const opcoesOndeFoi = useMemo(() => {
    const set = new Set(processosTrabalhistasData.map((r) => r.ondeFoi));
    return [FILTER_ALL, ...Array.from(set).sort()];
  }, []);

  const data = useMemo(() => {
    return processosTrabalhistasData.filter((row) => {
      if (searchNome.trim()) {
        const term = normalize(searchNome.trim());
        if (!normalize(row.quemProcessou).includes(term)) return false;
      }
      if (filtroPosto && row.posto !== filtroPosto) return false;
      if (filtroCliente && row.cliente !== filtroCliente) return false;
      if (filtroTipo && row.tipoProcesso !== filtroTipo) return false;
      if (filtroOndeFoi && row.ondeFoi !== filtroOndeFoi) return false;
      return true;
    });
  }, [searchNome, filtroPosto, filtroCliente, filtroTipo, filtroOndeFoi]);

  return (
    <CardBase className="flex flex-col">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Processos trabalhistas
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <span
              className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              aria-hidden
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Buscar por nome"
              value={searchNome}
              onChange={(e) => setSearchNome(e.target.value)}
              className="w-40 rounded-lg border border-[#E4E4E7] bg-white py-1.5 pl-8 pr-3 text-sm text-gray-700 placeholder:text-gray-400"
              aria-label="Buscar por nome"
            />
          </div>
          <select
            value={filtroPosto}
            onChange={(e) => setFiltroPosto(e.target.value)}
            className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
            aria-label="Filtrar por posto"
          >
            <option value={FILTER_ALL}>Posto</option>
            {opcoesPosto.filter((o) => o !== FILTER_ALL).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <select
            value={filtroCliente}
            onChange={(e) => setFiltroCliente(e.target.value)}
            className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
            aria-label="Filtrar por cliente"
          >
            <option value={FILTER_ALL}>Cliente</option>
            {opcoesCliente.filter((o) => o !== FILTER_ALL).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
            aria-label="Filtrar por tipo de processo"
          >
            <option value={FILTER_ALL}>Tipo de processo</option>
            {opcoesTipo.filter((o) => o !== FILTER_ALL).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <select
            value={filtroOndeFoi}
            onChange={(e) => setFiltroOndeFoi(e.target.value)}
            className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
            aria-label="Filtrar por onde foi"
          >
            <option value={FILTER_ALL}>Onde foi</option>
            {opcoesOndeFoi.filter((o) => o !== FILTER_ALL).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="min-w-0 overflow-x-auto">
        <div className="max-h-80 overflow-y-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="border-b border-gray-200 text-left text-xs font-medium uppercase text-gray-500">
                <th className="pb-3 pr-4">Quem processou</th>
                <th className="pb-3 pr-4">Onde foi</th>
                <th className="pb-3 pr-4">Tipo do processo</th>
                <th className="pb-3 pr-4">Posto</th>
                <th className="pb-3 pr-4">Cliente</th>
                <th className="pb-3 text-right">Valor</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={`${row.quemProcessou}-${row.ondeFoi}-${index}`}
                  className={`border-b border-gray-100 hover:bg-gray-50/80 ${
                    index % 2 === 0 ? "bg-gray-50/50" : ""
                  }`}
                >
                  <td className="py-3 pr-4 font-medium text-gray-800">
                    {row.quemProcessou}
                  </td>
                  <td className="py-3 pr-4 text-gray-600">{row.ondeFoi}</td>
                  <td className="py-3 pr-4 text-gray-600">
                    {row.tipoProcesso}
                  </td>
                  <td className="py-3 pr-4 text-gray-600">{row.posto}</td>
                  <td className="py-3 pr-4 text-gray-600">{row.cliente}</td>
                  <td className="py-3 text-right font-medium text-red-600">
                    {row.valor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CardBase>
  );
}
