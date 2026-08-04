"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, GraduationCap } from "@/components/Icons";
import { motion, AnimatePresence } from "framer-motion";

const faculties = {
  FTD: ["Artificial Intelligence", "Data Science", "Desain Interaktif", "Desain Komunikasi Visual", "Informatika", "Sistem Informasi"],
  FISH: ["Akuntansi", "Bahasa Inggris", "Bahasa Mandarin", "Bisnis Digital", "Hospitaliti dan Pariwisata", "Ilmu Komunikasi", "Manajemen", "Psikologi"],
};

export default function OnboardingPage() {
  const router = useRouter();
  const [faculty, setFaculty] = useState("");
  const [program, setProgram] = useState("");
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (faculty && program) {
      localStorage.setItem("mabaguide_faculty", faculty);
      localStorage.setItem("mabaguide_program", program);
      setShowWelcomePopup(true);
    }
  };

  const handleFinishOnboarding = () => {
    router.push("/");
  };
  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 bg-background relative overflow-hidden bg-[url('/noise.svg')]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center relative z-10"
      >
        <div className="mx-auto w-16 h-16 bg-cat-academic border-2 border-foreground text-white flex items-center justify-center rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] mb-6">
          <GraduationCap size={32} />
        </div>
        <h1 className="text-3xl font-black font-heading uppercase tracking-tight mb-2 text-foreground">Selamat Datang!</h1>
        <p className="text-muted-foreground text-sm font-bold">
          Mari sesuaikan pengalamanmu. Pilih fakultas dan program studi.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onSubmit={handleSubmit}
        className="space-y-6 flex-1 flex flex-col max-w-sm mx-auto w-full relative z-10"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-foreground">
              Fakultas
            </label>
            <select
              className="flex h-12 w-full items-center justify-between rounded-xl border-2 border-foreground bg-background px-4 py-2 text-sm font-bold text-foreground focus:outline-none focus:ring-0 focus:translate-y-[2px] disabled:cursor-not-allowed disabled:opacity-50 appearance-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] focus:shadow-none dark:focus:shadow-none transition-all cursor-pointer"
              value={faculty}
              onChange={(e) => {
                setFaculty(e.target.value);
                setProgram(""); 
              }}
              required
            >
              <option value="" disabled>Pilih Fakultas...</option>
              {Object.keys(faculties).map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-foreground">
              Program Studi
            </label>
            <select
              className="flex h-12 w-full items-center justify-between rounded-xl border-2 border-foreground bg-background px-4 py-2 text-sm font-bold text-foreground focus:outline-none focus:ring-0 focus:translate-y-[2px] disabled:cursor-not-allowed disabled:opacity-50 appearance-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] focus:shadow-none dark:focus:shadow-none transition-all cursor-pointer"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              required
              disabled={!faculty}
            >
              <option value="" disabled>Pilih Program Studi...</option>
              {faculty && faculties[faculty as keyof typeof faculties].map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 pt-6 pb-safe">
          <button
            type="submit"
            disabled={!faculty || !program}
            className="inline-flex items-center justify-center rounded-xl text-sm font-black uppercase tracking-widest bg-foreground text-background border-2 border-foreground hover:bg-muted hover:text-foreground h-14 w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            Mulai Eksplorasi
            <ChevronRight className="ml-2 h-5 w-5" strokeWidth={3} />
          </button>
        </div>
      </motion.form>

      <AnimatePresence>
        {showWelcomePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleFinishOnboarding}
            className="fixed inset-0 z-50 flex flex-col items-center bg-black/90 cursor-pointer overflow-y-auto px-6 py-10 justify-center"
          >
            <motion.div
              initial={{ rotateY: -15, rotateX: 10, scale: 0.8, opacity: 0 }}
              animate={{ rotateY: 0, rotateX: 0, scale: 1, opacity: 1 }}
              exit={{ rotateY: 15, rotateX: -10, scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
              className="relative w-full max-w-sm bg-background border-4 border-foreground rounded-2xl shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex flex-col my-auto"
              style={{ transformPerspective: 1000 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking card
            >
              {/* Card Header */}
              <div className="bg-cat-academic p-4 border-b-4 border-foreground flex justify-between items-center rounded-t-xl">
                <span className="text-white font-black tracking-widest uppercase text-sm">Univ. Bunda Mulia</span>
                <GraduationCap size={24} className="text-white" />
              </div>
              
              {/* Card Body */}
              <div className="p-6 flex flex-col items-center text-center bg-[url('/noise.svg')]">
                <div className="w-20 h-20 bg-muted border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] mb-4 flex items-center justify-center">
                  <span className="text-3xl font-black text-foreground">M</span>
                </div>

                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight font-heading">
                  KTM Maba
                </h2>
                
                <div className="w-full mt-4 space-y-3 text-left border-y-2 border-foreground py-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Fakultas</span>
                    <span className="text-sm font-bold text-foreground truncate">{faculty}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Program Studi</span>
                    <span className="text-sm font-bold text-foreground truncate">{program}</span>
                  </div>
                </div>

                {/* 5 Tips Box */}
                <div className="w-full mt-6 text-left border-2 border-foreground bg-muted p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                  <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-3 text-center border-b-2 border-foreground pb-2">
                    5 Tips Biemers
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Kuasai letak kampus.",
                      "Aktif di HIMA/UKM.",
                      "Pantau Portal Mahasiswa.",
                      "Cari relasi pertemanan.",
                      "Seimbangkan waktu kuliah & main."
                    ].map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm font-bold text-foreground">
                        <span className="w-5 h-5 flex items-center justify-center bg-foreground text-background rounded-full text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer */}
              <div className="bg-foreground p-3 flex justify-between items-center rounded-b-xl">
                <span className="text-[10px] font-black text-background uppercase tracking-widest">Valid 2026</span>
                <button 
                  onClick={handleFinishOnboarding}
                  className="text-xs font-black text-foreground bg-background border-2 border-background px-3 py-1 rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none transition-all uppercase"
                >
                  Selesai
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}