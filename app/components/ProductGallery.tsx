
"use client";
import {useState}from"react";
import {ImageSlot}from"./ui";
export function ProductGallery({productName,gallery}:{productName:string;gallery:string[]}){const[selected,setSelected]=useState(gallery[0]||"1");return <div className="space-y-5"><button type="button" className="h-[620px] w-full bg-[#111] border border-white/10 rounded-[3rem] overflow-hidden"><ImageSlot title={`${productName} - Foto ${selected}`}/></button><div className="grid grid-cols-4 gap-4">{gallery.map(item=><button key={item} onClick={()=>setSelected(item)} className={`h-28 rounded-2xl overflow-hidden border ${selected===item?"border-[#b68b52]":"border-white/10"}`}><ImageSlot title={`Foto ${item}`} small/></button>)}</div><p className="text-zinc-500 text-sm">Cuando agregues fotos reales, esta galería queda lista para mostrar miniaturas y foto principal.</p></div>}
