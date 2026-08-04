"use client";

import { useState, useEffect, useCallback } from "react";

const BOOKMARKS_KEY = "mabaguide_bookmarks";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from local storage
  const loadBookmarks = useCallback(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_KEY);
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load bookmarks:", error);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    loadBookmarks();

    // Listen to changes across tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === BOOKMARKS_KEY) {
        loadBookmarks();
      }
    };
    
    // Custom event for same-tab updates
    const handleLocalUpdate = () => loadBookmarks();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("bookmarksUpdated", handleLocalUpdate);
    
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("bookmarksUpdated", handleLocalUpdate);
    };
  }, [loadBookmarks]);

  const isBookmarked = (slug: string) => bookmarks.includes(slug);

  const toggleBookmark = (slug: string) => {
    let newBookmarks;
    if (bookmarks.includes(slug)) {
      newBookmarks = bookmarks.filter(b => b !== slug);
    } else {
      newBookmarks = [...bookmarks, slug];
    }
    
    setBookmarks(newBookmarks);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
    
    // Dispatch custom event for cross-component reactivity in the same tab
    window.dispatchEvent(new Event("bookmarksUpdated"));
  };

  return { bookmarks, isBookmarked, toggleBookmark, mounted };
}
