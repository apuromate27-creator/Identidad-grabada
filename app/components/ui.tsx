"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {contact,whatsappLink}from"../data/contact";
import {CartButton}from"./CartDrawer";

const navigation = [
  ["/", "Inicio"],
  ["/productos", "Productos"],
  ["/trabajos", "Trabajos"],
  ["/empresas", "Empresas"],
  ["/nosotros", "Nosotros"],
  ["/seguimiento", "Seguimiento"],
  ["/contacto", "Contacto"],
] as const;

export function Header({overlay=false}:{overlay?:boolean}){
  const [scrolled,setScrolled]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);

  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>28);
    onScroll();
    window.addEventListener("scroll",onScroll,{passive:true});
    return()=>window.removeEventListener("scroll",onScroll);
  },[]);

  useEffect(()=>{
    document.body.style.overflow=menuOpen?"hidden":"";
    return()=>{document.body.style.overflow=""};
  },[menuOpen]);

  const transparent=overlay&&!scrolled;

  return <>
    <header className={`${overlay?"fixed":"sticky"} ig-v187-header inset-x-0 top-0 z-[70] border-b transition-all duration-500 ${transparent?"ig-v187-header-top":"ig-v187-header-scrolled"}`}>
      <div className={`max-w-7xl mx-auto px-5 lg:px-6 flex items-center justify-between gap-5 transition-all duration-500 ${scrolled?"min-h-[66px]":"min-h-[78px]"}`}>
        <Link href="/" className="group flex items-center gap-3 shrink-0">
          <div className={`rounded-full border border-[#d6b17a]/60 bg-black/10 backdrop-blur flex items-center justify-center text-[#d6b17a] font-black shadow-[0_0_32px_rgba(182,139,82,.14)] transition-all duration-500 group-hover:scale-105 ${scrolled?"h-10 w-10 text-base":"h-12 w-12 text-lg"}`}>IG</div>
          <div className="leading-none">
            <p className={`font-black tracking-wide text-white transition-all duration-500 ${scrolled?"text-base md:text-lg":"text-lg md:text-xl"}`}>{contact.brand}</p>
            <p className={`text-[9px] md:text-[10px] text-[#d6b17a] uppercase tracking-[0.31em] transition-all duration-500 ${scrolled?"mt-1":"mt-2"}`}>Grabados láser premium</p>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-1" aria-label="Navegación principal">
          {navigation.map(([href,label])=><Link key={href} href={href} className="px-4 py-3 rounded-full text-sm font-semibold text-stone-100 hover:text-[#d6b17a] hover:bg-white/[0.06] transition">{label}</Link>)}
        </nav>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <CartButton/>
          <a href={whatsappLink("Hola, vi tu página web y quiero consultar por un producto personalizado.")} className="bg-[#b68b52] px-5 py-3 rounded-2xl font-black text-white shadow-[0_12px_32px_rgba(182,139,82,.24)] hover:-translate-y-0.5 hover:bg-[#c89a5d] transition">WhatsApp</a>
        </div>

        <button type="button" onClick={()=>setMenuOpen(true)} className="xl:hidden h-12 w-12 rounded-2xl border border-white/10 bg-[#24170f]/60 backdrop-blur text-white text-xl" aria-label="Abrir menú">☰</button>
      </div>
    </header>

    <div className={`fixed inset-0 z-[90] xl:hidden transition-opacity duration-300 ${menuOpen?"opacity-100 pointer-events-auto":"opacity-0 pointer-events-none"}`}>
      <button type="button" className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={()=>setMenuOpen(false)} aria-label="Cerrar menú"/>
      <aside className={`absolute right-0 top-0 h-full w-[88%] max-w-sm bg-black/55 border-l border-[#d6b17a]/25 p-6 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ${menuOpen?"translate-x-0":"translate-x-full"}`}>
        <div className="flex items-center justify-between">
          <div><p className="text-xl font-black">Identidad Grabada</p><p className="mt-1 text-xs uppercase tracking-[0.25em] text-[#d6b17a]">Navegación</p></div>
          <button type="button" onClick={()=>setMenuOpen(false)} className="h-11 w-11 rounded-xl border border-white/10 text-xl" aria-label="Cerrar menú">×</button>
        </div>
        <nav className="mt-8 grid gap-2" aria-label="Navegación móvil">
          {navigation.map(([href,label])=><Link key={href} href={href} onClick={()=>setMenuOpen(false)} className="rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4 text-lg font-bold hover:border-[#d6b17a]/50 hover:text-[#d6b17a] transition">{label}</Link>)}
        </nav>
        <div className="mt-8 grid gap-3">
          <div className="rounded-2xl border border-[#d6b17a]/35 p-2"><CartButton/></div>
          <a href={whatsappLink("Hola, vi tu página web y quiero consultar por un producto personalizado.")} className="rounded-2xl bg-[#b68b52] px-5 py-4 text-center font-black text-white">Consultar por WhatsApp</a>
        </div>
      </aside>
    </div>
  </>;
}

export function Footer(){return <footer className="ig-v187-footer border-t border-white/10"><div className="max-w-7xl mx-auto px-6 py-14 md:py-16"><div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4"><div><h3 className="text-3xl font-black">Identidad Grabada</h3><p className="mt-3 text-[#d6b17a]">Grabados láser personalizados.</p><p className="mt-5 max-w-sm text-zinc-500">Productos con identidad, diseño aprobado antes de grabar y atención directa durante todo el proceso.</p><p className="mt-5 text-sm text-zinc-600">{contact.city}</p></div><div><h4 className="font-black text-white">Tienda</h4><div className="mt-5 grid gap-3 text-zinc-400"><Link href="/productos">Productos</Link><Link href="/trabajos">Trabajos realizados</Link><Link href="/empresas">Empresas</Link><Link href="/seguimiento">Seguimiento</Link></div></div><div><h4 className="font-black text-white">Información</h4><div className="mt-5 grid gap-3 text-zinc-400"><Link href="/nosotros">Nosotros</Link><Link href="/contacto">Contacto</Link><p>Envíos a toda Argentina</p><p>Producción estimada: 2 a 5 días</p></div></div><div><h4 className="font-black text-white">Contacto</h4><div className="mt-5 grid gap-3"><a href={contact.instagramUrl} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 px-5 py-4 text-center hover:border-[#b68b52]">Instagram</a><a href={whatsappLink("Hola, quiero consultar por un grabado personalizado.")} className="rounded-2xl bg-[#b68b52] px-5 py-4 text-center font-black">WhatsApp</a></div></div></div><div className="ig-gold-line mt-12"/><div className="mt-6 flex flex-col gap-3 text-sm text-zinc-600 md:flex-row md:items-center md:justify-between"><p>© 2026 Identidad Grabada</p><p>General Las Heras · Buenos Aires · Argentina</p></div></div></footer>}

export function WhatsAppFloat(){return <a href={whatsappLink("Hola, vi tu página web y quiero consultar por un producto personalizado.")} className="fixed bottom-6 right-6 z-30 bg-green-700 hover:bg-green-600 text-white px-5 py-4 rounded-full shadow-2xl font-black">WhatsApp</a>}
export function Title({eyebrow,title,text}:{eyebrow:string;title:string;text?:string}){return <div><p className="text-[#d6b17a] uppercase tracking-[0.3em] text-sm">{eyebrow}</p><h2 className="text-4xl md:text-6xl font-black mt-3 leading-tight">{title}</h2>{text&&<p className="text-zinc-400 text-lg mt-4 max-w-2xl leading-relaxed">{text}</p>}</div>}
export function Placeholder({title,small=false}:{title:string;small?:boolean}){return <div className="relative flex items-center justify-center w-full h-full min-h-[220px] bg-[#342217]"><div className="absolute w-52 h-52 rounded-full border-[18px] border-[#b68b52]/40"/><div className="absolute w-32 h-32 rounded-full border-[10px] border-white/20"/><div className="relative z-10 text-center px-6"><p className={`font-black text-[#d6b17a] ${small?"text-2xl":"text-4xl"}`}>Identidad Grabada</p><p className="text-zinc-500 uppercase tracking-[0.25em] text-xs mt-3">{title}</p></div></div>}
export function ImageSlot({title,small=false}:{src?:string;alt?:string;title:string;small?:boolean}){return <Placeholder title={title} small={small}/>}
export function InfoBox({title,text}:{title:string;text:string}){return <div className="bg-[#1d130d]/45/40 border border-white/10 rounded-2xl p-5"><p className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-2">{title}</p><p className="font-bold">{text}</p></div>}
