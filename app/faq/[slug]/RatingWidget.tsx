"use client";

import { useState, useEffect } from "react";
import { Star, CheckCircle } from "@/components/Icons";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function RatingWidget({ articleSlug }: { articleSlug: string }) {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
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
      const { error } = await supabase
        .from('article_feedback')
        .insert([{ article_slug: articleSlug, rating: value }]);

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

  return (
    <div className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm">
      <h3 className="font-semibold text-lg mb-2">Seberapa membantu artikel ini?</h3>
      <p className="text-sm text-muted-foreground mb-6">Umpan balikmu membantu kami menjadi lebih baik.</p>
      
      {isInitializing ? (
        <div className="h-10"></div>
      ) : submitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center py-2"
        >
          <div className="w-12 h-12 bg-green-500/10 text-green-500 dark:text-green-400 rounded-full flex items-center justify-center mb-3">
            <CheckCircle size={24} />
          </div>
          <p className="text-foreground font-semibold text-base mb-1">Terima kasih atas penilaianmu!</p>
          <p className="text-xs text-muted-foreground">Masukanmu sangat berarti bagi pengembangan kampus kami.</p>
        </motion.div>
      ) : (
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => handleRate(star)}
              disabled={isSubmitting}
              className="p-1 focus:outline-none disabled:opacity-50"
            >
              <Star
                size={32}
                className={clsx(
                  "transition-colors duration-200",
                  (hoveredRating || rating) >= star 
                    ? "fill-secondary text-secondary" 
                    : "text-muted-foreground hover:text-secondary"
                )}
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
