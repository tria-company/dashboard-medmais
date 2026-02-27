"use client";

import Image from "next/image";
import type { BenefitsKpiItem } from "@/lib/mock/beneficios";

const ICON_MAP: Record<BenefitsKpiItem["icon"], string> = {
  custo_total: "/cash.svg",
  beneficio_medio: "/people.svg",
  percent_folha: "/Category.svg",
  colaboradores_eligiveis: "/checked.svg",
};

function getIconFilter(icon: BenefitsKpiItem["icon"]): string {
  switch (icon) {
    case "custo_total":
      return "brightness(0) saturate(100%) invert(19%) sepia(85%) saturate(1920%) hue-rotate(357deg)";
    case "beneficio_medio":
      return "brightness(0) saturate(100%) invert(32%) sepia(78%) saturate(1200%) hue-rotate(100deg)";
    case "percent_folha":
      return "brightness(0) saturate(100%) invert(55%) sepia(90%) saturate(800%) hue-rotate(360deg)";
    case "colaboradores_eligiveis":
      return "brightness(0) saturate(100%) invert(42%) sepia(64%) saturate(1563%) hue-rotate(96deg)";
    default:
      return "none";
  }
}

interface BenefitsKpiMiniCardProps {
  item: BenefitsKpiItem;
}

export default function BenefitsKpiMiniCard({
  item,
}: BenefitsKpiMiniCardProps): React.ReactElement {
  return (
    <div className="flex min-w-0 items-center gap-5">
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08)]"
        aria-hidden
      >
        <Image
          src={ICON_MAP[item.icon]}
          alt=""
          width={28}
          height={28}
          className="opacity-90"
          style={{ filter: getIconFilter(item.icon) }}
          aria-hidden
        />
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-0.5">
        <p className="text-sm text-gray-500">{item.label}</p>
        <p className="text-[26px] font-medium leading-[120%] text-black">
          {item.value}
        </p>
        <p
          className={`text-sm font-medium ${
            item.variationPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {item.variationLabel}
        </p>
      </div>
    </div>
  );
}

