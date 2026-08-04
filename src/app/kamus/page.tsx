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
                <div className="flex items-center gap-4 mb-8 relative">
                  <div className="bg-cat-dictionary border-4 border-foreground text-white font-black text-4xl w-16 h-16 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] -rotate-3 z-10">
                    {letter}
                  </div>
                  <div className="h-0 flex-1 border-b-4 border-foreground border-dashed mt-2"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupedItems[letter].map((item) => (
                    <Link key={item.slug} href={`/faq/${item.slug}`}>
                      <div className="group bg-card border-2 border-foreground rounded-2xl p-5 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] active:translate-y-[3px] active:shadow-none dark:active:shadow-none flex items-center justify-between h-full cursor-pointer">
                        <div className="flex-1 pr-4">
                          <h3 className="font-black text-foreground text-lg mb-1 uppercase tracking-tight leading-tight">
                            {item.title}
                          </h3>
                        </div>
                        <div className="w-10 h-10 rounded-full border-2 border-foreground bg-white dark:bg-black text-foreground flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                          <ChevronLeft size={20} strokeWidth={3} className="rotate-180 transition-colors" />
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