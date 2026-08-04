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