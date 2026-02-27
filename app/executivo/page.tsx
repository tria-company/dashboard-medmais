import ClientesHeadcount from "@/components/dashboard/ClientesHeadcount";
import CoberturaGauge from "@/components/dashboard/CoberturaGauge";
import Headcount12Meses from "@/components/dashboard/Headcount12Meses";
import HeadcountEstado from "@/components/dashboard/HeadcountEstado";
import HeadcountRegiao from "@/components/dashboard/HeadcountRegiao";
import KpiRow from "@/components/dashboard/KpiRow";
import Pontualidade7DiasChart from "@/components/dashboard/Pontualidade7DiasChart";
import VisaoGeralOperacional from "@/components/dashboard/VisaoGeralOperacional";

export default function ExecutivoPage(): React.ReactElement {
  return (
    <div className="flex flex-col gap-10">
      <KpiRow />
      <div className="grid items-stretch gap-8 min-[1440px]:grid-cols-12">
        <div className="flex min-[1440px]:col-span-6">
          <Pontualidade7DiasChart />
        </div>
        <div className="flex flex-col gap-8 min-[1440px]:col-span-6">
          <CoberturaGauge />
          <VisaoGeralOperacional />
        </div>
      </div>
      <Headcount12Meses />
      <div className="grid gap-8 lg:grid-cols-3">
        <ClientesHeadcount />
        <HeadcountRegiao />
        <HeadcountEstado />
      </div>
    </div>
  );
}
