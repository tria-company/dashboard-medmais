/**
 * Mock data for Benefícios dashboard.
 * Replace with API calls when backend is ready.
 */

export type BenefitsKpiIcon =
  | "custo_total"
  | "beneficio_medio"
  | "percent_folha"
  | "colaboradores_eligiveis";

export interface BenefitsKpiItem {
  label: string;
  value: string;
  variationLabel: string;
  variationPositive: boolean;
  icon: BenefitsKpiIcon;
}

export interface BenefitsCompositionMonth {
  mes: string;
  planoSaude: number;
  valeTransporte: number;
  valeRefeicao: number;
  seguroVida: number;
}

export interface BenefitsCostPerUnitItem {
  unidade: string;
  valor: number;
}

export interface BenefitsTotalRow {
  beneficio: string;
  custoTotal: number;
  percentFolha: number;
  colaboradores: number;
  custoMedio: number;
  coparticipacao: number;
}

export const benefitsKpis: BenefitsKpiItem[] = [
  {
    label: "Custo Total com Benefícios",
    value: "R$ 12,4M",
    variationLabel: "+3,5% vs mês anterior",
    variationPositive: false,
    icon: "custo_total",
  },
  {
    label: "Benefício Médio por Colaborador",
    value: "R$ 1.248",
    variationLabel: "+1,8% vs mês anterior",
    variationPositive: false,
    icon: "beneficio_medio",
  },
  {
    label: "% da Folha em Benefícios",
    value: "18%",
    variationLabel: "+1,3 p.p. vs mês anterior",
    variationPositive: false,
    icon: "percent_folha",
  },
  {
    label: "Colaboradores Elegíveis",
    value: "1.842 ativos",
    variationLabel: "+92% dos ativos",
    variationPositive: true,
    icon: "colaboradores_eligiveis",
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

export const benefitsComposition12m: BenefitsCompositionMonth[] = MONTHS_SHORT.map(
  (mes, i) => {
    const base = 10_000_000 + i * 350_000;
    return {
      mes,
      planoSaude: Math.round(base * 0.55),
      valeTransporte: Math.round(base * 0.18),
      valeRefeicao: Math.round(base * 0.19),
      seguroVida: Math.round(base * 0.08),
    };
  }
);

export const benefitsCostPerUnitData: BenefitsCostPerUnitItem[] = [
  { unidade: "Petrobras", valor: 48_000 },
  { unidade: "Vale", valor: 43_000 },
  { unidade: "Itaú", valor: 36_000 },
  { unidade: "Bradesco", valor: 32_000 },
  { unidade: "JBS", valor: 26_000 },
  { unidade: "Gol", valor: 21_000 },
].sort((a, b) => b.valor - a.valor);

export const benefitsTotalRows: BenefitsTotalRow[] = [
  {
    beneficio: "Plano de saúde",
    custoTotal: 6_200_000,
    percentFolha: 9.2,
    colaboradores: 1_420,
    custoMedio: 3_500,
    coparticipacao: 310,
  },
  {
    beneficio: "Vale transporte",
    custoTotal: 2_100_000,
    percentFolha: 3.1,
    colaboradores: 1_380,
    custoMedio: 1_520,
    coparticipacao: 60,
  },
  {
    beneficio: "Vale refeição",
    custoTotal: 2_450_000,
    percentFolha: 3.6,
    colaboradores: 1_410,
    custoMedio: 1_740,
    coparticipacao: 75,
  },
  {
    beneficio: "Seguro de vida",
    custoTotal: 520_000,
    percentFolha: 0.8,
    colaboradores: 1_842,
    custoMedio: 280,
    coparticipacao: 0,
  },
  {
    beneficio: "Outros benefícios",
    custoTotal: 1_130_000,
    percentFolha: 1.7,
    colaboradores: 980,
    custoMedio: 1_150,
    coparticipacao: 95,
  },
];

