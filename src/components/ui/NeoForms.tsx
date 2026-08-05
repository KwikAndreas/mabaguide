"use client";

import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';
import { Check } from 'lucide-react';

// NeoInput
export const NeoInput = React.forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={clsx(
        "w-full px-4 py-4 bg-background border-2 border-foreground rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all font-bold text-foreground placeholder:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
});
NeoInput.displayName = "NeoInput";

// NeoSelect
export const NeoSelect = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(({ className, children, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <select
        ref={ref}
        className={clsx(
          "w-full px-4 py-4 bg-background border-2 border-foreground rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all font-bold text-foreground appearance-none cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-foreground">
        <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  )
});
NeoSelect.displayName = "NeoSelect";

// NeoTextarea
export const NeoTextarea = React.forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={clsx(
        "w-full px-4 py-4 bg-background border-2 border-foreground rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all font-bold text-foreground placeholder:text-muted-foreground resize-y min-h-[120px]",
        className
      )}
      {...props}
    />
  )
});
NeoTextarea.displayName = "NeoTextarea";

// NeoCheckbox
export const NeoCheckbox = ({ checked, onChange, label }: { checked: boolean, onChange: (checked: boolean) => void, label: React.ReactNode }) => {
  return (
    <label className="flex items-start gap-4 cursor-pointer group w-full p-4 border-2 border-foreground rounded-xl bg-card hover:bg-muted/50 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
      <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <div className={clsx(
        "w-7 h-7 flex-shrink-0 border-2 border-foreground rounded-md flex items-center justify-center transition-colors",
        checked ? "bg-cat-academic" : "bg-background"
      )}>
        {checked && <Check size={20} strokeWidth={4} className="text-white" />}
      </div>
      <div className="flex-1 text-sm sm:text-base font-bold text-foreground leading-relaxed pt-0.5">{label}</div>
    </label>
  );
};

// NeoRadio
export const NeoRadio = ({ checked, onChange, label, name }: { checked: boolean, onChange: () => void, label: React.ReactNode, name?: string }) => {
  return (
    <label className="flex items-start gap-4 cursor-pointer group w-full p-4 border-2 border-foreground rounded-xl bg-card hover:bg-muted/50 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
      <input type="radio" name={name} className="sr-only" checked={checked} onChange={onChange} />
      <div className={clsx(
        "w-7 h-7 flex-shrink-0 border-2 border-foreground rounded-full flex items-center justify-center transition-colors",
        checked ? "bg-cat-bureaucracy" : "bg-background"
      )}>
        {checked && <div className="w-3 h-3 bg-white rounded-full" />}
      </div>
      <div className="flex-1 text-sm sm:text-base font-bold text-foreground leading-relaxed pt-0.5">{label}</div>
    </label>
  );
};

// NeoRating (1 to max)
export const NeoRating = ({ value, onChange, max = 5 }: { value: number, onChange: (val: number) => void, max?: number }) => {
  return (
    <div className="flex items-center gap-3 sm:gap-4 w-full">
      {Array.from({ length: max }).map((_, i) => {
        const rating = i + 1;
        const isSelected = value === rating;
        return (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(rating)}
            className={clsx(
              "flex-1 aspect-square rounded-xl border-2 border-foreground flex flex-col items-center justify-center transition-all focus:outline-none",
              isSelected 
                ? "bg-cat-academic shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.2)] text-white scale-95" 
                : "bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] text-foreground hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]"
            )}
          >
            <span className="font-heading font-black text-xl sm:text-3xl">{rating}</span>
          </button>
        );
      })}
    </div>
  );
}
