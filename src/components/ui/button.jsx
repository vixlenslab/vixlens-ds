import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-vix-button font-semibold transition-[color,box-shadow,transform] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/30 active:translate-y-px disabled:pointer-events-none disabled:bg-gray-200 disabled:text-gray-600 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-vix-preto underline-offset-4 hover:underline",
        dark: "bg-vix-preto text-vix-cinza-card hover:bg-[#333333] focus-visible:ring-vix-amarelo",
        outlineDark: "border-2 border-white bg-transparent text-white hover:bg-white/10",
      },
      size: {
        // Tamanhos-base do shadcn escritos em px. Altura / padding-x explícitos.
        default: "h-[36px] px-[16px] text-sm has-[>svg]:px-[12px]",
        sm: "h-[32px] gap-1.5 px-[12px] text-sm has-[>svg]:px-[10px]",
        lg: "h-[40px] px-[24px] text-base has-[>svg]:px-[16px]",
        icon: "h-[36px] w-[36px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
