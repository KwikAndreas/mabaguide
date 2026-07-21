import { useState, useEffect } from "react";

export interface ArticleMetadata {
  slug: string;
  title: string;
  category: string;
  faculty: string;
  program: string;
  rating?: number;
}

export function useTopArticles() {
  const [faculty, setFaculty] = useState("");
  const [program, setProgram] = useState("");
  const [topArticles, setTopArticles] = useState<ArticleMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Read user's scope from local storage
    const storedFaculty = localStorage.getItem("mabaguide_faculty");
    const storedProgram = localStorage.getItem("mabaguide_program");
    
    if (storedFaculty) setFaculty(storedFaculty);
    if (storedProgram) setProgram(storedProgram);

    const loadData = async () => {
      try {
        const [articlesRes, ratingsRes] = await Promise.all([
          fetch("/api/articles"),
          fetch("/api/ratings")
        ]);
        
        const articles: ArticleMetadata[] = await articlesRes.json();
        const ratings: Record<string, number> = await ratingsRes.json();

        const filteredAndRated = articles
          .filter(a => 
            (a.faculty === "General" || a.faculty === storedFaculty) &&
            (a.program === "General" || a.program === storedProgram)
          )
          .map(a => ({
            ...a,
            rating: ratings[a.slug] || 0
          }))
          .sort((a, b) => b.rating! - a.rating!)
          .slice(0, 5);

        setTopArticles(filteredAndRated);
      } catch (err) {
        console.error("Failed to load top articles", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { faculty, program, topArticles, isLoading };
}
