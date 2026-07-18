import { useRef } from "react";
import {
  UploadCloud,
  Camera,
  FolderOpen,
  X,
  Crop,
  LoaderCircle,
} from "lucide-react";

const ImageUploader = ({
  image,
  onImageSelect,
  onCameraOpen,
  onCropOpen,
  onStart,
  isAnalyzing,
}) => {
  const fileInputRef = useRef(null);

  const handleBrowseClick = () => {
    if (!isAnalyzing) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        onImageSelect(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();

    if (isAnalyzing) return;

    const file = event.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        onImageSelect(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      id="upload-section"
      className="max-w-3xl p-8 mx-auto mt-8 bg-white border border-gray-100 shadow-sm rounded-2xl scroll-mt-24"
    >
      <h2 className="mb-4 text-xl font-medium text-gray-800">Upload Image</h2>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="relative flex flex-col items-center justify-center p-10 transition-colors border-2 border-blue-200 border-dashed rounded-xl bg-blue-50/30 hover:bg-blue-50/80"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          disabled={isAnalyzing}
          className="hidden"
        />

        {!image ? (
          <>
            <div className="p-4 mb-4 bg-blue-100 rounded-full">
              <UploadCloud className="w-8 h-8 text-blue-500" />
            </div>

            <p className="mb-1 font-medium text-gray-700">
              Drag and drop your image here
            </p>

            <p className="mb-6 text-sm text-gray-400">
              or click to browse files
            </p>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onCameraOpen}
                disabled={isAnalyzing}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                Take Photo
              </button>

              <button
                type="button"
                onClick={handleBrowseClick}
                disabled={isAnalyzing}
                className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-blue-600 px-5 py-2.5 rounded-lg font-medium transition-colors cursor-pointer"
              >
                <FolderOpen className="w-4 h-4" />
                Browse
              </button>
            </div>
          </>
        ) : (
          <div className="relative flex flex-col items-center w-full">
            <div className="relative">
              <img
                src={image}
                alt="Preview"
                className={`object-contain mb-4 rounded-lg shadow-sm max-h-64 transition ${
                  isAnalyzing ? "opacity-60" : "opacity-100"
                }`}
              />

              {/* Tombol Crop / sesuaikan gambar (pojok kiri atas preview). */}
              {!isAnalyzing && (
                <button
                  type="button"
                  onClick={onCropOpen}
                  className="absolute flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-white transition-colors bg-blue-500 rounded-full shadow-md top-2 left-2 hover:bg-blue-600"
                  title="Crop / sesuaikan area gambar"
                >
                  <Crop className="w-3.5 h-3.5" />
                  Crop
                </button>
              )}

              {isAnalyzing && (
                <div className="absolute inset-0 flex items-center justify-center mb-4 rounded-lg bg-white/45 backdrop-blur-[1px]">
                  <div className="flex flex-col items-center gap-2 px-5 py-4 bg-white border border-blue-100 shadow-lg rounded-xl">
                    <LoaderCircle className="text-blue-500 w-7 h-7 animate-spin" />

                    <div
                      className="flex items-center gap-1 text-sm font-semibold text-blue-600"
                      role="status"
                      aria-live="polite"
                    >
                      <span>Menganalisis</span>
                      <span
                        className="inline-block animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      >
                        .
                      </span>
                      <span
                        className="inline-block animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      >
                        .
                      </span>
                      <span
                        className="inline-block animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      >
                        .
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => onImageSelect(null)}
              disabled={isAnalyzing}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white p-1.5 rounded-full shadow-md transition-colors"
              title="Hapus gambar"
            >
              <X className="w-4 h-4" />
            </button>

            <p className="text-sm font-medium text-blue-600">
              {isAnalyzing
                ? "Gambar sedang diproses oleh sistem."
                : "Gambar berhasil dimuat. Gunakan Crop bila perlu, lalu analisis!"}
            </p>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onStart}
        disabled={!image || isAnalyzing}
        className={`w-full mt-6 font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
          image && !isAnalyzing
            ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md"
            : isAnalyzing
              ? "bg-blue-400 text-white cursor-wait"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        {isAnalyzing ? (
          <>
            <LoaderCircle className="w-5 h-5 animate-spin" />
            <span>Menganalisis</span>
            <span
              className="inline-block animate-bounce"
              style={{ animationDelay: "0ms" }}
            >
              .
            </span>
            <span
              className="inline-block animate-bounce"
              style={{ animationDelay: "150ms" }}
            >
              .
            </span>
            <span
              className="inline-block animate-bounce"
              style={{ animationDelay: "300ms" }}
            >
              .
            </span>
          </>
        ) : (
          "Start Analysis"
        )}
      </button>
    </div>
  );
};

export default ImageUploader;
