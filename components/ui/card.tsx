'use client'
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const MotionDiv = motion<HTMLDivElement>(
  React.forwardRef(function MotionDiv(props, ref) {
    return <div ref={ref} {...props} />;
  })
);

// const Card = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn(
//       "rounded-lg border bg-card text-card-foreground shadow-sm",
//       className
//     )}
//     {...props}
//   />
// ))
// Card.displayName = "Card"


const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-neutral-50 to-gray-100 text-gray-800 shadow-md p-6",
      "hover:shadow-2xl hover:border-black hover:ring-2 hover:ring-black hover:scale-[1.02]",
      "transition-all duration-300 ease-in-out",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"
export default Card


// const Card = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className, ...props }, ref) => (
//   <MotionDiv
//     ref={ref}
//     className={cn(
//       "relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-white to-gray-50 text-gray-800 shadow-xl hover:shadow-2xl hover:border-black hover:ring-2 hover:ring-black transition-all duration-300 p-6 group",
//       className
//     )}
//     initial={{ opacity: 0, y: 30 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.1, ease: "easeOut" }}
//     whileHover={{ scale: 1.03 }}
//     {...props}
//   />
// ));

// Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
