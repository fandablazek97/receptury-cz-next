import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<"div"> & {
  asChild?: boolean;
  variant?: "subtle" | "text";
  className?: string;
};

// Component Variants
const cv = {
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs md:text-sm text-primary-600 rounded-md font-medium disabled:pointer-events-none disabled:opacity-60",
  variant: {
    subtle: "py-0.5 sm:py-1 px-1.5 sm:px-2.5 rounded-full bg-primary-300/30",
    text: "",
  },
};

const Badge = forwardRef<HTMLDivElement, Props>(
  ({ asChild, variant = "subtle", className = "", ...props }, forwardedRef) => {
    const Component = asChild ? Slot : "div";
    return (
      <Component
        ref={forwardedRef}
        className={cn(cv.base, cv.variant[variant], className)}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";
export default Badge;
