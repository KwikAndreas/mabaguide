"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, ChevronLeft, CheckCircle, Bookmark } from "lucide-react";
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
        <div className="bg-background/80 backdrop-blur-xl border-b-2 border-foreground px-4 py-4 flex items-center sticky top-0 z-10 transition-colors">
        <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-muted border-2 border-transparent hover:border-foreground active:translate-y-[2px] transition-all">
          <ChevronLeft size={24} className="text-foreground" strokeWidth={3} />
        </Link>
        <h1 className="font-black text-xl text-foreground flex-1 text-center pr-10 uppercase tracking-tight font-heading">Profil Saya</h1>
      </div>

      <div className="px-6 py-8">
        {/* Settings Group */}
        <div className="mb-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-4 border-b-2 border-foreground pb-2 inline-block">
            Data Akademik
          </h3>
          
          <div className="bg-card rounded-2xl mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] border-4 border-foreground flex flex-col p-4 gap-4 bg-[url('/noise.svg')]">
          
          {/* Row 1: Fakultas */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Fakultas</label>
            <div className="relative">
              <select
                value={faculty}
                onChange={(e) => {
                  setFaculty(e.target.value);
                  setProgram("");
                }}
                className="appearance-none bg-background border-2 border-foreground text-sm font-bold text-foreground focus:outline-none w-full px-4 py-3 rounded-xl cursor-pointer hover:bg-muted transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] focus:shadow-none focus:translate-y-[2px]"
              >
                <option value="" disabled>Pilih Fakultas...</option>
                {Object.keys(faculties).map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronLeft size={16} strokeWidth={3} className="-rotate-90 text-foreground" />
              </div>
            </div>
          </div>

          {/* Row 2: Program Studi */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Jurusan</label>
            <div className="relative">
              <select
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                disabled={!faculty}
                className="appearance-none bg-background border-2 border-foreground text-sm font-bold text-foreground focus:outline-none w-full px-4 py-3 rounded-xl cursor-pointer hover:bg-muted transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] focus:shadow-none focus:translate-y-[2px] disabled:opacity-50 disabled:pointer-events-none"
              >
                <option value="" disabled>Pilih Jurusan...</option>
                {faculty && faculties[faculty].map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronLeft size={16} strokeWidth={3} className="-rotate-90 text-foreground" />
              </div>
            </div>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={!faculty || !program || isSaving}
          className="w-full h-14 bg-foreground text-background text-sm font-black uppercase tracking-widest border-2 border-foreground rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center transition-all mb-10"
        >
          {isSaving ? (
            <span className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin"></span>
          ) : (
            "Simpan Perubahan"
          )}
        </motion.button>
        
        {/* Aktivitas Group */}
        <div className="mb-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-4 border-b-2 border-foreground pb-2 inline-block">
            Aktivitas
          </h3>
          
          <div className="bg-card rounded-2xl mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] border-4 border-foreground flex flex-col p-2 bg-[url('/noise.svg')]">
            <Link href="/bookmarks" className="flex items-center justify-between p-4 bg-background border-2 border-foreground rounded-xl hover:bg-muted active:translate-y-[2px] transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cat-academic border-2 border-foreground rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none transition-all">
                  <Bookmark size={20} strokeWidth={2.5} className="text-white" />
                </div>
                <span className="text-sm font-black text-foreground uppercase tracking-wider">Artikel Tersimpan</span>
              </div>
              <ChevronLeft size={16} strokeWidth={3} className="rotate-180 text-foreground" />
            </Link>
          </div>
        </div>
        
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mt-6 text-sm font-black uppercase tracking-widest bg-green-400 text-black border-2 border-black py-3 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <CheckCircle size={18} strokeWidth={3} className="text-black" /> PROFIL DIPERBARUI!
          </motion.div>
        )}

        {/* Danger Zone */}
        <div className="mt-12 pt-6 border-t-2 border-foreground border-dashed">
          <button 
            onClick={handleLogout}
            className="w-full py-4 text-sm font-black uppercase tracking-widest bg-red-500 text-white border-2 border-foreground hover:bg-red-600 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-y-[2px] active:shadow-none transition-all"
          >
            Ulangi Proses Onboarding
          </button>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
}
