import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium tracking-wide whitespace-nowrap",
  {
    variants: {
      status: {
        draft: "text-white",
        submitted: "text-white", 
        accepted: "text-white",
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
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "submitted":
        return { backgroundColor: "#F6A609", color: "#ffffff" };
      case "draft":
        return { backgroundColor: "#C53E3E", color: "#ffffff" };
      case "accepted":
        return { backgroundColor: "#3DA546", color: "#ffffff" };
      default:
        return {};
    }
  };

  return (
    <div 
      className={cn(statusBadgeVariants({ status }), className)} 
      style={getStatusStyle(status)}
      {...props}
    >
      {children || status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  )
}

export { StatusBadge, statusBadgeVariants }