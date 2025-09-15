"use client";

import React, { memo } from "react";
import {
  ResponsiveContainer,
  BarChart as RBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export interface SeriesPoint {
  label: string;
  value: number;
}

function EventChartComp({ series }: { series: SeriesPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RBarChart data={series} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis
          dataKey="label"
          tick={{ fill: "#94a3b8", fontSize: 10 }}
          interval={0}
          angle={-25}
          textAnchor="end"
          height={40}
        />
        <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} width={32} />
        <Tooltip
          contentStyle={{
            background: "#0f172a",
            border: "1px solid rgba(96,165,250,0.3)",
            borderRadius: 8,
          }}
          labelStyle={{ color: "#cbd5e1" }}
          itemStyle={{ color: "#e2e8f0" }}
        />
        <Bar dataKey="value" fill="#60a5fa" radius={[4, 4, 0, 0]} animationDuration={600} />
      </RBarChart>
    </ResponsiveContainer>
  );
}

export default memo(EventChartComp);
