/**
 * Mock data for Ponto (Attendance) dashboard.
 * Replace with API calls when backend is ready.
 */

export interface KpiPontoItem {
  value: string;
  label: string;
  variationLabel: string;
  variationPositive: boolean;
  icon: "presentes" | "pontualidade" | "faltas" | "he";
}

export interface AbsenceRow {
  colaborador: string;
  postoCliente: string;
  turno: string;
  faltasMes: number;
  tipo: "Justificada" | "Injustificada";
}

export interface AbsenceStatsDonut {
  label: string;
  value: number;
  color: string;
}

export interface AbsenceStatsTotals {
  totalFaltas: number;
  justificadas: number;
  injustificadas: number;
  horasExtras: string;
}

export interface HeatmapCell {
  week: number;
  day: number;
  value: number;
}

export interface OvertimeByClientItem {
  cliente: string;
  horas: number;
}

export interface OvertimeCostByMonthItem {
  mes: string;
  valor: number;
}

export const kpiPontoData: KpiPontoItem[] = [
  {
    value: "1.850",
    label: "Presentes Agora",
    variationLabel: "94.7% da escala",
    variationPositive: true,
    icon: "presentes",
  },
  {
    value: "87.3%",
    label: "Pontualidade",
    variationLabel: "+1.2% vs semana anterior",
    variationPositive: true,
    icon: "pontualidade",
  },
  {
    value: "12",
    label: "Faltas Hoje",
    variationLabel: "-3 vs ontem",
    variationPositive: true,
    icon: "faltas",
  },
  {
    value: "327h",
    label: "Horas Extras Hoje",
    variationLabel: "+12% vs ontem",
    variationPositive: false,
    icon: "he",
  },
];

export const absenceTableData: AbsenceRow[] = [
  {
    colaborador: "Carlos M. Souza",
    postoCliente: "Portaria Principal - Petrobras",
    turno: "A (06-14h)",
    faltasMes: 4,
    tipo: "Injustificada",
  },
  {
    colaborador: "Carlos M. Souza",
    postoCliente: "Portaria Principal - Petrobras",
    turno: "A (06-14h)",
    faltasMes: 4,
    tipo: "Injustificada",
  },
  {
    colaborador: "Carlos M. Souza",
    postoCliente: "Portaria Principal - Petrobras",
    turno: "A (06-14h)",
    faltasMes: 4,
    tipo: "Injustificada",
  },
  {
    colaborador: "Carlos M. Souza",
    postoCliente: "Portaria Principal - Petrobras",
    turno: "A (06-14h)",
    faltasMes: 4,
    tipo: "Injustificada",
  },
  {
    colaborador: "Carlos M. Souza",
    postoCliente: "Portaria Principal - Petrobras",
    turno: "A (06-14h)",
    faltasMes: 4,
    tipo: "Justificada",
  },
];

export const absenceStatsMasculino: AbsenceStatsDonut[] = [
  { label: "Faltas", value: 5423, color: "#3B82F6" },
  { label: "Resto", value: 3500, color: "#E5E7EB" },
];

export const absenceStatsFeminino: AbsenceStatsDonut[] = [
  { label: "Faltas", value: 4820, color: "#F97316" },
  { label: "Resto", value: 3100, color: "#E5E7EB" },
];

export const absenceStatsTotals: AbsenceStatsTotals = {
  totalFaltas: 5130,
  justificadas: 238,
  injustificadas: 150,
  horasExtras: "320h",
};

/** Heatmap: 4 weeks x 7 days, values as percentage (0-6). */
export const heatmapData: number[][] = [
  [0.5, 1.2, 1.5, 0.8, 1.0, 2.1, 1.8],
  [1.2, 2.8, 1.2, 2.1, 0.5, 1.5, 2.0],
  [2.1, 1.5, 4.2, 2.8, 1.2, 0.8, 1.0],
  [1.0, 2.0, 1.8, 1.5, 2.1, 1.2, 0.5],
];

export const heatmapLegend = [
  { label: "<1%", color: "#DCFCE7" },
  { label: "1-2%", color: "#BBF7D0" },
  { label: "2-4%", color: "#FEF08A" },
  { label: "4-6%", color: "#FECACA" },
  { label: ">6%", color: "#DC2626" },
];

export const overtimeByClientData: OvertimeByClientItem[] = [
  { cliente: "Petrobras", horas: 150 },
  { cliente: "Vale", horas: 80 },
  { cliente: "Ambev", horas: 15 },
  { cliente: "JBS", horas: 20 },
  { cliente: "Itaú", horas: 15 },
  { cliente: "Itaú", horas: 15 },
];

export const overtimeCostByMonthData: OvertimeCostByMonthItem[] = [
  { mes: "J", valor: 28500 },
  { mes: "F", valor: 26200 },
  { mes: "M", valor: 29800 },
  { mes: "A", valor: 27500 },
  { mes: "M", valor: 24200 },
  { mes: "J", valor: 19800 },
  { mes: "J", valor: 22100 },
  { mes: "A", valor: 24500 },
  { mes: "S", valor: 25200 },
  { mes: "O", valor: 23800 },
  { mes: "N", valor: 26500 },
  { mes: "D", valor: 27998.25 },
];

export const overtimeCostTotalAno = "170.898,25";

export const heatmapUnidadeOptions = ["Petrobras", "Vale", "Ambev"];
