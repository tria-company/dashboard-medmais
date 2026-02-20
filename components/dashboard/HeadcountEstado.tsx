"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { headcountPorEstado } from "@/lib/mock/dashboard";
import CardBase from "./CardBase";

const GEO_URL =
  "https://cdn.jsdelivr.net/gh/codeforamerica/click_that_hood@master/public/data/brazil-states.geojson";

const COR_BASE = "#C44B6A";
const COR_MIN = "#F8C8C8";
const COR_MAX = "#8B2942";

function getCorPorValor(valor: number, min: number, max: number): string {
  if (max === min) return COR_BASE;
  const t = (valor - min) / (max - min);
  const r = (n: number, m: number) => Math.round(n + t * (m - n));
  const hex = (x: number) => x.toString(16).padStart(2, "0");
  const parse = (h: string) => ({
    r: parseInt(h.slice(1, 3), 16),
    g: parseInt(h.slice(3, 5), 16),
    b: parseInt(h.slice(5, 7), 16),
  });
  const a = parse(COR_MIN);
  const b = parse(COR_MAX);
  return `#${hex(r(a.r, b.r))}${hex(r(a.g, b.g))}${hex(r(a.b, b.b))}`;
}

interface TooltipState {
  nome: string;
  sigla: string;
  valor: number;
  x: number;
  y: number;
}

export default function HeadcountEstado(): React.ReactElement {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { minVal, maxVal } = useMemo(() => {
    const vals = Object.values(headcountPorEstado).filter(Number.isFinite);
    return {
      minVal: Math.min(...vals, 0),
      maxVal: Math.max(...vals, 1),
    };
  }, []);

  const handleMouseEnter = useCallback(
    (geo: { properties: { name?: string; sigla?: string } }, evt: React.MouseEvent<SVGPathElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const sigla = (geo.properties?.sigla ?? "").toUpperCase();
      const valor = headcountPorEstado[sigla] ?? 0;
      setTooltip({
        nome: geo.properties?.name ?? sigla,
        sigla,
        valor,
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
      });
    },
    []
  );

  const handleMouseMove = useCallback((evt: React.MouseEvent<SVGPathElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip((prev) =>
      prev
        ? {
            ...prev,
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top,
          }
        : null
    );
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  return (
    <CardBase title="Headcount por Estado">
      <div className="-mt-1 mb-3 border-b border-gray-100" />
      <div
        ref={containerRef}
        className="relative w-full max-w-full mx-auto overflow-hidden rounded-lg bg-gray-50/50"
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: [-54, -14],
            scale: 950,
          }}
          className="w-full aspect-447/432"
          style={{ width: "100%", height: "auto" }}
        >
          <ZoomableGroup center={[0, 0]} zoom={1} minZoom={0.8} maxZoom={1.2}>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const sigla = (geo.properties?.sigla ?? "").toUpperCase();
                  const valor = headcountPorEstado[sigla] ?? 0;
                  const fill = getCorPorValor(valor, minVal, maxVal);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fill}
                      stroke="#FFFFFF"
                      strokeWidth={0.6}
                      style={{
                        default: { outline: "none" },
                        hover: {
                          fill: COR_BASE,
                          outline: "none",
                          cursor: "pointer",
                        },
                        pressed: { outline: "none" },
                      }}
                      onMouseEnter={(evt) => handleMouseEnter(geo, evt)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        {tooltip && (
          <div
            className="pointer-events-none absolute z-10 w-[160px] rounded-lg border border-gray-100 bg-white/95 px-3 py-2.5 shadow-lg backdrop-blur-sm"
            style={{
              left: Math.min(Math.max(10, tooltip.x + 10), 320),
              top: Math.min(Math.max(10, tooltip.y + 10), 380),
            }}
          >
            <p className="mb-1 text-xs font-semibold leading-tight text-gray-900">
              {tooltip.nome} ({tooltip.sigla})
            </p>
            <p className="text-sm font-medium text-[#8B2942]">
              {tooltip.valor.toLocaleString("pt-BR")} colaboradores
            </p>
          </div>
        )}
      </div>
    </CardBase>
  );
}
