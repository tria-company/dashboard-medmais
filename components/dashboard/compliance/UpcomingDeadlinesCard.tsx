"use client";

import Image from "next/image";
import CardBase from "@/components/dashboard/CardBase";
import { upcomingDeadlinesData } from "@/lib/mock/compliance";

export default function UpcomingDeadlinesCard(): React.ReactElement {
  return (
    <CardBase className="flex flex-col">
      <div className="mb-4 shrink-0 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Próximos Vencimentos
        </h2>
      </div>
      <div className="max-h-[320px] min-h-0 overflow-y-auto">
        <div className="flex flex-col gap-6">
        {upcomingDeadlinesData.map((group) => (
          <div key={group.group}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
              {group.group}
            </p>
            <ul className="flex flex-col divide-y divide-gray-100">
              {group.items.map((item) => (
                <li
                  key={`${item.title}-${item.prazo}`}
                  className="flex items-start gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <span
                    className={`mt-0.5 shrink-0 ${item.urgency === "high" ? "text-red-600" : "text-amber-600"}`}
                    aria-hidden
                  >
                    <Image
                      src="/Note.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="opacity-90"
                      style={{
                        filter:
                          item.urgency === "high"
                            ? "brightness(0) saturate(100%) invert(25%) sepia(90%) saturate(2000%) hue-rotate(350deg)"
                            : "brightness(0) saturate(100%) invert(55%) sepia(90%) saturate(800%) hue-rotate(360deg)",
                      }}
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Unidades: {item.unidades}
                    </p>
                    <p className="text-xs text-gray-500">Prazo: {item.prazo}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
        </div>
      </div>
    </CardBase>
  );
}
