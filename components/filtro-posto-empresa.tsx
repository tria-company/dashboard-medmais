"use client";

import { useState } from "react";

/** Mock options for "Posto de empresa" filter (exemplar only). */
const OPCOES_POSTO_EMPRESA = [
  "Todos os postos",
  "Portaria Principal - Petrobras",
  "Recepção - Vale",
  "Portaria Norte - Ambev",
  "Controle de Acesso - JBS",
  "Recepção - Bradesco",
  "Portaria - Itaú",
  "Entrada Principal - Mag. Luiza",
] as const;

export default function FiltroPostoEmpresa(): React.ReactElement {
  const [postoSelecionado, setPostoSelecionado] = useState<string>(
    OPCOES_POSTO_EMPRESA[0]
  );
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E4E4E7] bg-white px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <label
        htmlFor="filtro-posto-empresa"
        className="text-sm font-medium text-[#2c3545]"
      >
        Posto de empresa
      </label>
      <select
        id="filtro-posto-empresa"
        value={postoSelecionado}
        onChange={(e) => setPostoSelecionado(e.target.value)}
        className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm text-gray-700 min-w-[200px]"
        aria-label="Filtrar por posto de empresa"
      >
        {OPCOES_POSTO_EMPRESA.map((opcao) => (
          <option key={opcao} value={opcao}>
            {opcao}
          </option>
        ))}
      </select>
    </div>
  );
}
