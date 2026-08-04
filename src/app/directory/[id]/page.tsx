import { notFound } from "next/navigation";
import { directoryData } from "@/lib/data/directory";
import Link from "next/link";
import { ChevronLeft, MapPin, Building, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
        <div className="bg-card border-4 border-foreground rounded-3xl overflow-hidden mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] relative">
          <div className="h-48 sm:h-64 md:h-80 bg-muted relative border-b-4 border-foreground">
            {item.image ? (
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/50 bg-[url('/noise.svg')]">
                <Building size={48} className="mb-2" strokeWidth={2} />
                <span className="text-sm font-black uppercase tracking-widest">Tidak ada foto</span>
              </div>
            )}
          </div>
          
          {item.logo && (
            <div className="absolute top-36 sm:top-52 left-6 sm:left-8 w-20 h-20 sm:w-24 sm:h-24 bg-background rounded-2xl border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] z-20 overflow-hidden flex items-center justify-center p-2">
              <img src={item.logo} alt={`Logo ${item.name}`} className="w-full h-full object-contain" />
            </div>
          )}

          <div className={`p-6 sm:p-8 ${item.logo ? 'pt-14 sm:pt-16' : ''} bg-[url('/noise.svg')]`}>
            <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4 uppercase tracking-tight leading-tight font-heading">
              {item.name}
            </h1>
            
            {/* Metadata Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] text-xs font-black uppercase tracking-widest text-foreground">
                <MapPin size={16} strokeWidth={2.5} /> {item.locations?.[0] || "TBA"}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-cat-academic border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] text-white text-xs font-black uppercase tracking-widest">
                {item.category.includes("Fasilitas") ? <Building size={16} strokeWidth={2.5} /> : <Users size={16} strokeWidth={2.5} />}
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
          <div className="bg-card border-4 border-foreground rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] bg-[url('/noise.svg')]">
            <h2 className="text-xl font-black uppercase tracking-widest text-foreground mb-4 border-b-4 border-foreground pb-2">Informasi</h2>
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-foreground mb-1">Status</h4>
                <p className="text-foreground font-bold text-sm flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500 border-2 border-foreground"></span> Aktif
                </p>
              </div>
              {hasValidLocations && (
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-foreground mb-2">Lokasi Kampus</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.locations?.map((loc, i) => (
                      <span key={i} className="text-xs font-bold px-3 py-1 bg-background border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] text-foreground">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-card border-4 border-foreground rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] bg-[url('/noise.svg')]">
            <h2 className="text-xl font-black uppercase tracking-widest text-foreground mb-4 border-b-4 border-foreground pb-2">Akses Cepat</h2>
            <div className="flex flex-col gap-3">
              <Button asChild variant="default" className="w-full py-6 text-sm flex items-center justify-center gap-2">
                <Link href="/search?q=panduan">
                  Lihat Panduan Terkait
                </Link>
              </Button>
              
              {item.socialMedia && (
                <Button asChild variant="outline" className="w-full py-6 text-sm flex items-center justify-center gap-2 border-4">
                  <a href={item.socialMedia} target="_blank" rel="noopener noreferrer">
                    Kunjungi Instagram
                  </a>
                </Button>
              )}
              
              {item.contactPerson && (
                <div className="w-full py-4 px-4 text-sm font-bold flex items-center justify-center gap-2 border-4 border-foreground bg-secondary text-secondary-foreground rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                  Hubungi Kontak: {item.contactPerson}
                </div>
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
