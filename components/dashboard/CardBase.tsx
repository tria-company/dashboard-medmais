import type { ReactNode } from "react";

interface CardBaseProps {
  children: ReactNode;
  title?: string;
  className?: string;
  compact?: boolean;
}

export default function CardBase({
  children,
  title,
  className = "",
  compact = false,
}: CardBaseProps): React.ReactElement {
  return (
    <div
      className={`rounded-2xl border border-[#E4E4E7] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${compact ? "p-5" : "p-7"} ${className}`}
    >
      {title && (
        <h2
          className={`font-semibold text-[#2c3545] ${compact ? "mb-3 text-base" : "mb-4 text-lg"}`}
        >
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
