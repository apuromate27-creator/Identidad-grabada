
import type { ReactNode } from "react";

export function BackgroundSection({
  children,
  image,
  className = "",
  overlay = "bg-black/65",
  id,
}: {
  children: ReactNode;
  image: string;
  className?: string;
  overlay?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden ${className}`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/45" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
