export type Region = "Norte" | "Nordeste" | "Centro-Oeste" | "Sudeste" | "Sul";

export type Contract =
  | "Petrobras"
  | "Vale"
  | "Ambev"
  | "JBS"
  | "Bradesco"
  | "Itaú"
  | "Mag. Luiza"
  | "Natura"
  | "B3"
  | "Embraer"
  | "Santander"
  | "Unimed"
  | "Rede D'Or";

export type Posto =
  | "Portaria Principal - Petrobras"
  | "Recepção - Vale"
  | "Portaria Norte - Ambev"
  | "Controle de Acesso - JBS"
  | "Recepção - Bradesco"
  | "Portaria - Itaú"
  | "Entrada Principal - Mag. Luiza";

export type Relevance =
  | "Maior headcount"
  | "Maior custo"
  | "Maior absenteísmo"
  | "Maior risco trabalhista";

export type Period =
  | "Hoje"
  | "Últimos 7 dias"
  | "Últimos 30 dias"
  | "Últimos 12 meses";

export interface FiltersState {
  region: Region | null;
  contract: Contract | null;
  posto: Posto | null;
  relevance: Relevance | null;
  period: Period | null;
}

export const EMPTY_FILTERS: FiltersState = {
  region: null,
  contract: null,
  posto: null,
  relevance: null,
  period: null,
};

