import { type HTMLAttributes } from "react"
import { cva, cn, type VariantProps } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-pill px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary-light text-primary",
        secondary: "bg-surface text-muted-foreground border border-border",
        success: "bg-success-light text-success",
        warning: "bg-warning-light text-warning",
        danger: "bg-danger-light text-danger",
        info: "bg-info-light text-info",
        outline: "border border-border text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
export type { BadgeProps }
