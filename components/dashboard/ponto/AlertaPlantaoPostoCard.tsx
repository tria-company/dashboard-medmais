import CardBase from "@/components/dashboard/CardBase";
import { alertaPlantaoPostoData } from "@/lib/mock/ponto";

const MAX_PTS = Math.max(...alertaPlantaoPostoData.map((d) => d.pontos));

export default function AlertaPlantaoPostoCard(): React.ReactElement {
  return (
    <CardBase title="Alerta de Plantão por Posto" compact>
      <ul className="flex max-h-[340px] flex-col gap-2 overflow-y-auto pr-1">
        {alertaPlantaoPostoData.map((item, index) => (
          <li key={`${item.posto}-${index}`} className="flex items-center gap-3">
            <span className="w-24 shrink-0 truncate text-sm text-gray-700">
              {item.posto}
            </span>
            <div className="relative h-5 flex-1 overflow-hidden rounded-full bg-gray-100">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#C44B6A] to-[#8B2942]"
                style={{ width: `${(item.pontos / MAX_PTS) * 100}%` }}
              />
            </div>
            <span className="shrink-0 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800">
              {item.pontos} pts
            </span>
          </li>
        ))}
      </ul>
    </CardBase>
  );
}
