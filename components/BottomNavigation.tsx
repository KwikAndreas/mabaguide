"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, BookOpen, User } from "@/components/Icons";
import clsx from "clsx";

export default function BottomNavigation() {
  const pathname = usePathname();

  // Don't show bottom nav on onboarding
  if (pathname === "/onboarding") return null;

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Cari", href: "/search", icon: Search },
    { name: "Direktori", href: "/directory", icon: BookOpen },
    { name: "Profil", href: "/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border px-6 pb-safe pt-2 sm:hidden">
      <div className="flex justify-between items-center max-w-md mx-auto h-14">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
