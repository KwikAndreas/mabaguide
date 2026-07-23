"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, Users, MapPin, ChevronRight, ChevronLeft, Search } from "@/components/Icons";
import { motion, AnimatePresence } from "framer-motion";
import { getDirectoryItems } from "@/lib/data/directory";

export default function DirectoryPage() {
  const allItems = getDirectoryItems();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const categories = [
    {
      title: "Fasilitas Kampus",
      icon: Building2,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      items: allItems.filter(item => item.category === "Fasilitas Kampus")
    },
    {
      title: "Unit Kegiatan Mahasiswa (UKM)",
      icon: Users,
      color: "text-orange-500",
      bg: "bg-orange-100 dark:bg-orange-900/30",
      items: allItems.filter(item => item.category === "Unit Kegiatan Mahasiswa (UKM)")
    },
    {
      title: "Unit Kegiatan Rohani (UKR)",
      icon: Users,
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-900/30",
      items: allItems.filter(item => item.category === "Unit Kegiatan Rohani (UKR)")
    }
  ];

  const ActiveIcon = activeCategoryIndex !== null ? categories[activeCategoryIndex].icon : null;

  return (
    <div className="flex flex-col min-h-screen pb-12 bg-background w-full">
      <div className="w-full max-w-3xl mx-auto flex flex-col flex-1">
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Direktori Kampus</h1>
            <p className="text-sm text-muted-foreground mt-1">Eksplorasi lingkungan dan ormawa UBM</p>
          </div>
        </header>

        <main className="flex-1 px-6 py-4">
          <AnimatePresence mode="wait">
            {activeCategoryIndex === null ? (
              <motion.div
                key="categories"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {categories.map((cat, idx) => {
                  const IconComponent = cat.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveCategoryIndex(idx);
                        setSearchQuery(""); // Reset search when opening category
                      }}
                      className="flex flex-col items-center justify-center text-center bg-card border border-border p-4 rounded-2xl shadow-sm hover:border-primary/50 hover:shadow-md transition-all group min-h-[180px]"
                    >
                      <div className={`p-4 rounded-full ${cat.bg} ${cat.color} mb-4 group-hover:scale-110 transition-transform`}>
                        <IconComponent size={36} />
                      </div>
                      <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{cat.title}</h2>
                      <p className="text-xs text-muted-foreground">{cat.items.length} item tersedia</p>
                    </button>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="items"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setActiveCategoryIndex(null)}
                    className="p-2 -ml-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  {ActiveIcon && (
                    <div className={`p-2 rounded-lg ${categories[activeCategoryIndex].bg} ${categories[activeCategoryIndex].color}`}>
                      <ActiveIcon size={20} />
                    </div>
                  )}
                  <h2 className="text-lg font-bold text-foreground">{categories[activeCategoryIndex].title}</h2>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                    <Search size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder={`Cari di ${categories[activeCategoryIndex].title}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/70 shadow-sm"
                  />
                </div>

                <div className="space-y-4">
                  {categories[activeCategoryIndex].items
                    .filter(item => 
                      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      item.description.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((item, i) => (
                    <Link href={`/directory/${item.id}`} key={item.id} className="block">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-card border border-border rounded-xl p-4 shadow-sm hover:border-primary/50 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex-1 pr-4">
                          <h3 className="font-semibold text-sm text-foreground mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                          
                          <div className={`flex items-center gap-1.5 text-[11px] font-medium ${categories[activeCategoryIndex].color}`}>
                            <MapPin size={12} />
                            {item.locations[0]} {item.locations.length > 1 && `(+${item.locations.length - 1} lokasi)`}
                          </div>
                        </div>
                        
                        <div className="text-muted-foreground group-hover:text-primary transition-colors opacity-50 group-hover:opacity-100 flex-shrink-0">
                          <ChevronRight size={20} />
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                  
                  {categories[activeCategoryIndex].items.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground text-sm border border-dashed border-border rounded-xl">
                      Belum ada item di kategori ini.
                    </div>
                  ) : categories[activeCategoryIndex].items.filter(item => 
                      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      item.description.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground text-sm border border-dashed border-border rounded-xl">
                      Pencarian "{searchQuery}" tidak ditemukan.
                    </div>
                  ) : null}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
