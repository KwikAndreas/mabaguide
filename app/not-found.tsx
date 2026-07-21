"use client";

import Link from "next/link";
import { Compass } from "@/components/Icons";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-[#ededed] font-sans selection:bg-white/20 items-center justify-center p-6 w-full relative">
      
      {/* Optional Glassmorphism Header for consistency if needed, but for 404 a clean centered layout is often better. We'll just center the content. */}
      
      <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center text-center">
        
        {/* Icon Container */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full"></div>
          <div className="w-24 h-24 bg-[#0a0a0a] border border-white/[0.08] rounded-2xl flex items-center justify-center relative z-10 shadow-2xl">
            <Compass size={40} className="text-white/60" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">404</h1>
        <h2 className="text-lg font-semibold text-[#ededed] mb-2">Halaman Tidak Ditemukan</h2>
        <p className="text-sm text-[#a1a1aa] mb-10 max-w-xs mx-auto leading-relaxed">
          Maaf, halaman yang Anda cari mungkin telah dipindahkan atau sudah tidak tersedia.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link 
            href="/"
            className="flex items-center justify-center px-6 py-2.5 bg-white text-black font-semibold text-sm rounded-md transition-all hover:opacity-90 hover:scale-[0.98]"
          >
            Kembali ke Home
          </Link>
          <Link
            href="/search"
            className="flex items-center justify-center px-6 py-2.5 bg-[#0a0a0a] border border-white/[0.08] text-[#ededed] font-medium text-sm rounded-md transition-colors duration-200 hover:bg-white/[0.08]"
          >
            Cari Panduan
          </Link>
        </div>

      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-[10px] font-medium uppercase tracking-widest text-white/30">MabaGuide UBM</p>
      </div>
    </div>
  );
}
