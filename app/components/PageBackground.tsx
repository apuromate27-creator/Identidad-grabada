
"use client";

import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";

type BackgroundConfig = {
  desktop: string;
  mobile: string;
  routeClass: string;
  desktopPosition?: string;
  mobilePosition?: string;
};

function config(
  name: string,
  routeClass: string,
  desktopPosition = "center",
  mobilePosition = "center"
): BackgroundConfig {
  return {
    desktop: `/backgrounds/${name}.jpg`,
    mobile: `/backgrounds/${name}-mobile.jpg`,
    routeClass,
    desktopPosition,
    mobilePosition,
  };
}

function getBackground(pathname: string): BackgroundConfig {
  if (pathname === "/") {
    return config("inicio", "ig-route-home", "center top", "62% top");
  }
  if (pathname === "/productos") {
    return config("productos", "ig-route-internal ig-route-productos", "center", "58% center");
  }
  if (pathname.startsWith("/productos/")) {
    return config("producto-detalle", "ig-route-internal ig-route-producto", "center", "58% center");
  }
  if (pathname.startsWith("/trabajos")) {
    return config("trabajos", "ig-route-internal ig-route-trabajos", "center", "56% center");
  }
  if (pathname.startsWith("/empresas")) {
    return config("empresas", "ig-route-internal ig-route-empresas", "center", "60% center");
  }
  if (pathname.startsWith("/nosotros")) {
    return config("nosotros", "ig-route-internal ig-route-nosotros", "center", "55% center");
  }
  if (pathname.startsWith("/seguimiento")) {
    return config("seguimiento", "ig-route-internal ig-route-seguimiento", "center", "58% center");
  }
  if (pathname.startsWith("/contacto")) {
    return config("contacto", "ig-route-internal ig-route-contacto", "center", "60% center");
  }
  if (pathname.startsWith("/checkout")) {
    return config("checkout", "ig-route-internal ig-route-checkout", "center", "55% center");
  }
  if (pathname.startsWith("/pago/")) {
    return config("pago", "ig-route-internal ig-route-pago", "center", "55% center");
  }

  return config("inicio", "ig-route-internal", "center", "60% center");
}

export function PageBackground() {
  const pathname = usePathname();
  const background = getBackground(pathname);

  const style = {
    "--ig-bg-desktop": `url("${background.desktop}")`,
    "--ig-bg-mobile": `url("${background.mobile}")`,
    "--ig-bg-position-desktop": background.desktopPosition || "center",
    "--ig-bg-position-mobile": background.mobilePosition || "center",
  } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      className={`ig-page-scene ${background.routeClass}`}
      style={style}
    >
      <div className="ig-page-scene-overlay" />
      <div className="ig-page-scene-light" />
    </div>
  );
}
