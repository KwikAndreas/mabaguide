"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { CompassPremium, PortalPremium, DictionaryPremium } from "@/components/PremiumIcons";

export function QuickMenu() {
  return (
    <section>
      <div className="flex justify-between items-center mb-4 mt-6 px-1">
        <h2 className="text-lg font-bold text-foreground tracking-tight">Menu Utama</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Large Bento Box */}
        <Link href="/directory" className="col-span-2 block group">
          <div className="relative overflow-hidden bg-cat-academic p-6 flex flex-row items-center justify-between rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] border-2 border-foreground h-full hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] active:translate-y-[2px] active:shadow-none dark:active:shadow-none transition-all">
            <div className="z-10 max-w-[60%]">
              <span className="text-[11px] font-black uppercase tracking-widest text-background mb-2 block bg-foreground w-fit px-2 py-0.5 border-2 border-foreground">Eksplorasi</span>
              <h3 className="text-2xl font-black text-white leading-tight uppercase tracking-tight">Direktori<br/>Kampus</h3>
            </div>
            <CompassPremium className="w-20 h-20 z-10 text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] group-hover:rotate-12 transition-transform duration-500" />
          </div>
        </Link>

        {/* Small Bento Box 1 */}
        <Link href="/faq/portal" className="block group">
          <div className="relative overflow-hidden bg-card p-5 flex flex-col items-start justify-between gap-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] border-2 border-foreground h-full hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] active:translate-y-[2px] active:shadow-none dark:active:shadow-none transition-all bg-[url('/noise.svg')]">
            <PortalPremium className="w-12 h-12 text-cat-bureaucracy drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:drop-shadow-[2px_2px_0px_rgba(255,255,255,1)] group-hover:scale-110 transition-transform duration-300" />
            <div>
              <h3 className="text-base font-black text-foreground leading-snug uppercase tracking-tight">Panduan<br/>Portal</h3>
            </div>
          </div>
        </Link>

        {/* Small Bento Box 2 */}
        <Link href="/kamus" className="block group">
          <div className="relative overflow-hidden bg-card p-5 flex flex-col items-start justify-between gap-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] border-2 border-foreground h-full hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] active:translate-y-[2px] active:shadow-none dark:active:shadow-none transition-all bg-[url('/noise.svg')]">
            <DictionaryPremium className="w-12 h-12 text-cat-academic drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:drop-shadow-[2px_2px_0px_rgba(255,255,255,1)] group-hover:-rotate-12 transition-transform duration-300" />
            <div>
              <h3 className="text-base font-black text-foreground leading-snug uppercase tracking-tight">Kamus<br/>Akademik</h3>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}