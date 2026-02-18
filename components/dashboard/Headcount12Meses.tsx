"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { headcount12MesesData } from "@/lib/mock/dashboard";
import CardBase from "./CardBase";

export default function Headcount12Meses(): React.ReactElement {
  return (
    <CardBase title="Evolução do Headcount — 12 meses">
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={headcount12MesesData}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="activeArea"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#93c5fd" stopOpacity={0.5} />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient
                id="inactiveArea"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#fecaca" stopOpacity={0.4} />
                <stop offset="50%" stopColor="#ef4444" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(228, 228, 231, 0.6)"
              vertical={false}
            />
            <XAxis
              dataKey="mes"
              tick={{ fontSize: 12, fill: "#6B7280" }}
              axisLine={{ stroke: "#E4E4E7" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6B7280" }}
              axisLine={{ stroke: "#E4E4E7" }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #E4E4E7",
              }}
            />
            <Area
              type="monotone"
              dataKey="active"
              name="Active"
              stroke="#3b82f6"
              fill="url(#activeArea)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Area
              type="monotone"
              dataKey="inactive"
              name="Inactive"
              stroke="#ef4444"
              fill="url(#inactiveArea)"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line
              type="monotone"
              dataKey="active"
              name="Active"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </CardBase>
  );
}
