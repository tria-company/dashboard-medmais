import FiltroPostoEmpresa from "@/components/filtro-posto-empresa";
import AdmissionsVsDismissalsChart from "@/components/dashboard/turnover/AdmissionsVsDismissalsChart";
import DismissalReasonsCard from "@/components/dashboard/turnover/DismissalReasonsCard";
import TenureAtDismissalChart from "@/components/dashboard/turnover/TenureAtDismissalChart";
import TurnoverByClientChart from "@/components/dashboard/turnover/TurnoverByClientChart";
import TurnoverKpiMiniCard from "@/components/dashboard/turnover/TurnoverKpiMiniCard";
import TurnoverUnitsTableCard from "@/components/dashboard/turnover/TurnoverUnitsTableCard";
import { kpiTurnoverData } from "@/lib/mock/turnover";

export default function TurnoverPage(): React.ReactElement {
  return (
    <div className="flex w-full min-w-0 flex-col gap-10">
      <FiltroPostoEmpresa />
      <section className="flex w-full flex-wrap items-center justify-center gap-8">
        {kpiTurnoverData.map((item) => (
          <TurnoverKpiMiniCard key={item.label} item={item} />
        ))}
      </section>

      <section className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
        <AdmissionsVsDismissalsChart />
        <DismissalReasonsCard />
      </section>

      <section className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
        <TurnoverByClientChart />
        <TenureAtDismissalChart />
      </section>

      <section>
        <TurnoverUnitsTableCard />
      </section>
    </div>
  );
}
