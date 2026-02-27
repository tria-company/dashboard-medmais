import type { FiltersState, Contract, Posto, Region } from "./types";

interface HasRegionContractPosto {
  region?: Region;
  contract?: Contract;
  posto?: Posto | string;
}

export function filterByRegionContractPosto<T extends HasRegionContractPosto>(
  items: T[],
  filters: FiltersState,
): T[] {
  return items.filter((item) => {
    if (filters.region && item.region && item.region !== filters.region) {
      return false;
    }
    if (filters.contract && item.contract && item.contract !== filters.contract) {
      return false;
    }
    if (filters.posto && item.posto && item.posto !== filters.posto) {
      return false;
    }
    return true;
  });
}

