"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import type { Product } from "../data/products";

type Direction = "clockwise" | "counterclockwise";

export function VirolaPersonalizer({
  product,
  engravingType,
  engravingText,
  font,
  referencePreview,
  referenceFileName,
  previewMode,
  angle,
  radius,
  scale,
  direction,
  onAngleChange,
  onRadiusChange,
  onScaleChange,
  onDirectionChange,
  onReset,
}: {
  product: Product;
  engravingType: string;
  engravingText: string;
  font: string;
  referencePreview: string;
  referenceFileName: string;
  previewMode: boolean;
  angle: number;
  radius: number;
  scale: number;
  direction: Direction;
  onAngleChange: (value: number) => void;
  onRadiusChange: (value: number) => void;
  onScaleChange: (value: number) => void;
  onDirectionChange: (value: Direction) => void;
  onReset: () => void;
}) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const label =
    engravingType === "Sin grabado"
      ? ""
      : engravingText ||
        (engravingType.includes("Logo") ? "TU LOGO" : "TU DISEÑO");

  const updateAngle = (event: ReactPointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const next = Math.atan2(event.clientY - cy, event.clientX - cx) * 180 / Math.PI;
    onAngleChange(Math.round(next));
  };

  const pointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (previewMode || engravingType === "Sin grabado") return;
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateAngle(event);
  };

  const pointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragging.current) updateAngle(event);
  };

  const pointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="v1911-virola-shell">
      <div className="v1910-editor-toolbar">
        <div>
          <p className="text-xs uppercase tracking-[.18em] text-[#e2b46d]">
            Personalizador de virola
          </p>
          <p className="mt-1 text-sm text-stone-400">
            {previewMode
              ? "Vista limpia del resultado"
              : "Arrastrá alrededor del aro para mover el grabado"}
          </p>
        </div>
        {!previewMode && engravingType !== "Sin grabado" && (
          <button type="button" onClick={onReset} className="v1910-reset">
            Restablecer
          </button>
        )}
      </div>

      <div
        ref={stageRef}
        className={`v1911-virola-stage ${previewMode ? "is-preview" : "is-editing"}`}
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
        onPointerCancel={pointerUp}
      >
        <div className="v1911-virola-disc">
          <div className="v1911-virola-metal" />
          <div className="v1911-virola-center">
            <span>Vista superior</span>
            <strong>{product.name}</strong>
          </div>
        </div>

        {!previewMode && engravingType !== "Sin grabado" && (
          <div className="v1911-virola-zone">
            <span>Zona grabable</span>
          </div>
        )}

        {engravingType !== "Sin grabado" && (
          referencePreview ? (
            <div
              className="v1911-virola-logo"
              style={{
                transform: `translate(-50%,-50%) rotate(${angle}deg) translateY(-${radius * 2}px) scale(${scale})`,
              }}
            >
              <img src={referencePreview} alt={referenceFileName || "Logo"} draggable={false} />
            </div>
          ) : (
            <CurvedText
              text={label}
              font={font}
              angle={angle}
              radius={radius}
              scale={scale}
              direction={direction}
            />
          )
        )}

        {engravingType === "Sin grabado" && (
          <div className="v1910-no-engraving">Virola sin grabado</div>
        )}

        <div className="v1911-virola-status">
          <span>{Math.round(angle)}°</span>
          <span>Radio {Math.round(radius)}</span>
          <span>{direction === "clockwise" ? "Horario" : "Antihorario"}</span>
        </div>
      </div>

      <div className="v1910-editor-hints">
        <span>↻ Arrastrar alrededor</span>
        <span>⤢ Escalar</span>
        <span>◎ Radio</span>
        <span>Vista superior orientativa</span>
      </div>

      {engravingType !== "Sin grabado" && (
        <div className="v1911-virola-tools mt-4 grid gap-4 rounded-2xl border border-[#d8aa62]/16 p-4">
          <div className="grid gap-2">
            <div className="flex justify-between text-xs font-bold text-stone-300">
              <span>Ángulo</span><strong className="text-[#e8c58f]">{Math.round(angle)}°</strong>
            </div>
            <input type="range" min={-180} max={180} step={1} value={angle}
              onChange={(e) => onAngleChange(Number(e.target.value))} />
          </div>

          <div className="grid gap-2">
            <div className="flex justify-between text-xs font-bold text-stone-300">
              <span>Radio</span><strong className="text-[#e8c58f]">{Math.round(radius)}</strong>
            </div>
            <input type="range" min={52} max={88} step={1} value={radius}
              onChange={(e) => onRadiusChange(Number(e.target.value))} />
          </div>

          <div className="grid gap-2">
            <div className="flex justify-between text-xs font-bold text-stone-300">
              <span>Tamaño</span><strong className="text-[#e8c58f]">{Math.round(scale * 100)}%</strong>
            </div>
            <input type="range" min={0.6} max={1.5} step={0.05} value={scale}
              onChange={(e) => onScaleChange(Number(e.target.value))} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button type="button" className={direction === "clockwise" ? "active" : ""}
              onClick={() => onDirectionChange("clockwise")}>↻ Horario</button>
            <button type="button" className={direction === "counterclockwise" ? "active" : ""}
              onClick={() => onDirectionChange("counterclockwise")}>↺ Antihorario</button>
          </div>
        </div>
      )}
    </div>
  );
}

function CurvedText({
  text, font, angle, radius, scale, direction,
}: {
  text: string;
  font: string;
  angle: number;
  radius: number;
  scale: number;
  direction: Direction;
}) {
  const chars = Array.from(text || "TU DISEÑO").slice(0, 28);
  const spread = Math.min(126, Math.max(42, chars.length * 8.5));
  const start = -spread / 2;
  const fontClass = font === "Elegante" ? "serif" : font === "Moderna" ? "modern" : "classic";

  return (
    <div className={`v1911-curved-text font-${fontClass}`}
      style={{ transform: `translate(-50%,-50%) rotate(${angle}deg) scale(${scale})` }}>
      {chars.map((char, index) => {
        const progress = chars.length <= 1 ? .5 : index / (chars.length - 1);
        const local = start + progress * spread;
        const signed = direction === "clockwise" ? local : -local;
        return (
          <span key={`${char}-${index}`}
            style={{ transform: `rotate(${signed}deg) translateY(-${radius * 2}px) ${direction === "counterclockwise" ? "rotate(180deg)" : ""}` }}>
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </div>
  );
}
