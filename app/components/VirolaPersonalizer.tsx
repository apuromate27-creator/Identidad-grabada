"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { Product } from "../data/products";

type Direction = "clockwise" | "counterclockwise";
type LaserView = "original" | "laser";
type DesignItem = { id: string; type: "text" | "image"; text: string; src?: string; name?: string; angle: number; radius: number; scale: number; rotation: number; font: string };

export function VirolaPersonalizer({
  product, engravingType, engravingText, font, referencePreview, referenceFileName,
  previewMode, angle, radius, scale, direction, onAngleChange, onRadiusChange,
  onScaleChange, onDirectionChange, onReset,
}: {
  product: Product; engravingType: string; engravingText: string; font: string;
  referencePreview: string; referenceFileName: string; previewMode: boolean;
  angle: number; radius: number; scale: number; direction: Direction;
  onAngleChange: (value: number) => void; onRadiusChange: (value: number) => void;
  onScaleChange: (value: number) => void; onDirectionChange: (value: Direction) => void;
  onReset: () => void;
}) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ id: string; pointerId: number } | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [laserView, setLaserView] = useState<LaserView>("laser");
  const [items, setItems] = useState<DesignItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [textDraft, setTextDraft] = useState(engravingText || "TU DISEÑO");
  const selected = items.find(item => item.id === selectedId) || null;

  useEffect(() => { setTextDraft(engravingText || "TU DISEÑO"); }, [engravingText]);
  useEffect(() => {
    if (engravingType === "Sin grabado") { setItems([]); setSelectedId(null); return; }
    setItems(current => {
      if (current.length) return current;
      const initial: DesignItem = { id: `text-${Date.now()}`, type: "text", text: engravingText || (engravingType.includes("Logo") ? "TU LOGO" : "TU DISEÑO"), angle, radius, scale, rotation: 0, font };
      if (referencePreview) return [{ ...initial, id: `image-${Date.now()}`, type: "image", src: referencePreview, name: referenceFileName || "Logo" }];
      return [initial];
    });
  // initialize the editor when the product personalization becomes active
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engravingType]);

  const addText = () => {
    const item: DesignItem = { id: `text-${Date.now()}`, type: "text", text: "Nuevo texto", angle: items.length ? 30 : angle, radius, scale: 1, rotation: 0, font };
    setItems(current => [...current, item]); setSelectedId(item.id); setTextDraft(item.text);
  };
  const addImage = (file?: File) => {
    if (!file) return;
    const reader = new FileReader(); reader.onload = () => {
      const item: DesignItem = { id: `image-${Date.now()}`, type: "image", text: "", src: String(reader.result), name: file.name, angle: items.length ? 35 : angle, radius, scale: 1, rotation: 0, font };
      setItems(current => [...current, item]); setSelectedId(item.id);
    }; reader.readAsDataURL(file);
  };
  const patchSelected = (patch: Partial<DesignItem>) => {
    if (!selectedId) return;
    setItems(current => current.map(item => item.id === selectedId ? { ...item, ...patch } : item));
  };
  const updateItemFromPointer = (event: ReactPointerEvent<HTMLElement>, id: string) => {
    const stage = stageRef.current; if (!stage) return;
    const rect = stage.getBoundingClientRect(); const cx = rect.left + rect.width * .5; const cy = rect.top + rect.height * .46;
    const dx = event.clientX - cx; const dy = event.clientY - cy;
    const a = Math.atan2(dy, dx) * 180 / Math.PI;
    const r = Math.max(58, Math.min(84, Math.sqrt(dx * dx + dy * dy) / 2));
    setItems(current => current.map(item => item.id === id ? { ...item, angle: Math.round(a), radius: Math.round(r) } : item));
  };
  const itemPointerDown = (event: ReactPointerEvent<HTMLElement>, item: DesignItem) => {
    if (previewMode) return;
    event.preventDefault(); event.stopPropagation(); setSelectedId(item.id); dragRef.current = { id: item.id, pointerId: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId); updateItemFromPointer(event, item.id);
  };
  const itemPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (dragRef.current) { event.preventDefault(); updateItemFromPointer(event, dragRef.current.id); }
  };
  const itemPointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    dragRef.current = null; if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const activeItems = engravingType === "Sin grabado" ? [] : items;

  return <div className="v192-virola-shell v1923-editor">
    <div className="v192-editor-head"><div><p className="text-xs uppercase tracking-[.18em] text-[#e2b46d]">V19.2.3 · Editor visual de virola</p><p className="mt-1 text-sm text-stone-400">Foto cenital real · textos y logos por capas · edición visual y controles precisos.</p></div>
      <div className="v192-laser-switch" aria-label="Tipo de vista"><button type="button" className={laserView === "original" ? "active" : ""} onClick={() => setLaserView("original")}>Original</button><button type="button" className={laserView === "laser" ? "active" : ""} onClick={() => setLaserView("laser")}>Vista grabado</button></div>
    </div>
    <div className="v192-workspace"><div className="v192-stage-wrap"><div className="v192-material-tag"><span /> Alpaca · simulación orientativa</div>
      <div ref={stageRef} className={`v1911-virola-stage v192-stage ${previewMode ? "is-preview" : "is-editing"} ${laserView === "laser" ? "laser-view" : "original-view"}`}>
        <img className="v1921-real-mate" src="/productos/mate-imperial-virola-superior-real.png" alt="Vista superior real del mate imperial" draggable={false} />
        <div className="v1921-ring-shade" aria-hidden="true" />
        {!previewMode && engravingType !== "Sin grabado" && <div className="v1911-virola-zone v1921-real-zone"><span>Anillo grabable</span></div>}
        {activeItems.map(item => <div key={item.id} className={`v1923-item ${selectedId === item.id && !previewMode ? "selected" : ""} ${item.type === "image" ? "image-item" : "text-item"}`}
          style={{ left: "50%", top: "46%", transform: item.type === "text" ? `translate(-50%,-50%) rotate(${item.angle}deg) scale(${item.scale}) rotate(${item.rotation}deg)` : `translate(-50%,-50%) rotate(${item.angle}deg) translateY(-${item.radius * 2}px) scale(${item.scale}) rotate(${item.rotation}deg)` }}
          onPointerDown={event => itemPointerDown(event, item)} onPointerMove={itemPointerMove} onPointerUp={itemPointerUp} onPointerCancel={itemPointerUp} role="button" aria-label={item.type === "text" ? `Editar ${item.text}` : `Editar ${item.name || "imagen"}`}>
          {item.type === "image" && item.src ? <img src={item.src} alt={item.name || "Diseño subido"} draggable={false} /> : <CurvedText text={item.text} font={item.font} direction={direction} radius={item.radius * 2} />}
        </div>)}
        {engravingType === "Sin grabado" && <div className="v1910-no-engraving">Elegí un tipo de grabado para comenzar</div>}
        <div className="v1911-virola-status"><span>{selected ? `${Math.round(selected.angle)}°` : `${Math.round(angle)}°`}</span><span>Radio {Math.round(selected?.radius ?? radius)}</span><span>{Math.round((selected?.scale ?? scale)*100)}%</span></div>
      </div>
    </div>
    {engravingType !== "Sin grabado" && <>
      <div className="v192-quickbar v1923-quickbar"><button type="button" onClick={addText}>＋ Agregar texto</button><button type="button" onClick={() => fileRef.current?.click()}>＋ Subir logo</button><button type="button" onClick={() => { if (selectedId) setItems(current => current.filter(item => item.id !== selectedId)); setSelectedId(null); }}>Eliminar seleccionado</button><button type="button" onClick={() => { setItems([]); setSelectedId(null); onReset(); }}>↺ Restablecer</button><input ref={fileRef} type="file" accept="image/*" hidden onChange={event => addImage(event.target.files?.[0])} /></div>
      <div className="v1923-panel"><div className="v1923-layers"><div className="v1923-panel-title">Capas del diseño <span>{items.length}</span></div>{items.length === 0 && <p className="text-xs text-stone-500">Agregá un texto o logo para empezar.</p>}{items.map(item => <button key={item.id} type="button" className={selectedId === item.id ? "active" : ""} onClick={() => {setSelectedId(item.id); setTextDraft(item.text);}}><span>{item.type === "text" ? "T" : "▧"}</span><span>{item.type === "text" ? (item.text || "Texto vacío") : (item.name || "Logo")}</span><small>{selectedId === item.id ? "Editando" : "Seleccionar"}</small></button>)}</div>
        <div className="v1923-controls"><div className="v1923-panel-title">Edición precisa</div>{selected ? <>
          {selected.type === "text" && <label className="v1923-text-field">Texto del diseño<input value={textDraft} onChange={event => {setTextDraft(event.target.value); patchSelected({text:event.target.value});}} maxLength={48} /></label>}
          <Range label="Posición angular" value={selected.angle} min={-180} max={180} step={1} display={`${selected.angle}°`} onChange={value => patchSelected({angle:value})}/>
          <Range label="Distancia al centro" value={selected.radius} min={58} max={84} step={1} display={`${selected.radius}`} onChange={value => patchSelected({radius:value})}/>
          <Range label="Tamaño" value={selected.scale} min={.45} max={1.65} step={.05} display={`${Math.round(selected.scale*100)}%`} onChange={value => patchSelected({scale:value})}/>
          <Range label="Rotación individual" value={selected.rotation} min={-180} max={180} step={1} display={`${selected.rotation}°`} onChange={value => patchSelected({rotation:value})}/>
          {selected.type === "text" && <div className="grid grid-cols-2 gap-2"><button type="button" className="v1923-control-button" onClick={() => patchSelected({font:"Clásica"})}>Clásica</button><button type="button" className="v1923-control-button" onClick={() => patchSelected({font:"Elegante"})}>Elegante</button></div>}
          <div className="grid grid-cols-2 gap-2"><button type="button" className="v1923-control-button" onClick={() => patchSelected({angle:0,radius:70,rotation:0})}>Centrar en aro</button><button type="button" className="v1923-control-button" onClick={() => patchSelected({scale:1,rotation:0})}>Tamaño original</button></div>
        </> : <p className="text-xs text-stone-500">Seleccioná una capa para editar su posición, tamaño y rotación.</p>}</div></div>
      <div className="v192-help"><strong>Cómo usarlo:</strong> arrastrá el texto/logo directamente sobre la foto o seleccioná una capa y usá los controles. Podés combinar varios elementos. La guía punteada es orientativa y solo aparece durante la edición.</div>
    </>}
  </div>;
}

function Range({label,value,min,max,step,display,onChange}:{label:string;value:number;min:number;max:number;step:number;display:string;onChange:(v:number)=>void}) { return <div className="grid gap-2 v1923-range"><div className="flex justify-between gap-3 text-xs font-bold text-stone-300"><span>{label}</span><strong className="text-[#e8c58f]">{display}</strong></div><input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))}/></div>; }
function CurvedText({text,font,direction,radius}:{text:string;font:string;direction:Direction;radius:number}) { const chars=Array.from(text||"TU DISEÑO").slice(0,48); const spread=Math.min(126,Math.max(42,chars.length*7.2)); const start=-spread/2; const fontClass=font==="Elegante"?"serif":font==="Moderna"?"modern":"classic"; return <div className={`v1911-curved-text v192-artwork font-${fontClass}`} style={{transform:"translate(-50%,-50%)"}}>{chars.map((char,index)=>{const progress=chars.length<=1?.5:index/(chars.length-1);const local=start+progress*spread;const signed=direction==="clockwise"?local:-local;return <span key={`${char}-${index}`} style={{transform:`rotate(${signed}deg) translateY(-${radius}px) ${direction==="counterclockwise"?"rotate(180deg)":""}`}}>{char===" "?"\u00A0":char}</span>;})}</div>; }
