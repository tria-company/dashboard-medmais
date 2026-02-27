"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  type FiltersState,
  type Region,
  type Contract,
  type Posto,
  type Relevance,
  type Period,
  EMPTY_FILTERS,
} from "@/lib/filters/types";
import {
  FILTER_COMBINATIONS,
  ALL_PERIOD_OPTIONS,
  ALL_RELEVANCE_OPTIONS,
  ALL_REGIONS,
} from "@/lib/filters/options";

interface FiltersContextValue {
  filters: FiltersState;
  setRegion: (region: Region | null) => void;
  setContract: (contract: Contract | null) => void;
  setPosto: (posto: Posto | null) => void;
  setRelevance: (relevance: Relevance | null) => void;
  setPeriod: (period: Period | null) => void;
  clearAll: () => void;
  availableRegions: Region[];
  availableContracts: Contract[];
  availablePostos: Posto[];
  relevanceOptions: Relevance[];
  periodOptions: Period[];
}

const FiltersContext = createContext<FiltersContextValue | undefined>(
  undefined,
);

export function FiltersProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const [filters, setFilters] = useState<FiltersState>(EMPTY_FILTERS);

  const setRegion = useCallback((region: Region | null) => {
    setFilters((prev) => ({
      ...prev,
      region,
      // ao mudar região, resetar contrato/posto para evitar estados inválidos
      contract: null,
      posto: null,
    }));
  }, []);

  const setContract = useCallback((contract: Contract | null) => {
    setFilters((prev) => ({
      ...prev,
      contract,
      posto: null,
    }));
  }, []);

  const setPosto = useCallback((posto: Posto | null) => {
    setFilters((prev) => ({ ...prev, posto }));
  }, []);

  const setRelevance = useCallback((relevance: Relevance | null) => {
    setFilters((prev) => ({ ...prev, relevance }));
  }, []);

  const setPeriod = useCallback((period: Period | null) => {
    setFilters((prev) => ({ ...prev, period }));
  }, []);

  const clearAll = useCallback(() => {
    setFilters(EMPTY_FILTERS);
  }, []);

  const availableRegions = useMemo<Region[]>(() => {
    const inCombinations = new Set<Region>(
      FILTER_COMBINATIONS.map((combo) => combo.region),
    );
    return ALL_REGIONS.filter((region) => inCombinations.has(region));
  }, []);

  const availableContracts = useMemo<Contract[]>(() => {
    const list = FILTER_COMBINATIONS.filter((combo) =>
      filters.region ? combo.region === filters.region : true,
    ).map((combo) => combo.contract);
    return Array.from(new Set(list));
  }, [filters.region]);

  const availablePostos = useMemo<Posto[]>(() => {
    const list = FILTER_COMBINATIONS.filter((combo) => {
      if (filters.region && combo.region !== filters.region) return false;
      if (filters.contract && combo.contract !== filters.contract) return false;
      return true;
    }).map((combo) => combo.posto);
    return Array.from(new Set(list));
  }, [filters.region, filters.contract]);

  const value: FiltersContextValue = {
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
    relevanceOptions: ALL_RELEVANCE_OPTIONS,
    periodOptions: ALL_PERIOD_OPTIONS,
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
}

export function useFilters(): FiltersContextValue {
  const ctx = useContext(FiltersContext);
  if (!ctx) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return ctx;
}

