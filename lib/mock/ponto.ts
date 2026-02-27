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

export interface RankingClienteInconsistencia {
  cliente: string;
  inconsistencias: number;
}

export interface RankingPostoInconsistencia {
  clienteLocal: string;
  posto: string;
  inconsistencias: number;
}

export interface RankingColaboradorInconsistencia {
  nome: string;
  funcao: string;
  local: string;
  inconsistencias: number;
}

/** Pontos batidos dentro vs fora da geolocalização (resumo para donut). */
export interface GeolocationPunchSummary {
  dentro: number;
  fora: number;
}

/** Item do ranking de quem bateu ponto fora da zona. */
export interface PontoForaZonaRankingItem {
  nome: string;
  posto: string;
  quantidadePontosFora: number;
}

/** Registro de um ponto batido (para lista por funcionário). */
export interface PontoBatidoItem {
  id: string;
  funcionarioNome: string;
  funcionarioId?: string;
  dataHora: string;
  posto: string;
  regiao: string;
  cliente: string;
  fotoUrl?: string;
}

/** Coordenada e intensidade para heat na zona esperada (visão estado). */
export interface HeatZonaEsperadaPoint {
  lat: number;
  lng: number;
  intensity: number;
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

export const rankingClientesInconsistencias: RankingClienteInconsistencia[] = [
  { cliente: "Petrobras", inconsistencias: 513 },
  { cliente: "Vale", inconsistencias: 500 },
  { cliente: "JBS", inconsistencias: 300 },
  { cliente: "Bradesco", inconsistencias: 260 },
  { cliente: "Ambev", inconsistencias: 220 },
  { cliente: "Itaú", inconsistencias: 180 },
  { cliente: "Natura", inconsistencias: 140 },
  { cliente: "Embraer", inconsistencias: 110 },
  { cliente: "Gerdau", inconsistencias: 80 },
  { cliente: "Localiza", inconsistencias: 60 },
];

export const rankingPostosInconsistencias: RankingPostoInconsistencia[] = [
  {
    clienteLocal: "Petrobras - Santos/SP",
    posto: "Portaria principal",
    inconsistencias: 513,
  },
  {
    clienteLocal: "Petrobras - Santos/SP",
    posto: "Guarita Leste",
    inconsistencias: 500,
  },
  {
    clienteLocal: "Vale - Vitória/ES",
    posto: "CFTV - Monitoramento",
    inconsistencias: 300,
  },
  {
    clienteLocal: "JBS - Lins/SP",
    posto: "Manutenção Elétrica",
    inconsistencias: 260,
  },
  {
    clienteLocal: "Bradesco - Osasco/SP",
    posto: "Recepção",
    inconsistencias: 220,
  },
  {
    clienteLocal: "Ambev - Jaguariúna/SP",
    posto: "Controle de Acesso",
    inconsistencias: 180,
  },
  {
    clienteLocal: "Itaú - São Paulo/SP",
    posto: "Ronda externa",
    inconsistencias: 140,
  },
  {
    clienteLocal: "Natura - Cajamar/SP",
    posto: "Almoxarifado",
    inconsistencias: 110,
  },
  {
    clienteLocal: "Embraer - São José dos Campos/SP",
    posto: "Pátio de Manobras",
    inconsistencias: 80,
  },
  {
    clienteLocal: "Gerdau - Ouro Branco/MG",
    posto: "Balança de Carga",
    inconsistencias: 60,
  },
];

export const rankingColaboradoresInconsistencias: RankingColaboradorInconsistencia[] =
  [
    {
      nome: "Daniel M.",
      funcao: "Bombeiro",
      local: "Petrobras - SP",
      inconsistencias: 513,
    },
    {
      nome: "Rodrigo A.",
      funcao: "Vigilante",
      local: "Vale - ES",
      inconsistencias: 500,
    },
    {
      nome: "Ricardo S.",
      funcao: "Porteiro",
      local: "JBS - SP",
      inconsistencias: 300,
    },
    {
      nome: "Fernando D.",
      funcao: "Técnico de CFTV",
      local: "Bradesco - SP",
      inconsistencias: 260,
    },
    {
      nome: "Douglas R.",
      funcao: "Segurança",
      local: "Ambev - SP",
      inconsistencias: 220,
    },
    {
      nome: "Felipe P.",
      funcao: "Controlador de Acesso",
      local: "Itaú - SP",
      inconsistencias: 180,
    },
    {
      nome: "Mariana L.",
      funcao: "Supervisora de Posto",
      local: "Natura - SP",
      inconsistencias: 140,
    },
    {
      nome: "Bruno C.",
      funcao: "Operador de Monitoramento",
      local: "Embraer - SP",
      inconsistencias: 110,
    },
    {
      nome: "Tatiane F.",
      funcao: "Fiscal de Pátio",
      local: "Gerdau - MG",
      inconsistencias: 80,
    },
    {
      nome: "Lucas H.",
      funcao: "Líder de Equipe",
      local: "Localiza - MG",
      inconsistencias: 60,
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

// --- Geolocalização: pontos dentro/fora da zona ---
export const geolocationPunchSummary: GeolocationPunchSummary = {
  dentro: 8420,
  fora: 1580,
};

export const pontoForaZonaRanking: PontoForaZonaRankingItem[] = [
  { nome: "Carlos M. Souza", posto: "Portaria principal", quantidadePontosFora: 24 },
  { nome: "Ana P. Costa", posto: "Guarita Leste", quantidadePontosFora: 18 },
  { nome: "Roberto S. Oliveira", posto: "CFTV - Monitoramento", quantidadePontosFora: 15 },
  { nome: "Daniel V. Ribeiro", posto: "Manutenção Elétrica", quantidadePontosFora: 12 },
  { nome: "Maria F. Lima", posto: "Recepção", quantidadePontosFora: 10 },
  { nome: "José A. Silva", posto: "Controle de Acesso", quantidadePontosFora: 8 },
  { nome: "Fernanda T. Santos", posto: "Ronda externa", quantidadePontosFora: 6 },
  { nome: "Paulo R. Mendes", posto: "Almoxarifado", quantidadePontosFora: 5 },
].sort((a, b) => b.quantidadePontosFora - a.quantidadePontosFora);

// --- Todos os pontos por funcionário (lista + popup) ---
const placeholderPhoto =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect fill='%23e5e7eb' width='120' height='120'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='14'%3EFoto%3C/text%3E%3C/svg%3E";

export const allPunchesByEmployeeData: PontoBatidoItem[] = [
  {
    id: "p1",
    funcionarioNome: "Daniel M.",
    dataHora: "2025-02-23T06:02:00",
    posto: "Portaria principal",
    regiao: "Sudeste",
    cliente: "Petrobras",
    fotoUrl: placeholderPhoto,
  },
  {
    id: "p2",
    funcionarioNome: "Rodrigo A.",
    dataHora: "2025-02-23T05:58:00",
    posto: "Guarita Leste",
    regiao: "Sudeste",
    cliente: "Petrobras",
    fotoUrl: placeholderPhoto,
  },
  {
    id: "p3",
    funcionarioNome: "Ricardo S.",
    dataHora: "2025-02-23T14:01:00",
    posto: "Recepção",
    regiao: "Sudeste",
    cliente: "Bradesco",
    fotoUrl: placeholderPhoto,
  },
  {
    id: "p4",
    funcionarioNome: "Fernando D.",
    dataHora: "2025-02-22T06:15:00",
    posto: "CFTV - Monitoramento",
    regiao: "Nordeste",
    cliente: "Vale",
    fotoUrl: placeholderPhoto,
  },
  {
    id: "p5",
    funcionarioNome: "Mariana L.",
    dataHora: "2025-02-22T13:45:00",
    posto: "Controle de Acesso",
    regiao: "Sul",
    cliente: "Ambev",
    fotoUrl: placeholderPhoto,
  },
  {
    id: "p6",
    funcionarioNome: "Felipe P.",
    dataHora: "2025-02-21T06:00:00",
    posto: "Ronda externa",
    regiao: "Sudeste",
    cliente: "Itaú",
    fotoUrl: placeholderPhoto,
  },
  {
    id: "p7",
    funcionarioNome: "Bruno C.",
    dataHora: "2025-02-21T14:10:00",
    posto: "Manutenção Elétrica",
    regiao: "Centro-Oeste",
    cliente: "JBS",
    fotoUrl: placeholderPhoto,
  },
  {
    id: "p8",
    funcionarioNome: "Carlos M. Souza",
    dataHora: "2025-02-20T05:55:00",
    posto: "Portaria principal",
    regiao: "Sudeste",
    cliente: "Petrobras",
    fotoUrl: placeholderPhoto,
  },
];

// --- Mapa Brasil: pontos fora da zona por estado (sigla UF) ---
export const pontosForaZonaPorEstado: Record<string, number> = {
  SP: 420,
  RJ: 280,
  MG: 195,
  ES: 120,
  BA: 98,
  RS: 85,
  PR: 72,
  SC: 58,
  PE: 54,
  CE: 48,
  GO: 42,
  AM: 35,
  PA: 28,
  RN: 22,
  PB: 18,
  MA: 15,
  AL: 12,
  SE: 10,
  DF: 38,
  MT: 25,
  MS: 20,
  RO: 14,
  TO: 8,
  PI: 11,
  AC: 6,
  AP: 4,
  RR: 3,
};

/** Heat na zona esperada por estado (coordenadas relativas ao estado para overlay). */
export const heatZonaEsperadaPorEstado: Record<
  string,
  HeatZonaEsperadaPoint[]
> = {
  SP: [
    { lat: -23.55, lng: -46.63, intensity: 0.9 },
    { lat: -23.2, lng: -45.9, intensity: 0.6 },
    { lat: -22.9, lng: -47.06, intensity: 0.5 },
  ],
  RJ: [
    { lat: -22.9, lng: -43.2, intensity: 0.85 },
    { lat: -22.5, lng: -41.3, intensity: 0.4 },
  ],
  MG: [
    { lat: -19.92, lng: -43.94, intensity: 0.7 },
    { lat: -21.76, lng: -46.57, intensity: 0.5 },
  ],
};
