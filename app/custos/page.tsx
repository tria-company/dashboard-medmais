import FiltroPostoEmpresa from "@/components/filtro-posto-empresa";
import CostByClientChartCard from "@/components/dashboard/custos/CostByClientChartCard";
import CostCompositionStackedChartCard from "@/components/dashboard/custos/CostCompositionStackedChartCard";
import CostsKpiMiniCard from "@/components/dashboard/custos/CostsKpiMiniCard";
import PayrollEvolutionCard from "@/components/dashboard/custos/PayrollEvolutionCard";
import RubricBreakdownTableCard from "@/components/dashboard/custos/RubricBreakdownTableCard";
import SalaryBenefitsDonutCard from "@/components/dashboard/custos/SalaryBenefitsDonutCard";
import { kpisCosts } from "@/lib/mock/costs";

export default function CustosPage(): React.ReactElement {
  return (
    <div className="flex w-full min-w-0 flex-col gap-10">
      <FiltroPostoEmpresa />
      <section className="flex w-full flex-wrap items-center justify-center gap-8">
        {kpisCosts.map((item) => (
          <CostsKpiMiniCard key={item.label} item={item} />
        ))}
      </section>

      <section className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
        <CostCompositionStackedChartCard />
        <div className="flex min-w-0 flex-col gap-6">
          <PayrollEvolutionCard />
          <SalaryBenefitsDonutCard />
        </div>
      </section>

      <section className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
        <RubricBreakdownTableCard />
        <CostByClientChartCard />
      </section>
    </div>
  );
}
