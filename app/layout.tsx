import type { Metadata } from "next";
import "./globals.css";
import { PageBackground } from "./components/PageBackground";
import { BackToTopButton } from "./components/BackToTopButton";
import { CartProvider } from "./components/CartContext";
export const metadata: Metadata={title:"Identidad Grabada | Grabados Láser",description:"Tienda online de mates personalizados y grabados láser en Argentina."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body><PageBackground /><CartProvider>{children}</CartProvider>  <BackToTopButton />
</body></html>}
