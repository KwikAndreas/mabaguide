import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./Button" 

const badgeVariants = cva(
  "inline-flex items-center rounded-md border-2 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-500/80",
        outline: "text-foreground border-foreground",
        academic: "border-transparent bg-cat-academic text-white hover:bg-cat-academic/90 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none",
        bureaucracy: "border-transparent bg-cat-bureaucracy text-white hover:bg-cat-bureaucracy/90 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none",
        organization: "border-transparent bg-cat-organization text-white hover:bg-cat-organization/90 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none",
        dictionary: "border-transparent bg-cat-dictionary text-white hover:bg-cat-dictionary/90 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
