"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface StickyTOCProps {
  headings: HeadingItem[];
}

export default function StickyTOC({ headings }: StickyTOCProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -40% 0px" }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-32 bg-card border-2 border-foreground rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
        <h3 className="font-black text-foreground mb-4 uppercase tracking-wider text-sm border-b-2 border-foreground pb-2">
          Daftar Isi
        </h3>
        <nav className="flex flex-col gap-2">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={clsx(
                "text-sm font-bold transition-all hover:text-foreground",
                heading.level === 3 ? "ml-4" : "",
                activeId === heading.id
                  ? "text-primary underline decoration-2 underline-offset-4"
                  : "text-muted-foreground"
              )}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
