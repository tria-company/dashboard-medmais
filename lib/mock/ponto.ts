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
  cliente: string;
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

/** Horas devidas e não trabalhadas por célula [semana][dia]. */
export interface HeatmapHorasDetail {
  horasDevidas: number;
  horasNaoTrabalhadas: number;
}

export const heatmapHorasData: HeatmapHorasDetail[][] = [
  [{ horasDevidas: 350, horasNaoTrabalhadas: 350 }, { horasDevidas: 280, horasNaoTrabalhadas: 180 }, { horasDevidas: 400, horasNaoTrabalhadas: 250 }, { horasDevidas: 320, horasNaoTrabalhadas: 150 }, { horasDevidas: 300, horasNaoTrabalhadas: 200 }, { horasDevidas: 200, horasNaoTrabalhadas: 180 }, { horasDevidas: 150, horasNaoTrabalhadas: 100 }],
  [{ horasDevidas: 280, horasNaoTrabalhadas: 200 }, { horasDevidas: 500, horasNaoTrabalhadas: 420 }, { horasDevidas: 280, horasNaoTrabalhadas: 180 }, { horasDevidas: 400, horasNaoTrabalhadas: 320 }, { horasDevidas: 200, horasNaoTrabalhadas: 80 }, { horasDevidas: 300, horasNaoTrabalhadas: 200 }, { horasDevidas: 350, horasNaoTrabalhadas: 280 }],
  [{ horasDevidas: 400, horasNaoTrabalhadas: 350 }, { horasDevidas: 300, horasNaoTrabalhadas: 200 }, { horasDevidas: 600, horasNaoTrabalhadas: 550 }, { horasDevidas: 500, horasNaoTrabalhadas: 420 }, { horasDevidas: 280, horasNaoTrabalhadas: 180 }, { horasDevidas: 200, horasNaoTrabalhadas: 100 }, { horasDevidas: 250, horasNaoTrabalhadas: 150 }],
  [{ horasDevidas: 250, horasNaoTrabalhadas: 180 }, { horasDevidas: 350, horasNaoTrabalhadas: 300 }, { horasDevidas: 320, horasNaoTrabalhadas: 250 }, { horasDevidas: 300, horasNaoTrabalhadas: 200 }, { horasDevidas: 400, horasNaoTrabalhadas: 350 }, { horasDevidas: 280, horasNaoTrabalhadas: 180 }, { horasDevidas: 150, horasNaoTrabalhadas: 60 }],
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

// --- Horas Extras por Colaborador ---
export interface OvertimeByColaboradorItem {
  nome: string;
  funcao: string;
  cliente: string;
  custo: string;
  horas: number;
}

export const overtimeByColaboradorData: OvertimeByColaboradorItem[] = [
  { nome: "Daniel M.", funcao: "Bombeiro", cliente: "Petrobrás - SP", custo: "R$ 1.898,25", horas: 513 },
  { nome: "Rodrigo A.", funcao: "Vigilante", cliente: "Petrobrás - SP", custo: "R$ 1.898,25", horas: 513 },
  { nome: "Ricardo S.", funcao: "Porteiro", cliente: "Petrobrás - SP", custo: "R$ 1.898,25", horas: 513 },
  { nome: "Fernando D.", funcao: "Técnico de CFTV", cliente: "Petrobrás - SP", custo: "R$ 1.898,25", horas: 513 },
  { nome: "Douglas R.", funcao: "Segurança", cliente: "Petrobrás - SP", custo: "R$ 1.898,25", horas: 513 },
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
  { nome: "Carlos M. Souza", posto: "Portaria principal", cliente: "Petrobras", quantidadePontosFora: 24 },
  { nome: "Ana P. Costa", posto: "Guarita Leste", cliente: "Petrobras", quantidadePontosFora: 18 },
  { nome: "Roberto S. Oliveira", posto: "CFTV - Monitoramento", cliente: "Vale", quantidadePontosFora: 15 },
  { nome: "Daniel V. Ribeiro", posto: "Manutenção Elétrica", cliente: "JBS", quantidadePontosFora: 12 },
  { nome: "Maria F. Lima", posto: "Recepção", cliente: "Bradesco", quantidadePontosFora: 10 },
  { nome: "José A. Silva", posto: "Controle de Acesso", cliente: "Itaú", quantidadePontosFora: 8 },
  { nome: "Fernanda T. Santos", posto: "Ronda externa", cliente: "Ambev", quantidadePontosFora: 6 },
  { nome: "Paulo R. Mendes", posto: "Almoxarifado", cliente: "Mag. Luiza", quantidadePontosFora: 5 },
].sort((a, b) => b.quantidadePontosFora - a.quantidadePontosFora);

/** Ranking de clientes por total de pontos batidos fora da zona (derivado do ranking de colaboradores). */
export interface PontoForaZonaPorClienteItem {
  cliente: string;
  quantidadePontosFora: number;
}

export const pontoForaZonaRankingPorCliente: PontoForaZonaPorClienteItem[] = (() => {
  const map = new Map<string, number>();
  pontoForaZonaRanking.forEach((item) => {
    const prev = map.get(item.cliente) ?? 0;
    map.set(item.cliente, prev + item.quantidadePontosFora);
  });
  return Array.from(map.entries())
    .map(([cliente, quantidadePontosFora]) => ({ cliente, quantidadePontosFora }))
    .sort((a, b) => b.quantidadePontosFora - a.quantidadePontosFora);
})();

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

// --- Postos em Tempo Real (mapa) ---
export interface FuncionarioAtrasado {
  nome: string;
  cargo: string;
  horaPrevista: string;
  atraso: string;
}

export interface PostoTempoRealItem {
  clienteLocal: string;
  nome: string;
  descobertos: number;
  funcionariosAtrasados: FuncionarioAtrasado[];
}

export const postosTempoRealPorEstado: Record<string, { nomeEstado: string; postos: PostoTempoRealItem[] }> = {
  SP: {
    nomeEstado: "São Paulo",
    postos: [
      {
        clienteLocal: "Petrobras - Santos/SP", nome: "Portaria principal", descobertos: 513,
        funcionariosAtrasados: [
          { nome: "Carlos M. Souza", cargo: "Vigilante", horaPrevista: "06:00", atraso: "2h15min" },
          { nome: "Ana P. Costa", cargo: "Porteiro", horaPrevista: "06:00", atraso: "1h45min" },
          { nome: "Roberto S. Oliveira", cargo: "Vigilante", horaPrevista: "06:00", atraso: "1h10min" },
        ],
      },
      {
        clienteLocal: "Petrobras - Santos/SP", nome: "Guarita Leste", descobertos: 500,
        funcionariosAtrasados: [
          { nome: "Daniel V. Ribeiro", cargo: "Vigilante", horaPrevista: "06:00", atraso: "3h00min" },
          { nome: "Maria F. Lima", cargo: "Controladora de Acesso", horaPrevista: "06:00", atraso: "45min" },
        ],
      },
      {
        clienteLocal: "Petrobras - Santos/SP", nome: "CFTV – Monitoramento", descobertos: 300,
        funcionariosAtrasados: [
          { nome: "José A. Silva", cargo: "Operador CFTV", horaPrevista: "07:00", atraso: "1h30min" },
        ],
      },
      {
        clienteLocal: "Petrobras - Santos/SP", nome: "Manutenção Elétrica", descobertos: 200,
        funcionariosAtrasados: [
          { nome: "Fernanda T. Santos", cargo: "Técnica Elétrica", horaPrevista: "07:00", atraso: "2h00min" },
          { nome: "Paulo R. Mendes", cargo: "Eletricista", horaPrevista: "07:00", atraso: "55min" },
        ],
      },
      {
        clienteLocal: "Petrobras - Santos/SP", nome: "Manutenção Elétrica", descobertos: 100,
        funcionariosAtrasados: [
          { nome: "Lucas G. Pereira", cargo: "Auxiliar Elétrico", horaPrevista: "08:00", atraso: "30min" },
        ],
      },
    ],
  },
  RJ: {
    nomeEstado: "Rio de Janeiro",
    postos: [
      {
        clienteLocal: "Vale - Vitória/ES", nome: "Portaria Sul", descobertos: 320,
        funcionariosAtrasados: [
          { nome: "Marcos A. Ferreira", cargo: "Vigilante", horaPrevista: "06:00", atraso: "2h30min" },
          { nome: "Juliana R. Alves", cargo: "Porteira", horaPrevista: "06:00", atraso: "1h20min" },
        ],
      },
      {
        clienteLocal: "Vale - Vitória/ES", nome: "Central de Monitoramento", descobertos: 180,
        funcionariosAtrasados: [
          { nome: "Ricardo B. Nunes", cargo: "Operador", horaPrevista: "07:00", atraso: "1h00min" },
        ],
      },
    ],
  },
  MG: {
    nomeEstado: "Minas Gerais",
    postos: [
      {
        clienteLocal: "Gerdau - Ouro Branco/MG", nome: "Portaria Norte", descobertos: 150,
        funcionariosAtrasados: [
          { nome: "Thiago L. Cardoso", cargo: "Vigilante", horaPrevista: "06:00", atraso: "1h45min" },
          { nome: "Camila S. Rocha", cargo: "Recepcionista", horaPrevista: "07:00", atraso: "40min" },
        ],
      },
      {
        clienteLocal: "Gerdau - Ouro Branco/MG", nome: "Balança de Carga", descobertos: 90,
        funcionariosAtrasados: [
          { nome: "Eduardo M. Santos", cargo: "Operador de Balança", horaPrevista: "06:00", atraso: "1h15min" },
        ],
      },
    ],
  },
};

export const postosTempoRealContagem: Record<string, number> = {
  SP: 5,
  RJ: 2,
  MG: 2,
  ES: 1,
  BA: 1,
  RS: 1,
  PR: 1,
};

// --- Alerta de Plantão por Posto ---
export interface AlertaPlantaoPostoItem {
  posto: string;
  pontos: number;
}

export const alertaPlantaoPostoData: AlertaPlantaoPostoItem[] = [
  { posto: "Petrobras", pontos: 42 },
  { posto: "Vale", pontos: 15 },
  { posto: "JBS", pontos: 12 },
  { posto: "Bradesco", pontos: 10 },
  { posto: "Itaú", pontos: 8 },
  { posto: "Ambev", pontos: 4 },
  { posto: "Mag. Luiza", pontos: 3 },
  { posto: "Mag. Luiza", pontos: 5 },
  { posto: "Mag. Luiza", pontos: 5 },
  { posto: "Mag. Luiza", pontos: 2 },
];

// --- Alerta de Plantão Colaborador ---
export interface AlertaPlantaoColaboradorItem {
  nome: string;
  posto: string;
  cliente: string;
  pontos: number;
}

export const alertaPlantaoColaboradorData: AlertaPlantaoColaboradorItem[] = [
  { nome: "Carlos M. Souza", posto: "Portaria principal", cliente: "Petrobras", pontos: 24 },
  { nome: "Ana P. Costa", posto: "Guarita Leste", cliente: "Petrobras", pontos: 18 },
  { nome: "Roberto S. Oliveira", posto: "CFTV - Monitoramento", cliente: "Vale", pontos: 15 },
  { nome: "Daniel V. Ribeiro", posto: "Manutenção Elétrica", cliente: "JBS", pontos: 12 },
  { nome: "Maria F. Lima", posto: "Recepção", cliente: "Bradesco", pontos: 10 },
  { nome: "José A. Silva", posto: "Controle de Acesso", cliente: "Itaú", pontos: 8 },
  { nome: "Fernanda T. Santos", posto: "Ronda externa", cliente: "Ambev", pontos: 6 },
  { nome: "Paulo R. Mendes", posto: "Almoxarifado", cliente: "Mag. Luiza", pontos: 5 },
];

// --- Tipo de Registro ---
export interface TipoRegistroItem {
  label: string;
  value: number;
  color: string;
}

export const tipoRegistroData: TipoRegistroItem[] = [
  { label: "Registros Genuínos", value: 8200, color: "#DC2626" },
  { label: "Registros Inseridos Manualmente", value: 1800, color: "#3B82F6" },
];

// --- Detalhamento de Faltas ---
export interface DetalhamentoFaltasItem {
  label: string;
  value: number;
  color: string;
}

export const detalhamentoFaltasData: DetalhamentoFaltasItem[] = [
  { label: "Férias", value: 1000, color: "#DC2626" },
  { label: "Atestados", value: 5840, color: "#22C55E" },
  { label: "Licenças", value: 1000, color: "#3B82F6" },
  { label: "Descontadas em Folha", value: 1000, color: "#F59E0B" },
];

export const detalhamentoFaltasTotal = 8000;

/** Heat na zona esperada por estado (coordenadas relativas ao estado para overlay). */
// --- Postos ON TIME (mapa de status) ---
export type PostoOnTimeStatus = "regular" | "atrasado" | "em_aberto";

export interface PostoOnTimeItem {
  posto: string;
  cliente: string;
  cidade: string;
  uf: string;
  lat: number;
  lng: number;
  colaboradores: number;
  status: PostoOnTimeStatus;
}

export const postosOnTimeData: PostoOnTimeItem[] = [
  { posto: "Portaria principal", cliente: "Petrobras", cidade: "Santos", uf: "SP", lat: -23.96, lng: -46.33, colaboradores: 42, status: "regular" },
  { posto: "Guarita Leste", cliente: "Petrobras", cidade: "Santos", uf: "SP", lat: -23.94, lng: -46.30, colaboradores: 28, status: "atrasado" },
  { posto: "CFTV - Monitoramento", cliente: "Vale", cidade: "Vitória", uf: "ES", lat: -20.32, lng: -40.34, colaboradores: 35, status: "regular" },
  { posto: "Manutenção Elétrica", cliente: "JBS", cidade: "Lins", uf: "SP", lat: -21.68, lng: -49.75, colaboradores: 18, status: "em_aberto" },
  { posto: "Recepção", cliente: "Bradesco", cidade: "Osasco", uf: "SP", lat: -23.53, lng: -46.79, colaboradores: 15, status: "regular" },
  { posto: "Controle de Acesso", cliente: "Ambev", cidade: "Jaguariúna", uf: "SP", lat: -22.70, lng: -46.99, colaboradores: 22, status: "atrasado" },
  { posto: "Ronda externa", cliente: "Itaú", cidade: "São Paulo", uf: "SP", lat: -23.59, lng: -46.68, colaboradores: 30, status: "regular" },
  { posto: "Almoxarifado", cliente: "Natura", cidade: "Cajamar", uf: "SP", lat: -23.36, lng: -46.88, colaboradores: 12, status: "em_aberto" },
  { posto: "Pátio de Manobras", cliente: "Embraer", cidade: "São José dos Campos", uf: "SP", lat: -23.22, lng: -45.90, colaboradores: 20, status: "regular" },
  { posto: "Balança de Carga", cliente: "Gerdau", cidade: "Ouro Branco", uf: "MG", lat: -20.52, lng: -43.70, colaboradores: 10, status: "atrasado" },
  { posto: "Portaria Sul", cliente: "Vale", cidade: "Rio de Janeiro", uf: "RJ", lat: -22.91, lng: -43.17, colaboradores: 25, status: "regular" },
  { posto: "Central de Monitoramento", cliente: "Vale", cidade: "Rio de Janeiro", uf: "RJ", lat: -22.88, lng: -43.22, colaboradores: 18, status: "em_aberto" },
  { posto: "Portaria Norte", cliente: "Gerdau", cidade: "Ouro Branco", uf: "MG", lat: -20.50, lng: -43.68, colaboradores: 14, status: "regular" },
  { posto: "Portaria Principal", cliente: "JBS", cidade: "Goiânia", uf: "GO", lat: -16.69, lng: -49.27, colaboradores: 32, status: "atrasado" },
  { posto: "Guarita Norte", cliente: "Ambev", cidade: "Jaguariúna", uf: "SP", lat: -22.72, lng: -47.00, colaboradores: 16, status: "regular" },
];

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
