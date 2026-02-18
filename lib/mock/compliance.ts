/**
 * Mock data for Compliance dashboard.
 * Replace with API calls when backend is ready.
 */

export interface KpiComplianceItem {
  value: string;
  label: string;
  variationLabel: string;
  variationPositive: boolean;
  icon: "esocial" | "asos" | "nrs" | "processos";
}

export interface ComplianceProgressItem {
  label: string;
  percent: number;
  /** green | yellow | red for pill color */
  status: "high" | "medium" | "low";
}

export interface RadarDataPoint {
  subject: string;
  atual: number;
  meta: number;
  fullMark: number;
}

export interface LaborRiskRow {
  unidade: string;
  feriasVencidas: number;
  asosVencidos: number;
  nrsPendentes: number;
  jornadaIrregular: number;
  processos: number;
  riscoGeral: "Alto" | "Baixo" | "Médio";
}

export interface ExpiredDocItem {
  title: string;
  subtitle: string;
  status: string;
  vencto: string;
  urgency: "high" | "medium";
}

export interface UpcomingDeadlineItem {
  title: string;
  unidades: string;
  prazo: string;
  urgency: "high" | "medium";
}

export const kpiComplianceData: KpiComplianceItem[] = [
  {
    value: "23",
    label: "eSocial Pendentes",
    variationLabel: "+4 vs mês anterior",
    variationPositive: false,
    icon: "esocial",
  },
  {
    value: "12",
    label: "ASOs Vencidos",
    variationLabel: "+3 vs mês anterior",
    variationPositive: false,
    icon: "asos",
  },
  {
    value: "8",
    label: "NRs Atrasadas",
    variationLabel: "+0 vs mês anterior",
    variationPositive: true,
    icon: "nrs",
  },
  {
    value: "3",
    label: "Processos Ativos",
    variationLabel: "+1 vs mês anterior",
    variationPositive: true,
    icon: "processos",
  },
];

export const complianceProgressList: ComplianceProgressItem[] = [
  { label: "eSocial", percent: 92, status: "high" },
  { label: "Saúde Ocupacional (NR-7)", percent: 85, status: "high" },
  { label: "Segurança do Trabalho (NR-6)", percent: 75, status: "medium" },
  { label: "Treinamentos Obrigatórios (NR-35)", percent: 67, status: "medium" },
  { label: "Documentação Trabalhista", percent: 95, status: "high" },
  { label: "FGTS/INSS", percent: 57, status: "low" },
  { label: "Férias e Jornada", percent: 95, status: "high" },
  { label: "LGPD", percent: 95, status: "high" },
];

const RADAR_SUBJECTS = [
  "eSocial",
  "Saúde Ocup.",
  "Segurança",
  "Treinamentos",
  "Documentação",
  "FGTS/INSS",
  "Férias/Jornada",
  "LGPD",
];

export const radarSeriesData: RadarDataPoint[] = RADAR_SUBJECTS.map((subject, i) => ({
  subject,
  atual: [92, 85, 75, 67, 95, 57, 95, 95][i] ?? 80,
  meta: 90,
  fullMark: 100,
}));

export const laborRiskTableData: LaborRiskRow[] = [
  {
    unidade: "JBS - Goiânia",
    feriasVencidas: 12,
    asosVencidos: 4,
    nrsPendentes: 3,
    jornadaIrregular: 5,
    processos: 2,
    riscoGeral: "Alto",
  },
  {
    unidade: "Vale - Rio de Janeiro",
    feriasVencidas: 12,
    asosVencidos: 4,
    nrsPendentes: 3,
    jornadaIrregular: 5,
    processos: 2,
    riscoGeral: "Alto",
  },
  {
    unidade: "Ambev - Belo Horizonte",
    feriasVencidas: 3,
    asosVencidos: 1,
    nrsPendentes: 3,
    jornadaIrregular: 1,
    processos: 0,
    riscoGeral: "Baixo",
  },
  {
    unidade: "Petrobras - São Paulo",
    feriasVencidas: 5,
    asosVencidos: 2,
    nrsPendentes: 2,
    jornadaIrregular: 2,
    processos: 1,
    riscoGeral: "Médio",
  },
];

export const expiredDocsList: ExpiredDocItem[] = [
  {
    title: "ASO Periódico",
    subtitle: "Carlos Silva — Petrobras SP",
    status: "Vencido há 45 dias",
    vencto: "15/12/2024",
    urgency: "high",
  },
  {
    title: "NR-35 (Trabalho em Altura)",
    subtitle: "Maria Santos — Vale RJ",
    status: "Vencido há 15 dias",
    vencto: "28/01/2025",
    urgency: "high",
  },
  {
    title: "Exame Admissional",
    subtitle: "João Oliveira — Ambev BH",
    status: "Vencido há 5 dias",
    vencto: "08/02/2025",
    urgency: "medium",
  },
  {
    title: "PCMSO Anual",
    subtitle: "Unidade JBS Goiânia",
    status: "Vencido há 30 dias",
    vencto: "10/01/2025",
    urgency: "high",
  },
  {
    title: "PPRA Revisão",
    subtitle: "Unidade Itaú SP",
    status: "Vencido há 8 dias",
    vencto: "05/02/2025",
    urgency: "medium",
  },
];

export const upcomingDeadlinesData: {
  group: string;
  items: UpcomingDeadlineItem[];
}[] = [
  {
    group: "ESTA SEMANA",
    items: [
      {
        title: "12 ASOs periódicos vencem",
        unidades: "SP, RJ, MG",
        prazo: "15/02/2025",
        urgency: "high",
      },
      {
        title: "Envio eSocial S-2240",
        unidades: "Todas",
        prazo: "14/02/2025",
        urgency: "high",
      },
    ],
  },
  {
    group: "PRÓXIMA SEMANA",
    items: [
      {
        title: "NR-35 Reciclagem (20 colaboradores)",
        unidades: "SP",
        prazo: "22/02/2025",
        urgency: "medium",
      },
      {
        title: "PCMSO Trimestral",
        unidades: "RJ, MG",
        prazo: "20/02/2025",
        urgency: "medium",
      },
      {
        title: "FGTS Guia vencimento",
        unidades: "SP, BH",
        prazo: "25/02/2025",
        urgency: "medium",
      },
    ],
  },
];
