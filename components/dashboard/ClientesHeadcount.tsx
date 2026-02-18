import { clientesHeadcountData } from "@/lib/mock/dashboard";
import CardBase from "./CardBase";

const MAX_VALUE = Math.max(
  ...clientesHeadcountData.map((c) => c.valor),
);

export default function ClientesHeadcount(): React.ReactElement {
  return (
    <CardBase title="Clientes por Headcount">
      <ul className="flex flex-col gap-3">
        {clientesHeadcountData.map((cliente) => (
          <li
            key={cliente.nome}
            className="flex flex-col gap-1"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">{cliente.nome}</span>
              <span className="font-semibold text-[#2c3545]">
                {cliente.valor.toLocaleString("pt-BR")}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-[#8B2942]"
                style={{
                  width: `${(cliente.valor / MAX_VALUE) * 100}%`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </CardBase>
  );
}
