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
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-64 bg-primary/10 rounded-b-[4rem] -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <div className="mx-auto w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center rounded-2xl shadow-lg mb-6">
          <GraduationCap size={32} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Selamat Datang!</h1>
        <p className="text-muted-foreground text-sm">
          Mari sesuaikan pengalamanmu. Pilih fakultas dan program studi kamu.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onSubmit={handleSubmit}
        className="space-y-6 flex-1 flex flex-col"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Fakultas
            </label>
            <select
              className="flex h-12 w-full items-center justify-between rounded-xl border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 appearance-none shadow-sm transition-shadow"
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
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Program Studi
            </label>
            <select
              className="flex h-12 w-full items-center justify-between rounded-xl border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 appearance-none shadow-sm transition-shadow"
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

        <div className="mt-2 pt-6 pb-safe">
          <button
            type="submit"
            disabled={!faculty || !program}
            className="inline-flex items-center justify-center rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-14 w-full shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all"
          >
            Mulai Eksplorasi
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </motion.form>

      <AnimatePresence>
        {showWelcomePopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={handleFinishOnboarding}
            className="fixed inset-0 z-50 flex flex-col items-center bg-black cursor-pointer overflow-y-auto px-6 py-10 md:justify-center"
          >
            {/* Cinematic Background Glows */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/20 to-transparent blur-3xl fixed" />
            <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-secondary/20 to-transparent blur-3xl fixed" />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative z-8 w-full max-w-md flex flex-col items-center text-center my-auto"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.4 }}
                className="w-20 h-20 mb-2 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(var(--primary),0.5)]"
              >
                <GraduationCap size={40} />
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.6 }}
                className="text-3xl md:text-4xl font-extrabold text-white  tracking-tight leading-tight"
              >
                Welcome to <br /> <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">Universitas Bunda Mulia</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.8 }}
                className="text-base text-[#a1a1aa] mb-2"
              >
                Perjalanan luar biasamu dimulai dari sini!
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24, delay: 1.0 }}
                className="w-full text-left space-y-2 mb-6"
              >
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary text-center mb-3">
                  5 Tips Maba Biemers
                </h3>
                
                <ul className="space-y-4">
                  {[
                    "Kuasai tata letak kampus agar tak tersesat.",
                    "Aktif berorganisasi (HIMA/UKM) untuk relasi.",
                    "Rajin pantau Portal Mahasiswa secara rutin.",
                    "Cari teman sebanyak-banyaknya sejak awal.",
                    "Seimbangkan waktu kuliah, tugas, dan main."
                  ].map((tip, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 24, delay: 1.2 + (idx * 0.15) }}
                      className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm"
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-medium text-[#ededed]">{tip}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                className="text-xs font-medium text-[#71717a] tracking-widest uppercase"
              >
                Ketuk di mana saja untuk lanjut
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
