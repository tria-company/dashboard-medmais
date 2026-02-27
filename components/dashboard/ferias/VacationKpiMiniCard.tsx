"use client";

import Image from "next/image";
import type { KpiFeriasItem } from "@/lib/mock/ferias";

const ICON_MAP: Record<KpiFeriasItem["icon"], string> = {
  vencidas: "/Exclamation.svg",
  a_vencer: "/Attention.svg",
  provisao: "/Cash_blue.svg",
  programadas: "/Calender.svg",
};

function getIconFilter(icon: KpiFeriasItem["icon"]): string {
  switch (icon) {
    case "vencidas":
      return "brightness(0) saturate(100%) invert(25%) sepia(90%) saturate(2000%) hue-rotate(350deg)";
    case "a_vencer":
      return "brightness(0) saturate(100%) invert(70%) sepia(90%) saturate(800%) hue-rotate(360deg)";
    case "provisao":
      return "brightness(0) saturate(100%) invert(28%) sepia(90%) saturate(1500%) hue-rotate(210deg)";
    case "programadas":
      return "brightness(0) saturate(100%) invert(32%) sepia(78%) saturate(1200%) hue-rotate(100deg)";
    default:
      return "none";
  }
}

interface VacationKpiMiniCardProps {
  item: KpiFeriasItem;
}

export default function VacationKpiMiniCard({
  item,
}: VacationKpiMiniCardProps): React.ReactElement {
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
