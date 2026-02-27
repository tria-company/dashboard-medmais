 "use client";

import { useMemo } from "react";
import { clientesHeadcountData } from "@/lib/mock/dashboard";
import { FILTER_COMBINATIONS } from "@/lib/filters/options";
import type { Contract } from "@/lib/filters/types";
import { useFilters } from "@/contexts/FiltersContext";
import CardBase from "./CardBase";

export default function ClientesHeadcount(): React.ReactElement {
  const { filters } = useFilters();

  const filteredData = useMemo(() => {
    let data = clientesHeadcountData;

    if (filters.contract) {
      data = data.filter((c) => c.nome === filters.contract);
    } else if (filters.region) {
      const contractsInRegion = new Set<Contract>(
        FILTER_COMBINATIONS.filter((combo) => combo.region === filters.region).map(
          (combo) => combo.contract,
        ),
      );
      data = data.filter((c) => contractsInRegion.has(c.nome as Contract));
    }

    return data;
  }, [filters.contract, filters.region]);

  const maxValue = useMemo(
    () => Math.max(...filteredData.map((c) => c.valor), 1),
    [filteredData],
  );

  return (
    <CardBase title="Clientes por Headcount">
      <ul className="flex flex-col gap-3">
        {filteredData.map((cliente) => (
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
                  width: `${(cliente.valor / maxValue) * 100}%`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </CardBase>
  );
}
