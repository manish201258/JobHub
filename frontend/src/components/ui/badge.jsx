import * as React from "react";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-300 focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#39ff14] text-black hover:bg-[#2ce60f] shadow-[0_4px_0_#1f9d0f] hover:shadow-[0_6px_0_#1f9d0f] active:shadow-[0_2px_0_#1f9d0f] active:translate-y-1",
        secondary:
          "border-transparent bg-[#222] text-[#39ff14] hover:bg-[#333] shadow-[0_4px_0_#111] hover:shadow-[0_6px_0_#111] active:shadow-[0_2px_0_#111] active:translate-y-1",
        destructive:
          "border-transparent bg-[#ff3366] text-white hover:bg-[#ff1a54] shadow-[0_4px_0_#cc0044] hover:shadow-[0_6px_0_#cc0044] active:shadow-[0_2px_0_#cc0044] active:translate-y-1",
        outline:
          "text-[#39ff14] border-[#39ff14] bg-transparent hover:bg-[#39ff14]/10 shadow-[0_4px_0_#39ff14/30] hover:shadow-[0_6px_0_#39ff14/30] active:shadow-[0_2px_0_#39ff14/30] active:translate-y-1",
        skill:
          "border-transparent bg-[#111] text-[#39ff14] hover:bg-[#222] shadow-[0_4px_0_#39ff14/50] hover:shadow-[0_6px_0_#39ff14/50] active:shadow-[0_2px_0_#39ff14/50] active:translate-y-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  children,
  ...props
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export { Badge, badgeVariants };