"use client";
import { useState } from "react";
import Link from "next/link";
import { directoryData } from "@/lib/data/directory";
import { ChevronLeft, Search, Building, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DirectoryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Fasilitas Kampus");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = directoryData.filter(item => {
    const matchesCategory = item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background w-full pb-10">
      
      {/* App Bar */}
      <div className="sticky top-0 z-40 w-full px-6 pt-6 pb-4 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <header className="w-full max-w-4xl mx-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors group">
              <div className="p-1.5 -ml-1.5 rounded-full group-hover:bg-muted/50 transition-colors">
                <ChevronLeft size={20} />
              </div>
              <span className="font-semibold text-sm ml-1">Beranda</span>
            </Link>
            <div className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
              Direktori
            </div>
          </div>
          
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight mt-1">
            Eksplorasi Kampus
          </h1>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-foreground group-focus-within:text-cat-academic transition-colors" strokeWidth={2.5} />
            </div>
            <input 
              type="text"
              placeholder="Cari fasilitas atau UKM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full h-12 pl-12 pr-4 bg-card border-2 border-foreground text-foreground font-bold rounded-xl focus:outline-none focus:ring-0 text-sm placeholder:text-muted-foreground placeholder:font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all focus:translate-y-[2px] focus:shadow-none dark:focus:shadow-none"
            />
          </div>
        </header>
      </div>

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-6">
        
        {/* Categories Tab */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveCategory("Fasilitas Kampus")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
              activeCategory === "Fasilitas Kampus" 
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                : "bg-card border border-border/50 text-muted-foreground hover:bg-muted/50"
            }`}
          >
            <Building size={16} /> Fasilitas Kampus
          </button>
          
          <button
            onClick={() => setActiveCategory("Unit Kegiatan Mahasiswa (UKM)")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
              activeCategory === "Unit Kegiatan Mahasiswa (UKM)" 
                ? "bg-secondary text-secondary-foreground shadow-md shadow-secondary/20" 
                : "bg-card border border-border/50 text-muted-foreground hover:bg-muted/50"
            }`}
          >
            <Users size={16} /> UKM
          </button>

          <button
            onClick={() => setActiveCategory("Unit Kegiatan Rohani (UKR)")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
              activeCategory === "Unit Kegiatan Rohani (UKR)" 
                ? "bg-accent text-accent-foreground shadow-md shadow-accent/20 border border-border/50" 
                : "bg-card border border-border/50 text-muted-foreground hover:bg-muted/50"
            }`}
          >
            <Users size={16} /> UKR
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10 pt-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={item.id}
                  className="relative group"
                >
                  <Link href={`/directory/${item.id}`} className="block h-full relative z-10">
                    {/* Stack effect background paper */}
                    <div className="absolute inset-0 bg-muted border-4 border-foreground rounded-2xl transform translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform pointer-events-none" />
                    
                    <div className="relative h-full bg-background border-4 border-foreground rounded-2xl overflow-hidden shadow-none group-hover:-translate-y-1 group-hover:-translate-x-1 transition-transform flex flex-col z-10">
                      <div className="h-44 bg-muted relative overflow-hidden border-b-4 border-foreground group-hover:border-b-8 transition-all">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[url('/noise.svg')] opacity-80">
                            <Building size={48} strokeWidth={2} className="text-foreground/50" />
                          </div>
                        )}
                        
                        {/* Pinned Sticker Badge */}
                        <div className="absolute bottom-3 right-4 bg-cat-academic text-white border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] text-[10px] font-black uppercase tracking-widest px-3 py-1 -rotate-3 group-hover:rotate-3 transition-transform z-20">
                          {item.category.includes("UKM") ? "UKM" : item.category.includes("UKR") ? "UKR" : "FASILITAS"}
                        </div>
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col bg-[url('/noise.svg')] bg-repeat">
                        <h3 className="text-xl font-black text-foreground mb-2 uppercase tracking-tight leading-tight group-hover:text-cat-academic transition-colors">{item.name}</h3>
                        <p className="text-foreground font-medium text-sm line-clamp-3 mb-6 flex-1 opacity-90">
                          {item.description}
                        </p>
                        <div className="flex items-center text-xs font-black text-foreground uppercase tracking-widest border-2 border-foreground bg-white dark:bg-black px-4 py-2 w-fit rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] group-hover:bg-foreground group-hover:text-background transition-all">
                          <span>Buka Arsip</span>
                          <ChevronLeft size={16} strokeWidth={3} className="rotate-180 ml-2" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="col-span-1 sm:col-span-2 flex flex-col items-center justify-center py-20 px-6 bg-[url('/noise.svg')] border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] rounded-2xl relative overflow-hidden"
              >
                <div className="w-24 h-24 bg-background border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] rounded-full flex items-center justify-center mb-6 relative z-10">
                  <Search size={40} strokeWidth={3} className="text-foreground" />
                </div>
                <p className="font-black text-xl text-foreground text-center uppercase tracking-tight relative z-10">Tidak Ditemukan</p>
                <p className="font-medium text-sm text-muted-foreground text-center mt-2 relative z-10">Arsip yang Anda cari belum tersedia di direktori kami.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}