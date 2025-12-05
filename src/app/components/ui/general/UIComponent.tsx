"use client";

import { cn } from "@/lib/utils";
import { X, LucideIcon } from "lucide-react";

// Export loading component
export { UILoading } from "./UILoading";

/**************************************
 * Types
 **************************************/

interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

/**************************************
 * MediQR UI Library Expansion (TS)
 **************************************/

// Container
interface UIContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function UIContainer({
  title,
  description,
  children,
  action,
  className,
  ...props // spread extra props onto the div
}: UIContainerProps) {
  return (
    <div
      {...props} // <-- now accepts onClick, id, etc.
      className={cn(
        "bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-md border border-mediqr-accent/10 hover:shadow-lg transition-shadow duration-200 space-y-4",
        className
      )}
    >
      {(title || description || action) && (
        <div className="flex items-start justify-between gap-3 pb-2 border-b border-mediqr-accent/10">
          <div>
            {title && (
              <h2 className="text-xl font-bold text-mediqr-dark">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-mediqr-text/60 mt-1">{description}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

// Input
export function UIInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full px-4 py-2 rounded-xl border border-mediqr/30 bg-white/60 focus:outline-none focus:ring-2 focus:ring-mediqr-accent/50 transition text-mediqr-dark placeholder-mediqr-text/50",
        props.className
      )}
    />
  );
}

// Button
export function UIButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { children, className, ...rest } = props;
  return (
    <button
      {...rest}
      className={cn(
        "px-4 py-2.5 rounded-xl bg-mediqr text-white font-semibold shadow-md hover:bg-mediqr-dark hover:shadow-lg transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
}

// Card
export function UICard({ children, className }: BaseProps) {
  return (
    <div
      className={cn(
        "p-5 bg-white/90 rounded-2xl shadow border border-white/40",
        className
      )}
    >
      {children}
    </div>
  );
}

// List Item
interface UIListItemProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function UIListItem({ title, subtitle, action }: UIListItemProps) {
  return (
    <div className="p-4 bg-white rounded-xl border border-mediqr/20 shadow-sm flex items-center justify-between hover:bg-mediqr-accent/10 transition">
      <div>
        <p className="text-mediqr-dark font-medium">{title}</p>
        {subtitle && <p className="text-mediqr-text/60 text-sm">{subtitle}</p>}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}

// Tag / Badge (Legacy - use UIBadge for new code)
interface UITagProps {
  label: string;
  color?: "green" | "red" | "mediqr";
}

export function UITag({ label, color = "mediqr" }: UITagProps) {
  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-semibold border",
        color === "green" && "bg-green-100 text-green-700 border-green-200",
        color === "red" && "bg-red-100 text-red-700 border-red-200",
        color === "mediqr" && "bg-mediqr/10 text-mediqr-dark border-mediqr/20"
      )}
    >
      {label}
    </span>
  );
}

// Modal
interface UIModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function UIModal({ open, onClose, children }: UIModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-mediqr-text/60 hover:text-mediqr-dark"
        >
          <X size={20} />
        </button>

        {children}
      </div>
    </div>
  );
}

// Sidebar
interface UISidebarProps {
  items: { label: string }[];
  onSelect: (item: { label: string }) => void;
}

export function UISidebar({ items, onSelect }: UISidebarProps) {
  return (
    <div className="w-60 bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow border border-white/30 space-y-2">
      {items.map((item) => (
        <div
          key={item.label}
          onClick={() => onSelect(item)}
          className="cursor-pointer p-3 rounded-xl hover:bg-mediqr-accent/10 transition font-medium text-mediqr-dark"
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}

// Avatar
interface UIAvatarProps {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function UIAvatar({ src, alt, fallback, size = "md", className }: UIAvatarProps) {
  const sizeClasses = {
    sm: "w-10 h-10 text-sm",
    md: "w-16 h-16 text-lg",
    lg: "w-24 h-24 text-2xl",
    xl: "w-32 h-32 text-4xl",
  };

  return (
    <div
      className={cn(
        "relative rounded-full border-4 border-mediqr-accent/20 shadow-lg overflow-hidden bg-gradient-to-br from-mediqr-accent/20 to-mediqr/20 flex items-center justify-center font-bold text-mediqr-dark",
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span>{fallback || "?"}</span>
      )}
    </div>
  );
}

// Info Card / Stat Card
interface UIInfoCardProps {
  icon?: LucideIcon;
  label: string;
  value: string | React.ReactNode;
  description?: string;
  className?: string;
}

export function UIInfoCard({ icon: Icon, label, value, description, className }: UIInfoCardProps) {
  return (
    <div
      className={cn(
        "p-4 bg-gradient-to-br from-white to-mediqr-accent/5 rounded-xl border border-mediqr-accent/10 shadow-sm hover:shadow-md transition-all",
        className
      )}
    >
      {Icon && (
        <div className="p-2 rounded-lg bg-mediqr-accent/10 text-mediqr-accent w-fit mb-3">
          <Icon size={20} />
        </div>
      )}
      <p className="text-xs font-medium text-mediqr-text/60 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-lg font-bold text-mediqr-dark">{value}</p>
      {description && (
        <p className="text-xs text-mediqr-text/50 mt-1">{description}</p>
      )}
    </div>
  );
}

// Divider
interface UIDividerProps {
  className?: string;
  label?: string;
}

export function UIDivider({ className, label }: UIDividerProps) {
  if (label) {
    return (
      <div className={cn("flex items-center gap-4 my-6", className)}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-mediqr-accent/20 to-transparent" />
        <span className="text-sm text-mediqr-text/50 font-medium">{label}</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-mediqr-accent/20 to-transparent" />
      </div>
    );
  }
  return (
    <div
      className={cn("h-px bg-gradient-to-r from-transparent via-mediqr-accent/20 to-transparent my-4", className)}
    />
  );
}

// Section Header
interface UISectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function UISectionHeader({ title, description, action, className }: UISectionHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-4", className)}>
      <div>
        <h3 className="text-lg font-bold text-mediqr-dark">{title}</h3>
        {description && (
          <p className="text-sm text-mediqr-text/60 mt-1">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// Empty State
interface UIEmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function UIEmptyState({ icon: Icon, title, description, action }: UIEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {Icon && (
        <div className="p-4 rounded-full bg-mediqr-accent/10 text-mediqr-accent mb-4">
          <Icon size={32} />
        </div>
      )}
      <h4 className="text-lg font-semibold text-mediqr-dark mb-2">{title}</h4>
      {description && (
        <p className="text-sm text-mediqr-text/60 max-w-md mb-4">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}

// Badge / Status Badge
interface UIBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
  className?: string;
}

export function UIBadge({ children, variant = "default", size = "md", className }: UIBadgeProps) {
  const variantClasses = {
    default: "bg-mediqr/10 text-mediqr-dark border-mediqr/20",
    success: "bg-green-100 text-green-700 border-green-200",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
    danger: "bg-red-100 text-red-700 border-red-200",
    info: "bg-blue-100 text-blue-700 border-blue-200",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold rounded-full border",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}

// Button Variants
interface UIButtonSecondaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function UIButtonSecondary({ children, className, ...rest }: UIButtonSecondaryProps) {
  return (
    <button
      {...rest}
      className={cn(
        "px-4 py-2 rounded-xl bg-white border-2 border-mediqr text-mediqr font-semibold shadow hover:bg-mediqr-accent/5 transition flex items-center gap-2",
        className
      )}
    >
      {children}
    </button>
  );
}

export function UIButtonGhost({ children, className, ...rest }: UIButtonSecondaryProps) {
  return (
    <button
      {...rest}
      className={cn(
        "px-4 py-2 rounded-xl text-mediqr-dark font-semibold hover:bg-mediqr-accent/10 transition flex items-center gap-2",
        className
      )}
    >
      {children}
    </button>
  );
}

// Grid Layout
interface UIGridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

export function UIGrid({ children, cols = 2, gap = "md", className }: UIGridProps) {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const gapClasses = {
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
  };

  return (
    <div
      className={cn("grid", colClasses[cols], gapClasses[gap], className)}
    >
      {children}
    </div>
  );
}

// Report Header - For medical reports and documents
interface UIReportHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  metadata?: Array<{ label: string; value: string; icon?: LucideIcon }>;
  badge?: React.ReactNode;
  className?: string;
}

export function UIReportHeader({
  title,
  subtitle,
  icon: Icon,
  metadata,
  badge,
  className,
}: UIReportHeaderProps) {
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-mediqr via-mediqr-dark to-mediqr text-white rounded-2xl p-8 shadow-xl",
        className
      )}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-3">
            {Icon && (
              <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                <Icon size={28} className="text-white" />
              </div>
            )}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
              {subtitle && (
                <p className="text-white/80 text-sm mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          {metadata && metadata.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4">
              {metadata.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-white/90">
                  {item.icon && <item.icon size={16} />}
                  <span className="text-sm">
                    <span className="font-medium">{item.label}:</span>{" "}
                    <span className="font-semibold">{item.value}</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        {badge && <div className="flex-shrink-0">{badge}</div>}
      </div>
    </div>
  );
}

// Data Field - For displaying key-value pairs with icons
interface UIDataFieldProps {
  label: string;
  value: string | React.ReactNode;
  icon?: LucideIcon;
  iconColor?: "default" | "red" | "green" | "blue" | "orange" | "purple";
  className?: string;
}

export function UIDataField({
  label,
  value,
  icon: Icon,
  iconColor = "default",
  className,
}: UIDataFieldProps) {
  const iconColorClasses = {
    default: "bg-mediqr-accent/10 text-mediqr-accent",
    red: "bg-red-50 text-red-600",
    green: "bg-green-50 text-green-600",
    blue: "bg-blue-50 text-blue-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className={cn("flex items-start gap-3", className)}>
      {Icon && (
        <div className={cn("p-2 rounded-lg flex-shrink-0", iconColorClasses[iconColor])}>
          <Icon size={18} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-mediqr-text/60 uppercase tracking-wide mb-1">
          {label}
        </p>
        <div className="font-semibold text-mediqr-dark text-base">{value}</div>
      </div>
    </div>
  );
}

// Vital Card - For displaying vital signs
interface UIVitalCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: LucideIcon;
  iconColor?: "red" | "green" | "blue" | "orange" | "purple";
  className?: string;
}

export function UIVitalCard({
  label,
  value,
  unit,
  icon: Icon,
  iconColor = "red",
  className,
}: UIVitalCardProps) {
  const iconColorClasses = {
    red: "bg-red-50 text-red-600",
    green: "bg-green-50 text-green-600",
    blue: "bg-blue-50 text-blue-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div
      className={cn(
        "p-4 rounded-xl border border-mediqr-accent/10 bg-gradient-to-br from-white to-mediqr-accent/5 hover:shadow-md transition-all",
        className
      )}
    >
      <div className="flex items-start gap-3">
        {Icon && (
          <div className={cn("p-2 rounded-lg flex-shrink-0", iconColorClasses[iconColor])}>
            <Icon size={20} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-mediqr-text/60 uppercase tracking-wide mb-1">
            {label}
          </p>
          <p className="text-lg font-bold text-mediqr-dark">
            {value}
            {unit && <span className="text-sm font-normal text-mediqr-text/70 ml-1">{unit}</span>}
          </p>
        </div>
      </div>
    </div>
  );
}

// Content Section - For displaying text content with icons
interface UIContentSectionProps {
  title: string;
  description?: string;
  content: string | React.ReactNode;
  icon?: LucideIcon;
  iconColor?: "default" | "red" | "green" | "blue" | "orange" | "purple";
  className?: string;
}

export function UIContentSection({
  title,
  description,
  content,
  icon: Icon,
  iconColor = "default",
  className,
}: UIContentSectionProps) {
  const iconColorClasses = {
    default: "bg-mediqr-accent/10 text-mediqr-accent",
    red: "bg-red-50 text-red-600",
    green: "bg-green-50 text-green-600",
    blue: "bg-blue-50 text-blue-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <UIContainer className={className}>
      <UISectionHeader title={title} description={description} />
      <div className="flex items-start gap-4">
        {Icon && (
          <div className={cn("p-3 rounded-lg flex-shrink-0", iconColorClasses[iconColor])}>
            <Icon size={22} />
          </div>
        )}
        <div className="flex-1">
          {typeof content === "string" ? (
            <p className="text-mediqr-text leading-relaxed whitespace-pre-wrap">{content}</p>
          ) : (
            content
          )}
        </div>
      </div>
    </UIContainer>
  );
}
