"use client";

import { useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { useFilters } from "@/contexts/FiltersContext";

function hasActiveFilters(filters: {
  region: unknown;
  contract: unknown;
  posto: unknown;
  relevance: unknown;
  period: unknown;
}): boolean {
  return Boolean(
    filters.region ||
      filters.contract ||
      filters.posto ||
      filters.relevance ||
      filters.period,
  );
}

export default function GlobalFiltersBar(): React.ReactElement {
  const {
    filters,
    setRegion,
    setContract,
    setPosto,
    setRelevance,
    setPeriod,
    clearAll,
    availableRegions,
    availableContracts,
    availablePostos,
    relevanceOptions,
    periodOptions,
  } = useFilters();

  const showClear = useMemo(() => hasActiveFilters(filters), [filters]);

  return (
    <div className="z-10 -mt-4 mb-6 flex justify-center bg-transparent px-8">
      <div className="inline-flex flex-wrap items-center justify-center gap-4 rounded-xl border border-[#E4E4E7] bg-white px-10 pt-7 pb-6 md:px-14 md:pt-8 md:pb-7 shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
        <span className="text-sm font-semibold text-slate-700">
          Filtrar por:
        </span>

        {/* Região */}
        <FilterSelect
          label="Região"
          value={filters.region ?? ""}
          placeholder="Todas"
          onChange={(value) => setRegion(value || null)}
          options={availableRegions}
        />

        {/* Contrato */}
        <FilterSelect
          label="Contrato"
          value={filters.contract ?? ""}
          placeholder="Todos"
          onChange={(value) => setContract(value || null)}
          options={availableContracts}
        />

        {/* Posto */}
        <FilterSelect
          label="Posto"
          value={filters.posto ?? ""}
          placeholder="Todos"
          onChange={(value) => setPosto(value || null)}
          options={availablePostos}
        />

        {/* Relevância */}
        <FilterSelect
          label="Relevância"
          value={filters.relevance ?? ""}
          placeholder="Padrão"
          onChange={(value) => setRelevance(value || null)}
          options={relevanceOptions}
        />

        {/* Período */}
        <FilterSelect
          label="Período"
          value={filters.period ?? ""}
          placeholder="Últimos 30 dias"
          onChange={(value) => setPeriod(value || null)}
          options={periodOptions}
        />

        {showClear && (
          <button
            type="button"
            onClick={clearAll}
            className="text-sm text-blue-600 underline underline-offset-2"
          >
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  );
}

interface FilterSelectProps {
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
}

function FilterSelect({
  label,
  value,
  placeholder,
  options,
  onChange,
}: FilterSelectProps): React.ReactElement {
  return (
    <div className="relative">
      <select
        aria-label={label}
        className="appearance-none rounded-full border border-[#E4E4E7] bg-white px-4 pr-8 py-1.5 text-sm text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.06)] focus:outline-none focus:ring-2 focus:ring-sky-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

