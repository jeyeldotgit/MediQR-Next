"use client";

import { cn } from "@/lib/utils";

interface UILoadingProps {
  /**
   * Optional message to display below the spinner
   */
  message?: string;
  /**
   * Size of the loading spinner
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Whether to show as full page overlay
   * @default false
   */
  fullPage?: boolean;
  /**
   * Additional className for customization
   */
  className?: string;
}

/**
 * Reusable loading component with custom animated spinner
 * Supports both full-page and inline loading states
 */
export function UILoading({
  message,
  size = "md",
  fullPage = false,
  className,
}: UILoadingProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const cornerSizeClasses = {
    sm: "7.75px",
    md: "15.5px",
    lg: "24px",
  };

  // MediQR color: #d32f2f
  const mediqrColor = "#d32f2f";
  const gradient = `no-repeat linear-gradient(${mediqrColor} 0 0)`;

  const spinner = (
    <div
      className={cn("relative", sizeClasses[size])}
      style={{
        "--c": gradient,
        background: `var(--c) center/100% ${size === "sm" ? "15%" : size === "md" ? "20%" : "25%"}, var(--c) center/${size === "sm" ? "15%" : size === "md" ? "20%" : "25%"} 100%`,
      } as React.CSSProperties}
    >
      <div
        className="absolute inset-0"
        style={{
          "--c": gradient,
          background: `var(--c) 0 0, var(--c) 100% 0, var(--c) 0 100%, var(--c) 100% 100%`,
          backgroundSize: `${cornerSizeClasses[size]} ${cornerSizeClasses[size]}`,
          animation: `ui-loader-animation-${size} 1.5s infinite cubic-bezier(0.3,1,0,1)`,
        } as React.CSSProperties}
      />
    </div>
  );

  if (fullPage) {
    return (
      <div
        className={cn(
          "min-h-screen bg-gradient-to-br from-mediqr-accent/5 via-white to-mediqr-accent/5 flex items-center justify-center",
          className
        )}
      >
        <div className="text-center space-y-4">
          <div className="flex justify-center">{spinner}</div>
          {message && (
            <p className="text-mediqr-text/60 font-medium">{message}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
      {spinner}
      {message && (
        <p className="text-sm text-mediqr-text/60 font-medium">{message}</p>
      )}
    </div>
  );
}

