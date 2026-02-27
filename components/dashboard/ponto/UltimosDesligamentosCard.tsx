"use client";

import { useMemo, useState } from "react";
import CardBase from "@/components/dashboard/CardBase";
import type { DesligamentoRow } from "@/lib/mock/ponto";
import { ultimosDesligamentosData } from "@/lib/mock/ponto";

export default function UltimosDesligamentosCard(): React.ReactElement {
  const [unidade, setUnidade] = useState("");
  const [cliente, setCliente] = useState("");
  const [busca, setBusca] = useState("");

  const filtered = useMemo(() => {
    return ultimosDesligamentosData.filter((row) => {
      const matchUnidade = !unidade || row.unidade === unidade;
      const matchCliente = !cliente || row.cliente === cliente;
      const matchBusca =
        !busca.trim() ||
        row.colaborador.toLowerCase().includes(busca.trim().toLowerCase()) ||
        row.unidade.toLowerCase().includes(busca.trim().toLowerCase());
      return matchUnidade && matchCliente && matchBusca;
    });
  }, [unidade, cliente, busca]);

  const unidades = useMemo(() => {
    const set = new Set(ultimosDesligamentosData.map((r) => r.unidade));
    return Array.from(set).sort();
  }, []);

  const clientes = useMemo(() => {
    const set = new Set(ultimosDesligamentosData.map((r) => r.cliente));
    return Array.from(set).sort();
  }, []);

  return (
    <CardBase className="flex w-full flex-col">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Últimos Desligamentos
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={unidade}
            onChange={(e) => setUnidade(e.target.value)}
            className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
            aria-label="Unidade"
          >
            <option value="">Unidade</option>
            {unidades.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
          <select
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
            aria-label="Cliente"
          >
            <option value="">Cliente</option>
            {clientes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <div className="relative">
            <span
              className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              aria-hidden
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Buscar"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-36 rounded-lg border border-[#E4E4E7] bg-white py-1.5 pl-8 pr-3 text-sm text-gray-700 placeholder:text-gray-400"
              aria-label="Buscar"
            />
          </div>
          <button
            type="button"
            className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Exportar CSV
          </button>
        </div>
      </div>
      <div className="max-h-72 min-h-0 min-w-0 overflow-auto pt-1">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs font-medium uppercase text-gray-500">
              <th className="pb-3 pr-4">Colaborador</th>
              <th className="pb-3 pr-4">Unidade</th>
              <th className="pb-3 pr-4">Data de Admissão</th>
              <th className="pb-3 pr-4">Data de Desligamento</th>
              <th className="pb-3">Custo</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, index) => (
              <tr
                key={`${row.unidade}-${row.colaborador}-${index}`}
                className="border-b border-gray-100 bg-gray-50/80 first:border-t-0"
              >
                <td className="py-3 pr-4 font-medium text-gray-800">
                  {row.colaborador}
                </td>
                <td className="py-3 pr-4 text-gray-600">{row.unidade}</td>
                <td className="py-3 pr-4 text-gray-600">{row.dataAdmissao}</td>
                <td className="py-3 pr-4 text-gray-600">{row.dataDesligamento}</td>
                <td className="py-3 font-medium text-[#8B3A3A]">
                  {row.custo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardBase>
  );
}
