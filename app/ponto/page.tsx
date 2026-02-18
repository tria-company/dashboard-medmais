import FiltroPostoEmpresa from "@/components/filtro-posto-empresa";
import AbsenceHeatmap from "@/components/dashboard/ponto/AbsenceHeatmap";
import AbsenceStatsCard from "@/components/dashboard/ponto/AbsenceStatsCard";
import AbsenceTable from "@/components/dashboard/ponto/AbsenceTable";
import KpiMiniCard from "@/components/dashboard/ponto/KpiMiniCard";
import OvertimeByClient from "@/components/dashboard/ponto/OvertimeByClient";
import OvertimeCostByMonth from "@/components/dashboard/ponto/OvertimeCostByMonth";
import { kpiPontoData } from "@/lib/mock/ponto";

export default function PontoPage(): React.ReactElement {
  return (
    <div className="flex flex-col gap-10">
      <FiltroPostoEmpresa />
      <section className="flex w-full flex-wrap items-center justify-center gap-8">
        {kpiPontoData.map((item) => (
          <KpiMiniCard key={item.label} item={item} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-8 min-[1440px]:grid-cols-12">
        <div className="flex min-w-0 min-[1440px]:col-span-7">
          <AbsenceTable />
        </div>
        <div className="flex min-w-0 min-[1440px]:col-span-5">
          <AbsenceStatsCard />
        </div>
      </section>

      <section>
        <AbsenceHeatmap />
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <OvertimeByClient />
        <OvertimeCostByMonth />
      </section>
    </div>
  );
}
