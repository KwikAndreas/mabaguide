"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, WavingHand } from "@/components/Icons";
import { motion } from "framer-motion";
import Image from "next/image";

interface HomeHeaderProps {
  faculty: string;
}

export function HomeHeader({ faculty }: HomeHeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="bg-background sticky top-0 z-40 border-b border-border">
      <header className="bg-background/80 backdrop-blur-xl px-6 py-4">
        {/* Top Appbar Row */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            {/* Minimalist Logo */}
            <div className="w-12 h-10 text-primary flex items-center justify-center font-extrabold text-sm">
              <img src="/logo_ubm192.png" alt="Logo" className="w-12 h-8" />
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Maba {faculty ? faculty : 'Baru'}
              </span>
              <div className="flex items-center gap-1.5 text-foreground font-bold text-lg leading-tight">
                Halo! <WavingHand size={18} className="text-yellow-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full h-12 pl-12 pr-4 rounded-xl border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-[14px] transition-all shadow-sm placeholder:text-muted-foreground"
            placeholder="Cari Organisasi, UKM, atau info KRS..."
          />
        </form>
      </header>
    </div>
  );
}
