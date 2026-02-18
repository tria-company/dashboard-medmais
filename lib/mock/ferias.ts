/**
 * Mock data for Férias (Vacation) dashboard.
 * Replace with API calls when backend is ready.
 */

export interface KpiFeriasItem {
  value: string;
  label: string;
  variationLabel: string;
  variationPositive: boolean;
  icon: "vencidas" | "a_vencer" | "provisao" | "programadas";
}

export interface ExpiredVacationRow {
  colaborador: string;
  matricula: string;
  unidade: string;
  cliente: string;
  diasVencidos: number;
  periodoAquisitivo: string;
  risco: "Alto" | "Médio";
}

export interface CalendarEventDay {
  day: number;
  status: "ferias" | "medio" | "alto";
}

export interface CostProjectionPoint {
  mes: string;
  valor1: number;
  valor2: number;
}

export interface VacationStatusItem {
  label: string;
  color: string;
  count: number;
  /** Texto exibido no tooltip ao passar o mouse na fatia do donut */
  tooltipLabel?: string;
}

export const kpiFeriasData: KpiFeriasItem[] = [
  {
    value: "47",
    label: "Férias Vencidas",
    variationLabel: "+8 vs mês anterior",
    variationPositive: false,
    icon: "vencidas",
  },
  {
    value: "123",
    label: "A vencer em 30 dias",
    variationLabel: "+15 vs mês anterior",
    variationPositive: false,
    icon: "a_vencer",
  },
  {
    value: "R$ 2,3M",
    label: "Provisão Acumulada",
    variationLabel: "+4,2% vs mês anterior",
    variationPositive: false,
    icon: "provisao",
  },
  {
    value: "87%",
    label: "Férias Programadas",
    variationLabel: "+3% vs mês anterior",
    variationPositive: true,
    icon: "programadas",
  },
];

export const expiredVacationTableData: ExpiredVacationRow[] = [
  {
    colaborador: "Carlos M. Souza",
    matricula: "123456",
    unidade: "São Paulo - SP",
    cliente: "Petrobras",
    diasVencidos: 45,
    periodoAquisitivo: "01/2023-01/2024",
    risco: "Alto",
  },
  {
    colaborador: "João Pedro Lima",
    matricula: "123456",
    unidade: "Rio de Janeiro - RJ",
    cliente: "Vale",
    diasVencidos: 38,
    periodoAquisitivo: "01/2023-01/2024",
    risco: "Alto",
  },
  {
    colaborador: "Maria Fernanda Oliveira",
    matricula: "123456",
    unidade: "Belo Horizonte - MG",
    cliente: "Ambev",
    diasVencidos: 32,
    periodoAquisitivo: "01/2023-01/2024",
    risco: "Alto",
  },
  {
    colaborador: "Roberto Gomes Filho",
    matricula: "123456",
    unidade: "Goiânia - GO",
    cliente: "JBS",
    diasVencidos: 28,
    periodoAquisitivo: "01/2023-01/2024",
    risco: "Médio",
  },
  {
    colaborador: "Luciana Martins",
    matricula: "123456",
    unidade: "Florianópolis - SC",
    cliente: "Bradesco",
    diasVencidos: 25,
    periodoAquisitivo: "01/2023-01/2024",
    risco: "Médio",
  },
];

/** Days with status for calendar (month-agnostic day number). */
export const calendarEventDays: CalendarEventDay[] = [
  { day: 3, status: "alto" },
  { day: 4, status: "medio" },
  { day: 5, status: "ferias" },
  { day: 6, status: "ferias" },
  { day: 7, status: "ferias" },
  { day: 10, status: "alto" },
  { day: 11, status: "medio" },
  { day: 12, status: "ferias" },
  { day: 13, status: "ferias" },
  { day: 14, status: "ferias" },
  { day: 17, status: "alto" },
  { day: 18, status: "medio" },
  { day: 19, status: "ferias" },
  { day: 20, status: "ferias" },
  { day: 21, status: "ferias" },
  { day: 24, status: "alto" },
  { day: 25, status: "medio" },
  { day: 29, status: "alto" },
  { day: 30, status: "alto" },
];

export const costProjectionData: CostProjectionPoint[] = [
  { mes: "Jan/25", valor1: 1200, valor2: 1100 },
  { mes: "Fev/25", valor1: 1800, valor2: 1600 },
  { mes: "Mar/25", valor1: 2200, valor2: 2400 },
  { mes: "Abr/25", valor1: 2800, valor2: 3200 },
  { mes: "Mai/25", valor1: 3200, valor2: 3800 },
  { mes: "Jun/25", valor1: 3500, valor2: 4200 },
  { mes: "Jul/25", valor1: 3800, valor2: 4800 },
  { mes: "Ago/25", valor1: 4000, valor2: 5400 },
];

export const costProjectionTotal = "10.8K";

/** Ordem: Programadas, Em gozo, Vencidas, A vencer (como no donut da imagem) */
export const vacationStatusData: VacationStatusItem[] = [
  { label: "Programadas", color: "#3B82F6", count: 238, tooltipLabel: "Programadas - 5.840" },
  { label: "Em gozo", color: "#22C55E", count: 238, tooltipLabel: "Em gozo - 238" },
  { label: "Vencidas", color: "#EF4444", count: 238, tooltipLabel: "Vencidas - 238" },
  { label: "A vencer (30d)", color: "#EAB308", count: 238, tooltipLabel: "A vencer (30d) - 238" },
];

export const vacationStatusDonutTotal = "8000";

export const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
export const MONTHS_SHORT = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
];
export const WEEKDAY_LETTERS = ["D", "S", "T", "Q", "Q", "S", "S"];
