import * as React from "react";
import { cn } from "./utils";

/**
 * Unified Quiz Card Component
 * 
 * DESIGN SYSTEM RULES:
 * - One universal card style for all quiz screens
 * - Same width and max-height everywhere
 * - Same padding, border radius, and shadow
 * - White background with subtle shadow
 * - No visual noise
 */

interface QuizCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxHeight?: string;
}

export function QuizCard({ 
  children, 
  className,
  maxHeight = "auto",
  ...props 
}: QuizCardProps) {
  
  return (
    <div
      className={cn(
        `
        bg-white rounded-3xl
        border border-gray-100
        shadow-sm
        `,
        className
      )}
      style={{
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06), 0 0 1px rgba(0, 0, 0, 0.04)',
        maxHeight: maxHeight
      }}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Standard Card Content Wrapper
 * Provides consistent padding
 */
export function QuizCardContent({ 
  children, 
  className,
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-8", className)} {...props}>
      {children}
    </div>
  );
}

/**
 * Card Header with consistent styling
 */
export function QuizCardHeader({ 
  children, 
  className,
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn(
        "px-8 pt-6 pb-4 border-b border-gray-100",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}
