import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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