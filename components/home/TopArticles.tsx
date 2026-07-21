"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Star } from "@/components/Icons";
import { ArticleMetadata } from "@/hooks/useTopArticles";

interface TopArticlesProps {
  faculty: string;
  articles: ArticleMetadata[];
  isLoading: boolean;
}

export function TopArticles({ faculty, articles, isLoading }: TopArticlesProps) {
  return (
    <section className="mt-8">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold text-foreground tracking-tight">
          Top Panduan {faculty ? `(${faculty})` : ''}
        </h2>
        <Link href="/search" className="text-[13px] font-semibold text-primary flex items-center hover:underline underline-offset-4">
          Semua <ChevronRight size={14} className="ml-0.5" />
        </Link>
      </div>
      
      <div className="space-y-3">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-card border border-border h-24 rounded-2xl" />
            ))}
          </div>
        ) : articles.length > 0 ? (
          articles.map((article) => (
            <Link key={article.slug} href={`/faq/${article.slug}`} className="block">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="group bg-card rounded-2xl p-4 flex items-center justify-between shadow-sm border border-border hover:border-primary/50 transition-all cursor-pointer"
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {article.category}
                    </span>
                    {article.faculty !== "General" && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30 px-2 py-0.5 rounded-full">
                        {article.faculty}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground text-[15px] leading-tight group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  {article.rating! > 0 && (
                    <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-amber-500 bg-amber-50 dark:bg-amber-500/10 w-fit px-2 py-0.5 rounded-md">
                      <Star size={12} className="fill-amber-500" />
                      {article.rating?.toFixed(1)}
                    </div>
                  )}
                </div>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                  <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </motion.div>
            </Link>
          ))
        ) : (
          <div className="text-center py-10 bg-card rounded-3xl border border-border border-dashed">
            <p className="text-sm text-muted-foreground">Belum ada panduan terpopuler.</p>
          </div>
        )}
      </div>
    </section>
  );
}
