"use client";

import { useEffect, useMemo, useState } from "react";
import { coberturaPostosData } from "@/lib/mock/dashboard";
import CardBase from "./CardBase";

const ANIMATION_DURATION_MS = 800;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

const GAUGE_FILL = "#6B1D2D";
const GAUGE_UNFILLED = "#E74C3C";

function describeSemicircleArc(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngleDeg: number,
  endAngleDeg: number
): string {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const start = toRad(startAngleDeg);
  const end = toRad(endAngleDeg);
  const x1 = cx + outerR * Math.cos(start);
  const y1 = cy - outerR * Math.sin(start);
  const x2 = cx + outerR * Math.cos(end);
  const y2 = cy - outerR * Math.sin(end);
  const x3 = cx + innerR * Math.cos(end);
  const y3 = cy - innerR * Math.sin(end);
  const x4 = cx + innerR * Math.cos(start);
  const y4 = cy - innerR * Math.sin(start);
  const angleSpan = start - end;
  const largeArcOuter = angleSpan >= Math.PI ? 1 : 0;
  const largeArcInner = angleSpan >= Math.PI ? 1 : 0;
  return `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${largeArcOuter} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${largeArcInner} 0 ${x4} ${y4} Z`;
}

export default function CoberturaGauge(): React.ReactElement {
  const percentual = coberturaPostosData.percentualCobertos;
  const [displayedPercent, setDisplayedPercent] = useState(0);
  const cx = 100;
  const cy = 96;
  const innerR = 78;
  const outerR = 97;

  useEffect(() => {
    const startRef = { current: 0 };
    const runAnimation = (currentTime: number): void => {
      setDisplayedPercent(0);
      startRef.current = currentTime;
      const frame = (t: number): void => {
        const elapsed = t - startRef.current;
        const progress = Math.min(elapsed / ANIMATION_DURATION_MS, 1);
        const eased = easeOutCubic(progress);
        setDisplayedPercent(eased * percentual);
        if (progress < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };
    const id = requestAnimationFrame(runAnimation);
    return () => cancelAnimationFrame(id);
  }, [percentual]);

  const trackPath = useMemo(
    () => describeSemicircleArc(cx, cy, innerR, outerR, 180, 0),
    [cx, cy, innerR, outerR]
  );
  const filledEndAngle = useMemo(
    () => 180 - (displayedPercent / 100) * 180,
    [displayedPercent]
  );
  const filledPath = useMemo(
    () => describeSemicircleArc(cx, cy, innerR, outerR, 180, filledEndAngle),
    [cx, cy, innerR, outerR, filledEndAngle]
  );

  return (
    <CardBase title="Cobertura de Postos — Agora" compact>
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:gap-4">
        <div className="relative flex min-h-[80px] w-full shrink-0 justify-center pt-0 sm:min-h-[100px] sm:max-w-[160px] sm:mx-auto md:min-h-[120px] md:max-w-[200px] lg:min-h-[140px] lg:max-w-[180px] lg:mx-auto xl:mx-0 xl:min-h-[160px] xl:max-w-[220px] xl:pt-4">
          <div className="relative h-[72px] w-full max-w-[120px] sm:h-[90px] sm:max-w-[150px] md:h-[110px] md:max-w-[180px] lg:h-[130px] lg:max-w-[170px] xl:h-[150px] xl:max-w-[210px]">
            <svg
              viewBox="0 0 200 120"
              className="h-full w-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d={trackPath}
                fill={GAUGE_UNFILLED}
              />
              <path
                d={filledPath}
                fill={GAUGE_FILL}
              />
            </svg>
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pt-0">
              <span
                className="text-base font-bold tracking-tight sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
                style={{ color: GAUGE_FILL }}
              >
                {Math.round(displayedPercent)}%
              </span>
              <span className="mt-0.5 text-[10px] text-gray-500 sm:text-xs">cobertos</span>
              <span
                className="mt-0.5 rounded px-1.5 py-0.5 text-[10px] font-semibold sm:mt-1 sm:px-2 sm:py-0.5 xl:px-2 xl:py-0.5 xl:text-xs"
                style={{
                  backgroundColor: "#FADBD8",
                  color: "#C0392B",
                }}
              >
                ↑ {coberturaPostosData.variacaoPercentual}%
              </span>
            </div>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 sm:gap-2">
          <div className="flex flex-col gap-1 rounded-lg bg-gray-100 px-2.5 py-1.5 sm:flex-row sm:items-center sm:justify-between sm:px-3 sm:py-2">
            <span className="text-xs text-gray-700">Sem alteração:</span>
            <span
              className="rounded px-2 py-0.5 text-xs font-bold"
              style={{ backgroundColor: "#D4EDDA", color: "#155724" }}
            >
              {coberturaPostosData.semAlteracao}
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-gray-100 px-2.5 py-1.5 sm:flex-row sm:items-center sm:justify-between sm:px-3 sm:py-2">
            <span className="text-xs text-gray-700">Coberto c/ H.E:</span>
            <span
              className="rounded px-2 py-0.5 text-xs font-bold"
              style={{ backgroundColor: "#FFF3CD", color: "#856404" }}
            >
              {coberturaPostosData.cobertoComHE}
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-gray-100 px-2.5 py-1.5 sm:flex-row sm:items-center sm:justify-between sm:px-3 sm:py-2">
            <span className="text-xs text-gray-700">Descoberto:</span>
            <span
              className="rounded px-2 py-0.5 text-xs font-bold"
              style={{ backgroundColor: "#F8D7DA", color: "#721c24" }}
            >
              {coberturaPostosData.descoberto}
            </span>
          </div>
          <div className="mt-1.5 w-full min-w-0 sm:mt-3">
            <div className="grid w-full grid-cols-1 gap-1.5 xl:grid-cols-3 xl:gap-2">
              <div className="min-w-0 rounded-lg bg-gray-100 px-2.5 py-2 sm:px-3 sm:py-2">
                <p className="text-[10px] text-gray-500 sm:text-xs">Total de postos</p>
                <p className="mt-0.5 text-sm font-semibold text-gray-800 sm:text-base">
                  {coberturaPostosData.totalPostos}
                </p>
              </div>
              <div className="min-w-0 rounded-lg bg-gray-100 px-2.5 py-2 sm:px-3 sm:py-2">
                <p className="text-[10px] text-gray-500 sm:text-xs">Cobertura reserva acionada</p>
                <p className="mt-0.5 text-xs font-medium text-gray-800 sm:text-sm">
                  {coberturaPostosData.alertasReservaExcedida}
                </p>
              </div>
              <div className="min-w-0 rounded-lg bg-gray-100 px-2.5 py-2 sm:px-3 sm:py-2">
                <p className="text-[10px] text-gray-500 sm:text-xs">Postos SEM cobertura</p>
                <p className="mt-0.5 text-sm font-bold text-red-600 sm:text-base">
                  {coberturaPostosData.postosSemCoberturaCriticos} críticos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardBase>
  );
}
