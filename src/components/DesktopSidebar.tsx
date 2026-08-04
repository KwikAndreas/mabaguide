"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, BookOpen, User } from "@/components/Icons";
import clsx from "clsx";


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
        <div className="w-10"></div>
        <div className="w-full bg-muted border-2 border-foreground rounded-lg p-3 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
          <p className="text-xs font-bold text-foreground mb-1 uppercase tracking-wider">MabaGuide v2.0</p>
          <p className="text-[10px] text-muted-foreground font-bold">© 2026 INSPIRE</p>
        </div>
      </div>
    </aside>
  );
}