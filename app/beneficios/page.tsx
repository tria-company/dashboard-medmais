import FiltroPostoEmpresa from "@/components/filtro-posto-empresa";
import BenefitsCompositionChartCard from "@/components/dashboard/beneficios/BenefitsCompositionChartCard";
import BenefitsCostPerUnitCard from "@/components/dashboard/beneficios/BenefitsCostPerUnitCard";
import BenefitsKpiMiniCard from "@/components/dashboard/beneficios/BenefitsKpiMiniCard";
import BenefitsTotalByBenefitTableCard from "@/components/dashboard/beneficios/BenefitsTotalByBenefitTableCard";
import { benefitsKpis } from "@/lib/mock/beneficios";

export default function BeneficiosPage(): React.ReactElement {
  return (
    <div className="flex w-full min-w-0 flex-col gap-10">
      <FiltroPostoEmpresa />

      <section className="flex w-full flex-wrap items-center justify-center gap-8">
        {benefitsKpis.map((item) => (
          <BenefitsKpiMiniCard key={item.label} item={item} />
        ))}
      </section>

      <section className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
        <BenefitsCompositionChartCard />
        <BenefitsCostPerUnitCard />
      </section>

      <section>
        <BenefitsTotalByBenefitTableCard />
      </section>
    </div>
  );
}

