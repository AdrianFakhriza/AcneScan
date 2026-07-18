import { useRef, useState, useEffect, useCallback } from "react";
import { Crop as CropIcon, X, Check, RotateCcw } from "lucide-react";

// Ukuran titik pegangan sudut (px) dan ukuran minimum kotak crop (px pada tampilan).
const HANDLE = 14;
const MIN_SIZE = 40;

const ImageCropper = ({ image, onConfirm, onCancel }) => {
  const imgRef = useRef(null);
  const dragRef = useRef(null); // { mode, startX, startY, orig }
  const [imgBox, setImgBox] = useState({ width: 0, height: 0 }); // ukuran gambar saat dirender
  const [natural, setNatural] = useState({ width: 0, height: 0 }); // ukuran asli gambar
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [ready, setReady] = useState(false);

  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  // Inisialisasi kotak crop (80% area, di tengah) saat gambar selesai dimuat.
  const initCrop = useCallback(() => {
    const el = imgRef.current;
    if (!el) return;
    const rw = el.clientWidth;
    const rh = el.clientHeight;
    setImgBox({ width: rw, height: rh });
    setNatural({ width: el.naturalWidth, height: el.naturalHeight });
    const w = rw * 0.8;
    const h = rh * 0.8;
    setCrop({ x: (rw - w) / 2, y: (rh - h) / 2, width: w, height: h });
    setReady(true);
  }, []);

  useEffect(() => {
    const onResize = () => initCrop();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [initCrop]);

  const startDrag = (e, mode) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current = {
      mode,
      startX: e.clientX,
      startY: e.clientY,
      orig: { ...crop },
    };
  };

  // Pointer events menyatukan mouse & sentuhan (mobile) sekaligus.
  useEffect(() => {
    const onMove = (e) => {
      const d = dragRef.current;
      if (!d) return;
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      const maxW = imgBox.width;
      const maxH = imgBox.height;
      let { x, y, width, height } = d.orig;

      if (d.mode === "move") {
        x = clamp(d.orig.x + dx, 0, maxW - width);
        y = clamp(d.orig.y + dy, 0, maxH - height);
      } else {
        const right = d.orig.x + d.orig.width;
        const bottom = d.orig.y + d.orig.height;
        if (d.mode.includes("w")) {
          x = clamp(d.orig.x + dx, 0, right - MIN_SIZE);
          width = right - x;
        }
        if (d.mode.includes("e")) {
          width = clamp(d.orig.width + dx, MIN_SIZE, maxW - d.orig.x);
        }
        if (d.mode.includes("n")) {
          y = clamp(d.orig.y + dy, 0, bottom - MIN_SIZE);
          height = bottom - y;
        }
        if (d.mode.includes("s")) {
          height = clamp(d.orig.height + dy, MIN_SIZE, maxH - d.orig.y);
        }
      }
      setCrop({ x, y, width, height });
    };
    const onUp = () => {
      dragRef.current = null;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [imgBox]);

  // Memetakan koordinat tampilan -> koordinat asli gambar, lalu potong via canvas.
  const handleConfirm = () => {
    const el = imgRef.current;
    if (!el || !ready) return;
    const scaleX = natural.width / imgBox.width;
    const scaleY = natural.height / imgBox.height;
    const sx = Math.round(crop.x * scaleX);
    const sy = Math.round(crop.y * scaleY);
    const sw = Math.round(crop.width * scaleX);
    const sh = Math.round(crop.height * scaleY);

    const canvas = document.createElement("canvas");
    canvas.width = sw;
    canvas.height = sh;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(el, sx, sy, sw, sh, 0, 0, sw, sh);
    onConfirm(canvas.toDataURL("image/jpeg", 0.95));
  };

  const corners = [
    { id: "nw", style: { left: -HANDLE / 2, top: -HANDLE / 2, cursor: "nwse-resize" } },
    { id: "ne", style: { right: -HANDLE / 2, top: -HANDLE / 2, cursor: "nesw-resize" } },
    { id: "sw", style: { left: -HANDLE / 2, bottom: -HANDLE / 2, cursor: "nesw-resize" } },
    { id: "se", style: { right: -HANDLE / 2, bottom: -HANDLE / 2, cursor: "nwse-resize" } },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 z-[70] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg overflow-hidden bg-white rounded-2xl">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2 font-medium text-gray-800">
            <CropIcon className="w-5 h-5 text-blue-500" />
            Sesuaikan Area Gambar
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 text-gray-500 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="px-5 pt-3 text-sm text-gray-500">
          Geser kotak untuk memindahkan, tarik titik sudut untuk mengubah ukuran.
          Pastikan hanya area kulit berjerawat yang tercakup agar deteksi lebih akurat.
        </p>

        <div className="flex items-center justify-center p-5">
          <div className="relative inline-block select-none touch-none">
            <img
              ref={imgRef}
              src={image}
              alt="Crop"
              onLoad={initCrop}
              draggable={false}
              className="block max-h-[55vh] max-w-full rounded-lg"
            />

            {ready && (
              <>
                {/* Lapisan gelap di luar kotak crop (dibatasi area gambar). */}
                <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                  <div
                    className="absolute border-2 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]"
                    style={{
                      left: crop.x,
                      top: crop.y,
                      width: crop.width,
                      height: crop.height,
                    }}
                  />
                </div>

                {/* Kotak crop interaktif + titik sudut. */}
                <div
                  onPointerDown={(e) => startDrag(e, "move")}
                  className="absolute cursor-move"
                  style={{
                    left: crop.x,
                    top: crop.y,
                    width: crop.width,
                    height: crop.height,
                  }}
                >
                  {corners.map((c) => (
                    <div
                      key={c.id}
                      onPointerDown={(e) => startDrag(e, c.id)}
                      className="absolute bg-blue-500 border-2 border-white rounded-full"
                      style={{ width: HANDLE, height: HANDLE, ...c.style }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-3 px-5 py-4 border-t border-gray-100">
          <button
            onClick={initCrop}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Batal
            </button>
            <button
              onClick={handleConfirm}
              className="flex items-center gap-2 px-5 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              <Check className="w-4 h-4" /> Terapkan Crop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
