/**
 * Mock data for Treinamento (Training) dashboard.
 * Replace with API calls when backend is ready.
 */

export type TrainingKpiIcon = "cobertura" | "horasTotais" | "mediaColab" | "investimento";

export interface TrainingKpiItem {
  label: string;
  value: string;
  variationLabel: string;
  variationPositive: boolean;
  icon: TrainingKpiIcon;
}

export interface TrainingCostByCategoryItem {
  categoria: string;
  realizados: number;
  pendentes: number;
}

export interface MandatoryNRProgressItem {
  label: string;
  percent: number;
  current: number;
  total: number;
  status: "high" | "medium" | "low";
}

export interface TrainingHoursEvolutionMonth {
  mes: string;
  horas: number;
}

export interface TrainingBreakdownItem {
  label: string;
  value: number;
  color: string;
}

export interface OverdueTrainingRow {
  colaborador: string;
  unidade: string;
  treinamento: string;
  vencidoEm: string;
  diasAtrasado: number;
  risco: "Alto" | "Médio" | "Baixo";
}

export const trainingKpis: TrainingKpiItem[] = [
  {
    label: "Cobertura do Treinamento",
    value: "87%",
    variationLabel: "+4% vs mês anterior",
    variationPositive: true,
    icon: "cobertura",
  },
  {
    label: "Horas Totais (ano)",
    value: "12.450h",
    variationLabel: "+0.8% vs mês anterior",
    variationPositive: true,
    icon: "horasTotais",
  },
  {
    label: "Média por Colaborador",
    value: "8.3h",
    variationLabel: "-1.2h vs mês anterior",
    variationPositive: false,
    icon: "mediaColab",
  },
  {
    label: "Investimento Total",
    value: "R$ 347k",
    variationLabel: "-3.2% vs mês anterior",
    variationPositive: false,
    icon: "investimento",
  },
];

export const trainingCostByCategory: TrainingCostByCategoryItem[] = [
  { categoria: "Nr Obrigatórias", realizados: 1520, pendentes: 400 },
  { categoria: "Integração", realizados: 1320, pendentes: 450 },
  { categoria: "Segurança", realizados: 1220, pendentes: 350 },
  { categoria: "Técnico", realizados: 1020, pendentes: 250 },
  { categoria: "Qualidade", realizados: 520, pendentes: 150 },
];

export const mandatoryNRProgressList: MandatoryNRProgressItem[] = [
  { label: "NR-6 (EPI)", percent: 94, current: 11_794, total: 12_547, status: "high" },
  { label: "NR-7 (PCMSO)", percent: 84, current: 10_540, total: 12_547, status: "high" },
  { label: "NR-10 (Eletricidade)", percent: 54, current: 6_775, total: 12_547, status: "low" },
  { label: "NR-12 (Máquinas)", percent: 84, current: 10_540, total: 12_547, status: "high" },
  { label: "NR-18 (Construção)", percent: 94, current: 11_794, total: 12_547, status: "high" },
];

const MONTHS_SHORT = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
];

export const trainingHoursEvolution12m: TrainingHoursEvolutionMonth[] = MONTHS_SHORT.map(
  (mes, i) => ({
    mes,
    horas: 400 + i * 80 + (i % 3) * 50,
  })
);

export const trainingBreakdownDonut: TrainingBreakdownItem[] = [
  { label: "NR Obrigatórias", value: 145_000, color: "#22C55E" },
  { label: "Integração", value: 85_000, color: "#3B82F6" },
  { label: "Comportamental", value: 55_000, color: "#EAB308" },
  { label: "Técnico", value: 42_000, color: "#F97316" },
  { label: "Outros", value: 20_000, color: "#6B7280" },
];

export const overdueTrainingRows: OverdueTrainingRow[] = [
  {
    colaborador: "Carlos Silva",
    unidade: "Petrobras SP",
    treinamento: "NR-35 (Trabalho em Altura)",
    vencidoEm: "15/10/2025",
    diasAtrasado: 108,
    risco: "Alto",
  },
  {
    colaborador: "Ana Souza",
    unidade: "Vale RJ",
    treinamento: "NR-35 (Trabalho em Altura)",
    vencidoEm: "15/10/2025",
    diasAtrasado: 78,
    risco: "Alto",
  },
  {
    colaborador: "Pedro Santos",
    unidade: "JBS GO",
    treinamento: "NR-35 (Trabalho em Altura)",
    vencidoEm: "15/10/2025",
    diasAtrasado: 68,
    risco: "Alto",
  },
  {
    colaborador: "João Lima",
    unidade: "Petrobras SP",
    treinamento: "NR-35 (Trabalho em Altura)",
    vencidoEm: "15/10/2025",
    diasAtrasado: 58,
    risco: "Médio",
  },
  {
    colaborador: "Ana Souza",
    unidade: "Petrobras SP",
    treinamento: "NR-35 (Trabalho em Altura)",
    vencidoEm: "15/10/2025",
    diasAtrasado: 35,
    risco: "Médio",
  },
];
