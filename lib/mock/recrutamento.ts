/**
 * Mock data for Recrutamento (Recruitment) dashboard.
 * Replace with API calls when backend is ready.
 */

export type RecruitmentKpiIcon =
  | "vagas_abertas"
  | "sla_recrutamento"
  | "custo_medio"
  | "tempo_reposicao";

export interface RecruitmentKpiItem {
  label: string;
  value: string;
  variationLabel: string;
  variationPositive: boolean;
  icon: RecruitmentKpiIcon;
}

export interface RecruitmentFunnelPoint {
  etapa: string;
  quantidade: number;
  color?: string;
}

export interface RankingVagasAbertasItem {
  cargo: string;
  quantidade: number;
}

export type SlaStatus = "Fora do SLA" | "No Prazo" | "Em Risco";

export interface VagaPorUnidadeRow {
  vaga: string;
  unidade: string;
  diasEmAberto: number;
  candidatos: number;
  slaStatus: SlaStatus;
  custo: number;
}

export interface EvolucaoVagasPoint {
  mes: string;
  vagasAbertas: number;
  vagasPreenchidas: number;
}

export interface CustoPorContratoItem {
  cliente: string;
  valor: number;
}

export interface TalentPoolMonth {
  mes: string;
  vagasAbertas: number;
  contratacoes: number;
  talentosNoBanco: number;
}

export interface VagasAbertasEstadoItem {
  sigla: string;
  estado: string;
  vagasAbertas: number;
  efetivoLocal: number;
}

export const recruitmentKpis: RecruitmentKpiItem[] = [
  {
    label: "Vagas Abertas",
    value: "87%",
    variationLabel: "+6 vs mês anterior",
    variationPositive: true,
    icon: "vagas_abertas",
  },
  {
    label: "SLA de Recrutamento",
    value: "87%",
    variationLabel: "+3% fora do SLA",
    variationPositive: false,
    icon: "sla_recrutamento",
  },
  {
    label: "Custo Médio por Contratação",
    value: "R$ 1.640",
    variationLabel: "+3.1% vs mês anterior",
    variationPositive: false,
    icon: "custo_medio",
  },
  {
    label: "Tempo Médio de Reposição",
    value: "14 dias",
    variationLabel: "-2 vs mês anterior",
    variationPositive: true,
    icon: "tempo_reposicao",
  },
];

export const recruitmentFunnelData: RecruitmentFunnelPoint[] = [
  { etapa: "Inscrições", quantidade: 1500 },
  { etapa: "Em Triagem", quantidade: 1100 },
  { etapa: "Entrevistas agendadas", quantidade: 800 },
  { etapa: "Finalistas", quantidade: 400 },
  { etapa: "Contratados", quantidade: 200 },
];

export const rankingVagasAbertas: RankingVagasAbertasItem[] = [
  { cargo: "Enfermeiro", quantidade: 150 },
  { cargo: "Bombeiro", quantidade: 130 },
  { cargo: "Técnico", quantidade: 120 },
  { cargo: "Administrativo", quantidade: 110 },
  { cargo: "Gestão", quantidade: 100 },
  { cargo: "Outros", quantidade: 50 },
];

export const vagasPorUnidadeData: VagaPorUnidadeRow[] = [
  { vaga: "Bombeiro", unidade: "Petrobras SP", diasEmAberto: 22, candidatos: 40, slaStatus: "Fora do SLA", custo: 1900 },
  { vaga: "Bombeiro", unidade: "Vale RJ", diasEmAberto: 20, candidatos: 70, slaStatus: "Fora do SLA", custo: 1900 },
  { vaga: "Bombeiro", unidade: "JBS GO", diasEmAberto: 12, candidatos: 86, slaStatus: "No Prazo", custo: 1900 },
  { vaga: "Bombeiro", unidade: "Petrobras SP", diasEmAberto: 6, candidatos: 130, slaStatus: "Em Risco", custo: 1900 },
  { vaga: "Bombeiro", unidade: "Petrobras SP", diasEmAberto: 2, candidatos: 20, slaStatus: "No Prazo", custo: 1900 },
];

const MONTHS_SHORT = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export const evolucaoVagasData: EvolucaoVagasPoint[] = MONTHS_SHORT.map((mes, i) => ({
  mes,
  vagasAbertas: Math.round(80 - i * 3 + (i % 3) * 8),
  vagasPreenchidas: Math.round(20 + i * 5 + (i % 2) * 3),
}));

export const custoPorContratoData: CustoPorContratoItem[] = [
  { cliente: "Petrobras", valor: 48000 },
  { cliente: "Vale", valor: 42000 },
  { cliente: "Itaú", valor: 35000 },
  { cliente: "Bradesco", valor: 28000 },
  { cliente: "JBS", valor: 22000 },
  { cliente: "G4", valor: 18000 },
  { cliente: "Ambev", valor: 15000 },
  { cliente: "Mag. Luiza", valor: 12000 },
];

export const talentPoolData: TalentPoolMonth[] = MONTHS_SHORT.map((mes, i) => {
  const vagasBase = 40 + (i % 4) * 8;
  const contratacoesBase = 20 + (i % 3) * 5;
  const talentosBase = 120 + i * 10;
  return {
    mes,
    vagasAbertas: vagasBase,
    contratacoes: contratacoesBase,
    talentosNoBanco: talentosBase,
  };
});

export const vagasAbertasPorEstadoData: VagasAbertasEstadoItem[] = [
  { sigla: "SP", estado: "São Paulo", vagasAbertas: 180, efetivoLocal: 520 },
  { sigla: "RJ", estado: "Rio de Janeiro", vagasAbertas: 120, efetivoLocal: 380 },
  { sigla: "MG", estado: "Minas Gerais", vagasAbertas: 90, efetivoLocal: 290 },
  { sigla: "RS", estado: "Rio Grande do Sul", vagasAbertas: 70, efetivoLocal: 260 },
  { sigla: "BA", estado: "Bahia", vagasAbertas: 65, efetivoLocal: 240 },
  { sigla: "PR", estado: "Paraná", vagasAbertas: 60, efetivoLocal: 210 },
  { sigla: "SC", estado: "Santa Catarina", vagasAbertas: 40, efetivoLocal: 180 },
  { sigla: "PE", estado: "Pernambuco", vagasAbertas: 35, efetivoLocal: 160 },
].sort((a, b) => b.vagasAbertas - a.vagasAbertas);
