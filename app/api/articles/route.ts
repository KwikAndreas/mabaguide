import { NextResponse } from "next/server";
import { getAllFAQs } from "@/lib/markdown";

export async function GET() {
  const faqs = getAllFAQs();
  
  // Return metadata only without full content
  const articles = faqs.map(f => ({
    slug: f.slug,
    title: f.title,
    category: f.category,
    faculty: f.faculty,
    program: f.program
  }));

  return NextResponse.json(articles);
}
