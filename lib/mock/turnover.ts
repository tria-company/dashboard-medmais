/**
 * Mock data for Turnover dashboard.
 * Replace with API calls when backend is ready.
 */

export interface KpiTurnoverItem {
  value: string;
  label: string;
  variationLabel: string;
  variationPositive: boolean;
  icon: "taxa_turnover" | "admissoes" | "desligamentos" | "tempo_casa";
}

export interface AdmissionsVsDismissalsPoint {
  mes: string;
  admissoes: number;
  desligamentos: number;
}

export interface DismissalReasonItem {
  label: string;
  color: string;
  percent: number;
}

export interface TurnoverByClientItem {
  cliente: string;
  turnover: number;
  color: string;
}

export interface TenureAtDismissalItem {
  faixa: string;
  quantidade: number;
  destaque?: boolean;
}

export interface TurnoverUnitRow {
  unidade: string;
  cliente: string;
  headcount: number;
  admissoes: number;
  desligamentos: number;
  turnover: number;
  tendencia: "up" | "down" | "stable";
}

export const kpiTurnoverData: KpiTurnoverItem[] = [
  {
    value: "2.3%",
    label: "Taxa Turnover Mensal",
    variationLabel: "▲ +0.4% vs mês anterior",
    variationPositive: false,
    icon: "taxa_turnover",
  },
  {
    value: "87",
    label: "Admissões no Mês",
    variationLabel: "+12 vs mês anterior",
    variationPositive: true,
    icon: "admissoes",
  },
  {
    value: "65",
    label: "Desligamentos no Mês",
    variationLabel: "-15 vs mês anterior",
    variationPositive: true,
    icon: "desligamentos",
  },
  {
    value: "8.7 meses",
    label: "Tempo Médio de Casa",
    variationLabel: "+0.2 vs mês anterior",
    variationPositive: true,
    icon: "tempo_casa",
  },
];

export const admissionsVsDismissalsData: AdmissionsVsDismissalsPoint[] = [
  { mes: "Jan", admissoes: 120, desligamentos: 95 },
  { mes: "Fev", admissoes: 145, desligamentos: 88 },
  { mes: "Mar", admissoes: 180, desligamentos: 110 },
  { mes: "Abr", admissoes: 210, desligamentos: 130 },
  { mes: "Mai", admissoes: 240, desligamentos: 155 },
  { mes: "Jun", admissoes: 250, desligamentos: 190 },
  { mes: "Jul", admissoes: 230, desligamentos: 175 },
  { mes: "Ago", admissoes: 200, desligamentos: 160 },
  { mes: "Set", admissoes: 185, desligamentos: 140 },
  { mes: "Out", admissoes: 165, desligamentos: 125 },
  { mes: "Nov", admissoes: 140, desligamentos: 105 },
  { mes: "Dez", admissoes: 87, desligamentos: 65 },
];

export const dismissalReasonsData: DismissalReasonItem[] = [
  { label: "Pedido de demissão", color: "#EF4444", percent: 35 },
  { label: "Término de contrato", color: "#F97316", percent: 28 },
  { label: "Dispensa s/ justa causa", color: "#EAB308", percent: 18 },
  { label: "Acordo mútuo", color: "#84CC16", percent: 12 },
  { label: "Justa causa", color: "#8B5CF6", percent: 5 },
  { label: "Outros", color: "#78716C", percent: 2 },
];

/** Cores em gradiente: vermelho-laranja (alto) → amarelo-laranja → verde (baixo) — Figma */
export const turnoverByClientData: TurnoverByClientItem[] = [
  { cliente: "JBS", turnover: 5.2, color: "#E85D4C" },
  { cliente: "Mag. Luiza", turnover: 4.5, color: "#E85D4C" },
  { cliente: "Vale", turnover: 2.8, color: "#E9A23B" },
  { cliente: "Ambev", turnover: 2.3, color: "#E9A23B" },
  { cliente: "B3", turnover: 1.7, color: "#7BC67E" },
  { cliente: "Embraer", turnover: 1.6, color: "#7BC67E" },
  { cliente: "Bradesco", turnover: 1.3, color: "#7BC67E" },
  { cliente: "Petrobras", turnover: 0.7, color: "#7BC67E" },
  { cliente: "Itaú", turnover: 0.3, color: "#7BC67E" },
];

export const tenureAtDismissalData: TenureAtDismissalItem[] = [
  { faixa: "0–3 meses", quantidade: 19 },
  { faixa: "3–6 meses", quantidade: 27 },
  { faixa: "6–12 meses", quantidade: 31 },
  { faixa: "1–2 anos", quantidade: 32 },
  { faixa: "2–3 anos", quantidade: 30 },
  { faixa: "3–5 anos", quantidade: 45, destaque: true },
  { faixa: "+5 anos", quantidade: 28 },
];

export const turnoverUnitsTableData: TurnoverUnitRow[] = [
  { unidade: "São Paulo - Centro", cliente: "JBS", headcount: 520, admissoes: 24, desligamentos: 25, turnover: 4.8, tendencia: "up" },
  { unidade: "Campinas", cliente: "Vale", headcount: 380, admissoes: 14, desligamentos: 12, turnover: 3.2, tendencia: "stable" },
  { unidade: "Belo Horizonte", cliente: "Ambev", headcount: 290, admissoes: 4, desligamentos: 3, turnover: 1.1, tendencia: "down" },
  { unidade: "Curitiba", cliente: "Itaú", headcount: 410, admissoes: 18, desligamentos: 15, turnover: 3.7, tendencia: "up" },
  { unidade: "Porto Alegre", cliente: "Bradesco", headcount: 195, admissoes: 6, desligamentos: 5, turnover: 2.6, tendencia: "stable" },
  { unidade: "Recife", cliente: "Petrobras", headcount: 340, admissoes: 8, desligamentos: 7, turnover: 2.1, tendencia: "down" },
];
