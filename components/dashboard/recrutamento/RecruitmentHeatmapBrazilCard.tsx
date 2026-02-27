"use client";

import { useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import CardBase from "@/components/dashboard/CardBase";
import { vagasAbertasPorEstadoData } from "@/lib/mock/recrutamento";

const GEO_URL =
  "https://cdn.jsdelivr.net/gh/codeforamerica/click_that_hood@master/public/data/brazil-states.geojson";

const HEAT_COLORS = ["#E5F6FF", "#7DD3FC", "#2563EB", "#1D4ED8"];

function getFillForValue(valor: number, min: number, max: number): string {
  if (max === min) return HEAT_COLORS[HEAT_COLORS.length - 1];
  const t = (valor - min) / (max - min);
  const idx = Math.min(
    HEAT_COLORS.length - 1,
    Math.max(0, Math.floor(t * HEAT_COLORS.length))
  );
  return HEAT_COLORS[idx];
}

export default function RecruitmentHeatmapBrazilCard(): React.ReactElement {
  const estadoMap = useMemo(
    () =>
      vagasAbertasPorEstadoData.reduce<Record<string, (typeof vagasAbertasPorEstadoData)[number]>>(
        (acc, item) => {
          acc[item.sigla.toUpperCase()] = item;
          return acc;
        },
        {}
      ),
    []
  );

  const { minVal, maxVal } = useMemo(() => {
    const vals = vagasAbertasPorEstadoData.map((d) => d.vagasAbertas);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    return { minVal: min, maxVal: max };
  }, []);

  const totalVagas = vagasAbertasPorEstadoData.reduce(
    (sum, item) => sum + item.vagasAbertas,
    0
  );

  return (
    <CardBase className="flex flex-col">
      <div className="mb-4 border-b border-gray-100 pb-4">
        <h2 className="font-semibold text-lg text-[#2c3545]">
          Mapa de calor — Vagas abertas por estado
        </h2>
      </div>
      <div className="mb-3 text-sm text-gray-600">
        Visualize onde estão concentradas as vagas abertas e compare com o efetivo
        atual em cada região.
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="relative mx-auto w-full max-w-[260px] overflow-hidden rounded-lg bg-gray-50/60 px-2 py-3">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              center: [-54, -14],
              scale: 650,
            }}
            style={{ width: "100%", height: "auto" }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const sigla = (geo.properties?.sigla ?? "").toUpperCase();
                  const item = estadoMap[sigla];
                  const valor = item?.vagasAbertas ?? 0;
                  const fill =
                    valor > 0 ? getFillForValue(valor, minVal, maxVal) : "#F3F4F6";
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fill}
                      stroke="#E5E7EB"
                      strokeWidth={0.6}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", cursor: "default" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-baseline justify-between gap-2 text-xs text-gray-500">
            <span>Vagas abertas por estado</span>
            <span>
              Total:{" "}
              <span className="font-semibold text-gray-800">
                {totalVagas.toLocaleString("pt-BR")}
              </span>
            </span>
          </div>
          <div className="max-h-48 overflow-y-auto rounded-lg border border-gray-100 bg-white/80">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-semibold uppercase text-gray-500">
                  <th className="px-3 py-2 text-left">Estado</th>
                  <th className="px-3 py-2 text-right">Vagas</th>
                  <th className="px-3 py-2 text-right">Efetivo local</th>
                  <th className="px-3 py-2 text-right">Relação</th>
                </tr>
              </thead>
              <tbody>
                {vagasAbertasPorEstadoData.map((item) => {
                  const relacao =
                    item.efetivoLocal > 0
                      ? (item.vagasAbertas / item.efetivoLocal) * 100
                      : 0;
                  return (
                    <tr
                      key={item.sigla}
                      className="border-b border-gray-50 last:border-b-0"
                    >
                      <td className="px-3 py-2 text-xs font-medium text-gray-800">
                        {item.estado} ({item.sigla})
                      </td>
                      <td className="px-3 py-2 text-right text-xs text-gray-700">
                        {item.vagasAbertas.toLocaleString("pt-BR")}
                      </td>
                      <td className="px-3 py-2 text-right text-xs text-gray-700">
                        {item.efetivoLocal.toLocaleString("pt-BR")}
                      </td>
                      <td className="px-3 py-2 text-right text-xs font-medium text-blue-700">
                        {relacao.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </CardBase>
  );
}

