"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, BookOpen, User } from "@/components/Icons";
import clsx from "clsx";


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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t-4 border-foreground shadow-[0_-4px_0_0_rgba(0,0,0,1)] dark:shadow-[0_-4px_0_0_rgba(255,255,255,1)] px-4 pb-safe pt-2 sm:hidden transition-colors duration-300">
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
                  ? "bg-cat-academic text-white border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] scale-105" 
                  : "text-foreground hover:bg-muted font-bold"
              )}
            >
              <Icon size={20} strokeWidth={isActive ? 3 : 2.5} />
              <span className="text-[10px] font-bold mt-1 tracking-wide uppercase">{item.name}</span>
            </Link>
          );
        })}
        <div className="absolute -top-16 right-0">

        </div>
      </div>
    </nav>
  );
}