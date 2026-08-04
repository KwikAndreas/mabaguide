"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface PieChartProps {
  data: { label: string; value: number }[];
}

const COLORS = ["#3b82f6", "#f43f5e", "#10b981", "#f59e0b", "#8b5cf6"];

export function PieChart({ data }: PieChartProps) {
  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);

  const conicGradientStr = useMemo(() => {
    let currentPercentage = 0;
    return data
      .map((item, index) => {
        const percentage = (item.value / total) * 100;
        const color = COLORS[index % COLORS.length];
        const str = `${color} ${currentPercentage}% ${currentPercentage + percentage}%`;
        currentPercentage += percentage;
        return str;
      })
      .join(", ");
  }, [data, total]);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-8 p-8 bg-card border-2 border-foreground rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] my-8 bg-[url('/noise.svg')]">
      {/* Chart */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, rotate: -90 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative w-48 h-48 rounded-full border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex-shrink-0"
        style={{
          background: `conic-gradient(${conicGradientStr})`,
        }}
      >
        {/* Inner circle for donut effect */}
        <div className="absolute inset-0 m-auto w-24 h-24 bg-card rounded-full border-4 border-foreground shadow-[inset_2px_2px_0px_0px_rgba(0,0,0,0.1)] flex items-center justify-center">
          <span className="text-sm font-black text-muted-foreground text-center leading-tight uppercase tracking-widest">Total<br/><span className="text-foreground text-xl font-heading">{total}%</span></span>
        </div>
      </motion.div>

      {/* Legend */}
      <div className="flex flex-col gap-3 flex-1 w-full">
        <h4 className="font-black text-foreground mb-2 text-lg uppercase tracking-tight font-heading">Komposisi Nilai</h4>
        {data.map((item, idx) => (
          <div key={item.label} className="flex items-center justify-between p-3 border-2 border-foreground bg-background rounded-xl hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all">
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full shadow-sm" 
                style={{ backgroundColor: COLORS[idx % COLORS.length] }}
              />
              <span className="font-semibold text-foreground text-sm">{item.label}</span>
            </div>
            <span className="font-black text-sm bg-foreground text-background px-3 py-1 rounded-md">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}