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

function getAllMarkdownFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllMarkdownFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith(".md")) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

export function getAllFAQs(): FAQData[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const allFiles = getAllMarkdownFiles(contentDirectory);
  
  const allFAQsData = allFiles.map((fullPath) => {
    const relativePath = path.relative(contentDirectory, fullPath);
    const slug = relativePath.replace(/\\/g, '/').replace(/\.md$/, "");
    
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
