import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content/faq");

export interface FAQData {
  slug: string;
  title: string;
  category: string;
  content: string;
  faculty: string;
  program: string;
}

export function getAllFAQs(): FAQData[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(contentDirectory);
  const allFAQsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title || "Untitled",
        category: matterResult.data.category || "Uncategorized",
        faculty: matterResult.data.faculty || "General",
        program: matterResult.data.program || "General",
        content: matterResult.content,
      };
    });

  return allFAQsData;
}

export function getFAQBySlug(slug: string): FAQData | null {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    slug,
    title: matterResult.data.title || "Untitled",
    category: matterResult.data.category || "Uncategorized",
    faculty: matterResult.data.faculty || "General",
    program: matterResult.data.program || "General",
    content: matterResult.content,
  };
}
