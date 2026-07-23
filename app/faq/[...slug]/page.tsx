import { getAllFAQs, getFAQBySlug } from "@/lib/markdown";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import Link from "next/link";
import { ChevronLeft } from "@/components/Icons";
import RatingWidget from "./RatingWidget";

export async function generateStaticParams() {
  const faqs = getAllFAQs();
  return faqs.map((faq) => ({
    slug: faq.slug.split('/'), // Next.js expects an array for [...slug]
  }));
}

export default async function FAQPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join('/');
  const faq = getFAQBySlug(slugPath);

  if (!faq) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen pb-12">
      {/* App Bar */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border px-4 h-14 flex items-center">
        <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-muted text-foreground transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <span className="ml-2 font-semibold text-sm line-clamp-1">{faq.category}</span>
      </header>

      <main className="flex-1 px-6 py-8">
        <h1 className="text-3xl font-bold mb-6 text-foreground leading-tight">{faq.title}</h1>
        <article className="prose prose-sm dark:prose-invert max-w-none prose-headings:text-foreground prose-h2:text-primary prose-a:text-primary prose-a:underline prose-a:underline-offset-4 prose-a:decoration-primary/40 hover:prose-a:decoration-primary prose-a:transition-all prose-li:marker:text-primary prose-strong:text-foreground mb-12">
          <ReactMarkdown rehypePlugins={[rehypeSlug]}>{faq.content}</ReactMarkdown>
        </article>

        {/* Feedback Widget */}
        <div className="border-t border-border pt-8 mt-8">
          <RatingWidget articleSlug={faq.slug} />
        </div>
      </main>
    </div>
  );
}
