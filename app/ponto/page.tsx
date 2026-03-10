import FiltroPostoEmpresa from "@/components/filtro-posto-empresa";
import AbsenceHeatmap from "@/components/dashboard/ponto/AbsenceHeatmap";
import AbsenceStatsCard from "@/components/dashboard/ponto/AbsenceStatsCard";
import AbsenceTable from "@/components/dashboard/ponto/AbsenceTable";
import AlertaPlantaoColaboradorCard from "@/components/dashboard/ponto/AlertaPlantaoColaboradorCard";
import AlertaPlantaoPostoCard from "@/components/dashboard/ponto/AlertaPlantaoPostoCard";
import AllPunchesByEmployeeCard from "@/components/dashboard/ponto/AllPunchesByEmployeeCard";
import DetalhamentoFaltasCard from "@/components/dashboard/ponto/DetalhamentoFaltasCard";
import GeolocationPunchCard from "@/components/dashboard/ponto/GeolocationPunchCard";
import InconsistencyRankings from "@/components/dashboard/ponto/InconsistencyRankings";
import KpiMiniCard from "@/components/dashboard/ponto/KpiMiniCard";
import OvertimeByClient from "@/components/dashboard/ponto/OvertimeByClient";
import OvertimeCostByMonth from "@/components/dashboard/ponto/OvertimeCostByMonth";
import PostosTempoRealCard from "@/components/dashboard/ponto/PostosTempoRealCard";
import TipoRegistroCard from "@/components/dashboard/ponto/TipoRegistroCard";
import { kpiPontoData } from "@/lib/mock/ponto";

export default function PontoPage(): React.ReactElement {
  return (
    <div className="flex flex-col gap-10">
      <FiltroPostoEmpresa />

      {/* KPI Cards */}
      <section className="flex w-full flex-wrap items-center justify-center gap-8">
        {kpiPontoData.map((item) => (
          <KpiMiniCard key={item.label} item={item} />
        ))}
      </section>

      {/* Postos em Tempo Real + Alertas de Plantão */}
      <section className="grid grid-cols-1 gap-8 min-[1440px]:grid-cols-3">
        <PostosTempoRealCard />
        <AlertaPlantaoPostoCard />
        <AlertaPlantaoColaboradorCard />
      </section>

      {/* Rankings de Inconsistências */}
      <InconsistencyRankings />

      {/* Geolocalização + Tipo de Registro */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <GeolocationPunchCard />
        <TipoRegistroCard />
      </section>

      {/* Todos os pontos + Detalhamento de Faltas */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <AllPunchesByEmployeeCard />
        <DetalhamentoFaltasCard />
      </section>

      {/* Controle de Faltas + Estatísticas */}
      <section className="grid grid-cols-1 gap-8 min-[1440px]:grid-cols-12">
        <div className="flex min-w-0 min-[1440px]:col-span-7">
          <AbsenceTable />
        </div>
        <div className="flex min-w-0 min-[1440px]:col-span-5">
          <AbsenceStatsCard />
        </div>
      </section>

      {/* Heatmap de Absenteísmo */}
      <section>
        <AbsenceHeatmap />
      </section>

      {/* Horas Extras + Custo H.E. */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <OvertimeByClient />
        <OvertimeCostByMonth />
      </section>
    </div>
  );
}
