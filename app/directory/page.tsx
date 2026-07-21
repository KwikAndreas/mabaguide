"use client";

import { Building2, Users, MapPin } from "@/components/Icons";
import { motion } from "framer-motion";

export default function DirectoryPage() {
  const categories = [
    {
      title: "Fasilitas Kampus",
      icon: Building2,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      items: [
        { name: "Perpustakaan Pusat", desc: "Lantai 2, Gedung A", loc: "Gedung A" },
        { name: "Pusat Layanan Mahasiswa (Biro)", desc: "Lantai 1, Gedung Utama", loc: "Gedung Utama" },
        { name: "Klinik Kampus", desc: "Lantai Dasar, dekat Kantin", loc: "Area Kantin" },
      ]
    },
    {
      title: "Unit Kegiatan Mahasiswa (UKM)",
      icon: Users,
      color: "text-orange-500",
      bg: "bg-orange-100 dark:bg-orange-900/30",
      items: [
        { name: "BEM Universitas", desc: "Badan Eksekutif Mahasiswa tingkat universitas", loc: "Ruang Ormawa Lt.3" },
        { name: "UKM Olahraga (Basket & Voli)", desc: "Pusat kegiatan olahraga mahasiswa", loc: "Lapangan Terbuka" },
        { name: "Paduan Suara", desc: "UKM Seni dan Tarik Suara", loc: "Ruang Kesenian Lt.4" },
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pb-12 bg-background w-full">
      <div className="w-full max-w-3xl mx-auto flex flex-col flex-1">
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border px-6 py-4">
          <h1 className="text-xl font-bold text-foreground">Direktori Kampus</h1>
          <p className="text-sm text-muted-foreground mt-1">Eksplorasi lingkungan dan ormawa UBM</p>
        </header>

      <main className="flex-1 px-6 py-6 space-y-8">
        {categories.map((category, idx) => (
          <section key={idx}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${category.bg} ${category.color}`}>
                <category.icon size={20} />
              </div>
              <h2 className="text-lg font-bold text-foreground">{category.title}</h2>
            </div>
            
            <div className="space-y-4">
              {category.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + (idx * 0.2) }}
                  className="bg-card border border-border rounded-xl p-4 shadow-sm"
                >
                  <h3 className="font-semibold text-sm text-foreground mb-1">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{item.desc}</p>
                  
                  <div className={`flex items-center gap-1.5 text-[11px] font-medium ${category.color}`}>
                    <MapPin size={12} />
                    {item.loc}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </main>
      </div>
    </div>
  );
}
