"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import CardBase from "@/components/dashboard/CardBase";
import {
  postosOnTimeData,
  type PostoOnTimeItem,
  type PostoOnTimeStatus,
} from "@/lib/mock/ponto";

const GEO_URL =
  "https://cdn.jsdelivr.net/gh/codeforamerica/click_that_hood@master/public/data/brazil-states.geojson";

const STATUS_COLOR: Record<PostoOnTimeStatus, string> = {
  em_aberto: "#DC2626",
  atrasado: "#F59E0B",
  regular: "#16A34A",
};

const STATUS_LABEL: Record<PostoOnTimeStatus, string> = {
  em_aberto: "Em aberto",
  atrasado: "Atrasado",
  regular: "Regular",
};

const STROKE_MAPA = "#CBD5E1";
const COR_ESTADO = "#F1F5F9";

// Projection constants matching ComposableMap config
const MAP_WIDTH = 800;
const MAP_HEIGHT = 600;
const MAP_CENTER: [number, number] = [-54, -14];
const MAP_SCALE = 950;

interface TooltipState {
  posto: PostoOnTimeItem;
  x: number;
  y: number;
}

/**
 * Simple Mercator projection matching react-simple-maps defaults.
 * Converts [lng, lat] to [x, y] SVG coordinates.
 */
function projectMercator(lng: number, lat: number): [number, number] {
  const lambda = (lng - MAP_CENTER[0]) * (Math.PI / 180);
  const phi = lat * (Math.PI / 180);
  const phiCenter = MAP_CENTER[1] * (Math.PI / 180);

  const x = MAP_WIDTH / 2 + MAP_SCALE * lambda;
  const y =
    MAP_HEIGHT / 2 -
    MAP_SCALE *
      (Math.log(Math.tan(Math.PI / 4 + phi / 2)) -
        Math.log(Math.tan(Math.PI / 4 + phiCenter / 2)));

  return [x, y];
}

export default function PostosOnTimeBrazilMapCard(): React.ReactElement {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [filtroStatus, setFiltroStatus] = useState<PostoOnTimeStatus | "todos">(
    "todos"
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const postosFiltrados = useMemo(() => {
    if (filtroStatus === "todos") return postosOnTimeData;
    return postosOnTimeData.filter((p) => p.status === filtroStatus);
  }, [filtroStatus]);

  const totais = useMemo(() => {
    const regular = postosOnTimeData.filter(
      (p) => p.status === "regular"
    ).length;
    const atrasado = postosOnTimeData.filter(
      (p) => p.status === "atrasado"
    ).length;
    const em_aberto = postosOnTimeData.filter(
      (p) => p.status === "em_aberto"
    ).length;
    return { regular, atrasado, em_aberto, total: postosOnTimeData.length };
  }, []);

  const handleMarkerEnter = useCallback(
    (posto: PostoOnTimeItem, evt: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setTooltip({
        posto,
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
      });
    },
    []
  );

  const handleMarkerMove = useCallback((evt: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip((prev) =>
      prev
        ? { ...prev, x: evt.clientX - rect.left, y: evt.clientY - rect.top }
        : null
    );
  }, []);

  const handleMarkerLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  const projected = useMemo(
    () =>
      postosFiltrados.map((p) => {
        const [cx, cy] = projectMercator(p.lng, p.lat);
        return { ...p, cx, cy };
      }),
    [postosFiltrados]
  );

  return (
    <CardBase title="Mapa de Postos — Status ON TIME" compact>
      <div className="-mt-1 mb-3 border-b border-gray-100" />

      {/* Filtros */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setFiltroStatus("todos")}
          className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
            filtroStatus === "todos"
              ? "border-gray-700 bg-gray-700 text-white"
              : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          Todos ({totais.total})
        </button>
        <button
          type="button"
          onClick={() => setFiltroStatus("regular")}
          className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
            filtroStatus === "regular"
              ? "border-green-600 bg-green-600 text-white"
              : "border-green-300 bg-white text-green-700 hover:bg-green-50"
          }`}
        >
          Regular ({totais.regular})
        </button>
        <button
          type="button"
          onClick={() => setFiltroStatus("atrasado")}
          className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
            filtroStatus === "atrasado"
              ? "border-yellow-500 bg-yellow-500 text-white"
              : "border-yellow-300 bg-white text-yellow-700 hover:bg-yellow-50"
          }`}
        >
          Atrasado ({totais.atrasado})
        </button>
        <button
          type="button"
          onClick={() => setFiltroStatus("em_aberto")}
          className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
            filtroStatus === "em_aberto"
              ? "border-red-600 bg-red-600 text-white"
              : "border-red-300 bg-white text-red-700 hover:bg-red-50"
          }`}
        >
          Em aberto ({totais.em_aberto})
        </button>
      </div>

      {/* Mapa */}
      <div
        ref={containerRef}
        className="relative mx-auto w-full overflow-hidden rounded-lg bg-gray-50/50"
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: MAP_CENTER, scale: MAP_SCALE }}
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          style={{ width: "100%", height: "auto" }}
        >
          <ZoomableGroup
            center={MAP_CENTER}
            zoom={1}
            minZoom={0.8}
            maxZoom={6}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={COR_ESTADO}
                    stroke={STROKE_MAPA}
                    strokeWidth={0.6}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: "#E2E8F0" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Marker circles rendered directly in SVG coordinates */}
            {projected.map((posto, i) => (
              <circle
                key={`${posto.uf}-${posto.posto}-${posto.cliente}-${i}`}
                cx={posto.cx}
                cy={posto.cy}
                r={4.5}
                fill={STATUS_COLOR[posto.status]}
                stroke="#fff"
                strokeWidth={1.5}
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => handleMarkerEnter(posto, e)}
                onMouseMove={handleMarkerMove}
                onMouseLeave={handleMarkerLeave}
              />
            ))}
          </ZoomableGroup>
        </ComposableMap>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="pointer-events-none absolute z-10 w-[220px] rounded-lg border border-gray-100 bg-white/95 px-3 py-2.5 shadow-lg backdrop-blur-sm"
            style={{
              left: Math.min(
                Math.max(10, tooltip.x + 12),
                containerRef.current
                  ? containerRef.current.offsetWidth - 230
                  : 260
              ),
              top: Math.min(Math.max(10, tooltip.y - 80), 400),
            }}
          >
            <p className="mb-0.5 text-xs font-semibold text-gray-900">
              {tooltip.posto.posto}
            </p>
            <p className="mb-1 text-[11px] text-gray-500">
              {tooltip.posto.cliente} — {tooltip.posto.cidade}/{tooltip.posto.uf}
            </p>
            <div className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: STATUS_COLOR[tooltip.posto.status],
                }}
              />
              <span className="text-xs font-medium text-gray-700">
                {STATUS_LABEL[tooltip.posto.status]}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-gray-500">
              {tooltip.posto.colaboradores} colaboradores
            </p>
          </div>
        )}
      </div>

      {/* Legenda */}
      <div className="mt-4 flex items-center justify-center gap-5">
        {(["regular", "atrasado", "em_aberto"] as PostoOnTimeStatus[]).map(
          (status) => (
            <div key={status} className="flex items-center gap-1.5">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: STATUS_COLOR[status] }}
              />
              <span className="text-xs text-gray-600">
                {STATUS_LABEL[status]}
              </span>
            </div>
          )
        )}
      </div>
    </CardBase>
  );
}
