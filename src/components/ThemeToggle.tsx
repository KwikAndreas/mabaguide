"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="outline" size="icon" disabled className="opacity-50" />;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title="Toggle Theme"
      className="rounded-full border-foreground bg-background hover:bg-muted"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-cat-dictionary" />
      ) : (
        <Moon className="h-5 w-5 text-cat-academic" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}