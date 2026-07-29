import type { HTMLAttributes, ReactNode } from "react";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  strength?: "soft" | "medium";
};

export function GlassCard({
  children,
  className = "",
  strength = "soft",
  ...props
}: GlassCardProps) {
  return (
    <div
      {...props}
      className={[
        "ig-glass-card",
        strength === "medium" ? "ig-glass-card--medium" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
