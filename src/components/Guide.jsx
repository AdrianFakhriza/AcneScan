import { AlertCircle, Camera, Sun, Smile, FileWarningIcon } from "lucide-react";

const Guide = () => {
  return (
    // Atribut id di bawah ini berfungsi sebagai jangkar (anchor) target scroll
    <div
      id="guide-section"
      className="max-w-3xl p-6 mx-auto mt-8 border border-blue-100 bg-blue-50 rounded-xl scroll-mt-6"
    >
      <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-blue-800">
        <AlertCircle className="w-5 h-5" />
        Panduan Penggunaan & Pengambilan Gambar
      </h3>

      {/* Menggunakan sm:grid-cols-2 untuk membentuk kotak simetris 2x2 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <Sun className="w-6 h-6 mb-2 text-amber-500" />
          <h4 className="mb-1 text-sm font-medium text-gray-800">
            Pencahayaan Merata
          </h4>
          <p className="text-xs text-gray-500">
            Ambil foto dalam kondisi cahaya terang tanpa bayangan gelap atau
            pantulan cahaya (silau).
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-sm">
          <Smile className="w-6 h-6 mb-2 text-emerald-500" />
          <h4 className="mb-1 text-sm font-medium text-gray-800">
            Wajah Bersih
          </h4>
          <p className="text-xs text-gray-500">
            Pastikan wajah bersih dari riasan (makeup) agar tekstur kulit dan
            jenis jerawat terlihat jelas.
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-sm">
          <Camera className="w-6 h-6 mb-2 text-blue-500" />
          <h4 className="mb-1 text-sm font-medium text-gray-800">
            Fokus & Sejajar
          </h4>
          <p className="text-xs text-gray-500">
            Arahkan kamera sejajar dan fokus pada area jerawat, bukan foto
            keseluruhan wajah dari jauh.
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-sm">
          <FileWarningIcon className="w-6 h-6 mb-2 text-red-400" />
          <h4 className="mb-1 text-sm font-medium text-gray-800">
            Penambahan Fokus (Opsional)
          </h4>
          <p className="text-xs text-gray-500">
            Jika diperlukan, lakukan Crop gambar agar fokus utama berada pada
            area jerawat yang ingin di analisis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Guide;
