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
    <div className="flex flex-col sm:flex-row items-center gap-8 p-8 bg-card border border-border/50 rounded-3xl shadow-sm my-8">
      {/* Chart */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, rotate: -90 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative w-48 h-48 rounded-full border border-border/50 shadow-sm flex-shrink-0"
        style={{
          background: `conic-gradient(${conicGradientStr})`,
        }}
      >
        {/* Inner circle for donut effect */}
        <div className="absolute inset-0 m-auto w-24 h-24 bg-card rounded-full shadow-sm flex items-center justify-center">
          <span className="text-sm font-bold text-muted-foreground text-center leading-tight">Total<br/><span className="text-foreground text-lg">{total}%</span></span>
        </div>
      </motion.div>

      {/* Legend */}
      <div className="flex flex-col gap-3 flex-1 w-full">
        <h4 className="font-bold text-foreground mb-2 text-lg">Komposisi Nilai</h4>
        {data.map((item, idx) => (
          <div key={item.label} className="flex items-center justify-between p-3 border border-border/50 bg-background/50 rounded-xl hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full shadow-sm" 
                style={{ backgroundColor: COLORS[idx % COLORS.length] }}
              />
              <span className="font-semibold text-foreground text-sm">{item.label}</span>
            </div>
            <span className="font-bold text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}