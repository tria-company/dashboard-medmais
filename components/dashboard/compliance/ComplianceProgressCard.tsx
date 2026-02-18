"use client";

import CardBase from "@/components/dashboard/CardBase";
import {
  complianceProgressList,
  type ComplianceProgressItem,
} from "@/lib/mock/compliance";

function getPillClass(status: ComplianceProgressItem["status"]): string {
  switch (status) {
    case "high":
      return "bg-green-600 text-white";
    case "medium":
      return "bg-amber-500 text-white";
    case "low":
      return "bg-red-600 text-white";
    default:
      return "bg-gray-200 text-gray-800";
  }
}

export default function ComplianceProgressCard(): React.ReactElement {
  return (
    <CardBase className="flex flex-col">
      <div className="mb-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Compliance por Área
        </h2>
      </div>
      <ul className="flex flex-col gap-4">
        {complianceProgressList.map((item) => (
          <li key={item.label} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-3">
              <span className="min-w-0 shrink-0 text-sm text-gray-800">
                {item.label}
              </span>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${getPillClass(item.status)}`}
              >
                {item.percent}%
              </span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-gray-300"
                style={{
                  width: `${item.percent}%`,
                  backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 4px, #9CA3AF 4px, #9CA3AF 6px)",
                }}
              />
              <span
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
                style={{ left: `${item.percent}%` }}
                aria-hidden
              />
            </div>
          </li>
        ))}
      </ul>
    </CardBase>
  );
}
