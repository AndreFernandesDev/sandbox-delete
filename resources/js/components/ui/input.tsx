import * as React from "react"

import {cn} from "@/lib/utils"

function Input({className, type, value, ...props}: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            value={value ?? ''}
            data-slot="input"
            className={cn(
                "border-input group-[.err]:border-destructive file:text-foreground placeholder:text-muted-foreground/40 selection:bg-primary selection:text-primary-foreground flex font-medium h-14 w-full min-w-0 rounded-md border bg-transparent px-5 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                className
            )}
            {...props}
        />
    )
}

export {Input}
