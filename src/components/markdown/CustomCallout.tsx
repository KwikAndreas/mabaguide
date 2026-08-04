import * as React from "react";
import clsx from "clsx";
import { AlertCircle, Info, TriangleAlert } from "lucide-react";

interface CustomCalloutProps {
  children: React.ReactNode;
  type?: "info" | "warning" | "danger";
  title?: string;
}

export default function CustomCallout({
  children,
  type = "info",
  title,
}: CustomCalloutProps) {
  const isWarning = type === "warning";
  const isDanger = type === "danger";

  return (
    <div
      className={clsx(
        "my-6 flex flex-col gap-2 rounded-xl border-2 border-foreground p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]",
        isDanger
          ? "bg-red-500/10"
          : isWarning
          ? "bg-cat-dictionary/10"
          : "bg-cat-academic/10"
      )}
    >
      <div className="flex items-center gap-2 font-bold text-foreground">
        {isDanger ? (
          <TriangleAlert className="text-red-500" size={20} strokeWidth={2.5} />
        ) : isWarning ? (
          <AlertCircle className="text-cat-dictionary" size={20} strokeWidth={2.5} />
        ) : (
          <Info className="text-cat-academic" size={20} strokeWidth={2.5} />
        )}
        <span className="uppercase tracking-wide text-sm">{title || type}</span>
      </div>
      <div className="text-sm font-medium leading-relaxed text-foreground/90">
        {children}
      </div>
    </div>
  );
}
