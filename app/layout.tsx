import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./components/CartContext";
export const metadata: Metadata={title:"Identidad Grabada | Grabados Láser",description:"Tienda online de mates personalizados y grabados láser en Argentina."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body><CartProvider>{children}</CartProvider></body></html>}
