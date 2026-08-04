# /src (parent folder)
## app/api
### /articles/route.ts
```ts
import { NextResponse } from "next/server";
import { getAllFAQs } from "@/lib/markdown";

export async function GET() {
  const faqs = getAllFAQs();
  const articles = faqs.map(f => ({
    slug: f.slug,
    title: f.title,
    category: f.category,
    faculty: f.faculty,
    program: f.program
  }));

  return NextResponse.json(articles);
}
```

### /ratings/route.ts
```ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('article_feedback')
      .select('article_slug, rating');

    if (error) throw error;

    const aggregation: Record<string, { total: number; count: number }> = {};
    
    data.forEach((row) => {
      if (!aggregation[row.article_slug]) {
        aggregation[row.article_slug] = { total: 0, count: 0 };
      }
      aggregation[row.article_slug].total += row.rating;
      aggregation[row.article_slug].count += 1;
    });

    const result: Record<string, number> = {};
    for (const slug in aggregation) {
      result[slug] = aggregation[slug].total / aggregation[slug].count;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching ratings", error);
    return NextResponse.json({}, { status: 500 });
  }
}
```

### /search/route.ts
```ts
import { NextResponse } from "next/server";
import { getAllFAQs } from "@/lib/markdown";
import { getDirectoryItems } from "@/lib/data/directory";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  const allFAQs = getAllFAQs();
  const allDirectory = getDirectoryItems();

  if (!q) {
    return NextResponse.json([]);
  }

  const query = q.toLowerCase();
  
  const faqResults = allFAQs.filter(
    (faq) =>
      faq.title.toLowerCase().includes(query) ||
      faq.category.toLowerCase().includes(query) ||
      faq.content.toLowerCase().includes(query)
  );

  const dirResults = allDirectory.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
  );

  const searchResults = [
    ...faqResults.map(faq => ({
      type: 'faq',
      slug: faq.slug,
      title: faq.title,
      category: faq.category,
    })),
    ...dirResults.map(item => ({
      type: 'directory',
      slug: item.id,
      title: item.name,
      category: item.category,
    }))
  ];

  return NextResponse.json(searchResults);
}
```

## app/directory
app/directory/page.tsx
```tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { directoryData } from "@/lib/data/directory";
import { ChevronLeft, Search, Building, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DirectoryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Fasilitas Kampus");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = directoryData.filter(item => {
    const matchesCategory = item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background w-full pb-10">
      
      {/* App Bar */}
      <div className="sticky top-0 z-40 w-full px-6 pt-6 pb-4 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <header className="w-full max-w-4xl mx-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors group">
              <div className="p-1.5 -ml-1.5 rounded-full group-hover:bg-muted/50 transition-colors">
                <ChevronLeft size={20} />
              </div>
              <span className="font-semibold text-sm ml-1">Beranda</span>
            </Link>
            <div className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
              Direktori
            </div>
          </div>
          
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight mt-1">
            Eksplorasi Kampus
          </h1>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <input 
              type="text"
              placeholder="Cari fasilitas atau UKM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full h-12 pl-12 pr-4 bg-card border border-border text-foreground font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm placeholder:text-muted-foreground shadow-sm transition-all"
            />
          </div>
        </header>
      </div>

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-6">
        
        {/* Categories Tab */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveCategory("Fasilitas Kampus")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
              activeCategory === "Fasilitas Kampus" 
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                : "bg-card border border-border/50 text-muted-foreground hover:bg-muted/50"
            }`}
          >
            <Building size={16} /> Fasilitas Kampus
          </button>
          
          <button
            onClick={() => setActiveCategory("Unit Kegiatan Mahasiswa (UKM)")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
              activeCategory === "Unit Kegiatan Mahasiswa (UKM)" 
                ? "bg-secondary text-secondary-foreground shadow-md shadow-secondary/20" 
                : "bg-card border border-border/50 text-muted-foreground hover:bg-muted/50"
            }`}
          >
            <Users size={16} /> UKM
          </button>

          <button
            onClick={() => setActiveCategory("Unit Kegiatan Rohani (UKR)")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
              activeCategory === "Unit Kegiatan Rohani (UKR)" 
                ? "bg-accent text-accent-foreground shadow-md shadow-accent/20 border border-border/50" 
                : "bg-card border border-border/50 text-muted-foreground hover:bg-muted/50"
            }`}
          >
            <Users size={16} /> UKR
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={item.id}
                >
                  <Link href={`/directory/${item.id}`} className="block h-full">
                    <div className="h-full bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-primary/30 transition-all group flex flex-col">
                      <div className="h-32 bg-muted relative overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                            <Building size={32} />
                          </div>
                        )}
                        {/* Optional badge */}
                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-sm">
                          {item.category.includes("UKM") ? "UKM" : item.category.includes("UKR") ? "UKR" : "FASILITAS"}
                        </div>
                      </div>
                      
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors leading-tight">{item.name}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
                          {item.description}
                        </p>
                        <div className="flex items-center text-xs font-semibold text-primary">
                          <span>Lihat Detail</span>
                          <ChevronLeft size={14} className="rotate-180 ml-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="col-span-1 sm:col-span-2 text-center py-16 bg-card border border-border/50 border-dashed rounded-2xl"
              >
                <p className="text-muted-foreground font-medium">Pencarian tidak ditemukan.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
```

app/directory/[id]/page.tsx
```tsx
import { notFound } from "next/navigation";
import { directoryData } from "@/lib/data/directory";
import Link from "next/link";
import { ChevronLeft, MapPin, Building, Users } from "lucide-react";

export default async function DirectoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const item = directoryData.find(d => d.id === resolvedParams.id);

  if (!item) {
    notFound();
  }

  const hasValidLocations = item.locations && item.locations.length > 0 && !item.locations.includes("TBA");

  return (
    <div className="flex flex-col min-h-screen bg-background w-full pb-10">
      {/* App Bar */}
      <div className="sticky top-0 z-40 w-full px-6 pt-6 pb-4 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <header className="w-full max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/directory" className="flex items-center text-muted-foreground hover:text-foreground transition-colors group">
            <div className="p-1.5 -ml-1.5 rounded-full group-hover:bg-muted/50 transition-colors">
              <ChevronLeft size={20} />
            </div>
            <span className="font-semibold text-sm ml-1">Kembali</span>
          </Link>
          <div className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
            {item.category.includes("UKM") ? "UKM" : item.category.includes("UKR") ? "UKR" : "Fasilitas"}
          </div>
        </header>
      </div>

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-6">
        
        {/* Hero Section */}
        <div className="bg-card border border-border/50 rounded-3xl overflow-hidden mb-8 shadow-sm relative">
          <div className="h-48 sm:h-64 md:h-80 bg-muted relative border-b border-border/50">
            {item.image ? (
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/30">
                <Building size={48} className="mb-2" />
                <span className="text-sm font-medium">Tidak ada foto</span>
              </div>
            )}
          </div>
          
          {item.logo && (
            <div className="absolute top-36 sm:top-52 left-6 sm:left-8 w-20 h-20 sm:w-24 sm:h-24 bg-card rounded-2xl border border-border/50 shadow-sm z-20 overflow-hidden flex items-center justify-center p-2">
              <img src={item.logo} alt={`Logo ${item.name}`} className="w-full h-full object-contain" />
            </div>
          )}

          <div className={`p-6 sm:p-8 ${item.logo ? 'pt-14 sm:pt-16' : ''}`}>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 tracking-tight leading-tight">
              {item.name}
            </h1>
            
            {/* Metadata Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-xl text-sm font-medium text-muted-foreground">
                <MapPin size={16} /> {item.locations?.[0] || "TBA"}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-xl text-sm font-medium">
                {item.category.includes("Fasilitas") ? <Building size={16} /> : <Users size={16} />}
                {item.category}
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground">
              <p className="text-base sm:text-lg leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-foreground mb-4 border-b border-border/50 pb-2">Informasi</h2>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">Status</h4>
                <p className="text-muted-foreground text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span> Aktif
                </p>
              </div>
              {hasValidLocations && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">Lokasi Kampus</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.locations?.map((loc, i) => (
                      <span key={i} className="text-xs font-semibold px-2 py-1 bg-muted rounded-md text-muted-foreground">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-foreground mb-4 border-b border-border/50 pb-2">Akses Cepat</h2>
            <div className="flex flex-col gap-3">
              <button className="w-full py-3 px-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors flex justify-center items-center gap-2 shadow-sm">
                Lihat Panduan Terkait
              </button>
              {item.category.includes("UKM") && (
                <button className="w-full py-3 px-4 bg-card border border-border/50 text-foreground font-semibold rounded-xl hover:bg-muted transition-colors flex justify-center items-center gap-2">
                  Kunjungi Website Unit
                </button>
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
```

## app/faq/[...slug]/
page.tsx
```tsx
import { notFound } from "next/navigation";
import { getFAQBySlug } from "@/lib/markdown";
import Link from "next/link";
import { ChevronLeft, CalendarDays, Share2, Tag } from "lucide-react";
import RatingWidget from "./RatingWidget";
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';

const components = {};

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join('/');
  const faq = getFAQBySlug(slugPath);

  if (!faq) return { title: 'Not Found' };

  return {
    title: `${faq.title} | Maba Guide UBM`,
    description: `Panduan mengenai ${faq.title} untuk mahasiswa UBM.`,
  };
}

export default async function FAQDetailPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join('/');
  const faq = getFAQBySlug(slugPath);

  if (!faq) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background w-full pb-16">
      {/* Dynamic Top Appbar */}
      <div className="sticky top-0 z-40 w-full px-6 pt-6 pb-4 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <header className="w-full max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors group">
            <div className="p-1.5 -ml-1.5 rounded-full group-hover:bg-muted/50 transition-colors">
              <ChevronLeft size={20} />
            </div>
            <span className="font-semibold text-sm ml-1">Kembali</span>
          </Link>
          <div className="flex gap-2">
            <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </header>
      </div>

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 pt-10">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full">
              {faq.category}
            </span>
            {faq.faculty && faq.faculty !== "General" && (
              <span className="text-[11px] font-bold uppercase tracking-widest bg-orange-500/10 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full">
                {faq.faculty}
              </span>
            )}
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 leading-[1.15] tracking-tight">
            {faq.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground border-t border-b border-border/50 py-4">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} />
              <span>Panduan Terkini</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-border"></div>
            <div className="flex items-center gap-2">
              <Tag size={16} />
              <span>{faq.program}</span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-slate dark:prose-invert prose-lg max-w-none text-foreground mb-16 prose-headings:text-foreground prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80">
          <MDXRemote source={faq.content} components={components} />
        </article>

        {/* Rating Section */}
        <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm max-w-xl mx-auto text-center">
          <h3 className="text-lg font-bold text-foreground mb-2">Apakah panduan ini membantu?</h3>
          <p className="text-sm text-muted-foreground mb-6">Penilaian Anda membantu kami meningkatkan kualitas konten panduan Maba Guide UBM.</p>
          <RatingWidget articleSlug={slugPath} />
        </div>
      </main>
    </div>
  );
}
```

RatingWidget.tsx
```tsx
"use client";
import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export default function RatingWidget({ articleSlug }: { articleSlug: string }) {
  const [rating, setRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const hasRated = localStorage.getItem(`mabaguide_rated_${articleSlug}`);
    if (hasRated) {
      setSubmitted(true);
    }
    setIsInitializing(false);
  }, [articleSlug]);

  const handleRate = async (value: number) => {
    if (submitted || isSubmitting) return;
    
    setRating(value);
    setIsSubmitting(true);

    try {
      const dbRating = value === 1 ? 5 : 1; 

      const { error } = await supabase
        .from('article_feedback')
        .insert([{ article_slug: articleSlug, rating: dbRating }]);

      if (!error) {
        localStorage.setItem(`mabaguide_rated_${articleSlug}`, 'true');
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Error submitting feedback', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isInitializing) {
    return <div className="h-32 bg-muted/30 rounded-3xl animate-pulse"></div>;
  }

  return (
    <div className="w-full bg-card/80 backdrop-blur-md border border-border/50 shadow-sm rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="rating-form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex flex-col items-center"
          >
            <h3 className="font-bold text-lg sm:text-xl text-foreground mb-1">Gimana panduan ini, bantu nggak?</h3>
            <p className="text-sm text-muted-foreground mb-6">Pilih salah satu ya, masukanmu berharga banget!</p>
            
            <div className="flex justify-center gap-4 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRate(1)}
                disabled={isSubmitting}
                className={clsx(
                  "group relative flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 sm:py-4 rounded-full border transition-all duration-300 font-semibold",
                  rating === 1 
                    ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/25" 
                    : "bg-background text-foreground border-border/50 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-500/5 disabled:opacity-50"
                )}
                aria-label="Sangat Membantu"
              >
                <ThumbsUp size={18} className={clsx("transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-12", rating === 1 && "fill-current")} />
                <span>Ngebantu!</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRate(0)}
                disabled={isSubmitting}
                className={clsx(
                  "group relative flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 sm:py-4 rounded-full border transition-all duration-300 font-semibold",
                  rating === 0 
                    ? "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/25" 
                    : "bg-background text-foreground border-border/50 hover:border-rose-500 hover:text-rose-500 hover:bg-rose-500/5 disabled:opacity-50"
                )}
                aria-label="Kurang Membantu"
              >
                <ThumbsDown size={18} className={clsx("transition-transform duration-300 group-hover:translate-y-1 group-hover:-rotate-12", rating === 0 && "fill-current")} />
                <span>Kurang</span>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="flex flex-col items-center py-2"
          >
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-500/25">
              <Sparkles size={28} />
            </div>
            <p className="text-foreground font-extrabold text-xl mb-1">Yay, makasih ya!</p>
            <p className="text-sm text-muted-foreground">Umpan balik kamu udah kita catat.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

## app/kamus/page.tsx
```tsx
import { getAllFAQs } from "@/lib/markdown";
import Link from "next/link";
import { ChevronLeft, Search, BookOpen } from "lucide-react";

export default function KamusAkademikPage() {
  const faqs = getAllFAQs();
  const kamusItems = faqs
    .filter(faq => faq.category.toLowerCase().includes("akademik"))
    .sort((a, b) => a.title.localeCompare(b.title));
  const groupedItems = kamusItems.reduce((acc, item) => {
    const firstLetter = item.title.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {} as Record<string, typeof kamusItems>);
  const letters = Object.keys(groupedItems).sort();
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* App Bar */}
      <div className="sticky top-0 z-40 w-full px-6 pt-6 pb-4 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <header className="w-full max-w-4xl mx-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors group">
              <div className="p-1.5 -ml-1.5 rounded-full group-hover:bg-muted/50 transition-colors">
                <ChevronLeft size={20} />
              </div>
              <span className="font-semibold text-sm ml-1">Beranda</span>
            </Link>
            <div className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
              Glosarium
            </div>
          </div>
          
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight mt-1 flex items-center gap-3">
            <BookOpen size={32} className="text-primary" /> Kamus Akademik
          </h1>
          <p className="font-medium text-muted-foreground text-sm">
            Daftar lengkap istilah dan jargon kampus untuk membantu adaptasi Anda.
          </p>
        </header>
      </div>

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-8">
        
        {/* Dictionary Grid */}
        <div className="space-y-12">
          {letters.length === 0 ? (
            <div className="text-center py-20 bg-card border border-border/50 border-dashed rounded-2xl">
              <p className="font-medium text-muted-foreground">Belum ada istilah dalam kamus.</p>
            </div>
          ) : (
            letters.map((letter) => (
              <section key={letter} className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-4xl font-extrabold text-primary">{letter}</h2>
                  <div className="h-px flex-1 bg-border mt-3"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupedItems[letter].map((item) => (
                    <Link key={item.slug} href={`/faq/${item.slug}`}>
                      <div className="group bg-card border border-border/50 rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all flex items-center justify-between h-full shadow-sm">
                        <div className="flex-1 pr-4">
                          <h3 className="font-bold text-foreground text-lg mb-1 group-hover:text-primary transition-colors leading-tight">
                            {item.title}
                          </h3>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                          <ChevronLeft size={20} className="rotate-180 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
```

## app/onboarding/page.tsx
```tsx
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
```

## app/profile/page.tsx
```tsx
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

```

## app/search/page.tsx
```tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search as SearchIcon, ChevronRight, ChevronLeft } from "@/components/Icons";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 500);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
        const data = await res.json();
        setResults(data);

        if (data.length > 0) {
          supabase.from('search_analytics').insert([{ keyword: debouncedQuery.trim().toLowerCase() }]).then();
        }
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  return (
    <div className="flex flex-col min-h-screen pb-12 bg-background w-full">
      <div className="w-full max-w-3xl mx-auto flex flex-col flex-1">
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50 px-6 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/" className="flex items-center justify-center w-10 h-10 bg-card border border-border/50 shadow-sm rounded-full hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors group">
              <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
            </Link>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight m-0">Pencarian</h1>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full h-12 pl-12 pr-4 bg-card border border-border text-foreground font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm placeholder:text-muted-foreground shadow-sm transition-all"
              placeholder="Ketik kata kunci (misal: beasiswa, krs, parkir)..."
              autoFocus
            />
          </div>
        </header>

      <main className="flex-1 px-6 py-6">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-card border border-border/50 h-20 rounded-2xl"></div>
            ))}
          </div>
        ) : query.trim() === "" ? (
          <div className="text-center py-20 bg-card border border-border/50 border-dashed rounded-2xl">
            <SearchIcon size={48} className="mx-auto mb-4 text-muted-foreground/30" />
            <p className="font-medium text-muted-foreground">Mulai ketik untuk mencari panduan atau informasi.</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border/50 border-dashed rounded-2xl">
            <p className="font-medium text-muted-foreground">Tidak ada hasil untuk "<span className="font-bold text-foreground">{query}</span>"</p>
          </div>
        ) : (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground mb-4">Hasil Pencarian ({results.length})</h2>
            {results.map((item, i) => (
              <Link key={i} href={item.type === 'directory' ? `/directory/${item.slug}` : `/faq/${item.slug}`} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-card border border-border/50 rounded-2xl p-4 hover:border-primary/30 transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center justify-between"
                >
                  <div className="flex-1 pr-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-muted px-2 py-0.5 rounded-full text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors mb-2 inline-block">
                      {item.category}
                    </span>
                    <h3 className="font-semibold text-foreground text-base group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                    <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </main>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
```

## app/layout.tsx
```tsx
import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import OnboardingWrapper from "@/components/OnboardingWrapper";
import BottomNavigation from "@/components/BottomNavigation";
import DesktopSidebar from "@/components/DesktopSidebar";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MabaGuide - Innovating Beyond Code",
  description: "Panduan Terpersonalisasi untuk Akselerasi Orientasi Akademik dan Birokrasi Kampus UBM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground pb-16 sm:pb-0 font-sans selection:bg-primary selection:text-white">
        <Providers>
          <OnboardingWrapper>
            <div className="flex min-h-screen w-full relative">
              <DesktopSidebar />
              <main className="flex-1 flex flex-col w-full relative min-h-screen border-l-0 md:border-l-[3px] border-black dark:border-white">
                {children}
              </main>
            </div>
            <BottomNavigation />
          </OnboardingWrapper>
        </Providers>
      </body>
    </html>
  );
}
```

## app/page.tsx
```tsx
"use client";
import { useTopArticles } from "@/hooks/useTopArticles";
import { HomeHeader } from "@/components/home/HomeHeader";
import { QuickMenu } from "@/components/home/QuickMenu";
import { TopArticles } from "@/components/home/TopArticles";

export default function Home() {
  const { faculty, topArticles, isLoading } = useTopArticles();

  return (
    <div className="flex flex-col flex-1 pb-10 overflow-x-hidden bg-background">
      <div className="w-full max-w-5xl mx-auto flex flex-col flex-1">
        <HomeHeader faculty={faculty} />

        <div className="px-6 flex-1 flex flex-col gap-8">
        <QuickMenu />
        <TopArticles 
          faculty={faculty} 
          articles={topArticles} 
          isLoading={isLoading} 
        />
        </div>
      </div>
    </div>
  );
}
```

## app/not-found.tsx
```tsx
"use client";

import Link from "next/link";
import { Compass } from "@/components/Icons";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-[#ededed] font-sans selection:bg-white/20 items-center justify-center p-6 w-full relative">
      <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center text-center">
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full"></div>
          <div className="w-24 h-24 bg-[#0a0a0a] border border-white/[0.08] rounded-2xl flex items-center justify-center relative z-10 shadow-2xl">
            <Compass size={40} className="text-white/60" />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">404</h1>
        <h2 className="text-lg font-semibold text-[#ededed] mb-2">Halaman Tidak Ditemukan</h2>
        <p className="text-sm text-[#a1a1aa] mb-10 max-w-xs mx-auto leading-relaxed">
          Maaf, halaman yang Anda cari mungkin telah dipindahkan atau sudah tidak tersedia.
        </p>
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
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-[10px] font-medium uppercase tracking-widest text-white/30">MabaGuide UBM</p>
      </div>
    </div>
  );
}
```

## app/globals.css
```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@plugin "@tailwindcss/typography";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  
  /* Semantic Category Colors */
  --color-cat-academic: var(--cat-academic);
  --color-cat-bureaucracy: var(--cat-bureaucracy);
  --color-cat-organization: var(--cat-organization);
  --color-cat-dictionary: var(--cat-dictionary);
  
  --font-sans: var(--font-jakarta), ui-sans-serif, system-ui, sans-serif;
  --font-heading: var(--font-space), ui-sans-serif, system-ui;
  
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  /* Neo-Utility Campus Guide (Light Mode: Warm Paper) */
  --background: #FBFBF9; /* Warm Paper */
  --foreground: #1C1917; /* Soft Charcoal */

  /* Semantic UI Colors */
  --primary: #1C1917; /* Charcoal */
  --primary-foreground: #FBFBF9;

  --secondary: #E5E5E5; 
  --secondary-foreground: #1C1917;

  --accent: #F5F5F0; 
  --accent-foreground: #1C1917;

  --muted: #F5F5F0; 
  --muted-foreground: #57534E; /* Stone-500 */

  --border: #E5E5E5; /* Light crisp border */
  
  --card: #FFFFFF;
  --card-foreground: #1C1917;

  --popover: #FFFFFF;
  --popover-foreground: #1C1917;

  /* Category Accents (Solid Pop Colors) */
  --cat-academic: #2563EB; /* Royal Blue */
  --cat-bureaucracy: #EA580C; /* Terracotta */
  --cat-organization: #059669; /* Emerald */
  --cat-dictionary: #D97706; /* Amber */

  --radius: 0.5rem; /* Sharper neo-utility radius */
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Neo-Utility Campus Guide (Dark Mode: Midnight Obsidian) */
    --background: #0A0A0C; /* Deep Obsidian */
    --foreground: #FAFAFA; /* Crisp Off-White */

    /* Semantic UI Colors */
    --primary: #FAFAFA; 
    --primary-foreground: #0A0A0C;

    --secondary: #18181B; 
    --secondary-foreground: #FAFAFA;

    --accent: #18181B; 
    --accent-foreground: #FAFAFA;

    --muted: #18181B; 
    --muted-foreground: #A1A1AA; /* Zinc-400 */

    --border: #27272A; /* Subtle border */
    
    --card: #18181B; /* Solid Dark Surface */
    --card-foreground: #FAFAFA;

    --popover: #18181B;
    --popover-foreground: #FAFAFA;

    /* Category Accents - slightly adjusted for dark mode contrast */
    --cat-academic: #3B82F6; /* Lighter Royal Blue */
    --cat-bureaucracy: #F97316; /* Lighter Terracotta */
    --cat-organization: #10B981; /* Lighter Emerald */
    --cat-dictionary: #F59E0B; /* Lighter Amber */
  }
}

body {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  letter-spacing: -0.02em;
}

@layer base {
  body {
    @apply bg-background text-foreground;
  }
}
```

## components/
### components/ui
HomeHeader.tsx
```tsx
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
            <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full h-12 pl-12 pr-4 bg-card border border-border text-foreground font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm placeholder:text-muted-foreground shadow-sm transition-all"
            placeholder="Cari Organisasi, UKM, atau info..."
          />
        </form>
      </header>
    </div>
  );
}
```

QuickMenu.tsx
```tsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { CompassPremium, PortalPremium, DictionaryPremium } from "@/components/PremiumIcons";

export function QuickMenu() {
  return (
    <section>
      <div className="flex justify-between items-center mb-4 mt-6 px-1">
        <h2 className="text-lg font-bold text-foreground tracking-tight">Menu Utama</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Large Bento Box */}
        <Link href="/directory" className="col-span-2 group">
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden bg-primary p-6 flex flex-row items-center justify-between rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-primary/20 h-full"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="z-10 max-w-[60%]">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-primary-foreground/80 mb-2 block bg-black/10 w-fit px-2 py-0.5 rounded-full">Eksplorasi</span>
              <h3 className="text-xl font-bold text-primary-foreground leading-tight">Direktori<br/>Kampus</h3>
            </div>
            <CompassPremium className="w-20 h-20 z-10 text-primary-foreground drop-shadow-sm group-hover:rotate-12 transition-transform duration-500" />
          </motion.div>
        </Link>

        {/* Small Bento Box 1 */}
        <Link href="/faq/portal" className="group">
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden bg-card p-5 flex flex-col items-start justify-between gap-4 rounded-2xl shadow-sm border border-border hover:border-primary/50 hover:shadow-md transition-all h-full"
          >
            <PortalPremium className="w-12 h-12 text-primary drop-shadow-sm group-hover:scale-110 transition-transform duration-300" />
            <div>
              <h3 className="text-sm font-semibold text-foreground leading-snug">Panduan<br/>Portal</h3>
            </div>
          </motion.div>
        </Link>

        {/* Small Bento Box 2 */}
        <Link href="/kamus" className="group">
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden bg-card p-5 flex flex-col items-start justify-between gap-4 rounded-2xl shadow-sm border border-border hover:border-primary/50 hover:shadow-md transition-all h-full"
          >
            <DictionaryPremium className="w-12 h-12 text-primary drop-shadow-sm group-hover:-rotate-12 transition-transform duration-300" />
            <div>
              <h3 className="text-sm font-semibold text-foreground leading-snug">Kamus<br/>Akademik</h3>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
```

TopArticles.tsx
```tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown, ChevronUp, Star } from "lucide-react";
import { ArticleMetadata } from "@/hooks/useTopArticles";

interface TopArticlesProps {
  faculty: string;
  articles: ArticleMetadata[];
  isLoading: boolean;
}

export function TopArticles({ faculty, articles, isLoading }: TopArticlesProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedArticles = showAll ? articles : articles.slice(0, 3);

  return (
    <section className="mt-6 mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-foreground">
          Top Panduan {faculty ? `(${faculty})` : ''}
        </h2>
      </div>
      
      {/* Article List */}
      <div className="flex flex-col gap-3">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-card border border-border/50 h-24 rounded-2xl" />
            ))}
          </div>
        ) : articles.length > 0 ? (
          <AnimatePresence initial={false}>
            {displayedArticles.map((article) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ opacity: { duration: 0.2 } }}
              >
                <Link href={`/faq/${article.slug}`}>
                  <motion.div 
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    className="group bg-card border border-border/50 rounded-2xl p-4 hover:border-primary/30 transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest bg-muted px-2 py-0.5 rounded-full text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          {article.category}
                        </span>
                        {article.faculty !== "General" && (
                          <span className="text-[10px] font-bold uppercase tracking-widest bg-orange-500/10 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full">
                            {article.faculty}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground text-sm sm:text-base mb-1 group-hover:text-primary transition-colors leading-snug">
                        {article.title}
                      </h3>
                      {article.rating! > 0 && (
                        <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-amber-500 bg-amber-50 dark:bg-amber-500/10 w-fit px-2 py-0.5 rounded-md">
                          <Star size={12} className="fill-amber-500" />
                          {article.rating?.toFixed(1)}
                        </div>
                      )}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                      <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="text-center py-12 bg-card border border-border/50 rounded-2xl">
            <p className="font-medium text-muted-foreground">Belum ada panduan terpopuler.</p>
          </div>
        )}
      </div>

      {articles.length > 3 && (
        <button 
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-4 py-3 text-sm font-semibold text-muted-foreground hover:text-primary bg-card border border-border/50 hover:bg-muted/50 hover:border-primary/20 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
        >
          {showAll ? 'Tampilkan Lebih Sedikit' : `Lihat Semua (${articles.length})`}
          <ChevronDown size={16} className={showAll ? "rotate-180 transition-transform" : "transition-transform"} />
        </button>
      )}
    </section>
  );
}
```

### components/home
Badge.tsx
```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./Button" 

const badgeVariants = cva(
  "inline-flex items-center rounded-md border-2 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-500/80",
        outline: "text-foreground border-foreground",
        academic: "border-transparent bg-cat-academic text-white hover:bg-cat-academic/90 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none",
        bureaucracy: "border-transparent bg-cat-bureaucracy text-white hover:bg-cat-bureaucracy/90 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none",
        organization: "border-transparent bg-cat-organization text-white hover:bg-cat-organization/90 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none",
        dictionary: "border-transparent bg-cat-dictionary text-white hover:bg-cat-dictionary/90 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

```

Button.tsx
```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-[2px] active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-2 border-primary shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] dark:shadow-none dark:border-border dark:hover:bg-primary/90",
        destructive:
          "bg-red-500 text-white border-2 border-red-700 shadow-[3px_3px_0px_0px_rgba(185,28,28,1)] hover:shadow-[1px_1px_0px_0px_rgba(185,28,28,1)] hover:translate-y-[1px] dark:shadow-none dark:hover:bg-red-500/90",
        outline:
          "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.1)] hover:translate-y-[1px] dark:shadow-none dark:border-border",
        secondary:
          "bg-secondary text-secondary-foreground border-2 border-secondary shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] dark:shadow-none dark:border-border dark:hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground active:translate-y-[2px]",
        link: "text-primary underline-offset-4 hover:underline active:translate-y-[1px]",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

PieChart.tsx
```tsx
"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface PieChartProps {
  data: { label: string; value: number }[];
}

const COLORS = ["#3b82f6", "#f43f5e", "#10b981", "#f59e0b", "#8b5cf6"];

export function PieChart({ data }: PieChartProps) {
  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);

  const conicGradientStr = useMemo(() => {
    let currentPercentage = 0;
    return data
      .map((item, index) => {
        const percentage = (item.value / total) * 100;
        const color = COLORS[index % COLORS.length];
        const str = `${color} ${currentPercentage}% ${currentPercentage + percentage}%`;
        currentPercentage += percentage;
        return str;
      })
      .join(", ");
  }, [data, total]);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-8 p-8 bg-card border border-border/50 rounded-3xl shadow-sm my-8">
      {/* Chart */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, rotate: -90 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative w-48 h-48 rounded-full border border-border/50 shadow-sm flex-shrink-0"
        style={{
          background: `conic-gradient(${conicGradientStr})`,
        }}
      >
        {/* Inner circle for donut effect */}
        <div className="absolute inset-0 m-auto w-24 h-24 bg-card rounded-full shadow-sm flex items-center justify-center">
          <span className="text-sm font-bold text-muted-foreground text-center leading-tight">Total<br/><span className="text-foreground text-lg">{total}%</span></span>
        </div>
      </motion.div>

      {/* Legend */}
      <div className="flex flex-col gap-3 flex-1 w-full">
        <h4 className="font-bold text-foreground mb-2 text-lg">Komposisi Nilai</h4>
        {data.map((item, idx) => (
          <div key={item.label} className="flex items-center justify-between p-3 border border-border/50 bg-background/50 rounded-xl hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full shadow-sm" 
                style={{ backgroundColor: COLORS[idx % COLORS.length] }}
              />
              <span className="font-semibold text-foreground text-sm">{item.label}</span>
            </div>
            <span className="font-bold text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### BottomNavigation.tsx
```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, BookOpen, User } from "@/components/Icons";
import clsx from "clsx";
import ThemeToggle from "./ThemeToggle";

export default function BottomNavigation() {
  const pathname = usePathname();
  if (pathname === "/onboarding") return null;

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Cari", href: "/search", icon: Search },
    { name: "Direktori", href: "/directory", icon: BookOpen },
    { name: "Profil", href: "/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t-2 border-foreground px-4 pb-safe pt-2 sm:hidden transition-colors duration-300">
      <div className="flex justify-between items-center max-w-md mx-auto h-14 relative">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex flex-col items-center justify-center w-16 h-12 rounded-lg transition-all duration-200 active:scale-95",
                isActive 
                  ? "bg-foreground text-background shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]" 
                  : "text-foreground hover:bg-muted font-bold"
              )}
            >
              <Icon size={20} strokeWidth={isActive ? 3 : 2.5} />
              <span className="text-[10px] font-bold mt-1 tracking-wide uppercase">{item.name}</span>
            </Link>
          );
        })}
        <div className="absolute -top-16 right-0">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
```

### DesktopSidebar.tsx
```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, BookOpen, User } from "@/components/Icons";
import clsx from "clsx";
import ThemeToggle from "./ThemeToggle";

export default function DesktopSidebar() {
  const pathname = usePathname();

  if (pathname === "/onboarding") return null;

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Cari", href: "/search", icon: Search },
    { name: "Direktori", href: "/directory", icon: BookOpen },
    { name: "Profil", href: "/profile", icon: User },
  ];

  return (
    <aside className="hidden sm:flex flex-col w-64 border-r-2 border-foreground bg-background h-screen sticky top-0 z-40 transition-colors duration-300">
      <div className="p-6 pb-2">
        <h1 className="text-2xl font-black text-foreground tracking-tighter uppercase">Maba<span className="text-cat-bureaucracy">Guide</span></h1>
        <p className="text-xs text-muted-foreground font-bold mt-1 uppercase tracking-widest">Portal Mahasiswa Baru</p>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center gap-4 px-4 py-3 rounded-lg border-2 transition-all duration-200 group active:translate-y-[2px]",
                isActive 
                  ? "bg-foreground text-background border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]" 
                  : "border-transparent text-foreground hover:border-foreground hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] font-bold bg-muted"
              )}
            >
              <Icon size={20} strokeWidth={isActive ? 3 : 2.5} className={clsx(isActive ? "text-background" : "text-foreground")} />
              <span className="text-sm font-bold tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 flex flex-col items-center gap-4 border-t-2 border-foreground">
        <ThemeToggle />
        <div className="w-full bg-muted border-2 border-foreground rounded-lg p-3 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
          <p className="text-xs font-bold text-foreground mb-1 uppercase tracking-wider">MabaGuide v2.0</p>
          <p className="text-[10px] text-muted-foreground font-bold">© 2026 INSPIRE</p>
        </div>
      </div>
    </aside>
  );
}
```

### Icons.tsx
```tsx
import React from 'react';

export const IconBase = ({ children, size = 24, className = '', ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {children}
  </svg>
);

export const Home = (props: any) => (
  <IconBase {...props}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </IconBase>
);

export const Search = (props: any) => (
  <IconBase {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </IconBase>
);

export const BookOpen = (props: any) => (
  <IconBase {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </IconBase>
);

export const User = (props: any) => (
  <IconBase {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </IconBase>
);

export const ChevronRight = (props: any) => (
  <IconBase {...props}>
    <path d="m9 18 6-6-6-6" />
  </IconBase>
);

export const ChevronLeft = (props: any) => (
  <IconBase {...props}>
    <path d="m15 18-6-6 6-6" />
  </IconBase>
);

export const GraduationCap = (props: any) => (
  <IconBase {...props}>
    <path d="M21.42 10.922a2 2 0 0 1-.01 2.833l-7.1 7.104a2 2 0 0 1-2.827.01l-7.112-7.104a2 2 0 0 1-.01-2.833l7.1-7.104a2 2 0 0 1 2.827-.01l7.112 7.104z" />
    <path d="M22 10v6" />
    <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
  </IconBase>
);

export const Compass = (props: any) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </IconBase>
);

export const FileText = (props: any) => (
  <IconBase {...props}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </IconBase>
);

export const Bell = (props: any) => (
  <IconBase {...props}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </IconBase>
);

export const Building2 = (props: any) => (
  <IconBase {...props}>
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
    <path d="M10 6h4" />
    <path d="M10 10h4" />
    <path d="M10 14h4" />
    <path d="M10 18h4" />
  </IconBase>
);

export const Users = (props: any) => (
  <IconBase {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </IconBase>
);

export const MapPin = (props: any) => (
  <IconBase {...props}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </IconBase>
);

export const Star = (props: any) => (
  <IconBase {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </IconBase>
);

export const CheckCircle = (props: any) => (
  <IconBase {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </IconBase>
);

export const WavingHand = (props: any) => (
  <IconBase {...props} strokeWidth="1.5">
    <path d="M18 9.5C18 8.12 16.88 7 15.5 7S13 8.12 13 9.5V14.5C13 14.78 12.78 15 12.5 15S12 14.78 12 14.5V6.5C12 5.12 10.88 4 9.5 4S7 5.12 7 6.5V14.5C7 14.78 6.78 15 6.5 15S6 14.78 6 14.5V8.5C6 7.12 4.88 6 3.5 6S1 7.12 1 8.5V16.5C1 19.5 3.5 22 6.5 22H14.5C18.64 22 22 18.64 22 14.5V9.5C22 8.12 20.88 7 19.5 7S18 8.12 18 9.5Z" />
  </IconBase>
);

export const Globe = (props: any) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </IconBase>
);

export const Phone = (props: any) => (
  <IconBase {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </IconBase>
);
```

### OnboardingWrap.tsx
```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function OnboardingWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkOnboarding = () => {
      const faculty = localStorage.getItem("mabaguide_faculty");
      const program = localStorage.getItem("mabaguide_program");

      if ((!faculty || !program) && pathname !== "/onboarding") {
        router.replace("/onboarding");
      } else {
        setIsChecking(false);
      }
    };

    checkOnboarding();
  }, [pathname, router]);

  if (isChecking && pathname !== "/onboarding") {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>;
  }
  return <>{children}</>;
}
```

### PremiumIcons.tsx
```tsx
import React from 'react';

export const CompassPremium = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="40" fill="url(#compass_grad)" fillOpacity="0.2"/>
    <circle cx="50" cy="50" r="30" fill="white" className="dark:fill-slate-800" style={{ filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.1))' }}/>
    <path d="M48 25L52 25L60 40L75 48L75 52L60 60L52 75H48L40 60L25 52V48L40 40L48 25Z" fill="url(#compass_grad)"/>
    <circle cx="50" cy="50" r="5" fill="#fff" />
    <defs>
      <linearGradient id="compass_grad" x1="25" y1="25" x2="75" y2="75" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6"/>
        <stop offset="1" stopColor="#8B5CF6"/>
      </linearGradient>
    </defs>
  </svg>
);

export const PortalPremium = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="20" y="15" width="60" height="70" rx="12" fill="url(#portal_grad)" fillOpacity="0.2"/>
    <rect x="30" y="30" width="40" height="40" rx="8" fill="white" className="dark:fill-slate-800" />
    <path d="M38 45H62" stroke="url(#portal_grad)" strokeWidth="4" strokeLinecap="round"/>
    <path d="M38 55H50" stroke="url(#portal_grad)" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="70" cy="25" r="8" fill="#F97316"/>
    <defs>
      <linearGradient id="portal_grad" x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F97316"/>
        <stop offset="1" stopColor="#F59E0B"/>
      </linearGradient>
    </defs>
  </svg>
);

export const DictionaryPremium = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20 25C20 20 24 15 30 15H50V85H30C24 85 20 80 20 75V25Z" fill="url(#dict_grad1)"/>
    <path d="M80 25C80 20 76 15 70 15H50V85H70C76 85 80 80 80 75V25Z" fill="url(#dict_grad2)" fillOpacity="0.8"/>
    <rect x="60" y="30" width="10" height="4" rx="2" fill="white"/>
    <rect x="60" y="40" width="10" height="4" rx="2" fill="white"/>
    <defs>
      <linearGradient id="dict_grad1" x1="20" y1="15" x2="50" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981"/>
        <stop offset="1" stopColor="#059669"/>
      </linearGradient>
      <linearGradient id="dict_grad2" x1="50" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399"/>
        <stop offset="1" stopColor="#10B981"/>
      </linearGradient>
    </defs>
  </svg>
);
```

### Providers.tsx
```tsx
"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
```

### ThemeToggle.tsx
```tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="outline" size="icon" disabled className="opacity-50" />;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title="Toggle Theme"
      className="rounded-full border-foreground bg-background hover:bg-muted"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-cat-dictionary" />
      ) : (
        <Moon className="h-5 w-5 text-cat-academic" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
```

## hooks/
### useDebounce.ts
```ts
import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

### useTopArticles.ts
```ts
import { useState, useEffect } from "react";

export interface ArticleMetadata {
  slug: string;
  title: string;
  category: string;
  faculty: string;
  program: string;
  rating?: number;
}

export function useTopArticles() {
  const [faculty, setFaculty] = useState("");
  const [program, setProgram] = useState("");
  const [topArticles, setTopArticles] = useState<ArticleMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Read user's scope from local storage
    const storedFaculty = localStorage.getItem("mabaguide_faculty");
    const storedProgram = localStorage.getItem("mabaguide_program");
    
    if (storedFaculty) setFaculty(storedFaculty);
    if (storedProgram) setProgram(storedProgram);

    const loadData = async () => {
      try {
        const [articlesRes, ratingsRes] = await Promise.all([
          fetch("/api/articles"),
          fetch("/api/ratings")
        ]);
        
        const articles: ArticleMetadata[] = await articlesRes.json();
        const ratings: Record<string, number> = await ratingsRes.json();

        const filteredAndRated = articles
          .filter(a => 
            (a.faculty === "General" || a.faculty === storedFaculty) &&
            (a.program === "General" || a.program === storedProgram)
          )
          .map(a => ({
            ...a,
            rating: ratings[a.slug] || 0
          }))
          .sort((a, b) => b.rating! - a.rating!)
          .slice(0, 10);

        setTopArticles(filteredAndRated);
      } catch (err) {
        console.error("Failed to load top articles", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { faculty, program, topArticles, isLoading };
}
```

## lib/
### lib/data/directory.ts
```ts
export interface DirectoryItem {
  id: string;
  name: string;
  category: "Fasilitas Kampus" | "Unit Kegiatan Mahasiswa (UKM)" | "Unit Kegiatan Rohani (UKR)";
  description: string;
  locations: string[];
  image?: string;
  logo?: string;
  socialMedia?: string;
  contactPerson?: string;
}

export const directoryData: DirectoryItem[] = [
  // Fasilitas Kampus
  {
    id: "perpustakaan",
    name: "Perpustakaan",
    category: "Fasilitas Kampus",
    description: "Perpustakaan pusat UBM menyediakan ribuan referensi buku cetak, e-book, jurnal internasional, dan area diskusi yang nyaman untuk belajar bersama.",
    locations: ["Lantai 2, Gedung A"],
    image: "/fasilitas/perpus.webp",
  },
  {
    id: "lab-komputer",
    name: "Lab Komputer",
    category: "Fasilitas Kampus",
    description: "Laboratorium komputer dengan spesifikasi tinggi yang mendukung kegiatan praktikum mahasiswa, seperti pemrograman, desain grafis, dan pemrosesan data.",
    locations: [
      "Lab A-D - Lantai 4",
    ],
    image: "/fasilitas/lab_jarkom.webp",
  },
  {
    id: "kitchen",
    name: "Kitchen",
    category: "Fasilitas Kampus",
    description: "Kitchen hospar untuk kegiatan praktikum mahasiswa hospitaliti dan pariwisata",
    locations: [
      "Lantai 2",
    ],
    image: "/fasilitas/kitchen.webp",
  },
  {
    id: "plaza",
    name: "UBM Plaza (TUPA)",
    category: "Fasilitas Kampus",
    description: "UBM Plaza menyediakan fasilitas yang lengkap untuk kebutuhan mahasiswa, ATM, dan area istirahat.",
    locations: [
      "Lantai 1",
    ],
    image: "/fasilitas/plaza.webp",
  },
  {
    id: "tuh",
    name: "The UBM Hall (TUH)",
    category: "Fasilitas Kampus",
    description: "The UBM Hall (TUH) ",
    locations: [
      "Lantai 8",
    ],
    image: "/fasilitas/tuh.webp",
  },
  {
    id: "tuga",
    name: "The UBM Grand Auditorium (TUGA)",
    category: "Fasilitas Kampus",
    description: "The UBM Hall (TUH) ",
    locations: [
      "Lantai 8",
    ],
    image: "/fasilitas/tuga.webp",
  },
  // {
  //   id: "klinik-icare",
  //   name: "Klinik ICare",
  //   category: "Fasilitas Kampus",
  //   description: "Klinik kesehatan yang melayani pertolongan pertama pada kecelakaan (P3K) dan pemeriksaan kesehatan dasar secara gratis bagi sivitas akademika.",
  //   locations: ["Lantai 3, dekat TURLA"],
  //   image: "/fasilitas/klinik.webp",
  // },
  
  // Unit Kegiatan Mahasiswa (UKM)
  {
    id: "muay-thai",
    name: "Muay Thai",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "UKM Muay Thai, merupakan salah satu UKM bela diri yang ada di Universitas Bunda Mulia yang mempelajari gerakan bela diri dari Thailand sebagai Self Defense. Sejarah singkatnya, Muay Thai atau dikenal dengan istilah Thai Boxing sudah lama dipraktikan di seluruh daratan Asia Tenggara. Berdasarkan praktisi Muay Thai mengklaim bahwa Muay Thai sudah ada selama dua ribu tahun dan merupakan kombinasi gerakan bela diri Cina dan India. ",
    locations: ["Lantai 8 depan TUGA"],
    socialMedia: "https://www.instagram.com/ubm_muaythai/",
    contactPerson: "",
    image: "/ukm/muaythai.webp",
  },
  {
    id: "tartra",
    name: "Tartra",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "Bidang kemahasiswaan UBM memfasilitasi minat dan bakat mahasiswa di bidang seni secara khusus dalam bidang Tari Tradisional, melalui Unit Kegiatan Mahasiswa (UKM) Tartra. Dalam UKM ini, mahasiswa mengembangkan minatnya di bidang tari melalui sejumlah kegiatan, seperti Pelatihan rutin dan kompetisi. Kegiatan latihan dilaksanakan secara rutin setiap hari Sabtu.",
    locations: ["Lantai 8 Music and Dance Room"],
    socialMedia: "https://www.instagram.com/ubm_tartra_ancol/",
    contactPerson: "",
    image: "/ukm/tartra.webp",
  },
  {
    id: "prodcine",
    name: "Prodcine",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "Unit Kegiatan Mahasiswa (UKM) Production and Cinematography adalah unit kegiatan mahasiswa  yang bergerak dibidang Cinematography. Unit kegiatan mahasiswa ini dibentuk untuk mewadahi minat dan potensi para mahasiswa Universitas dalam bidang produksi dan sinematografi. ",
    locations: ["Ruang Kesenian Lt. 4"],
    socialMedia: "https://www.instagram.com/ubm_prodcine/",
    contactPerson: "LINE: @608adykp",
    image: "/ukm/prodcine.webp",
  },
  {
    id: "the-vou",
    name: "The VOU",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "The Voice of UBM atau biasa disebut dengan The VOU, merupakan unit kegiatan mahasiswa dibidang musik dan tarik suara. Sampai tahun ini, anggota The VOU sudah memiliki delapan generasi. Di The Vou terdapat beberapa kategori yaitu Vocal, Band, Vocal Group, dan Choir. Untuk mengasah kemampuan para anggotanya, The Vou memiliki pelatih dan mentor disetiap kategorinya. Kegiatan yang dilakukan oleh The Vou seperti: latihan rutin, monthly performance, vtc, big event, mengisi acara di kegiatan seminar atau cafe-cafe, dan berbagai kegiatan menarik lainnya. Bukan sekedar UKM untuk mengasah kemampuan dibidang musik, tapi The Vou juga menjadi tempat untuk belajar berorganisasi.",
    locations: ["Lantai 8 Music and Dance Room"],
    socialMedia: "https://www.instagram.com/ubm_vou_ancol/",
    contactPerson: "",
    image: "/ukm/the_vou.webp",
  },
  {
    id: "esport",
    name: "ESport",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "UKM Esport Universitas Bunda Mulia adalah Unit Kegiatan Mahasiswa yang secara khusus bergerak dalam Olahraga Esport dan Manajemen Esport sejak 2019 dan resmi menjadi Unit Kegiatan Mahasiswa sejak 2022. Membina seluruh mahasiswa Universitas Bunda Mulia dalam cabang kompetisi seperti DOTA 2 , Mobile Legend, Valorant, PUBG dll.",
    locations: ["TBA"],
    socialMedia: "https://www.instagram.com/ubm_esports/",
    contactPerson: "",
    image: "/ukm/esport.webp",
  },
  {
    id: "badminton",
    name: "Badminton",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "Dalam rangka memfasilitasi minat dan mengembangkan talenta mahasiswa dalam olahraga badminton, Universitas Bunda Mulia memberikan kesempatan kepada mahasiswa untuk mengembangkan diri melalui Unit Kegiatan Mahasiswa (UKM) badminton. Hingga saat ini, UKM Badminton telah berhasil mendapatkan prestasi yang membanggakan, salah satunya adalah Juara untuk Ganda Campuran dan Tunggal Putra di DV Badminton 2018-2019. Pelatihan UKM ini secara rutin diadakan di lapangan bulu tangkis Universitas Bunda Mulia kampus Ancol setiap hari Senin dan Kamis, tepatnya pukul 17:00 hingga pukul 19:00.",
    locations: ["Lantai 8, The UBM Sports Arena"],
    socialMedia: "https://www.instagram.com/ubm_bmbc/",
    contactPerson: "",
    image: "/ukm/badminton.webp",
  },
  {
    id: "talent",
    name: "Talent",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "Dalam upaya pengembangan di bidang non-akademik, Bidang Kemahasiswaan UBM memberi wadah dalam memfasilitasi mahasiswa untuk mengembangkan bakat dan keterampilan yang dimiliki. Sehingga nantinya dapat memberi dampak pada kualitas akademik mahasiswa. ",
    locations: ["TBA"],
    socialMedia: "https://www.instagram.com/ubm_mcu_ancol/",
    contactPerson: "",
    image: "/ukm/talent.webp",
  },
  {
    id: "taekwondo",
    name: "Taekwondo",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "TaeKwonDo adalah seni bela diri asal Korea yang juga merupakan olahraga nasional Korea dan merupakan salah satu seni beladiri populer di dunia yang dipertandingkan dalam Olimpiade. Dalam seni bela diri ini juga terdapat beragam sebutan dalam bahasa asing yaitu bahasa Korea seperti Dojang yang merupakan istilah yang digunakan dalam seni bela diri Korea (Taekwondo, Tang Soo Do, Kuk Sool Won, dan hapkido) dan mengacu pada ruang pelatihan formal / unit pelatihan / klub. Selain Dojang sebutan yang wajib diketahui oleh para TaeKwonDoIn (TaeKwonDo Indonesia) ialah Sabeum Nim di singkat SaNim (Kepala Instruktur/Pelatih), Sabeum (Instruktur/Pelatih), Gashuku (Ujian Kenaikan Sabuk), Geup (tingkatan/level sabuk, tiap warna dan strip memiliki tingkatan yang berbeda), dan teknik – teknik yang ada di dalam TaeKwonDo itu sendiri. ",
    locations: ["Lantai 8 depan TUGA"],
    socialMedia: "https://www.instagram.com/ubm_taekwondo/",
    contactPerson: "",
    image: "/ukm/taekwondo.webp",
  },
  {
    id: "icare",
    name: "iCare",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "iCare merupakan organisasi non-profit yang berada di bawah naungan Universitas Bunda Mulia yang sudah berdiri sejak 23 Juli 2007. iCare bergerak dengan tiga pilar dasar yakni Sosial, Lingkungan dan Kesehatan. ",
    locations: ["TBA"],
    socialMedia: "https://www.instagram.com/ubm_icare_ancol/",
    contactPerson: "",
    image: "",
  },
  {
    id: "futsal",
    name: "Futsal",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "Unit Kegiatan Mahasiswa Futsal ini merupakan salah satu kegiatan non-akademik yang dapat dijalani oleh mahasiswa. Karena banyaknya minat mahasiswa di bidang olahraga seperti futsal maka Kemahasiswaan UBM juga memfasilitasi minat mahasiswa dibidang ini melalui Unit Kegiatan Mahasiswa Futsal (UKM Futsal). Pada latihan futsal kita bukan hanya belajar bagaimana tekniknya saja, di UKM ini kita juga belajar kekeluargaan. ",
    locations: ["Lapangan Futsal UBM Ancol"],
    socialMedia: "https://www.instagram.com/ubm_futsal_ancol/",
    contactPerson: "",
    image: "/ukm/futsal.webp",
  },
  {
    id: "wushu",
    name: "Wushu",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "Wushu berasal dari dua kata yaitu “Wu” artinya ilmu perang sedangkan kata “Shu” artinya seni. Jadi dapat diartikan wushu adalah seni untuk berperang. Yang mana didalamnya mengandung aspek seni, olahraga, kesehatan, beladiri dan juga mental.",
    locations: ["TBA"],
    socialMedia: "https://www.instagram.com/ubm_wushu/",
    contactPerson: "",
    image: "/ukm/wushu.webp",
  },
  {
    id: "biefindc",
    name: "Biefindc (Dance)",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "BIEFINDC atau Biemers Fusion in Dance Community merupakan unit kegiatan mahasiswa yang  bergerak dalam bidang seni tari modern. BIEFINDC membantu para mahasiswa mengembangkan bakat menari dengan memberikan pengalaman baru, membangun leadership dan kerjasama tim, dan mengikuti perlombaan.",
    locations: ["Lantai 8 Music and Dance Room"],
    socialMedia: "https://www.instagram.com/ubm_biefindc_ancol/",
    contactPerson: "",
    image: "/ukm/dance.webp",
  },
  {
    id: "teater",
    name: "Teater",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "Berawal dari kemauan para biemers untuk terus mengembangkan kemampuan mereka dalam bidang seni akting dan teatrikal, Biems Theater UBM hadir untuk membantu mereka mengepakkan sayapnya  menjadi lebih tinggi lagi. Biems Theater UBM merupakan suatu Unit Kegiatan Mahasiswa yang berfokus kepada seni Teater dimana merupakan jenis kesenian pertunjukkan drama yang dipentaskan di sebuah panggung.",
    locations: ["TBA"],
    socialMedia: "https://www.instagram.com/ubm_biemstheater_ancol/",
    contactPerson: "",
    image: "/ukm/teater.webp",
  },
  {
    id: "basket",
    name: "Basket",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "Universitas Bunda Mulia memfasilitasi mahasiswa di bidang olahraga basket melalui UKM Basketball.  UKM Basketball memiliki kegiatan seperti latihan rutin dan kompetisi yang bisa diikuti oleh  mahasiswa UBM. Salah satu prestasi yang pernah di raih adalah Tim Basket UBM pernah menjadi  juara di Liga Basket Mahasiswa (LIBAMA).",
    locations: ["Lapangan Basket UBM Ancol"],
    socialMedia: "https://www.instagram.com/ubm_basketball_ancol/",
    contactPerson: "",
    image: "/ukm/basket.webp",
  },

  // Unit Kegiatan Rohani
  // Template dibawah
  // {
  //   id: "",
  //   name: "",
  //   category: "Unit Kegiatan Rohani (UKR)",
  //   description: "",
  //   locations: [""],
  //   socialMedia: "",
  //   contactPerson: "",
  //   image: "",
  // },
  {
    id: "budha",
    name: "Keluarga Mahasiswa Buddhis (KMB)",
    category: "Unit Kegiatan Rohani (UKR)",
    description: "Keluarga Mahasiswa Buddhis (KMB) Dhammamitta merupakan Unit Kegiatan Rohani Agama Buddha yang dimiliki oleh Universitas Bunda Mulia. KMB Dhammamitta didirikan pada 29 September 2006. Saat ini KMB Dhammamitta sudah ada di 2 kampus, Kampus Ancol dan Kampus Serpong.",
    locations: ["TBA"],
    socialMedia: "https://www.instagram.com/ubm_kmbdhammamitta/",
    contactPerson: "Whatsapp: 0895810982050 (Ancol)",
    image: "/ukr/buddha.webp",
  },
  {
    id: "islam",
    name: "IKATAN MAHASISWA ISLAM UBM (IKAMI)",
    category: "Unit Kegiatan Rohani (UKR)",
    description: "Unit Kegiatan Rohani IKAMI Universitas Bunda Mulia merupakan organisasi rohani yang mencakup mahasiswa dan mahasiswi muslim UBM baik kampus Ancol maupun Serpong. Kegiatan yang dilakukan diantaranya mengadakan ibadah rutin berupa kajian setiap minggu, melakukan santunan kepada anak yatim dilaksanakan rutin setiap tahunnya demi menumbuhkan rasa peduli dan kasih sayang kepada mereka, tafakur alam yang merupakan suatu kegiatan gabungan untuk mempererat silaturahmi dan keagamaan antara kampus Ancol dan Serpong, memperingati setiap hari besar islam dengan doa bersama, melakukan berbagai seminar tentang keagamaan yang dihadiri oleh narasumber berpengalaman, dan juga kami mensosialisasikan semua kegiatan IKAMI melalui sosial media Instagram kami yaitu @ikami_ubm , dalam akun tersebut kami berbagi berbagai pengalaman yang kami lakukan dan juga sharing terkait reminder sebagai seorang muslim.",
    locations: ["TBA"],
    socialMedia: "https://www.instagram.com/ubm_ikami/",
    contactPerson: "Email: ubm.ukrikami@gmail.com",
    image: "/ukr/islam.webp",
  },
  {
    id: "katolik",
    name: "Keluarga Mahasiswa Katolik UBM (KMK)",
    category: "Unit Kegiatan Rohani (UKR)",
    description: "Hai! Kami dari Unit Kegiatan Rohani agama Katolik yaitu Keluarga Mahasiswa Katolik (KMK) Universitas Bunda Mulia. Hadir disini untuk sama – sama melayani juga mengembangkan iman serta menjalin hubungan dalam kasih Tuhan dengan mengadakan kegitan rohani bersama. ",
    locations: ["TBA"],
    socialMedia: "https://www.instagram.com/ubm_kmk_ancol/",
    contactPerson: "",
    image: "/ukr/katolik.webp",
  },
  {
    id: "kristen",
    name: "Jesus in My Campus (JIC)",
    category: "Unit Kegiatan Rohani (UKR)",
    description: "JIC (Jesus in My Campus) adalah Unit Kegiatan Rohani “Kristen” yang telah berdiri di Universitas Bunda Mulia sejak tahun 2008. Baik di kampus Ancol maupun kampus Serpong, keduanya aktif dan rutin mengadakan berbagai pelayanan ibadah, persekutuan, hingga hari raya Kekristenan secara meriah.",
    locations: ["TBA"],
    socialMedia: "https://www.instagram.com/ubm_jic_ancol/",
    contactPerson: "",
    image: "/ukr/kristen.webp",
  },
  
];

export function getDirectoryItems() {
  return directoryData;
}

export function getDirectoryItemById(id: string) {
  return directoryData.find(item => item.id === id);
}
```

### markdown.ts
```ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content/faq");

export interface FAQData {
  slug: string;
  title: string;
  category: string;
  content: string;
  faculty: string;
  program: string;
}

function getAllMarkdownFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllMarkdownFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith(".md")) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

export function getAllFAQs(): FAQData[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const allFiles = getAllMarkdownFiles(contentDirectory);
  
  const allFAQsData = allFiles.map((fullPath) => {
    const relativePath = path.relative(contentDirectory, fullPath);
    const slug = relativePath.replace(/\\/g, '/').replace(/\.md$/, "");
    
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug,
      title: matterResult.data.title || "Untitled",
      category: matterResult.data.category || "Uncategorized",
      faculty: matterResult.data.faculty || "General",
      program: matterResult.data.program || "General",
      content: matterResult.content.replace(/^#\s+[^\n]+\n*/, ''),
    };
  });

  return allFAQsData;
}

export function getFAQBySlug(slug: string): FAQData | null {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    slug,
    title: matterResult.data.title || "Untitled",
    category: matterResult.data.category || "Uncategorized",
    faculty: matterResult.data.faculty || "General",
    program: matterResult.data.program || "General",
    content: matterResult.content.replace(/^#\s+[^\n]+\n*/, ''),
  };
}
```

### supabase.ts
```ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```