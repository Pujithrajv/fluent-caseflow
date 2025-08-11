import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
  {
    variants: {
      status: {
        draft: "bg-status-draft text-status-draft-foreground",
        submitted: "bg-status-submitted text-status-submitted-foreground",
        accepted: "bg-status-accepted text-status-accepted-foreground",
        rejected: "bg-status-rejected text-status-rejected-foreground",
        "in-progress": "bg-status-in-progress text-status-in-progress-foreground",
        completed: "bg-status-completed text-status-completed-foreground",
      },
    },
    defaultVariants: {
      status: "draft",
    },
  }
)

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  status: "draft" | "submitted" | "accepted" | "rejected" | "in-progress" | "completed"
}

function StatusBadge({ className, status, children, ...props }: StatusBadgeProps) {
  return (
    <div className={cn(statusBadgeVariants({ status }), className)} {...props}>
      Status: {children || status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  )
}

export { StatusBadge, statusBadgeVariants }