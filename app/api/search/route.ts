import { NextResponse } from "next/server";
import { getAllFAQs } from "@/lib/markdown";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  const allFAQs = getAllFAQs();

  if (!q) {
    return NextResponse.json(allFAQs);
  }

  const query = q.toLowerCase();
  
  // Basic search matching title, category or content
  const results = allFAQs.filter(
    (faq) =>
      faq.title.toLowerCase().includes(query) ||
      faq.category.toLowerCase().includes(query) ||
      faq.content.toLowerCase().includes(query)
  );

  // Return limited info for search results
  const searchResults = results.map(faq => ({
    slug: faq.slug,
    title: faq.title,
    category: faq.category,
  }));

  return NextResponse.json(searchResults);
}
