"use client";

import { useCallback, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import CardBase from "@/components/dashboard/CardBase";
import {
  postosTempoRealPorEstado,
  postosTempoRealContagem,
} from "@/lib/mock/ponto";

const GEO_URL =
  "https://cdn.jsdelivr.net/gh/codeforamerica/click_that_hood@master/public/data/brazil-states.geojson";

const COR_BASE = "#C44B6A";
const COR_MIN = "#F8C8C8";
const COR_MAX = "#8B2942";
const COR_CINZA = "#F6F6F6";
const COR_SELECTED = "#FEF08A";
const STROKE_MAPA = "#4D0E0E";

const STATE_CENTER_ZOOM: Record<
  string,
  { center: [number, number]; zoom: number }
> = {
  SP: { center: [-49.5, -22.5], zoom: 5 },
  RJ: { center: [-43.2, -22.5], zoom: 6 },
  MG: { center: [-44.5, -18.5], zoom: 4.5 },
  ES: { center: [-40.3, -19.2], zoom: 6 },
  BA: { center: [-41.5, -12.5], zoom: 4.5 },
  RS: { center: [-52.5, -30], zoom: 5 },
  PR: { center: [-51.2, -24.5], zoom: 5 },
  SC: { center: [-50.3, -27.2], zoom: 6 },
  PE: { center: [-37.9, -8.4], zoom: 6 },
  CE: { center: [-39.5, -5.2], zoom: 6 },
  GO: { center: [-49.2, -15.8], zoom: 5 },
};

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

function getBadgeColor(index: number): string {
  if (index === 0) return "bg-[#F97373] text-white";
  if (index === 1) return "bg-[#FDBA74] text-white";
  return "bg-[#FEF08A] text-[#92400E]";
}

type GeographyWithClickProps = React.ComponentProps<typeof Geography> & {
  onClick?: (event: React.MouseEvent<SVGPathElement>) => void;
};

const GeographyWithClick =
  Geography as React.ComponentType<GeographyWithClickProps>;

export default function PostosTempoRealCard(): React.ReactElement {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const vals = Object.values(postosTempoRealContagem).filter(Number.isFinite);
  const minVal = Math.min(...vals, 0);
  const maxVal = Math.max(...vals, 1);

  const estadoData = selectedState
    ? postosTempoRealPorEstado[selectedState]
    : null;

  const handleClick = useCallback(
    (geo: { properties: { sigla?: string } }) => {
      const sigla = (geo.properties?.sigla ?? "").toUpperCase();
      setSelectedState((prev) => (prev === sigla ? null : sigla));
    },
    []
  );

  return (
    <CardBase title="Postos em Tempo Real" compact>
      <div ref={containerRef} className="flex gap-4">
        {/* Mapa principal do Brasil */}
        <div className="relative w-[55%] shrink-0 overflow-hidden rounded-lg">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ center: [-54, -14], scale: 950 }}
            className="w-full aspect-447/432"
            style={{ width: "100%", height: "auto" }}
          >
            <ZoomableGroup
              center={[-54, -14]}
              zoom={1}
              minZoom={0.8}
              maxZoom={1.2}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const sigla = (
                      geo.properties?.sigla ?? ""
                    ).toUpperCase();
                    const valor = postosTempoRealContagem[sigla] ?? 0;
                    const isSelected = selectedState === sigla;
                    const fill = isSelected
                      ? COR_SELECTED
                      : valor > 0
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
                            fill: isSelected ? COR_SELECTED : "#FECACA",
                          },
                          pressed: { outline: "none" },
                        }}
                        onClick={() => handleClick(geo)}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>

        {/* Painel lateral */}
        <div className="flex min-w-0 flex-1 flex-col">
          {estadoData && selectedState ? (
            <>
              {/* Mini mapa do estado + informações */}
              <div className="mb-3 flex items-start gap-3">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                  <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{
                      center: STATE_CENTER_ZOOM[selectedState]?.center ?? [-54, -14],
                      scale: 950 * (STATE_CENTER_ZOOM[selectedState]?.zoom ?? 1),
                    }}
                    className="w-full h-full"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <Geographies geography={GEO_URL}>
                      {({ geographies }) =>
                        geographies.map((geo) => {
                          const sigla = (
                            geo.properties?.sigla ?? ""
                          ).toUpperCase();
                          const isThis = sigla === selectedState;
                          return (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              fill={isThis ? COR_BASE : "transparent"}
                              stroke={isThis ? STROKE_MAPA : "transparent"}
                              strokeWidth={isThis ? 0.5 : 0}
                              style={{
                                default: { outline: "none" },
                                hover: { outline: "none" },
                                pressed: { outline: "none" },
                              }}
                            />
                          );
                        })
                      }
                    </Geographies>
                  </ComposableMap>
                </div>
                <div className="pt-1">
                  <p className="text-sm font-bold text-[#2c3545]">
                    {estadoData.nomeEstado}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Postos descobertos:
                  </p>
                  <p className="text-3xl font-bold text-[#2c3545]">
                    {estadoData.postos.length}
                  </p>
                </div>
              </div>

              {/* Lista de postos com scroll */}
              <ul className="flex flex-1 flex-col gap-1.5 overflow-y-auto pr-1" style={{ maxHeight: 240 }}>
                {estadoData.postos.map((p, i) => (
                  <li
                    key={`${p.nome}-${i}`}
                    className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10px] text-gray-500">
                        {p.clienteLocal}
                      </p>
                      <p className="truncate text-xs font-semibold text-[#2c3545]">
                        {p.nome}
                      </p>
                    </div>
                    <span
                      className={`ml-2 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${getBadgeColor(i)}`}
                    >
                      {p.descobertos}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="flex h-full items-center justify-center py-12">
              <p className="text-center text-sm text-gray-400">
                Clique em um estado para ver os postos
              </p>
            </div>
          )}
        </div>
      </div>
    </CardBase>
  );
}
