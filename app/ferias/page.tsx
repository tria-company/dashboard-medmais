import FiltroPostoEmpresa from "@/components/filtro-posto-empresa";
import ExpiredVacationTableCard from "@/components/dashboard/ferias/ExpiredVacationTableCard";
import VacationCalendarCard from "@/components/dashboard/ferias/VacationCalendarCard";
import VacationCostProjectionCard from "@/components/dashboard/ferias/VacationCostProjectionCard";
import VacationKpiMiniCard from "@/components/dashboard/ferias/VacationKpiMiniCard";
import VacationStatusCard from "@/components/dashboard/ferias/VacationStatusCard";
import { kpiFeriasData } from "@/lib/mock/ferias";

export default function FeriasPage(): React.ReactElement {
  return (
    <div className="flex w-full min-w-0 flex-col gap-10">
      <FiltroPostoEmpresa />
      <section className="flex w-full flex-wrap items-center justify-center gap-8">
        {kpiFeriasData.map((item) => (
          <VacationKpiMiniCard key={item.label} item={item} />
        ))}
      </section>

      <section>
        <ExpiredVacationTableCard />
      </section>

      <section className="grid w-full min-w-0 grid-cols-1 gap-4 lg:min-h-[480px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-stretch xl:gap-6 min-[1461px]:grid-cols-[minmax(0,0.7fr)_minmax(0,1.2fr)] 2xl:grid-cols-[minmax(0,0.75fr)_minmax(0,1.15fr)]">
        <div className="min-w-0 w-full">
          <VacationCalendarCard />
        </div>
        <div className="flex min-h-0 min-w-0 w-full flex-1 flex-col gap-3">
          <VacationCostProjectionCard />
          <VacationStatusCard />
        </div>
      </section>
    </div>
  );
}
