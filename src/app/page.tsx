"use client";
import { useTopArticles } from "@/hooks/useTopArticles";
import { HomeHeader } from "@/components/home/HomeHeader";
import { QuickMenu } from "@/components/home/QuickMenu";
import { TopArticles } from "@/components/home/TopArticles";

export default function Home() {
  const { faculty, topArticles, isLoading } = useTopArticles();

  return (
    <div className="flex flex-col flex-1 pb-10 overflow-x-hidden bg-background">
      <div className="w-full max-w-5xl mx-auto flex flex-col flex-1">
        <HomeHeader faculty={faculty} />

        <div className="px-6 flex-1 flex flex-col gap-8">
        <QuickMenu />
        <TopArticles 
          faculty={faculty} 
          articles={topArticles} 
          isLoading={isLoading} 
        />
        </div>
      </div>
    </div>
  );
}