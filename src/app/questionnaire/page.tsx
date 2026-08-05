"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { NeoInput, NeoTextarea, NeoCheckbox, NeoRadio, NeoRating, NeoSelect } from '@/components/ui/NeoForms';
import { Button } from '@/components/ui/Button';
import { Loader2, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function QuestionnairePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [faculty, setFaculty] = useState("");
  const [domicile, setDomicile] = useState("");
  const [infoSources, setInfoSources] = useState<string[]>([]);
  const [difficultyRating, setDifficultyRating] = useState<number>(0);
  const [crucialTimes, setCrucialTimes] = useState<string[]>([]);
  const [neededFeatures, setNeededFeatures] = useState<string[]>([]);
  const [personalizationImportance, setPersonalizationImportance] = useState<number>(0);
  const [favoriteFormats, setFavoriteFormats] = useState<string[]>([]);
  const [preferredPlatform, setPreferredPlatform] = useState("");
  const [usageLikelihood, setUsageLikelihood] = useState<number>(0);
  const [wishlistFeature, setWishlistFeature] = useState("");
  const [otherFeedback, setOtherFeedback] = useState("");

  useEffect(() => {
    setIsMounted(true);
    if (localStorage.getItem("mabaguide_questionnaire_filled") === "true") {
      setIsFilled(true);
    }
  }, []);

  const handleCheckbox = (setFn: React.Dispatch<React.SetStateAction<string[]>>, val: string, checked: boolean) => {
    setFn(prev => checked ? [...prev, val] : prev.filter(item => item !== val));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!faculty || !domicile || difficultyRating === 0 || personalizationImportance === 0 || !preferredPlatform || usageLikelihood === 0) {
      setError("Mohon isi semua pertanyaan wajib!");
      
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setIsSubmitting(true);
    setError(null);

    const payload = {
      faculty_program: faculty,
      domicile,
      info_sources: infoSources,
      difficulty_rating: difficultyRating,
      urgent_info_time: crucialTimes,
      desired_features: neededFeatures,
      personalization_importance: personalizationImportance,
      preferred_format: favoriteFormats,
      preferred_platform: preferredPlatform,
      likelihood_to_use: usageLikelihood,
      wishlist_feature: wishlistFeature,
      additional_feedback: otherFeedback,
    };

    try {
      const { error: sbError } = await supabase.from('camaba_questionnaires').insert([payload]);
      
      if (sbError) throw sbError;

      localStorage.setItem("mabaguide_questionnaire_filled", "true");
      setIsFilled(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat mengirim data. Coba lagi.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) return null;

  if (isFilled) {
    return (
      <div className="min-h-screen bg-background bg-[url('/noise.svg')] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-card p-8 rounded-2xl border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] text-center">
          <CheckCircle2 size={64} className="text-cat-organization mx-auto mb-6" strokeWidth={2.5} />
          <h2 className="text-2xl font-black font-heading uppercase text-foreground mb-4">Terima Kasih!</h2>
          <p className="text-muted-foreground font-bold mb-8 leading-relaxed">Kamu sudah mengisi kuesioner ini. Masukanmu sangat berharga bagi pengembangan fitur-fitur Maba Guide UBM ke depannya.</p>
          <Link href="/">
            <Button variant="default" className="w-full h-14">
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background bg-[url('/noise.svg')] py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-foreground hover:text-cat-academic font-bold uppercase tracking-wider mb-8 transition-colors">
          <ArrowLeft size={20} strokeWidth={3} />
          Kembali
        </Link>
        
        <div className="bg-card border-4 border-foreground rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] overflow-hidden mb-12">
          <div className="bg-foreground text-background p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-black font-heading uppercase tracking-tight mb-2">Riset Pengalaman Mahasiswa Baru</h1>
            <p className="font-medium opacity-90 text-sm sm:text-base">Bantu kami membangun fitur yang paling kamu butuhkan di perkuliahan pertamamu!</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-12">
            {error && (
              <div className="bg-red-500/10 border-2 border-red-500 text-red-500 p-4 rounded-xl font-bold flex items-center gap-3">
                <AlertTriangle size={24} strokeWidth={3} className="flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Q1 */}
            <div className="space-y-4">
              <label className="block font-black text-foreground text-lg uppercase tracking-wide">1. Apa Fakultas/Program Studi kamu? <span className="text-red-500">*</span></label>
              <NeoSelect value={faculty} onChange={e => setFaculty(e.target.value)}>
                <option value="" disabled>-- Pilih Program Studi --</option>
                <optgroup label="FTD (Fakultas Teknologi & Desain)">
                  {["Artificial Intelligence", "Data Science", "Desain Interaktif", "Desain Komunikasi Visual", "Informatika", "Sistem Informasi"].map(prog => (
                    <option key={prog} value={`FTD - ${prog}`}>{prog}</option>
                  ))}
                </optgroup>
                <optgroup label="FISH (Fakultas Ilmu Sosial & Humaniora)">
                  {["Akuntansi", "Bahasa Inggris", "Bahasa Mandarin", "Bisnis Digital", "Hospitaliti dan Pariwisata", "Ilmu Komunikasi", "Manajemen", "Psikologi"].map(prog => (
                    <option key={prog} value={`FISH - ${prog}`}>{prog}</option>
                  ))}
                </optgroup>
              </NeoSelect>
            </div>

            {/* Q2 */}
            <div className="space-y-4">
              <label className="block font-black text-foreground text-lg uppercase tracking-wide">2. Domisili sebelum kuliah? <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <NeoRadio 
                  checked={domicile === "Jakarta"} 
                  onChange={() => setDomicile("Jakarta")} 
                  label="Jakarta & Sekitarnya (Jabodetabek)" 
                />
                <NeoRadio 
                  checked={domicile === "Luar Jakarta"} 
                  onChange={() => setDomicile("Luar Jakarta")} 
                  label="Luar Daerah / Luar Pulau" 
                />
              </div>
            </div>

            {/* Q3 */}
            <div className="space-y-4">
              <label className="block font-black text-foreground text-lg uppercase tracking-wide">3. Biasanya dapat info perkuliahan dari mana?</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Instagram @ubmuniversity", "Instagram Prodi/Fakultas", "Grup WA Angkatan", "Mentor/Kating", "Bagian Akademik", "Lainnya"].map(src => (
                  <NeoCheckbox 
                    key={src}
                    checked={infoSources.includes(src)}
                    onChange={(checked) => handleCheckbox(setInfoSources, src, checked)}
                    label={src}
                  />
                ))}
              </div>
            </div>

            {/* Q4 */}
            <div className="space-y-4">
              <label className="block font-black text-foreground text-lg uppercase tracking-wide">4. Seberapa sulit mencari info yang valid? <span className="text-red-500">*</span></label>
              <p className="text-muted-foreground font-bold text-sm mb-4">1 = Sangat Mudah, 5 = Sangat Sulit</p>
              <NeoRating value={difficultyRating} onChange={setDifficultyRating} />
            </div>

            {/* Q5 */}
            <div className="space-y-4">
              <label className="block font-black text-foreground text-lg uppercase tracking-wide">5. Kapan momen paling butuh info panduan?</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Awal Semester Baru", "Menjelang UTS/UAS", "Saat ada masalah akademik", "Lainnya"].map(time => (
                  <NeoCheckbox 
                    key={time}
                    checked={crucialTimes.includes(time)}
                    onChange={(checked) => handleCheckbox(setCrucialTimes, time, checked)}
                    label={time}
                  />
                ))}
              </div>
            </div>

            {/* Q6 */}
            <div className="space-y-4">
              <label className="block font-black text-foreground text-lg uppercase tracking-wide">6. Fitur apa yang paling kamu harapkan ada?</label>
              <div className="grid grid-cols-1 gap-4">
                {[
                  "Jadwal Kuliah Personal", 
                  "Reminder Deadline Tugas/Ujian Otomatis", 
                  "Panduan KRS Step-by-step", 
                  "Peta Lokasi Ruangan Kampus", 
                  "FAQ Administrasi & Pembayaran", 
                  "Chatbot Tanya Jawab Cepat", 
                  "Direktori Kontak Penting (Dosen/Biro)", 
                  "Info UKM & Organisasi"
                ].map(feature => (
                  <NeoCheckbox 
                    key={feature}
                    checked={neededFeatures.includes(feature)}
                    onChange={(checked) => handleCheckbox(setNeededFeatures, feature, checked)}
                    label={feature}
                  />
                ))}
              </div>
            </div>

            {/* Q7 */}
            <div className="space-y-4">
              <label className="block font-black text-foreground text-lg uppercase tracking-wide">7. Seberapa penting infonya terpersonalisasi? <span className="text-red-500">*</span></label>
              <p className="text-muted-foreground font-bold text-sm mb-4">1 = Info umum saja cukup, 5 = Harus spesifik jurusan saya</p>
              <NeoRating value={personalizationImportance} onChange={setPersonalizationImportance} />
            </div>

            {/* Q8 */}
            <div className="space-y-4">
              <label className="block font-black text-foreground text-lg uppercase tracking-wide">8. Format konten favorit untuk membaca panduan?</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Teks Singkat (Poin-poin)", "Infografis/Gambar", "Video Tutorial Singkat", "Checklist Interaktif"].map(format => (
                  <NeoCheckbox 
                    key={format}
                    checked={favoriteFormats.includes(format)}
                    onChange={(checked) => handleCheckbox(setFavoriteFormats, format, checked)}
                    label={format}
                  />
                ))}
              </div>
            </div>

            {/* Q9 */}
            <div className="space-y-4">
              <label className="block font-black text-foreground text-lg uppercase tracking-wide">9. Platform mana yang paling nyaman dipakai? <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-1 gap-4">
                {["Website", "Aplikasi Mobile"].map(platform => (
                  <NeoRadio 
                    key={platform}
                    checked={preferredPlatform === platform}
                    onChange={() => setPreferredPlatform(platform)}
                    label={platform}
                  />
                ))}
              </div>
            </div>

            {/* Q10 */}
            <div className="space-y-4">
              <label className="block font-black text-foreground text-lg uppercase tracking-wide">10. Seberapa mungkin kamu akan sering buka platform ini? <span className="text-red-500">*</span></label>
              <p className="text-muted-foreground font-bold text-sm mb-4">1 = Mungkin cuma sekali, 5 = Pasti buka tiap minggu</p>
              <NeoRating value={usageLikelihood} onChange={setUsageLikelihood} />
            </div>

            {/* Q11 */}
            <div className="space-y-4">
              <label className="block font-black text-foreground text-lg uppercase tracking-wide">11. Wishlist 1 fitur utama (Opsional)</label>
              <NeoTextarea 
                placeholder="Kalau boleh minta 1 fitur bebas, kamu mau fitur apa? (Maks. 250 karakter)" 
                value={wishlistFeature}
                onChange={e => setWishlistFeature(e.target.value)}
                maxLength={250}
              />
            </div>

            {/* Q12 */}
            <div className="space-y-4">
              <label className="block font-black text-foreground text-lg uppercase tracking-wide">12. Curhatan / Masukan saat awal cari info (Opsional)</label>
              <NeoTextarea 
                placeholder="Ceritain dong keluh kesahmu pas awal-awal maba nyari info perkuliahan... (Maks. 500 karakter)" 
                value={otherFeedback}
                onChange={e => setOtherFeedback(e.target.value)}
                maxLength={500}
              />
            </div>
            
            <div className="pt-8 border-t-4 border-foreground">
              <Button 
                type="submit" 
                variant="default" 
                className="w-full h-16 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={24} />
                    MENGIRIM JAWABAN...
                  </>
                ) : (
                  "KIRIM JAWABAN KUESIONER"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
