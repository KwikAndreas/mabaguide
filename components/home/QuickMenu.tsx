"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CompassPremium, PortalPremium, DictionaryPremium } from "@/components/PremiumIcons";

export function QuickMenu() {
  return (
    <section>
      <div className="flex justify-between items-center mb-5 mt-5">
        <h2 className="text-lg font-bold text-foreground tracking-tight">Menu Utama</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Large Bento Box */}
        <Link href="/directory" className="col-span-2">
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden bg-card rounded-3xl p-5 shadow-sm border border-border flex flex-row items-center justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="z-10 max-w-[60%]">
              <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1 block">Eksplorasi</span>
              <h3 className="text-lg font-extrabold text-foreground leading-tight">Direktori<br/>Kampus</h3>
            </div>
            <CompassPremium className="w-20 h-20 z-10 drop-shadow-md" />
          </motion.div>
        </Link>

        {/* Small Bento Box 1 */}
        <Link href="/faq/portal">
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden bg-card rounded-3xl p-5 shadow-sm border border-border flex flex-col items-start gap-4"
          >
            <PortalPremium className="w-12 h-12 drop-shadow-sm" />
            <div>
              <h3 className="text-sm font-bold text-foreground leading-snug">Panduan Portal</h3>
            </div>
          </motion.div>
        </Link>

        {/* Small Bento Box 2 */}
        <Link href="/search?category=kamus">
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden bg-card rounded-3xl p-5 shadow-sm border border-border flex flex-col items-start gap-4"
          >
            <DictionaryPremium className="w-12 h-12 drop-shadow-sm" />
            <div>
              <h3 className="text-sm font-bold text-foreground leading-snug">Kamus Akademik</h3>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
