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
  pontosForaZonaPorEstado,
  heatZonaEsperadaPorEstado,
} from "@/lib/mock/ponto";

const GEO_URL =
  "https://cdn.jsdelivr.net/gh/codeforamerica/click_that_hood@master/public/data/brazil-states.geojson";

const COR_CINZA = "#F6F6F6";
const STROKE_MAPA = "#4D0E0E";

/** Centro aproximado [lng, lat] e zoom para cada estado (sigla). */
const STATE_CENTER_ZOOM: Record<
  string,
  { center: [number, number]; zoom: number }
> = {
  SP: { center: [-46.6, -23.2], zoom: 4.2 },
  RJ: { center: [-43.2, -22.5], zoom: 5 },
  MG: { center: [-44.5, -18.5], zoom: 4 },
  ES: { center: [-40.3, -19.2], zoom: 5.5 },
  BA: { center: [-41.5, -12.5], zoom: 4.5 },
  RS: { center: [-52.5, -30], zoom: 4.5 },
  PR: { center: [-51.2, -24.5], zoom: 4.5 },
  SC: { center: [-50.3, -27.2], zoom: 5 },
  PE: { center: [-37.9, -8.4], zoom: 5 },
  CE: { center: [-39.5, -5.2], zoom: 5 },
  GO: { center: [-49.2, -15.8], zoom: 4.5 },
  AM: { center: [-63.5, -4.2], zoom: 4 },
  PA: { center: [-52.5, -3.5], zoom: 4 },
  RN: { center: [-36.5, -5.8], zoom: 6 },
  PB: { center: [-36.8, -7.2], zoom: 5.5 },
  MA: { center: [-44.2, -5.5], zoom: 4.5 },
  AL: { center: [-36.5, -9.5], zoom: 6 },
  SE: { center: [-37.4, -10.6], zoom: 6 },
  DF: { center: [-47.8, -15.8], zoom: 7 },
  MT: { center: [-55.4, -12.6], zoom: 4 },
  MS: { center: [-54.5, -20.5], zoom: 4.5 },
  RO: { center: [-63.2, -10.8], zoom: 4.5 },
  TO: { center: [-48.2, -9.5], zoom: 4.5 },
  PI: { center: [-42.8, -6.6], zoom: 5 },
  AC: { center: [-70.5, -9.2], zoom: 5 },
  AP: { center: [-51.8, -1.4], zoom: 5.5 },
  RR: { center: [-61.2, 1.2], zoom: 5.5 },
};

const DEFAULT_CENTER: [number, number] = [-54, -14];
const DEFAULT_ZOOM = 1;

// Mesmas cores do mapa de calor de absenteísmo (greens → amarelo → vermelho).
function getCorPorValor(valor: number, min: number, max: number): string {
  if (max === min) return "#DC2626";
  const ratio = (valor - min) / (max - min);
  const perc = Math.max(0, Math.min(100, ratio * 100));

  if (perc < 20) return "#DCFCE7"; // verde bem claro
  if (perc < 40) return "#BBF7D0"; // verde
  if (perc < 60) return "#FEF08A"; // amarelo
  if (perc < 80) return "#FECACA"; // laranja/quase vermelho
  return "#DC2626"; // vermelho forte
}

interface TooltipState {
  nome: string;
  sigla: string;
  valor: number;
  x: number;
  y: number;
}

type GeographyWithClickProps = React.ComponentProps<typeof Geography> & {
  onClick?: (event: React.MouseEvent<SVGPathElement>) => void;
};

const GeographyWithClick =
  Geography as React.ComponentType<GeographyWithClickProps>;

export default function GeolocationHeatmapBrazilCard(): React.ReactElement {
  const [estadoSelecionado, setEstadoSelecionado] = useState<string | null>(
    null
  );
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { minVal, maxVal } = useMemo(() => {
    const vals = Object.values(pontosForaZonaPorEstado).filter(Number.isFinite);
    return {
      minVal: Math.min(...vals, 0),
      maxVal: Math.max(...vals, 1),
    };
  }, []);

  const { center, zoom } = useMemo(() => {
    if (!estadoSelecionado) {
      return { center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM };
    }
    const cfg = STATE_CENTER_ZOOM[estadoSelecionado];
    if (cfg) return { center: cfg.center, zoom: cfg.zoom };
    return { center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM };
  }, [estadoSelecionado]);

  const handleMouseEnter = useCallback(
    (
      geo: { properties: { name?: string; sigla?: string } },
      evt: React.MouseEvent<SVGPathElement>
    ) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const sigla = (geo.properties?.sigla ?? "").toUpperCase();
      const valor = pontosForaZonaPorEstado[sigla] ?? 0;
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

  const handleGeographyClick = useCallback(
    (geo: { properties: { sigla?: string } }) => {
      const sigla = (geo.properties?.sigla ?? "").toUpperCase();
      setEstadoSelecionado(sigla);
    },
    []
  );

  const heatPoints = estadoSelecionado
    ? heatZonaEsperadaPorEstado[estadoSelecionado] ?? []
    : [];

  return (
    <CardBase
      title="Mapa de calor — Pontos fora da zona de geolocalização"
      compact
    >
      <div className="-mt-1 mb-3 border-b border-gray-100" />
      {estadoSelecionado && (
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="text-sm text-gray-600">
            Estado: <strong>{estadoSelecionado}</strong> — Zona esperada (não
            batida) em destaque.
          </p>
          <button
            type="button"
            onClick={() => setEstadoSelecionado(null)}
            className="rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Voltar ao Brasil
          </button>
        </div>
      )}
      <div
        ref={containerRef}
        className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-lg bg-gray-50/50"
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
          <ZoomableGroup
            center={center}
            zoom={zoom}
            minZoom={0.8}
            maxZoom={8}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const sigla = (geo.properties?.sigla ?? "").toUpperCase();
                  const valor = pontosForaZonaPorEstado[sigla] ?? 0;
                  const fill =
                    valor > 0
                      ? getCorPorValor(valor, minVal, maxVal)
                      : COR_CINZA;
                  return (
                  <GeographyWithClick
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fill}
                      stroke={STROKE_MAPA}
                      strokeWidth={0.8}
                      style={{
                        default: { outline: "none" },
                        hover: {
                          outline: "none",
                          cursor: "pointer",
                        },
                        pressed: { outline: "none" },
                      }}
                      onMouseEnter={(evt) => handleMouseEnter(geo, evt)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleGeographyClick(geo)}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        {/* Overlay de heat na zona esperada (quando zoomed): círculos no centro do mapa */}
        {estadoSelecionado && heatPoints.length > 0 && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            <div className="flex flex-wrap justify-center gap-3">
              {heatPoints.slice(0, 5).map((p, i) => (
                <div
                  key={i}
                  className="rounded-full bg-red-500/40 ring-2 ring-red-600/30"
                  style={{
                    width: 28 + p.intensity * 36,
                    height: 28 + p.intensity * 36,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {tooltip && !estadoSelecionado && (
          <div
            className="pointer-events-none absolute z-10 w-[180px] rounded-lg border border-gray-100 bg-white/95 px-3 py-2.5 shadow-lg backdrop-blur-sm"
            style={{
              left: Math.min(Math.max(10, tooltip.x + 10), 400),
              top: Math.min(Math.max(10, tooltip.y + 10), 350),
            }}
          >
            <p className="mb-1 text-xs font-semibold leading-tight text-gray-900">
              {tooltip.nome} ({tooltip.sigla})
            </p>
            <p className="text-sm font-medium text-red-700">
              {tooltip.valor.toLocaleString("pt-BR")} pontos fora da zona
            </p>
          </div>
        )}
      </div>
    </CardBase>
  );
}
