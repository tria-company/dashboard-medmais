/**
 * Mock data for Custos (Costs) dashboard.
 * Replace with API calls when backend is ready.
 */

export type KpiCostIcon = "folha" | "custoMedio" | "crescimento" | "margem" | "horasExtras";

export interface KpiCostItem {
  label: string;
  value: string;
  variationLabel: string;
  variationPositive: boolean;
  icon: KpiCostIcon;
}

export interface CompositionStackedMonth {
  mes: string;
  salarios: number;
  encargos: number;
  beneficios: number;
  horasExtras: number;
}

export interface PayrollEvolutionMonth {
  mes: string;
  folhaReal: number;
  orcado: number;
}

export interface SalaryBenefitsItem {
  label: string;
  value: number;
  color: string;
}

export interface RubricDetailRow {
  rubrica: string;
  valor: number;
  percentFolha: number;
  varVsAnterior: number;
  tendencia: "up" | "down" | "neutral";
}

export interface CostByClientItem {
  cliente: string;
  valor: number;
}

/** Cost by client with breakdown (Salários, Encargos, Benefícios, Horas Extras). */
export interface CostByClientDetailItem extends CostByClientItem {
  salarios: number;
  encargos: number;
  beneficios: number;
  horasExtras: number;
}

export const kpisCosts: KpiCostItem[] = [
  {
    label: "Folha Total",
    value: "R$ 45,2M",
    variationLabel: "+5.1% vs mês anterior",
    variationPositive: false,
    icon: "folha",
  },
  {
    label: "Custo Médio/Colab.",
    value: "R$ 3.602",
    variationLabel: "+2.3% vs mês anterior",
    variationPositive: false,
    icon: "custoMedio",
  },
  {
    label: "Crescimento YoY",
    value: "12%",
    variationLabel: "+2% acima do orçado",
    variationPositive: false,
    icon: "crescimento",
  },
  {
    label: "Margem Operacional",
    value: "23%",
    variationLabel: "+1.5% vs mês anterior",
    variationPositive: true,
    icon: "margem",
  },
  {
    label: "Valor Total em Horas Extras",
    value: "R$ 28,4k",
    variationLabel: "+8.2% vs mês anterior",
    variationPositive: false,
    icon: "horasExtras",
  },
];

const MONTHS_SHORT = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

/** Stacked composition: salários (verde), encargos (azul), benefícios (amarelo), horas extras (vermelho). Values in R$. */
export const compositionStacked12m: CompositionStackedMonth[] = MONTHS_SHORT.map(
  (mes, i) => {
    const base = 28_000_000 + i * 1_200_000 + (i % 3) * 500_000;
    return {
      mes,
      salarios: Math.round(base * 0.55),
      encargos: Math.round(base * 0.22),
      beneficios: Math.round(base * 0.15),
      horasExtras: Math.round(base * 0.08),
    };
  }
);

export const payrollEvolution12m: PayrollEvolutionMonth[] = MONTHS_SHORT.map(
  (mes, i) => ({
    mes,
    folhaReal: 38_000_000 + i * 600_000 + (i % 2) * 200_000,
    orcado: 37_500_000 + i * 550_000,
  })
);

export const salaryBenefitsBreakdown: SalaryBenefitsItem[] = [
  { label: "Salários Base", value: 24_900_000, color: "#22C55E" },
  { label: "Plano de Saúde", value: 3_200_000, color: "#A855F7" },
  { label: "Vale Transporte", value: 1_800_000, color: "#3B82F6" },
  { label: "Vale Refeição", value: 2_100_000, color: "#10B981" },
  { label: "Seguro de Vida", value: 450_000, color: "#EAB308" },
  { label: "Outros", value: 1_450_000, color: "#F97316" },
];

export const rubricDetailsRows: RubricDetailRow[] = [
  {
    rubrica: "Salários Base",
    valor: 24_850_000,
    percentFolha: 55.0,
    varVsAnterior: 3.2,
    tendencia: "up",
  },
  {
    rubrica: "Encargos Sociais",
    valor: 9_200_000,
    percentFolha: 20.4,
    varVsAnterior: -0.8,
    tendencia: "down",
  },
  {
    rubrica: "Benefícios",
    valor: 6_100_000,
    percentFolha: 13.5,
    varVsAnterior: 1.1,
    tendencia: "up",
  },
  {
    rubrica: "Horas Extras",
    valor: 3_200_000,
    percentFolha: 7.1,
    varVsAnterior: -2.0,
    tendencia: "down",
  },
  {
    rubrica: "Outros",
    valor: 1_650_000,
    percentFolha: 3.7,
    varVsAnterior: 0.5,
    tendencia: "neutral",
  },
];

export const costByClient: CostByClientItem[] = [
  { cliente: "JBS", valor: 8_500_000 },
  { cliente: "Mag. Luiza", valor: 6_200_000 },
  { cliente: "Vale", valor: 5_800_000 },
  { cliente: "Ambev", valor: 4_900_000 },
  { cliente: "Bradesco", valor: 4_200_000 },
  { cliente: "Petrobras", valor: 3_800_000 },
  { cliente: "Itaú", valor: 3_400_000 },
  { cliente: "Santander", valor: 2_900_000 },
  { cliente: "Unimed", valor: 2_500_000 },
  { cliente: "Rede D'Or", valor: 2_200_000 },
];

/** Cost by client with detailed breakdown for the card. */
export const costByClientDetail: CostByClientDetailItem[] = [
  { cliente: "JBS", valor: 8_500_000, salarios: 4_675_000, encargos: 1_870_000, beneficios: 1_275_000, horasExtras: 680_000 },
  { cliente: "Mag. Luiza", valor: 6_200_000, salarios: 3_410_000, encargos: 1_364_000, beneficios: 930_000, horasExtras: 496_000 },
  { cliente: "Vale", valor: 5_800_000, salarios: 3_190_000, encargos: 1_276_000, beneficios: 870_000, horasExtras: 464_000 },
  { cliente: "Ambev", valor: 4_900_000, salarios: 2_695_000, encargos: 1_078_000, beneficios: 735_000, horasExtras: 392_000 },
  { cliente: "Bradesco", valor: 4_200_000, salarios: 2_310_000, encargos: 924_000, beneficios: 630_000, horasExtras: 336_000 },
  { cliente: "Petrobras", valor: 3_800_000, salarios: 2_090_000, encargos: 836_000, beneficios: 570_000, horasExtras: 304_000 },
  { cliente: "Itaú", valor: 3_400_000, salarios: 1_870_000, encargos: 748_000, beneficios: 510_000, horasExtras: 272_000 },
  { cliente: "Santander", valor: 2_900_000, salarios: 1_595_000, encargos: 638_000, beneficios: 435_000, horasExtras: 232_000 },
  { cliente: "Unimed", valor: 2_500_000, salarios: 1_375_000, encargos: 550_000, beneficios: 375_000, horasExtras: 200_000 },
  { cliente: "Rede D'Or", valor: 2_200_000, salarios: 1_210_000, encargos: 484_000, beneficios: 330_000, horasExtras: 176_000 },
];

export const COST_COMPOSITION_COLORS = {
  salarios: "#22C55E",
  encargos: "#3B82F6",
  beneficios: "#EAB308",
  horasExtras: "#EF4444",
} as const;
