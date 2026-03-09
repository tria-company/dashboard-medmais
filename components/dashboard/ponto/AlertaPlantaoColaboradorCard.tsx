import CardBase from "@/components/dashboard/CardBase";
import { alertaPlantaoColaboradorData } from "@/lib/mock/ponto";

export default function AlertaPlantaoColaboradorCard(): React.ReactElement {
  return (
    <CardBase title="Alerta de Plantão Colaborador" compact>
      <ul className="flex max-h-[340px] flex-col gap-1.5 overflow-y-auto pr-1">
        {alertaPlantaoColaboradorData.map((item, index) => (
          <li
            key={`${item.nome}-${index}`}
            className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gray-300 to-gray-200 text-xs font-semibold text-[#2c3545]">
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
                  {item.posto} — {item.cliente}
                </p>
              </div>
            </div>
            <span className="ml-2 shrink-0 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800">
              {item.pontos} pts
            </span>
          </li>
        ))}
      </ul>
    </CardBase>
  );
}
