"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, GraduationCap } from "@/components/Icons";
import { motion } from "framer-motion";

const faculties = {
  FTD: ["Artificial Intelligence", "Data Science", "Desain Interaktif", "Desain Komunikasi Visual", "Informatika", "Sistem Informasi"],
  FISH: ["Akuntansi", "Bahasa Inggris", "Bahasa Mandarin", "Bisnis Digital", "Hospitaliti dan Pariwisata", "Ilmu Komunikasi", "Manajemen", "Psikologi"],
};

export default function OnboardingPage() {
  const router = useRouter();
  const [faculty, setFaculty] = useState("");
  const [program, setProgram] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (faculty && program) {
      localStorage.setItem("mabaguide_faculty", faculty);
      localStorage.setItem("mabaguide_program", program);
      router.push("/");
    }
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
                setProgram(""); // Reset program when faculty changes
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

        <div className="mt-auto pt-6 pb-safe">
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
    </div>
  );
}
