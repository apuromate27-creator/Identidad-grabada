"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { Product } from "../data/products";

type Direction = "clockwise" | "counterclockwise";
type LaserView = "original" | "laser";

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
  const dragging = useRef(false);
  const [laserView, setLaserView] = useState<LaserView>("laser");

  const label = engravingType === "Sin grabado" ? "" : engravingText ||
    (engravingType.includes("Logo") ? "TU LOGO" : "TU DISEÑO");

  const updateAngle = (event: ReactPointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    onAngleChange(Math.round(Math.atan2(event.clientY - cy, event.clientX - cx) * 180 / Math.PI));
  };
  const pointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (previewMode || engravingType === "Sin grabado") return;
    dragging.current = true; event.currentTarget.setPointerCapture(event.pointerId); updateAngle(event);
  };
  const pointerMove = (event: ReactPointerEvent<HTMLDivElement>) => { if (dragging.current) updateAngle(event); };
  const pointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return <div className="v192-virola-shell">
    <div className="v192-editor-head">
      <div>
        <p className="text-xs uppercase tracking-[.18em] text-[#e2b46d]">V19.2 · Personalizador de virola</p>
        <p className="mt-1 text-sm text-stone-400">Foto/mockup + zona limitada + simulación visual de láser.</p>
      </div>
      <div className="v192-laser-switch" aria-label="Tipo de vista">
        <button type="button" className={laserView === "original" ? "active" : ""} onClick={() => setLaserView("original")}>Original</button>
        <button type="button" className={laserView === "laser" ? "active" : ""} onClick={() => setLaserView("laser")}>Vista grabado</button>
      </div>
    </div>

    <div className="v192-workspace">
      <div className="v192-stage-wrap">
        <div className="v192-material-tag"><span /> Alpaca · simulación orientativa</div>
        <div ref={stageRef} className={`v1911-virola-stage v192-stage ${previewMode ? "is-preview" : "is-editing"} ${laserView === "laser" ? "laser-view" : "original-view"}`}
          onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
          <div className="v1911-virola-disc">
            <div className="v1911-virola-metal" />
            <div className="v192-inner-mate"><span>A PURO MATE</span><small>Vista superior</small></div>
          </div>
          {!previewMode && engravingType !== "Sin grabado" && <div className="v1911-virola-zone"><span>Área segura de grabado</span></div>}
          {engravingType !== "Sin grabado" && (referencePreview ?
            <div className="v1911-virola-logo v192-artwork" style={{transform:`translate(-50%,-50%) rotate(${angle}deg) translateY(-${radius * 2}px) scale(${scale})`}}>
              <img src={referencePreview} alt={referenceFileName || "Logo"} draggable={false}/>
            </div> :
            <CurvedText text={label} font={font} angle={angle} radius={radius} scale={scale} direction={direction}/>
          )}
          {engravingType === "Sin grabado" && <div className="v1910-no-engraving">Elegí un tipo de grabado para comenzar</div>}
          <div className="v1911-virola-status"><span>{Math.round(angle)}°</span><span>Radio {Math.round(radius)}</span><span>{Math.round(scale*100)}%</span></div>
        </div>
      </div>

      {engravingType !== "Sin grabado" && <div className="v192-quickbar">
        <button type="button" onClick={() => onAngleChange(0)}>⌖ Centrar</button>
        <button type="button" onClick={() => onScaleChange(Math.max(.6, scale-.1))}>− Tamaño</button>
        <button type="button" onClick={() => onScaleChange(Math.min(1.5, scale+.1))}>+ Tamaño</button>
        <button type="button" onClick={onReset}>↺ Restablecer</button>
      </div>}
    </div>

    <div className="v192-help"><strong>Cómo probarlo:</strong> arrastrá alrededor de la virola para ubicar el diseño, ajustá radio y tamaño, y alterná entre <b>Original</b> y <b>Vista grabado</b>.</div>

    {engravingType !== "Sin grabado" && <div className="v1911-virola-tools v192-tools mt-4 grid gap-4 rounded-2xl border border-[#d8aa62]/16 p-4">
      <Range label="Posición alrededor de la virola" value={angle} min={-180} max={180} step={1} display={`${Math.round(angle)}°`} onChange={onAngleChange}/>
      <Range label="Distancia al centro" value={radius} min={52} max={88} step={1} display={`${Math.round(radius)}`} onChange={onRadiusChange}/>
      <Range label="Tamaño del diseño" value={scale} min={.6} max={1.5} step={.05} display={`${Math.round(scale*100)}%`} onChange={onScaleChange}/>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" className={direction === "clockwise" ? "active" : ""} onClick={() => onDirectionChange("clockwise")}>↻ Lectura horaria</button>
        <button type="button" className={direction === "counterclockwise" ? "active" : ""} onClick={() => onDirectionChange("counterclockwise")}>↺ Lectura antihoraria</button>
      </div>
    </div>}
  </div>;
}

function Range({label,value,min,max,step,display,onChange}:{label:string;value:number;min:number;max:number;step:number;display:string;onChange:(v:number)=>void}) {
  return <div className="grid gap-2"><div className="flex justify-between gap-3 text-xs font-bold text-stone-300"><span>{label}</span><strong className="text-[#e8c58f]">{display}</strong></div><input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))}/></div>;
}

function CurvedText({text,font,angle,radius,scale,direction}:{text:string;font:string;angle:number;radius:number;scale:number;direction:Direction}) {
  const chars=Array.from(text||"TU DISEÑO").slice(0,28); const spread=Math.min(126,Math.max(42,chars.length*8.5)); const start=-spread/2;
  const fontClass=font==="Elegante"?"serif":font==="Moderna"?"modern":"classic";
  return <div className={`v1911-curved-text v192-artwork font-${fontClass}`} style={{transform:`translate(-50%,-50%) rotate(${angle}deg) scale(${scale})`}}>{chars.map((char,index)=>{const progress=chars.length<=1?.5:index/(chars.length-1);const local=start+progress*spread;const signed=direction==="clockwise"?local:-local;return <span key={`${char}-${index}`} style={{transform:`rotate(${signed}deg) translateY(-${radius*2}px) ${direction==="counterclockwise"?"rotate(180deg)":""}`}}>{char===" "?"\u00A0":char}</span>})}</div>;
}
