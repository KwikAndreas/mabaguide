import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import OnboardingWrapper from "@/components/OnboardingWrapper";
import BottomNavigation from "@/components/BottomNavigation";
import DesktopSidebar from "@/components/DesktopSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground pb-16 sm:pb-0">
        <Providers>
          <OnboardingWrapper>
            <div className="flex min-h-screen w-full relative">
              <DesktopSidebar />
              <main className="flex-1 flex flex-col w-full relative min-h-screen">
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
