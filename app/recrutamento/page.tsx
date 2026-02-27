import FiltroPostoEmpresa from "@/components/filtro-posto-empresa";
import RecruitmentKpiMiniCard from "@/components/dashboard/recrutamento/RecruitmentKpiMiniCard";
import RecruitmentFunnelChartCard from "@/components/dashboard/recrutamento/RecruitmentFunnelChartCard";
import OpenPositionsRankingCard from "@/components/dashboard/recrutamento/OpenPositionsRankingCard";
import PositionsByUnitTableCard from "@/components/dashboard/recrutamento/PositionsByUnitTableCard";
import PositionsEvolutionCard from "@/components/dashboard/recrutamento/PositionsEvolutionCard";
import CostPerContractCard from "@/components/dashboard/recrutamento/CostPerContractCard";
import RecruitmentHeatmapBrazilCard from "@/components/dashboard/recrutamento/RecruitmentHeatmapBrazilCard";
import { recruitmentKpis } from "@/lib/mock/recrutamento";

export default function RecrutamentoPage(): React.ReactElement {
  return (
    <div className="flex w-full min-w-0 flex-col gap-10">
      <FiltroPostoEmpresa />
      <section className="flex w-full flex-wrap items-center justify-center gap-8">
        {recruitmentKpis.map((item) => (
          <RecruitmentKpiMiniCard key={item.label} item={item} />
        ))}
      </section>

      <section className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
        <RecruitmentFunnelChartCard />
        <OpenPositionsRankingCard />
      </section>

      <section>
        <PositionsByUnitTableCard />
      </section>

      <section>
        <PositionsEvolutionCard />
      </section>

      <section className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
        <CostPerContractCard />
        <RecruitmentHeatmapBrazilCard />
      </section>
    </div>
  );
}
