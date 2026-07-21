"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search as SearchIcon, ChevronRight } from "@/components/Icons";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { motion } from "framer-motion";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // A real app would fetch from an API route that reads the markdown files.
    // For this prototype, we'll simulate it with a dummy array or API call.
    // Since we don't have an API route yet, let's create a quick client-side filter
    // based on static data or an API route. We will build the API route next.
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);

        // Log search keyword to Supabase anonymously
        if (data.length > 0) {
          supabase.from('search_analytics').insert([{ keyword: query.trim().toLowerCase() }]).then();
        }
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchResults, 500);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="flex flex-col min-h-screen pb-12 bg-background w-full">
      <div className="w-full max-w-3xl mx-auto flex flex-col flex-1">
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border px-6 py-4">
        <h1 className="text-xl font-bold text-foreground mb-4">Pencarian</h1>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full h-12 pl-12 pr-4 rounded-xl border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all shadow-sm"
            placeholder="Ketik kata kunci..."
            autoFocus
          />
        </div>
      </header>

      <main className="flex-1 px-6 py-6">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-card border border-border h-24 rounded-xl"></div>
            ))}
          </div>
        ) : query.trim() === "" ? (
          <div className="text-center py-20 text-muted-foreground">
            <SearchIcon size={48} className="mx-auto mb-4 opacity-20" />
            <p>Mulai ketik untuk mencari panduan atau informasi kampus.</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p>Tidak ada hasil untuk "{query}"</p>
          </div>
        ) : (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Hasil Pencarian ({results.length})</h2>
            {results.map((item, i) => (
              <Link key={i} href={`/faq/${item.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border rounded-xl p-4 flex items-center justify-between group hover:border-primary/50 transition-all shadow-sm mb-3"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-secondary mb-1 block">
                      {item.category}
                    </span>
                    <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.div>
              </Link>
            ))}
          </div>
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
