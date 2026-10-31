import React, { useState, useRef, useCallback } from "react";
import { Check, X, RotateCw, ZoomIn, ZoomOut, Move, Scissors } from "lucide-react";

type ImageCropperModalProps = {
  isOpen: boolean;
  imageSrc: string;
  aspectRatio?: number; // e.g. 1 for 1:1, 16/9 for widescreen, undefined for free
  title?: string;
  onCropComplete: (croppedDataUrl: string) => void;
  onClose: () => void;
};

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  isOpen,
  imageSrc,
  aspectRatio = 1,
  title = "Crop Image",
  onCropComplete,
  onClose,
}) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0); // 0, 90, 180, 270
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedRatio, setSelectedRatio] = useState<number | undefined>(aspectRatio);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Handle Drag / Pan
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Handle Wheel Zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setZoom((prev) => Math.min(Math.max(0.5, prev + delta), 4));
  };

  // Crop & Export to DataURL
  const handleApplyCrop = () => {
    const img = imageRef.current;
    if (!img) return;

    // Standard output dimension
    const outputWidth = selectedRatio ? (selectedRatio >= 1 ? 800 : 800 * selectedRatio) : 800;
    const outputHeight = selectedRatio ? (selectedRatio >= 1 ? 800 / selectedRatio : 800) : 800;

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(outputWidth);
    canvas.height = Math.round(outputHeight);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingQuality = "high";
    ctx.imageSmoothingEnabled = true;

    // Viewport box measurement
    const cropBoxSize = 300; // visual crop box base dimension in px
    const cropBoxW = selectedRatio && selectedRatio < 1 ? cropBoxSize * selectedRatio : cropBoxSize;

    // Center canvas context
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);

    // Scaling ratio from visual crop box to output canvas
    const scaleFactor = canvas.width / cropBoxW;

    ctx.scale(zoom * scaleFactor, zoom * scaleFactor);
    ctx.translate(pan.x / zoom, pan.y / zoom);

    // Draw the image centered
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

    const croppedDataUrl = canvas.toDataURL("image/jpeg", 0.92);
    onCropComplete(croppedDataUrl);
    onClose();
  };

  if (!isOpen || !imageSrc) return null;

  // Determine visual crop box sizing
  const cropBoxSize = 280;
  const boxW = selectedRatio && selectedRatio < 1 ? cropBoxSize * selectedRatio : cropBoxSize;
  const boxH = selectedRatio && selectedRatio > 1 ? cropBoxSize / selectedRatio : cropBoxSize;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative w-full max-w-xl rounded-2xl border border-white/15 bg-[#121212] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 bg-[#181818]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#d4af37]/15 text-[#d4af37]">
              <Scissors size={16} />
            </div>
            <h3 className="font-bold text-sm text-white">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        {/* Aspect Ratio Selector */}
        <div className="flex items-center justify-center gap-2 px-5 py-2.5 border-b border-white/10 bg-[#141414] text-xs">
          <span className="text-white/50 mr-1 text-[11px] uppercase tracking-wider font-semibold">Aspect:</span>
          {[
            { label: "1:1 Square", val: 1 },
            { label: "16:9 Wide", val: 16 / 9 },
            { label: "4:3 Standard", val: 4 / 3 },
          ].map(({ label, val }) => (
            <button
              key={label}
              type="button"
              onClick={() => setSelectedRatio(val)}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                selectedRatio === val
                  ? "bg-[#d4af37] text-black font-bold"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Cropper Viewport Container */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          className="relative h-80 sm:h-96 w-full bg-[#080808] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        >
          {/* Target Image under transform */}
          <img
            ref={imageRef}
            src={imageSrc}
            alt="To crop"
            draggable={false}
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) rotate(${rotation}deg) scale(${zoom})`,
              transformOrigin: "center center",
              maxHeight: "none",
              maxWidth: "none",
            }}
            className="pointer-events-none transition-transform duration-75"
          />

          {/* Mask Darkening Outside Crop Box */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {/* The transparent cutout */}
            <div
              style={{ width: `${boxW}px`, height: `${boxH}px` }}
              className="relative border-2 border-[#d4af37] shadow-[0_0_0_9999px_rgba(0,0,0,0.65)] rounded-lg pointer-events-none"
            >
              {/* Rule of thirds grid lines */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-25">
                <div className="border-r border-b border-white" />
                <div className="border-r border-b border-white" />
                <div className="border-b border-white" />
                <div className="border-r border-b border-white" />
                <div className="border-r border-b border-white" />
                <div className="border-b border-white" />
                <div className="border-r border-white" />
                <div className="border-r border-white" />
                <div />
              </div>
            </div>
          </div>

          {/* Hint Overlay */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 border border-white/10 text-[11px] text-white/70 flex items-center gap-1.5 pointer-events-none">
            <Move size={12} />
            <span>Drag to reposition &bull; Scroll to zoom</span>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="p-4 bg-[#141414] border-t border-white/10 space-y-3">
          {/* Zoom Slider & Rotate */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1">
              <ZoomOut size={16} className="text-white/50 shrink-0" />
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full h-1.5 rounded-lg bg-white/20 accent-[#d4af37] cursor-pointer"
              />
              <ZoomIn size={16} className="text-white/50 shrink-0" />
              <span className="text-xs font-mono text-white/50 w-10 text-right">
                {Math.round(zoom * 100)}%
              </span>
            </div>

            <button
              type="button"
              onClick={() => setRotation((prev) => (prev + 90) % 360)}
              title="Rotate 90°"
              className="p-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition shrink-0"
            >
              <RotateCw size={15} />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-white/15 text-xs font-semibold text-white/70 hover:bg-white/10 hover:text-white transition"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleApplyCrop}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#d4af37] text-xs font-bold text-black hover:bg-[#e8ca83] transition shadow-lg shadow-[#d4af37]/20"
            >
              <Check size={15} />
              <span>Apply &amp; Save Crop</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
