import ComplianceGlobalIndexRadar from "@/components/dashboard/compliance/ComplianceGlobalIndexRadar";
import ComplianceKpiMiniCard from "@/components/dashboard/compliance/ComplianceKpiMiniCard";
import ComplianceProgressCard from "@/components/dashboard/compliance/ComplianceProgressCard";
import ExpiredDocumentsCard from "@/components/dashboard/compliance/ExpiredDocumentsCard";
import LaborRiskTableCard from "@/components/dashboard/compliance/LaborRiskTableCard";
import UpcomingDeadlinesCard from "@/components/dashboard/compliance/UpcomingDeadlinesCard";
import { kpiComplianceData } from "@/lib/mock/compliance";

export default function CompliancePage(): React.ReactElement {
  return (
    <div className="flex w-full min-w-0 flex-col gap-10">
      <section className="flex w-full flex-wrap items-center justify-center gap-8">
        {kpiComplianceData.map((item) => (
          <ComplianceKpiMiniCard key={item.label} item={item} />
        ))}
      </section>

      <section className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
        <ComplianceProgressCard />
        <ComplianceGlobalIndexRadar />
      </section>

      <section>
        <LaborRiskTableCard />
      </section>

      <section className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
        <ExpiredDocumentsCard />
        <UpcomingDeadlinesCard />
      </section>
    </div>
  );
}
