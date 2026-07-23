
import type { ReactNode } from "react";

export function BackgroundSection({
  children,
  image,
  className = "",
  overlay = "bg-[#24170f]/48",
  id,
  position = "center",
}: {
  children: ReactNode;
  image: string;
  className?: string;
  overlay?: string;
  id?: string;
  position?: string;
}) {
  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden ${className}`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: position,
        backgroundAttachment: "fixed",
      }}
    >
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#3a2415]/18 via-transparent to-[#21140d]/45" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
