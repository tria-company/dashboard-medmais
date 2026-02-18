"use client";

import Image from "next/image";
import type { KpiComplianceItem } from "@/lib/mock/compliance";

const ICON_MAP: Record<KpiComplianceItem["icon"], string> = {
  esocial: "/Prescriptions.svg",
  asos: "/Category.svg",
  nrs: "/Note.svg",
  processos: "/Redo.svg",
};

function getIconFilter(icon: KpiComplianceItem["icon"]): string {
  switch (icon) {
    case "esocial":
      return "brightness(0) saturate(100%) invert(25%) sepia(90%) saturate(2000%) hue-rotate(350deg)";
    case "asos":
      return "brightness(0) saturate(100%) invert(55%) sepia(90%) saturate(800%) hue-rotate(360deg)";
    case "nrs":
      return "brightness(0) saturate(100%) invert(28%) sepia(90%) saturate(1500%) hue-rotate(210deg)";
    case "processos":
      return "brightness(0) saturate(100%) invert(32%) sepia(78%) saturate(1200%) hue-rotate(100deg)";
    default:
      return "none";
  }
}

interface ComplianceKpiMiniCardProps {
  item: KpiComplianceItem;
}

export default function ComplianceKpiMiniCard({
  item,
}: ComplianceKpiMiniCardProps): React.ReactElement {
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
