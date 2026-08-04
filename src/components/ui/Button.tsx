import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-[2px] active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-2 border-primary shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] dark:shadow-none dark:border-border dark:hover:bg-primary/90",
        destructive:
          "bg-red-500 text-white border-2 border-red-700 shadow-[3px_3px_0px_0px_rgba(185,28,28,1)] hover:shadow-[1px_1px_0px_0px_rgba(185,28,28,1)] hover:translate-y-[1px] dark:shadow-none dark:hover:bg-red-500/90",
        outline:
          "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.1)] hover:translate-y-[1px] dark:shadow-none dark:border-border",
        secondary:
          "bg-secondary text-secondary-foreground border-2 border-secondary shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] dark:shadow-none dark:border-border dark:hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground active:translate-y-[2px]",
        link: "text-primary underline-offset-4 hover:underline active:translate-y-[1px]",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
