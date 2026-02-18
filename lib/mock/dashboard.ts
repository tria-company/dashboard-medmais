/**
 * Mock data for the executive dashboard.
 * All types and data in a single file; no API calls.
 */

export interface KpiItem {
  label: string;
  value: string;
  variation: number;
  variationLabel: string;
  icon: "people" | "bag" | "cash";
}

export interface PontualidadeDia {
  dia: string;
  noHorario: number;
  atrasados: number;
  naoCompareceu: number;
}

export interface CoberturaPostos {
  percentualCobertos: number;
  semAlteracao: number;
  cobertoComHE: number;
  descoberto: number;
  totalPostos: number;
  alertasReservaExcedida: string;
  postosSemCoberturaCriticos: number;
  variacaoPercentual: number;
}

export interface MetricaOperacional {
  label: string;
  subtitulo: string;
  valor: string;
  status: "success" | "warning" | "info" | "orange";
}

export interface HeadcountMes {
  mes: string;
  active: number;
  inactive: number;
}

export interface ClienteHeadcount {
  nome: string;
  valor: number;
  percentual: number;
}

export interface RegiaoHeadcount {
  nome: string;
  valor: number;
  cor: string;
}

export interface EstadoHeadcount {
  tipo: string;
  valor: string;
  cor: string;
}

export interface HeadcountEstadoMapa {
  totalColaboradores: string;
  porTipo: EstadoHeadcount[];
}

export const kpiData: KpiItem[] = [
  {
    label: "Total Colaboradores",
    value: "8942",
    variation: 3.0,
    variationLabel: "+3.0%",
    icon: "people",
  },
  {
    label: "Assiduidade",
    value: "93%",
    variation: 0.3,
    variationLabel: "+0.3%",
    icon: "bag",
  },
  {
    label: "Folha de pagamento",
    value: "R$ 45,2M",
    variation: -0.5,
    variationLabel: "-0.5%",
    icon: "cash",
  },
];

export const pontualidade7DiasData: PontualidadeDia[] = [
  { dia: "DOM", noHorario: 0, atrasados: 0, naoCompareceu: 142 },
  { dia: "SEG", noHorario: 487, atrasados: 73, naoCompareceu: 28 },
  { dia: "TER", noHorario: 512, atrasados: 91, naoCompareceu: 0 },
  { dia: "QUA", noHorario: 398, atrasados: 65, naoCompareceu: 51 },
  { dia: "QUI", noHorario: 445, atrasados: 68, naoCompareceu: 41 },
  { dia: "SEX", noHorario: 534, atrasados: 82, naoCompareceu: 38 },
  { dia: "SAB", noHorario: 621, atrasados: 0, naoCompareceu: 0 },
];

export const coberturaPostosData: CoberturaPostos = {
  percentualCobertos: 87,
  semAlteracao: 238,
  cobertoComHE: 14,
  descoberto: 7,
  totalPostos: 259,
  alertasReservaExcedida: "5 por 7 pendentes",
  postosSemCoberturaCriticos: 2,
  variacaoPercentual: 4.7,
};

export const visaoGeralOperacionalData: MetricaOperacional[] = [
  {
    label: "Trocas Atrasadas",
    subtitulo: "Rendição com atraso > 15 min",
    valor: "7",
    status: "warning",
  },
  {
    label: "Trocas no Horário",
    subtitulo: "99.9% de pontualidade",
    valor: "238",
    status: "success",
  },
  {
    label: "Faltas Hoje",
    subtitulo: "4 justificadas por 14 não",
    valor: "18",
    status: "orange",
  },
  {
    label: "H.E Acumuladas Hoje",
    subtitulo: "R$ 28.4k custo estimado",
    valor: "327h",
    status: "info",
  },
];

export const headcount12MesesData: HeadcountMes[] = [
  { mes: "Jan", active: 320, inactive: 28 },
  { mes: "Fev", active: 335, inactive: 30 },
  { mes: "Mar", active: 348, inactive: 32 },
  { mes: "Abr", active: 362, inactive: 35 },
  { mes: "Mai", active: 370, inactive: 38 },
  { mes: "Jun", active: 378, inactive: 40 },
  { mes: "Jul", active: 385, inactive: 42 },
  { mes: "Ago", active: 372, inactive: 45 },
  { mes: "Set", active: 365, inactive: 42 },
  { mes: "Out", active: 358, inactive: 40 },
  { mes: "Nov", active: 352, inactive: 38 },
  { mes: "Dez", active: 348, inactive: 35 },
];

export const clientesHeadcountData: ClienteHeadcount[] = [
  { nome: "Petrobras", valor: 1960, percentual: 22 },
  { nome: "Vale", valor: 1540, percentual: 17 },
  { nome: "Ambev", valor: 1200, percentual: 13 },
  { nome: "JBS", valor: 980, percentual: 11 },
  { nome: "Itaú", valor: 850, percentual: 9 },
  { nome: "Mag. Luiza", valor: 720, percentual: 8 },
  { nome: "Natura", valor: 580, percentual: 6 },
  { nome: "B3", valor: 450, percentual: 5 },
  { nome: "Embraer", valor: 262, percentual: 3 },
];

export const headcountRegiaoData: RegiaoHeadcount[] = [
  { nome: "Sudeste", valor: 5840, cor: "#8B2942" },
  { nome: "Nordeste", valor: 2180, cor: "#C44B6A" },
  { nome: "Sul", valor: 1920, cor: "#D97373" },
  { nome: "Centro-Oeste", valor: 1340, cor: "#F0A0A0" },
  { nome: "Norte", valor: 1264, cor: "#F8C8C8" },
];

export const headcountEstadoData: HeadcountEstadoMapa = {
  totalColaboradores: "12.544",
  porTipo: [
    { tipo: "CLT", valor: "8.540", cor: "#8B2942" },
    { tipo: "Temporário", valor: "2.870", cor: "#C44B6A" },
    { tipo: "Intermitente", valor: "780", cor: "#9CA3AF" },
    { tipo: "Aprendiz", valor: "354", cor: "#6B7280" },
  ],
};

export const REGIOES_MAPA_ORDEM = [
  "Norte",
  "Nordeste",
  "Centro-Oeste",
  "Sudeste",
  "Sul",
] as const;

export type RegiaoMapa = (typeof REGIOES_MAPA_ORDEM)[number];

export const headcountEstadoPorRegiao: Record<RegiaoMapa, HeadcountEstadoMapa> = {
  Norte: {
    totalColaboradores: "2.180",
    porTipo: [
      { tipo: "CLT", valor: "1.420", cor: "#8B2942" },
      { tipo: "Temporário", valor: "520", cor: "#C44B6A" },
      { tipo: "Intermitente", valor: "148", cor: "#9CA3AF" },
      { tipo: "Aprendiz", valor: "92", cor: "#6B7280" },
    ],
  },
  Nordeste: {
    totalColaboradores: "3.290",
    porTipo: [
      { tipo: "CLT", valor: "2.180", cor: "#8B2942" },
      { tipo: "Temporário", valor: "720", cor: "#C44B6A" },
      { tipo: "Intermitente", valor: "245", cor: "#9CA3AF" },
      { tipo: "Aprendiz", valor: "145", cor: "#6B7280" },
    ],
  },
  "Centro-Oeste": {
    totalColaboradores: "1.340",
    porTipo: [
      { tipo: "CLT", valor: "890", cor: "#8B2942" },
      { tipo: "Temporário", valor: "280", cor: "#C44B6A" },
      { tipo: "Intermitente", valor: "98", cor: "#9CA3AF" },
      { tipo: "Aprendiz", valor: "72", cor: "#6B7280" },
    ],
  },
  Sudeste: {
    totalColaboradores: "12.544",
    porTipo: [
      { tipo: "CLT", valor: "8.540", cor: "#8B2942" },
      { tipo: "Temporário", valor: "2.870", cor: "#C44B6A" },
      { tipo: "Intermitente", valor: "780", cor: "#9CA3AF" },
      { tipo: "Aprendiz", valor: "354", cor: "#6B7280" },
    ],
  },
  Sul: {
    totalColaboradores: "2.890",
    porTipo: [
      { tipo: "CLT", valor: "1.920", cor: "#8B2942" },
      { tipo: "Temporário", valor: "620", cor: "#C44B6A" },
      { tipo: "Intermitente", valor: "218", cor: "#9CA3AF" },
      { tipo: "Aprendiz", valor: "132", cor: "#6B7280" },
    ],
  },
};

export function getLastUpdateFormatted(): string {
  const now = new Date();
  return now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getCurrentDateFormatted(): string {
  return new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
