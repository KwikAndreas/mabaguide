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
    <div className="bg-background/80 backdrop-blur-xl sticky top-0 z-40 border-b border-border/50">
      <header className="w-full px-6 py-4">
        {/* Top Appbar Row */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            {/* Minimalist Logo */}
            <div className="w-12 h-10 bg-primary/10 flex items-center justify-center rounded-xl">
              <img src="/logo_ubm192.png" alt="Logo" className="w-8 h-6 opacity-90" />
            </div>
            
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-0.5">
                Maba {faculty ? faculty : 'Baru'}
              </span>
              <div className="flex items-center gap-2 text-foreground font-bold text-xl leading-none">
                Halo! <WavingHand size={20} className="text-yellow-500 origin-bottom-right animate-bounce" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative group mb-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-foreground group-focus-within:text-cat-academic transition-colors" strokeWidth={2.5} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full h-12 pl-12 pr-4 bg-card border-2 border-foreground text-foreground font-bold rounded-xl focus:outline-none focus:ring-0 text-sm placeholder:text-muted-foreground placeholder:font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all focus:translate-y-[2px] focus:shadow-none dark:focus:shadow-none"
            placeholder="Cari Organisasi, UKM, atau info..."
          />
        </form>
      </header>
    </div>
  );
}