
"use client";

import { usePathname } from "next/navigation";

type BackgroundConfig = {
  file: string;
  routeClass: string;
  position?: string;
};

function getBackground(pathname: string): BackgroundConfig {
  if (pathname === "/") {
    return {
      file: "/backgrounds/inicio.jpg",
      routeClass: "ig-route-home",
      position: "center top",
    };
  }

  if (pathname === "/productos") {
    return {
      file: "/backgrounds/productos.jpg",
      routeClass: "ig-route-internal ig-route-productos",
    };
  }

  if (pathname.startsWith("/productos/")) {
    return {
      file: "/backgrounds/producto-detalle.jpg",
      routeClass: "ig-route-internal ig-route-producto",
    };
  }

  if (pathname.startsWith("/trabajos")) {
    return {
      file: "/backgrounds/trabajos.jpg",
      routeClass: "ig-route-internal ig-route-trabajos",
    };
  }

  if (pathname.startsWith("/empresas")) {
    return {
      file: "/backgrounds/empresas.jpg",
      routeClass: "ig-route-internal ig-route-empresas",
    };
  }

  if (pathname.startsWith("/nosotros")) {
    return {
      file: "/backgrounds/nosotros.jpg",
      routeClass: "ig-route-internal ig-route-nosotros",
    };
  }

  if (pathname.startsWith("/seguimiento")) {
    return {
      file: "/backgrounds/seguimiento.jpg",
      routeClass: "ig-route-internal ig-route-seguimiento",
    };
  }

  if (pathname.startsWith("/contacto")) {
    return {
      file: "/backgrounds/contacto.jpg",
      routeClass: "ig-route-internal ig-route-contacto",
    };
  }

  if (pathname.startsWith("/checkout")) {
    return {
      file: "/backgrounds/checkout.jpg",
      routeClass: "ig-route-internal ig-route-checkout",
    };
  }

  if (pathname.startsWith("/pago/")) {
    return {
      file: "/backgrounds/pago.jpg",
      routeClass: "ig-route-internal ig-route-pago",
    };
  }

  return {
    file: "/backgrounds/inicio.jpg",
    routeClass: "ig-route-internal",
  };
}

export function PageBackground() {
  const pathname = usePathname();
  const config = getBackground(pathname);

  return (
    <div
      aria-hidden="true"
      className={`ig-page-scene ${config.routeClass}`}
      style={{
        backgroundImage: `url("${config.file}")`,
        backgroundPosition: config.position || "center",
      }}
    >
      <div className="ig-page-scene-overlay" />
      <div className="ig-page-scene-light" />
    </div>
  );
}
