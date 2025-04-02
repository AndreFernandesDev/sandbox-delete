import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default:
                    "bg-foreground border-foreground text-background shadow hover:bg-foreground/90",
                primary:
                    "bg-primary border-primary text-primary-foreground shadow hover:bg-primary/90",
                secondary:
                    "bg-primary/10 border-primary/10 text-primary hover:border-foreground hover:text-background hover:bg-foreground",
                destructive:
                    "bg-destructive border-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                    "inline-destructive": "text-primary underline-offset-4 hover:underline",
                outline:
                    "bg-background border border-secondary text-primary hover:border-secondary/90 hover:text-primary/90",
                "outline-muted":
                    "bg-background border text-muted-foreground hover:border-secondary hover:text-muted-foreground/90",
                "outline-muted-primary":
                    "bg-background border border-primary text-muted-foreground hover:text-muted-foreground/90",
                ghost: "border-transparent text-primary hover:text-primary/80",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default:
                    "h-13 px-5 py-3 [&_svg]:size-5 has-[>svg]:justify-between",
                sm: "h-10 px-3 py-2 text-sm [&_svg]:size-4 has-[>svg]:justify-between",
                xs: "h-8 px-3 py-2 text-sm [&_svg]:size-3 has-[>svg]:justify-between",
                xl: "h-20 px-6 py-3 gap-6 text-xl [&_svg]:size-6 has-[>svg]:justify-between has-[[role='status']]:justify-between",
                "icon-xl": "size-16 flex-col text-xs [&_svg]:size-8",
                icon: "size-8 flex-col text-xs [&_svg]:size-5",
                "icon-sm": "size-6 flex-col [&_svg]:size-4",
                "icon-xs": "size-4 flex-col [&_svg]:size-3",
                inline: "size-auto has-[>svg]:justify-between",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }) {
    const Comp = asChild ? Slot : "button"

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({variant, size, className}))}
            {...props}
        />
    )
}

export {Button, buttonVariants}
