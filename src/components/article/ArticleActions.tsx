"use client";

import { Share2, Bookmark } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import clsx from "clsx";

interface ArticleActionsProps {
  slug: string;
}

export default function ArticleActions({ slug }: ArticleActionsProps) {
  const { isBookmarked, toggleBookmark, mounted } = useBookmarks();

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link tersalin ke clipboard!");
      }
    } catch (err) {
      console.error("Gagal membagikan:", err);
    }
  };

  const isSaved = mounted ? isBookmarked(slug) : false;

  return (
    <div className="flex gap-2">
      <button 
        onClick={() => toggleBookmark(slug)}
        className={clsx(
          "p-2 border-2 border-foreground rounded-lg active:translate-y-[2px] active:shadow-none transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]",
          isSaved 
            ? "bg-cat-academic text-white" 
            : "text-foreground hover:bg-muted bg-background"
        )}
      >
        <Bookmark 
          size={18} 
          strokeWidth={2.5} 
          fill={isSaved ? "currentColor" : "none"} 
        />
      </button>
      <button 
        onClick={handleShare}
        className="p-2 text-foreground bg-background border-2 border-foreground rounded-lg hover:bg-muted active:translate-y-[2px] active:shadow-none transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
      >
        <Share2 size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
}
