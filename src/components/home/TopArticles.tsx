"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown, ChevronUp, Star } from "lucide-react";
import { ArticleMetadata } from "@/hooks/useTopArticles";
import { Badge } from "@/components/ui/Badge";

interface TopArticlesProps {
  faculty: string;
  articles: ArticleMetadata[];
  isLoading: boolean;
}

export function TopArticles({ faculty, articles, isLoading }: TopArticlesProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedArticles = showAll ? articles : articles.slice(0, 3);

  return (
    <section className="mt-6 mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-foreground">
          Top Panduan {faculty ? `(${faculty})` : ''}
        </h2>
      </div>
      
      {/* Article List */}
      <div className="flex flex-col gap-3">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-card border border-border/50 h-24 rounded-2xl" />
            ))}
          </div>
        ) : articles.length > 0 ? (
          <AnimatePresence initial={false}>
            {displayedArticles.map((article) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ opacity: { duration: 0.2 } }}
              >
                <Link href={`/faq/${article.slug}`}>
                    <div className="group bg-card border-2 border-foreground rounded-2xl p-4 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-y-[2px] active:shadow-none dark:active:shadow-none cursor-pointer flex items-center justify-between">
                      <div className="flex-1 pr-4">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge 
                            variant={
                              article.category.toLowerCase().includes("akademik") ? "academic" : 
                              article.category.toLowerCase().includes("birokrasi") ? "bureaucracy" : 
                              article.category.toLowerCase().includes("kamus") ? "dictionary" : "organization"
                            }
                            className="text-[9px] py-0.5 px-2"
                          >
                            {article.category}
                          </Badge>
                          {article.faculty !== "General" && (
                            <Badge variant="outline" className="text-[9px] py-0.5 px-2 bg-background border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                              {article.faculty}
                            </Badge>
                          )}
                        </div>
                      <h3 className="font-semibold text-foreground text-sm sm:text-base mb-1 group-hover:text-primary transition-colors leading-snug">
                        {article.title}
                      </h3>
                      {article.rating! > 0 && (
                        <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-amber-500 bg-amber-50 dark:bg-amber-500/10 w-fit px-2 py-0.5 rounded-md">
                          <Star size={12} className="fill-amber-500" />
                          {article.rating?.toFixed(1)}
                        </div>
                      )}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                      <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="text-center py-12 bg-[url('/noise.svg')] border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] rounded-2xl">
            <p className="font-black text-xl uppercase tracking-tight text-foreground">Belum Ada Panduan</p>
          </div>
        )}
      </div>

      {articles.length > 3 && (
        <button 
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-4 py-4 text-sm font-black uppercase tracking-widest text-foreground bg-card border-2 border-foreground hover:bg-muted transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-y-[2px] active:shadow-none dark:active:shadow-none rounded-xl flex items-center justify-center gap-2"
        >
          {showAll ? 'Tampilkan Lebih Sedikit' : `Lihat Semua (${articles.length})`}
          <ChevronDown size={18} strokeWidth={3} className={showAll ? "rotate-180 transition-transform" : "transition-transform"} />
        </button>
      )}
    </section>
  );
}