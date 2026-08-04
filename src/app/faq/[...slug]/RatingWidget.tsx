"use client";
import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export default function RatingWidget({ articleSlug }: { articleSlug: string }) {
  const [rating, setRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const hasRated = localStorage.getItem(`mabaguide_rated_${articleSlug}`);
    if (hasRated) {
      setSubmitted(true);
    }
    setIsInitializing(false);
  }, [articleSlug]);

  const handleRate = async (value: number) => {
    if (submitted || isSubmitting) return;
    
    setRating(value);
    setIsSubmitting(true);

    try {
      const dbRating = value === 1 ? 5 : 1; 

      const { error } = await supabase
        .from('article_feedback')
        .insert([{ article_slug: articleSlug, rating: dbRating }]);

      if (!error) {
        localStorage.setItem(`mabaguide_rated_${articleSlug}`, 'true');
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Error submitting feedback', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isInitializing) {
    return <div className="h-32 bg-muted/30 rounded-3xl animate-pulse"></div>;
  }

  return (
    <div className="w-full bg-card border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden bg-[url('/noise.svg')]">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="rating-form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex flex-col items-center"
          >
            <h3 className="font-bold text-lg sm:text-xl text-foreground mb-1">Gimana panduan ini, bantu nggak?</h3>
            <p className="text-sm text-muted-foreground mb-6">Pilih salah satu ya, masukanmu berharga banget!</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRate(1)}
                disabled={isSubmitting}
                className={clsx(
                  "group relative flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 sm:py-4 rounded-full border transition-all duration-300 font-semibold",
                  rating === 1 
                    ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/25" 
                    : "bg-background text-foreground border-border/50 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-500/5 disabled:opacity-50"
                )}
                aria-label="Sangat Membantu"
              >
                <ThumbsUp size={18} className={clsx("transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-12", rating === 1 && "fill-current")} />
                <span>Ngebantu!</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRate(0)}
                disabled={isSubmitting}
                className={clsx(
                  "group relative flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 sm:py-4 rounded-full border transition-all duration-300 font-semibold",
                  rating === 0 
                    ? "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/25" 
                    : "bg-background text-foreground border-border/50 hover:border-rose-500 hover:text-rose-500 hover:bg-rose-500/5 disabled:opacity-50"
                )}
                aria-label="Kurang Membantu"
              >
                <ThumbsDown size={18} className={clsx("transition-transform duration-300 group-hover:translate-y-1 group-hover:-rotate-12", rating === 0 && "fill-current")} />
                <span>Kurang</span>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="flex flex-col items-center py-2"
          >
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-500/25">
              <Sparkles size={28} />
            </div>
            <p className="text-foreground font-extrabold text-xl mb-1">Yay, makasih ya!</p>
            <p className="text-sm text-muted-foreground">Umpan balik kamu udah kita catat.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}