"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, BookOpen, User } from "@/components/Icons";
import clsx from "clsx";

export default function DesktopSidebar() {
  const pathname = usePathname();

  // Don't show sidebar on onboarding
  if (pathname === "/onboarding") return null;

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Cari", href: "/search", icon: Search },
    { name: "Direktori", href: "/directory", icon: BookOpen },
    { name: "Profil", href: "/profile", icon: User },
  ];

  return (
    <aside className="hidden sm:flex flex-col w-64 border-r border-border bg-background h-screen sticky top-0 z-40">
      <div className="p-6 pb-2">
        <h1 className="text-xl font-black text-primary tracking-tighter">MabaGuide</h1>
        <p className="text-xs text-muted-foreground font-medium mt-1">Panduan Mahasiswa Baru UBM</p>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground font-medium"
              )}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={clsx(isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6">
        <div className="bg-card border border-border rounded-xl p-4 text-center shadow-sm">
          <p className="text-xs font-semibold text-foreground mb-1">MabaGuide v1.0</p>
          <p className="text-[10px] text-muted-foreground">© 2026 INSPIRE</p>
        </div>
      </div>
    </aside>
  );
}
