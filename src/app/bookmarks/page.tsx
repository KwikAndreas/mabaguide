"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Bookmark } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { motion, AnimatePresence } from "framer-motion";

interface ArticleMetadata {
  slug: string;
  title: string;
  category: string;
  faculty: string;
  program: string;
}

export default function BookmarksPage() {
  const { bookmarks, mounted } = useBookmarks();
  const [articles, setArticles] = useState<ArticleMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/articles");
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const savedArticles = articles.filter((a) => bookmarks.includes(a.slug));

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24 w-full">
      <div className="w-full max-w-3xl mx-auto flex flex-col flex-1">
        {/* Header */}
        <div className="bg-background/80 backdrop-blur-xl border-b-2 border-foreground px-4 py-4 flex items-center sticky top-0 z-10 transition-colors">
          <Link href="/profile" className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-muted border-2 border-transparent hover:border-foreground active:translate-y-[2px] transition-all">
            <ChevronLeft size={24} className="text-foreground" strokeWidth={3} />
          </Link>
          <h1 className="font-black text-xl text-foreground flex-1 text-center pr-10 uppercase tracking-tight font-heading">
            Artikel Tersimpan
          </h1>
        </div>

        <div className="px-6 py-8 flex-1 flex flex-col">
          {!mounted || loading ? (
            <div className="flex justify-center items-center py-20">
              <span className="w-8 h-8 border-4 border-foreground border-t-transparent rounded-full animate-spin"></span>
            </div>
          ) : savedArticles.length > 0 ? (
            <div className="space-y-4">
              <AnimatePresence>
                {savedArticles.map((article, idx) => (
                  <motion.div
                    key={article.slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={`/faq/${article.slug}`}
                      className="block bg-card border-2 border-foreground rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] active:translate-y-[2px] active:shadow-none transition-all group"
                    >
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-[10px] font-black uppercase tracking-widest border-2 border-foreground bg-cat-academic text-white px-2 py-0.5 rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                          {article.category}
                        </span>
                        {article.faculty !== "General" && (
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-muted px-2 py-0.5 rounded-md border-2 border-transparent">
                            {article.faculty}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-black text-foreground uppercase tracking-tight group-hover:text-cat-academic transition-colors">
                        {article.title}
                      </h3>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-20 px-6 bg-[url('/noise.svg')] border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] rounded-2xl">
              <div className="w-24 h-24 bg-cat-academic border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] rounded-full flex items-center justify-center mb-6">
                <Bookmark size={40} strokeWidth={2.5} className="text-white" />
              </div>
              <p className="font-black text-2xl text-foreground text-center uppercase tracking-tight font-heading">
                Belum Ada Artikel
              </p>
              <p className="font-bold text-sm text-muted-foreground text-center mt-2 max-w-[250px]">
                Anda belum menyimpan panduan apa pun. Klik ikon bookmark pada artikel untuk menyimpannya di sini.
              </p>
              <Link 
                href="/search"
                className="mt-8 px-6 py-3 bg-foreground text-background text-sm font-black uppercase tracking-widest border-2 border-foreground rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-y-[2px] active:shadow-none transition-all"
              >
                Cari Panduan
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
