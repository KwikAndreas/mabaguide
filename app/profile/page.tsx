"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, ChevronLeft, CheckCircle } from "@/components/Icons";
import Link from "next/link";
import { motion } from "framer-motion";

const faculties: Record<string, string[]> = {
  FTD: [
    "Artificial Intelligence",
    "Data Science",
    "Desain Interaktif",
    "Desain Komunikasi Visual",
    "Informatika",
    "Sistem Informasi",
  ],
  FISH: [
    "Akuntansi",
    "Bahasa Inggris",
    "Bahasa Mandarin",
    "Hospitaliti dan Pariwisata",
    "Ilmu Komunikasi",
    "Manajemen",
  ],
};

export default function ProfilePage() {
  const router = useRouter();
  const [faculty, setFaculty] = useState("");
  const [program, setProgram] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const f = localStorage.getItem("mabaguide_faculty");
    const p = localStorage.getItem("mabaguide_program");
    if (f) setFaculty(f);
    if (p) setProgram(p);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem("mabaguide_faculty", faculty);
    localStorage.setItem("mabaguide_program", program);
    
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 600);
  };

  const handleLogout = () => {
    localStorage.removeItem("mabaguide_faculty");
    localStorage.removeItem("mabaguide_program");
    router.push("/onboarding");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24 w-full">
      <div className="w-full max-w-3xl mx-auto flex flex-col flex-1">
        {/* App-consistent Header */}
        <div className="bg-background/80 backdrop-blur-xl border-b border-border px-4 py-4 flex items-center shadow-sm sticky top-0 z-10">
        <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
          <ChevronLeft size={24} className="text-foreground" />
        </Link>
        <h1 className="font-bold text-lg text-foreground flex-1 text-center pr-10">Profil Saya</h1>
      </div>

      <div className="px-6 py-8">
        {/* Profile Avatar Header */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4 border-4 border-background shadow-md">
            <User size={40} className="text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Pengaturan Profil</h2>
          <p className="text-sm text-muted-foreground text-center mt-1">Ubah fakultas dan program studi untuk menyesuaikan rekomendasi panduan Anda.</p>
        </div>

        {/* Settings Group (iOS-inspired layout but consistent with App Theme) */}
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-2 mb-2">
          Data Akademik
        </h3>
        
        <div className="bg-card rounded-3xl overflow-hidden mb-6 shadow-sm border border-border">
          
          {/* Row 1: Fakultas */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <span className="text-[15px] font-semibold text-foreground">Fakultas</span>
            <div className="relative">
              <select
                value={faculty}
                onChange={(e) => {
                  setFaculty(e.target.value);
                  setProgram("");
                }}
                className="appearance-none bg-transparent text-[15px] font-medium text-right text-muted-foreground focus:outline-none pr-5 w-48 truncate cursor-pointer"
                dir="rtl"
              >
                <option value="" disabled>Pilih</option>
                {Object.keys(faculties).map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                <ChevronLeft size={16} className="rotate-180 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Row 2: Program Studi */}
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-[15px] font-semibold text-foreground">Jurusan</span>
            <div className="relative">
              <select
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                disabled={!faculty}
                className="appearance-none bg-transparent text-[15px] font-medium text-right text-muted-foreground focus:outline-none pr-5 w-48 truncate disabled:opacity-50 cursor-pointer"
                dir="rtl"
              >
                <option value="" disabled>Pilih</option>
                {faculty && faculties[faculty].map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                <ChevronLeft size={16} className="rotate-180 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Button (Consistent Theme) */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={!faculty || !program || isSaving}
          className="w-full h-14 bg-primary text-primary-foreground text-[15px] font-bold rounded-2xl shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center justify-center transition-all"
        >
          {isSaving ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : (
            "Simpan Perubahan"
          )}
        </motion.button>
        
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mt-4 text-sm font-semibold text-green-600 bg-green-50 dark:bg-green-500/10 dark:text-green-400 py-2 rounded-xl"
          >
            <CheckCircle size={16} className="text-green-600 dark:text-green-400" /> Profil berhasil diperbarui!
          </motion.div>
        )}

        {/* Danger Zone */}
        <div className="mt-10">
          <button 
            onClick={handleLogout}
            className="w-full py-4 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-500/20"
          >
            Ulangi Proses Onboarding
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
