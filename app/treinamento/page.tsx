import CostByClientGroupedBarsCard from "@/components/dashboard/treinamento/CostByClientGroupedBarsCard";
import MandatoryNRComplianceProgressCard from "@/components/dashboard/treinamento/MandatoryNRComplianceProgressCard";
import OverdueTrainingTableCard from "@/components/dashboard/treinamento/OverdueTrainingTableCard";
import TrainingBreakdownDonutCard from "@/components/dashboard/treinamento/TrainingBreakdownDonutCard";
import TrainingHoursEvolutionAreaCard from "@/components/dashboard/treinamento/TrainingHoursEvolutionAreaCard";
import TrainingKpiMiniCard from "@/components/dashboard/treinamento/TrainingKpiMiniCard";
import { trainingKpis } from "@/lib/mock/training";

export default function TreinamentoPage(): React.ReactElement {
  return (
    <div className="flex w-full min-w-0 flex-col gap-10">
      <section className="flex w-full flex-wrap items-center justify-center gap-8">
        {trainingKpis.map((item) => (
          <TrainingKpiMiniCard key={item.label} item={item} />
        ))}
      </section>

      <section className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
        <CostByClientGroupedBarsCard />
        <MandatoryNRComplianceProgressCard />
      </section>

      <section className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
        <TrainingHoursEvolutionAreaCard />
        <TrainingBreakdownDonutCard />
      </section>

      <section>
        <OverdueTrainingTableCard />
      </section>
    </div>
  );
}
