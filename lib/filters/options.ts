import type { Contract, Posto, Region, Relevance, Period } from "./types";

export interface FilterCombination {
  region: Region;
  contract: Contract;
  posto: Posto;
}

// Combinações mockadas baseadas nos clientes/unidades existentes nos dados de mock.
export const FILTER_COMBINATIONS: FilterCombination[] = [
  {
    region: "Sudeste",
    contract: "Petrobras",
    posto: "Portaria Principal - Petrobras",
  },
  {
    region: "Sudeste",
    contract: "Vale",
    posto: "Recepção - Vale",
  },
  {
    region: "Sudeste",
    contract: "Ambev",
    posto: "Portaria Norte - Ambev",
  },
  {
    region: "Centro-Oeste",
    contract: "JBS",
    posto: "Controle de Acesso - JBS",
  },
  {
    region: "Sul",
    contract: "Bradesco",
    posto: "Recepção - Bradesco",
  },
  {
    region: "Sudeste",
    contract: "Itaú",
    posto: "Portaria - Itaú",
  },
  {
    region: "Sudeste",
    contract: "Mag. Luiza",
    posto: "Entrada Principal - Mag. Luiza",
  },
  {
    region: "Sudeste",
    contract: "Natura",
    posto: "Entrada Principal - Mag. Luiza",
  },
  {
    region: "Sudeste",
    contract: "B3",
    posto: "Entrada Principal - Mag. Luiza",
  },
  {
    region: "Sudeste",
    contract: "Embraer",
    posto: "Entrada Principal - Mag. Luiza",
  },
  {
    region: "Sudeste",
    contract: "Santander",
    posto: "Entrada Principal - Mag. Luiza",
  },
  {
    region: "Sudeste",
    contract: "Unimed",
    posto: "Entrada Principal - Mag. Luiza",
  },
  {
    region: "Sudeste",
    contract: "Rede D'Or",
    posto: "Entrada Principal - Mag. Luiza",
  },
];

export const ALL_REGIONS: Region[] = [
  "Norte",
  "Nordeste",
  "Centro-Oeste",
  "Sudeste",
  "Sul",
];

export const ALL_RELEVANCE_OPTIONS: Relevance[] = [
  "Maior headcount",
  "Maior custo",
  "Maior absenteísmo",
  "Maior risco trabalhista",
];

export const ALL_PERIOD_OPTIONS: Period[] = [
  "Hoje",
  "Últimos 7 dias",
  "Últimos 30 dias",
  "Últimos 12 meses",
];

