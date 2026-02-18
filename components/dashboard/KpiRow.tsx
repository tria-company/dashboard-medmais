import Image from "next/image";
import {
  getCurrentDateFormatted,
  getLastUpdateFormatted,
  kpiData,
} from "@/lib/mock/dashboard";

const ICON_MAP = {
  people: "/people.svg",
  bag: "/bag.svg",
  cash: "/cash.svg",
} as const;

export default function KpiRow(): React.ReactElement {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-6">
      <div className="flex flex-1 flex-wrap items-center gap-8">
        {kpiData.map((kpi) => (
          <div
            key={kpi.label}
            className="flex min-w-0 items-center gap-5"
          >
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08)]"
              aria-hidden
            >
              <Image
                src={ICON_MAP[kpi.icon]}
                alt=""
                width={28}
                height={28}
                className="opacity-90"
                aria-hidden
              />
            </div>
            <div className="flex min-w-0 flex-col justify-center gap-0.5">
              <div className="flex items-baseline gap-2">
                <p
                  style={{
                    color: "#000",
                    fontFamily: "var(--font-urbanist), Urbanist, sans-serif",
                    fontSize: "26px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "120%",
                  }}
                >
                  {kpi.value}
                </p>
                <p
                  className={`text-sm font-medium ${
                    kpi.variation >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {kpi.variationLabel}
                </p>
              </div>
              <p className="text-sm text-gray-500">{kpi.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex shrink-0 flex-col items-end justify-center text-right text-sm text-gray-500">
        <span className="font-medium capitalize text-gray-800">
          {getCurrentDateFormatted()}
        </span>
        <span className="mt-0.5">
          Última atualização: {getLastUpdateFormatted()}
        </span>
      </div>
    </div>
  );
}
