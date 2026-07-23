import { notFound } from "next/navigation";
import Link from "next/link";
import { getDirectoryItemById } from "@/lib/data/directory";
import { ChevronLeft, MapPin, Globe, Phone } from "@/components/Icons";

export default async function DirectoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const item = getDirectoryItemById(resolvedParams.id);

  if (!item) {
    notFound();
  }

  const isFasilitas = item.category === "Fasilitas Kampus";
  const badgeColor = isFasilitas ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400";
  const iconColor = isFasilitas ? "text-blue-500" : "text-orange-500";

  return (
    <div className="flex flex-col min-h-screen pb-12 bg-background w-full">
      <div className="w-full max-w-3xl mx-auto flex flex-col flex-1 relative">
        
        {/* Fixed Header Back Button */}
        <header className="absolute top-0 left-0 w-full z-40 bg-gradient-to-b from-black/60 to-transparent p-4 flex items-center">
          <Link href="/directory" className="flex items-center gap-1 text-white bg-black/40 hover:bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md transition-all text-sm font-medium">
            <ChevronLeft size={16} />
            Kembali
          </Link>
        </header>

        {/* Hero Image */}
        <div className="w-full h-64 md:h-80 relative bg-muted flex-shrink-0">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
              Tidak ada foto tersedia
            </div>
          )}
        </div>

        {/* Content */}
        <main className="flex-1 px-6 pt-6 pb-12 -mt-6 bg-background rounded-t-3xl relative z-10 shadow-lg">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${badgeColor}`}>
              {item.category}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{item.name}</h1>
          
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            {item.description}
          </p>

          {/* Locations */}
          <section className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4 opacity-80">Lokasi / Lantai</h2>
            <div className="space-y-3">
              {item.locations.map((loc, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card">
                  <div className={`mt-0.5 ${iconColor}`}>
                    <MapPin size={18} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{loc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* UKM Specific Info (Contact & Social) */}
          {(item.socialMedia || item.contactPerson) && (
            <section className="bg-card border border-border rounded-xl p-5 mt-8 shadow-sm">
              <h2 className="text-base font-bold text-foreground mb-4">Ingin Bergabung?</h2>
              
              <div className="space-y-4">
                {item.socialMedia && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Globe size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-muted-foreground">Sosial Media</p>
                      <a href={item.socialMedia} target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary hover:underline truncate block">
                        {item.socialMedia.replace("https://", "")}
                      </a>
                    </div>
                  </div>
                )}
                
                {item.contactPerson && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 flex-shrink-0">
                      <Phone size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-muted-foreground">Contact Person</p>
                      <p className="text-sm font-semibold text-foreground truncate">{item.contactPerson}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <button className="w-full mt-6 bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-colors">
                Daftar Sekarang
              </button>
            </section>
          )}

        </main>
      </div>
    </div>
  );
}
