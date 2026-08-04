import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('article_feedback')
      .select('article_slug, rating');

    if (error) throw error;

    const aggregation: Record<string, { total: number; count: number }> = {};
    
    data.forEach((row) => {
      if (!aggregation[row.article_slug]) {
        aggregation[row.article_slug] = { total: 0, count: 0 };
      }
      aggregation[row.article_slug].total += row.rating;
      aggregation[row.article_slug].count += 1;
    });

    const result: Record<string, number> = {};
    for (const slug in aggregation) {
      result[slug] = aggregation[slug].total / aggregation[slug].count;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching ratings", error);
    return NextResponse.json({}, { status: 500 });
  }
}
