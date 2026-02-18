"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import {
  headcountEstadoPorRegiao,
  type RegiaoMapa,
} from "@/lib/mock/dashboard";
import CardBase from "./CardBase";

interface ZonaRegiao {
  regiao: RegiaoMapa;
  left: string;
  top: string;
  width: string;
  height: string;
  markerLeft: string;
  markerTop: string;
}

const ZONAS: ZonaRegiao[] = [
  {
    regiao: "Norte",
    left: "8%",
    top: "6%",
    width: "32%",
    height: "28%",
    markerLeft: "28%",
    markerTop: "20%",
  },
  {
    regiao: "Nordeste",
    left: "32%",
    top: "5%",
    width: "38%",
    height: "38%",
    markerLeft: "50%",
    markerTop: "26%",
  },
  {
    regiao: "Centro-Oeste",
    left: "22%",
    top: "38%",
    width: "32%",
    height: "32%",
    markerLeft: "42%",
    markerTop: "50%",
  },
  {
    regiao: "Sudeste",
    left: "42%",
    top: "42%",
    width: "48%",
    height: "42%",
    markerLeft: "62%",
    markerTop: "58%",
  },
  {
    regiao: "Sul",
    left: "35%",
    top: "78%",
    width: "42%",
    height: "20%",
    markerLeft: "56%",
    markerTop: "83%",
  },
];

export default function HeadcountEstado(): React.ReactElement {
  const [hoveredRegiao, setHoveredRegiao] = useState<RegiaoMapa | null>(null);
  const [tooltipXY, setTooltipXY] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(
    (regiao: RegiaoMapa, e: React.MouseEvent<HTMLDivElement>) => {
      setHoveredRegiao(regiao);
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setTooltipXY({ x, y });
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!hoveredRegiao) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setTooltipXY({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [hoveredRegiao]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredRegiao(null);
  }, []);

  return (
    <CardBase title="Headcount por Estado">
      <div className="-mt-1 mb-3 border-b border-gray-100" />
      <div
        ref={containerRef}
        className="relative aspect-447/432 w-full max-w-[85%] mx-auto overflow-hidden"
      >
        <Image
          src="/mapa.svg"
          alt="Mapa do Brasil"
          fill
          className="object-contain"
        />
        {ZONAS.map((z) => (
          <div
            key={z.regiao}
            className="absolute cursor-default rounded transition-colors duration-150 hover:bg-[#C44B6A]/5"
            style={{
              left: z.left,
              top: z.top,
              width: z.width,
              height: z.height,
            }}
            onMouseEnter={(e) => handleMouseEnter(z.regiao, e)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            role="button"
            tabIndex={0}
            onFocus={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const parent = containerRef.current?.getBoundingClientRect();
              if (parent) {
                setHoveredRegiao(z.regiao);
                setTooltipXY({
                  x: rect.left - parent.left + rect.width / 2,
                  y: rect.top - parent.top,
                });
              }
            }}
            onBlur={handleMouseLeave}
            aria-label={`Headcount ${z.regiao}`}
          />
        ))}
        {ZONAS.map((z) => (
          <div
            key={`marker-${z.regiao}`}
            className="pointer-events-none absolute z-1 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: z.markerLeft,
              top: z.markerTop,
            }}
          >
            <span
              className={`block rounded-full border border-white shadow-sm transition-transform duration-150 ${
                hoveredRegiao === z.regiao
                  ? "h-3 w-3 bg-[#C44B6A]"
                  : "h-2.5 w-2.5 bg-[#8B2942]"
              }`}
            />
          </div>
        ))}
        {hoveredRegiao && (
          <div
            className="pointer-events-none absolute z-10 w-[140px] rounded border border-gray-100 bg-white/95 px-2.5 py-2 shadow-sm backdrop-blur-sm"
            style={{
              left: Math.min(
                Math.max(0, tooltipXY.x - 70),
                (containerRef.current?.offsetWidth ?? 400) - 140
              ),
              top: Math.min(
                Math.max(0, tooltipXY.y - 6),
                (containerRef.current?.offsetHeight ?? 240) - 120
              ),
            }}
          >
            <p className="mb-1.5 text-[11px] font-semibold leading-tight text-gray-900">
              Colaboradores — {headcountEstadoPorRegiao[hoveredRegiao].totalColaboradores}
            </p>
            <ul className="space-y-0.5">
              {headcountEstadoPorRegiao[hoveredRegiao].porTipo.map((item) => (
                <li
                  key={item.tipo}
                  className="flex items-center gap-1.5 text-[10px] text-gray-600"
                >
                  <span
                    className="h-1 w-1 shrink-0 rounded-[1px]"
                    style={{ backgroundColor: item.cor }}
                  />
                  <span>{item.tipo}:</span>
                  <span className="ml-auto font-medium text-gray-800">
                    {item.valor}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </CardBase>
  );
}
