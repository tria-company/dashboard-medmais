"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import CardBase from "@/components/dashboard/CardBase";
import Modal from "@/components/ui/Modal";
import type { PontoBatidoItem } from "@/lib/mock/ponto";
import { allPunchesByEmployeeData } from "@/lib/mock/ponto";

function formatDataHora(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function parseDateOnly(iso: string): string {
  return iso.slice(0, 10);
}

export default function AllPunchesByEmployeeCard(): React.ReactElement {
  const [search, setSearch] = useState("");
  const [filtroPosto, setFiltroPosto] = useState("");
  const [filtroRegiao, setFiltroRegiao] = useState("");
  const [filtroCliente, setFiltroCliente] = useState("");
  const [filtroData, setFiltroData] = useState("");
  const [selectedPonto, setSelectedPonto] = useState<PontoBatidoItem | null>(
    null
  );

  const { postos, regioes, clientes } = useMemo(() => {
    const p = new Set<string>();
    const r = new Set<string>();
    const c = new Set<string>();
    allPunchesByEmployeeData.forEach((row) => {
      p.add(row.posto);
      r.add(row.regiao);
      c.add(row.cliente);
    });
    return {
      postos: Array.from(p).sort(),
      regioes: Array.from(r).sort(),
      clientes: Array.from(c).sort(),
    };
  }, []);

  const filtered = useMemo(() => {
    return allPunchesByEmployeeData.filter((row) => {
      const matchNome = !search.trim() ||
        row.funcionarioNome.toLowerCase().includes(search.trim().toLowerCase());
      const matchPosto = !filtroPosto || row.posto === filtroPosto;
      const matchRegiao = !filtroRegiao || row.regiao === filtroRegiao;
      const matchCliente = !filtroCliente || row.cliente === filtroCliente;
      const matchData = !filtroData || parseDateOnly(row.dataHora) === filtroData;
      return matchNome && matchPosto && matchRegiao && matchCliente && matchData;
    });
  }, [search, filtroPosto, filtroRegiao, filtroCliente, filtroData]);

  return (
    <>
      <CardBase
        title="Todos os pontos batidos por funcionário"
        className="flex flex-1 flex-col"
      >
        <div className="mb-4 flex flex-col gap-3 border-b border-gray-100 pb-4">
          <input
            type="search"
            placeholder="Buscar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[#E4E4E7] bg-white px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400"
            aria-label="Buscar por nome"
          />
          <div className="flex flex-wrap gap-2">
            <select
              value={filtroPosto}
              onChange={(e) => setFiltroPosto(e.target.value)}
              className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
              aria-label="Filtro posto"
            >
              <option value="">Posto</option>
              {postos.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <select
              value={filtroRegiao}
              onChange={(e) => setFiltroRegiao(e.target.value)}
              className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
              aria-label="Filtro região"
            >
              <option value="">Região</option>
              {regioes.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <select
              value={filtroCliente}
              onChange={(e) => setFiltroCliente(e.target.value)}
              className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
              aria-label="Filtro cliente"
            >
              <option value="">Cliente</option>
              {clientes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={filtroData}
              onChange={(e) => setFiltroData(e.target.value)}
              className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700"
              aria-label="Filtro data"
            />
          </div>
        </div>
        <div className="min-w-0 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-xs font-medium uppercase text-gray-500">
                <th className="pb-2 pr-3">Funcionário</th>
                <th className="pb-2 pr-3">Data/hora</th>
                <th className="pb-2 pr-3">Posto</th>
                <th className="pb-2 pr-3">Cliente</th>
                <th className="pb-2" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr
                  key={row.id}
                  className="cursor-pointer border-b border-gray-100 transition-colors hover:bg-gray-50/80"
                  onClick={() => setSelectedPonto(row)}
                >
                  <td className="py-2.5 pr-3 font-medium text-gray-800">
                    {row.funcionarioNome}
                  </td>
                  <td className="py-2.5 pr-3 text-gray-600">
                    {formatDataHora(row.dataHora)}
                  </td>
                  <td className="py-2.5 pr-3 text-gray-600">{row.posto}</td>
                  <td className="py-2.5 pr-3 text-gray-600">{row.cliente}</td>
                  <td className="py-2.5 text-right">
                    <button
                      type="button"
                      className="text-xs font-medium text-blue-600 underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPonto(row);
                      }}
                    >
                      Ver detalhe
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="py-6 text-center text-sm text-gray-500">
            Nenhum registro encontrado.
          </p>
        )}
      </CardBase>

      <Modal
        isOpen={!!selectedPonto}
        onClose={() => setSelectedPonto(null)}
        title="Detalhe do ponto"
      >
        {selectedPonto && (
          <div className="flex flex-col gap-4">
            <p className="text-base font-semibold text-[#2c3545]">
              {selectedPonto.funcionarioNome}
            </p>
            <p className="text-sm text-gray-600">
              Cliente: {selectedPonto.cliente}
            </p>
            <p className="text-sm text-gray-600">
              Horário: {formatDataHora(selectedPonto.dataHora)}
            </p>
            {selectedPonto.fotoUrl && (
              <div className="relative aspect-square w-full max-w-[240px] overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <Image
                  src={selectedPonto.fotoUrl}
                  alt={`Foto do ponto de ${selectedPonto.funcionarioNome}`}
                  fill
                  className="object-cover"
                  unoptimized={selectedPonto.fotoUrl.startsWith("data:")}
                />
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
