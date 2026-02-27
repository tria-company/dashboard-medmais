import CardBase from "@/components/dashboard/CardBase";
import {
  rankingClientesInconsistencias,
  rankingPostosInconsistencias,
  rankingColaboradoresInconsistencias,
} from "@/lib/mock/ponto";

function getBadgeColor(index: number): string {
  if (index === 0) return "bg-[#F97373] text-white"; // vermelho mais forte
  if (index === 1) return "bg-[#FDBA74] text-white"; // laranja
  return "bg-[#FEF08A] text-[#92400E]"; // amarelo
}

export default function InconsistencyRankings(): React.ReactElement {
  return (
    <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <CardBase title="Ranking de Clientes com Inconsistências" compact>
        <ul className="flex max-h-64 flex-col gap-1.5 overflow-y-auto pr-1">
          {rankingClientesInconsistencias.map((item, index) => (
            <li
              key={`${item.cliente}-${index}`}
              className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-1.5"
            >
              <span className="text-sm font-medium text-[#2c3545]">
                {item.cliente}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getBadgeColor(
                  index,
                )}`}
              >
                {item.inconsistencias}
              </span>
            </li>
          ))}
        </ul>
      </CardBase>

      <CardBase title="Ranking de Postos com Inconsistências" compact>
        <ul className="flex max-h-64 flex-col gap-1.5 overflow-y-auto pr-1">
          {rankingPostosInconsistencias.map((item, index) => (
            <li
              key={`${item.posto}-${index}`}
              className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-1.5"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] text-gray-500">
                  {item.clienteLocal}
                </p>
                <p className="truncate text-sm font-semibold text-[#2c3545]">
                  {item.posto}
                </p>
              </div>
              <span
                className={`ml-2 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${getBadgeColor(
                  index,
                )}`}
              >
                {item.inconsistencias}
              </span>
            </li>
          ))}
        </ul>
      </CardBase>

      <CardBase
        title="Ranking de Colaboradores com Inconsistências"
        compact
      >
        <ul className="flex max-h-64 flex-col gap-1.5 overflow-y-auto pr-1">
          {rankingColaboradoresInconsistencias.map((item, index) => (
            <li
              key={`${item.nome}-${index}`}
              className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-1.5"
            >
              <div className="flex min-w-0 flex-1 items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-100 text-xs font-semibold text-[#2c3545]">
                  {item.nome
                    .split(" ")
                    .map((p) => p[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#2c3545]">
                    {item.nome}
                  </p>
                  <p className="truncate text-[11px] text-gray-500">
                    {item.funcao} · {item.local}
                  </p>
                </div>
              </div>
              <span
                className={`ml-2 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${getBadgeColor(
                  index,
                )}`}
              >
                {item.inconsistencias}
              </span>
            </li>
          ))}
        </ul>
      </CardBase>
    </section>
  );
}

