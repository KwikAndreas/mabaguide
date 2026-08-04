import { notFound } from "next/navigation";
import { getFAQBySlug } from "@/lib/markdown";
import Link from "next/link";
import { ChevronLeft, CalendarDays, Tag } from "lucide-react";
import ArticleActions from "@/components/article/ArticleActions";
import RatingWidget from "./RatingWidget";
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CustomCallout from "@/components/markdown/CustomCallout";
import StickyTOC, { HeadingItem } from "@/components/StickyTOC";
import rehypeSlug from "rehype-slug";
import { PieChart } from "@/components/ui/PieChart";

const components = {
  CustomCallout,
  pre: (props: any) => {
    const child = props.children;
    if (child && child.type === 'code' && child.props.className === 'language-piechart') {
      const content = child.props.children;
      const lines = content.trim().split('\n');
      const data = lines.map((line: string) => {
        const [label, value] = line.split(':');
        return { label: label?.trim() || '', value: parseFloat(value?.trim() || '0') };
      }).filter((item: {label: string, value: number}) => !isNaN(item.value));
      return <PieChart data={data} />;
    }
    return <pre {...props} />;
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join('/');
  const faq = getFAQBySlug(slugPath);

  if (!faq) return { title: 'Not Found' };

  return {
    title: `${faq.title} | Maba Guide UBM`,
    description: `Panduan mengenai ${faq.title} untuk mahasiswa UBM.`,
  };
}

// Simple heading extractor function
function extractHeadings(content: string): HeadingItem[] {
  const headings: HeadingItem[] = [];
  // Regex to match markdown headings (## or ###)
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    headings.push({ id, text, level });
  }
  return headings;
}

export default async function FAQDetailPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join('/');
  const faq = getFAQBySlug(slugPath);

  if (!faq) {
    notFound();
  }

  const headings = extractHeadings(faq.content);

  return (
    <div className="flex flex-col min-h-screen bg-background w-full pb-16">
      {/* Dynamic Top Appbar */}
      <div className="sticky top-0 z-40 w-full px-6 pt-6 pb-4 bg-background border-b-2 border-foreground transition-colors duration-300">
        <header className="w-full max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center text-foreground hover:text-primary transition-colors group">
            <div className="p-1.5 -ml-1.5 rounded-md border-2 border-transparent group-hover:border-foreground transition-colors">
              <ChevronLeft size={20} strokeWidth={3} />
            </div>
            <span className="font-bold text-sm ml-1 uppercase tracking-wider">Kembali</span>
          </Link>
          <ArticleActions slug={slugPath} />
        </header>
      </div>

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12 items-start">
          
          {/* Main Article Content */}
          <div className="w-full max-w-3xl">
            {/* Header Section */}
            <div className="mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-[11px] font-black uppercase tracking-widest border-2 border-foreground bg-cat-academic text-white px-3 py-1 rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                  {faq.category}
                </span>
                {faq.faculty && faq.faculty !== "General" && (
                  <span className="text-[11px] font-black uppercase tracking-widest border-2 border-foreground bg-cat-bureaucracy text-white px-3 py-1 rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                    {faq.faculty}
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-[1.15] tracking-tight font-heading uppercase">
                {faq.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-foreground border-y-2 border-foreground py-4 bg-muted/50 px-4 rounded-xl">
                <div className="flex items-center gap-2">
                  <CalendarDays size={18} strokeWidth={2.5} />
                  <span>Panduan Terkini</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-foreground"></div>
                <div className="flex items-center gap-2 text-cat-bureaucracy">
                  <Tag size={18} strokeWidth={2.5} />
                  <span>{faq.program}</span>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <article className="prose prose-slate dark:prose-invert prose-lg max-w-none text-foreground mb-16 prose-headings:font-heading prose-headings:text-foreground prose-headings:font-black prose-p:font-sans prose-p:font-medium prose-a:text-cat-academic prose-a:font-bold hover:prose-a:underline hover:prose-a:decoration-2 prose-blockquote:text-foreground prose-blockquote:border-l-4 prose-blockquote:border-foreground prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-xl prose-blockquote:font-bold prose-blockquote:not-italic">
              <MDXRemote 
                source={faq.content} 
                components={components}
                options={{
                  mdxOptions: {
                    rehypePlugins: [rehypeSlug],
                  },
                }} 
              />
            </article>

            {/* Rating Section */}
            <div className="bg-background border-4 border-foreground rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] max-w-xl mx-auto text-center">
              <h3 className="text-xl font-black text-foreground mb-2 uppercase tracking-wide">Apakah panduan ini membantu?</h3>
              <p className="text-sm font-bold text-muted-foreground mb-6">Penilaian Anda membantu kami meningkatkan kualitas konten panduan Maba Guide UBM.</p>
              <RatingWidget articleSlug={slugPath} />
            </div>
          </div>

          {/* Sticky TOC Sidebar */}
          <StickyTOC headings={headings} />
          
        </div>
      </main>
    </div>
  );
}
