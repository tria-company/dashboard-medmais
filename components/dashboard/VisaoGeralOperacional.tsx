import { visaoGeralOperacionalData } from "@/lib/mock/dashboard";
import CardBase from "./CardBase";

const STATUS_COLORS: Record<string, string> = {
  success: "bg-green-500",
  warning: "bg-amber-500",
  info: "bg-blue-500",
  orange: "bg-orange-500",
};

export default function VisaoGeralOperacional(): React.ReactElement {
  return (
    <CardBase title="Visão Geral Operacional" compact>
      <ul className="flex flex-col gap-2">
        {visaoGeralOperacionalData.map((item) => (
          <li
            key={item.label}
            className="relative flex items-center justify-between gap-3 rounded-lg bg-gray-50 px-3 py-2 pr-8"
          >
            <span
              className={`absolute right-2.5 top-1/2 h-2 w-2 -translate-y-1/2 shrink-0 rounded-full animate-blink-dot sm:h-2.5 sm:w-2.5 ${STATUS_COLORS[item.status] ?? "bg-gray-400"}`}
              aria-hidden
            />
            <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-1.5">
              <p className="text-sm font-semibold text-[#2c3545]">
                {item.label}
              </p>
              <p className="truncate text-xs text-gray-500">{item.subtitulo}</p>
            </div>
            <span className="text-base font-bold text-gray-800 sm:text-lg">{item.valor}</span>
          </li>
        ))}
      </ul>
    </CardBase>
  );
}
