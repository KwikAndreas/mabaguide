"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search as SearchIcon, ChevronRight, ChevronLeft } from "@/components/Icons";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";

import { Badge } from "@/components/ui/Badge";
import { AnimatePresence } from "framer-motion";

const POPULAR_SEARCHES = ["KRS", "Cuti", "Beasiswa", "UKM", "Parkir", "Biaya Kuliah"];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 500);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
        const data = await res.json();
        setResults(data);

        if (data.length > 0) {
          supabase.from('search_analytics').insert([{ keyword: debouncedQuery.trim().toLowerCase() }]).then();
        }
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  return (
    <div className="flex flex-col min-h-screen bg-background w-full">
      <div className="w-full max-w-3xl mx-auto flex flex-col flex-1 px-4 py-8 md:px-6 md:py-12">
        
        {/* Header / Command Palette Input */}
        <header className="flex flex-col items-center mb-8 relative z-20">
          <Link href="/" className="self-start flex items-center justify-center w-12 h-12 bg-background border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] rounded-full hover:bg-muted active:translate-y-[2px] transition-all mb-8">
            <ChevronLeft size={24} strokeWidth={3} className="text-foreground" />
          </Link>
          
          <div className="w-full relative group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none z-10">
              <SearchIcon size={28} strokeWidth={3} className="text-foreground group-focus-within:text-cat-academic transition-colors" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full h-20 pl-16 pr-6 bg-card border-4 border-foreground text-foreground font-black text-xl md:text-2xl rounded-2xl focus:outline-none focus:ring-0 placeholder:text-muted-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all uppercase tracking-tight focus:-translate-y-1 focus:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]"
              placeholder="Cari apa hari ini?"
              autoFocus
            />
          </div>

          {/* Popular Searches */}
          <AnimatePresence>
            {!query.trim() && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full mt-6 flex flex-wrap gap-3"
              >
                <span className="w-full text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">
                  Pencarian Populer
                </span>
                {POPULAR_SEARCHES.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-foreground hover:text-background active:translate-y-1 transition-all text-sm py-1.5 px-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                    onClick={() => setQuery(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Results Area */}
        <main className="flex-1 w-full relative z-10">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-card border-4 border-foreground h-24 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"></div>
              ))}
            </div>
          ) : query.trim() === "" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="flex flex-col items-center justify-center py-20 px-6 bg-[url('/noise.svg')] border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] rounded-2xl relative overflow-hidden"
            >
              {/* Geometric Deco */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cat-bureaucracy/20 border-b-4 border-l-4 border-foreground rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-cat-academic/20 border-t-4 border-r-4 border-foreground rounded-tr-full" />
              
              <div className="w-24 h-24 bg-background border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] rounded-full flex items-center justify-center mb-6 relative z-10">
                <SearchIcon size={40} strokeWidth={3} className="text-foreground" />
              </div>
              <p className="font-black text-xl text-foreground text-center uppercase tracking-tight relative z-10">Mulai Ketik Sesuatu</p>
              <p className="font-medium text-sm text-muted-foreground text-center mt-2 relative z-10">Temukan panduan, direktori, dan informasi seputar UBM.</p>
            </motion.div>
          ) : results.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="flex flex-col items-center justify-center py-20 px-6 bg-red-500/10 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] rounded-2xl"
            >
              <p className="font-black text-2xl text-foreground text-center uppercase tracking-tight">Tidak Ditemukan</p>
              <p className="font-bold text-base text-foreground mt-2 text-center">Kami tidak dapat menemukan hasil untuk <span className="bg-foreground text-background px-2 py-0.5 rounded-md inline-block mt-1">"{query}"</span></p>
            </motion.div>
          ) : (
            <motion.div 
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05 }
                }
              }}
              className="space-y-4"
            >
              <h2 className="text-xs font-black text-muted-foreground mb-4 uppercase tracking-widest border-b-2 border-foreground pb-2">Hasil Pencarian ({results.length})</h2>
              {results.map((item, i) => (
                <Link key={i} href={item.type === 'directory' ? `/directory/${item.slug}` : `/faq/${item.slug}`} className="block">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 30 } }
                    }}
                    className="group bg-card border-4 border-foreground rounded-2xl p-5 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex-1 pr-4">
                      <span className="text-[10px] font-black uppercase tracking-widest border-2 border-foreground bg-background px-2 py-0.5 rounded-md text-foreground group-hover:bg-cat-academic group-hover:text-white transition-colors mb-2 inline-block">
                        {item.category}
                      </span>
                      <h3 className="font-black text-foreground text-lg uppercase tracking-tight group-hover:text-cat-academic transition-colors leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    <div className="w-10 h-10 border-2 border-foreground rounded-full bg-background flex items-center justify-center group-hover:bg-foreground transition-colors shrink-0">
                      <ChevronRight size={20} strokeWidth={3} className="text-foreground group-hover:text-background transition-colors" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}