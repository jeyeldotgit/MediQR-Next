"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";

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
        "bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/30 space-y-4",
        className
      )}
    >
      {(title || description || action) && (
        <div className="flex items-start justify-between gap-3">
          <div>
            {title && (
              <h2 className="text-xl font-semibold text-mediqr-dark">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-mediqr-text/70 mt-1">{description}</p>
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
        "px-4 py-2 rounded-xl bg-mediqr text-white font-semibold shadow hover:bg-mediqr-dark transition flex items-center gap-2",
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

// Tag / Badge
interface UITagProps {
  label: string;
  color?: "green" | "red" | "mediqr";
}

export function UITag({ label, color = "mediqr" }: UITagProps) {
  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-semibold",
        color === "green" && "bg-green-100 text-green-700",
        color === "red" && "bg-red-100 text-red-700",
        color === "mediqr" && "bg-mediqr/10 text-mediqr-dark"
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
