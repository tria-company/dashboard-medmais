"use client";

import Image from "next/image";
import type { KpiTurnoverItem } from "@/lib/mock/turnover";

const ICON_MAP: Record<KpiTurnoverItem["icon"], string> = {
  taxa_turnover: "/Attention.svg",
  admissoes: "/checked.svg",
  desligamentos: "/ArrowRight.svg",
  tempo_casa: "/clock.svg",
};

function getIconFilter(icon: KpiTurnoverItem["icon"]): string {
  switch (icon) {
    case "taxa_turnover":
      return "brightness(0) saturate(100%) invert(25%) sepia(90%) saturate(2000%) hue-rotate(350deg)";
    case "admissoes":
      return "brightness(0) saturate(100%) invert(32%) sepia(78%) saturate(1200%) hue-rotate(100deg)";
    case "desligamentos":
      return "brightness(0) saturate(100%) invert(35%) sepia(60%) saturate(1500%) hue-rotate(200deg)";
    case "tempo_casa":
      return "brightness(0) saturate(100%) invert(55%) sepia(90%) saturate(1500%) hue-rotate(360deg)";
    default:
      return "none";
  }
}

interface TurnoverKpiMiniCardProps {
  item: KpiTurnoverItem;
}

export default function TurnoverKpiMiniCard({
  item,
}: TurnoverKpiMiniCardProps): React.ReactElement {
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
