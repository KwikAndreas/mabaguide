import { NextResponse } from "next/server";
import { getAllFAQs } from "@/lib/markdown";
import { getDirectoryItems } from "@/lib/data/directory";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  const allFAQs = getAllFAQs();
  const allDirectory = getDirectoryItems();

  if (!q) {
    return NextResponse.json([]);
  }

  const query = q.toLowerCase();
  
  // Basic search matching title, category or content
  const faqResults = allFAQs.filter(
    (faq) =>
      faq.title.toLowerCase().includes(query) ||
      faq.category.toLowerCase().includes(query) ||
      faq.content.toLowerCase().includes(query)
  );

  const dirResults = allDirectory.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
  );

  // Combine results
  const searchResults = [
    ...faqResults.map(faq => ({
      type: 'faq',
      slug: faq.slug,
      title: faq.title,
      category: faq.category,
    })),
    ...dirResults.map(item => ({
      type: 'directory',
      slug: item.id,
      title: item.name,
      category: item.category,
    }))
  ];

  return NextResponse.json(searchResults);
}
