import * as React from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent'
    size?: 'sm' | 'md' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 shadow-sm hover:shadow-md"

        const variants = {
            primary: "bg-gradient-to-r from-primary to-[#005bb5] text-primary-foreground hover:brightness-110 focus-visible:ring-primary",
            secondary: "bg-muted-bg text-foreground hover:bg-gray-200 focus-visible:ring-gray-400",
            outline: "border-2 border-primary/20 bg-transparent text-primary hover:border-primary hover:bg-primary/5 focus-visible:ring-primary",
            ghost: "text-foreground hover:bg-black/5 focus-visible:ring-gray-400",
            accent: "bg-gradient-to-r from-accent to-[#e68a00] text-accent-foreground hover:brightness-110 focus-visible:ring-accent",
        }

        const sizes = {
            sm: "h-9 px-4 text-xs",
            md: "h-11 px-6 py-2",
            lg: "h-14 px-10 text-lg",
            icon: "h-11 w-11",
        }

        return (
            <button
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, cn }
