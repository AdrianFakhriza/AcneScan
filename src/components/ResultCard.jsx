import { CheckCircle, Info, Upload } from "lucide-react";

const CLASS_STYLES = {
  kista: {
    label: "Kista",
    color: "#ef4444",
    border: "border-red-400",
    background: "bg-red-50",
    text: "text-red-700",
  },
  komedo: {
    label: "Komedo",
    color: "#3b82f6",
    border: "border-blue-400",
    background: "bg-blue-50",
    text: "text-blue-700",
  },
  nodul: {
    label: "Nodul",
    color: "#a855f7",
    border: "border-purple-400",
    background: "bg-purple-50",
    text: "text-purple-700",
  },
  papula: {
    label: "Papula",
    color: "#f97316",
    border: "border-orange-400",
    background: "bg-orange-50",
    text: "text-orange-700",
  },
  pustula: {
    label: "Pustula",
    color: "#22c55e",
    border: "border-green-400",
    background: "bg-green-50",
    text: "text-green-700",
  },
};

const formatConfidence = (item) => {
  if (item?.confidence_percent) {
    return item.confidence_percent;
  }

  if (typeof item?.confidence === "number") {
    return `${(item.confidence * 100).toFixed(2)}%`;
  }

  return "-";
};

const ResultCard = ({ result, image, onReset }) => {
  const analyzedImage = result?.annotated_image || image;

  const detectedTypes = Array.isArray(result?.detected_types)
    ? result.detected_types
    : [];

  const hasDetection = detectedTypes.length > 0;

  return (
    <div className="max-w-6xl mx-auto mt-8 overflow-hidden bg-white border border-gray-100 shadow-md rounded-2xl">
      {/* Header */}
      <div className="flex items-center gap-2 px-8 py-4 border-b border-gray-100 bg-gray-50">
        <div className="p-1.5 bg-blue-100 rounded-full">
          <CheckCircle className="w-5 h-5 text-blue-500" />
        </div>

        <h2 className="text-xl font-semibold text-gray-800">
          Analysis Complete
        </h2>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(300px,0.9fr)_minmax(420px,1.4fr)]">
          {/* Gambar hasil analisis */}
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800">Analyzed Image</h3>
              <p className="text-sm text-gray-400">
                Bounding box ditampilkan pada area yang terdeteksi.
              </p>
            </div>

            <div className="overflow-hidden border border-gray-200 bg-gray-50 rounded-xl">
              <img
                src={analyzedImage}
                alt="Analyzed acne with bounding boxes"
                className="w-full max-h-[520px] object-contain"
              />
            </div>

            {/* Legend warna bounding box */}
            <div className="p-4 border border-gray-200 bg-gray-50 rounded-xl">
              <h4 className="mb-3 text-sm font-medium text-gray-800">
                Bounding Box Legend
              </h4>

              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {Object.entries(CLASS_STYLES).map(([key, style]) => (
                  <div key={key} className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-sm border border-white shadow-sm"
                      style={{ backgroundColor: style.color }}
                    />
                    <span className="text-sm text-gray-600">{style.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hasil utama */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-6 pb-3 border-b border-gray-100">
                <span className="italic font-medium text-gray-500">
                  Detected Type
                </span>
                <span className="text-xl font-bold text-right text-gray-900">
                  {result?.type || "Jerawat Tidak Terdeteksi"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-6 pb-3 border-b border-gray-100">
                <span className="italic font-medium text-gray-500">
                  Highest Confidence
                </span>
                <span className="text-xl font-bold text-blue-500">
                  {result?.confidence || "0.00%"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-6 pb-3 border-b border-gray-100">
                <span className="italic font-medium text-gray-500">
                  Threshold
                </span>
                <span className="text-lg font-semibold text-gray-800">
                  {result?.threshold || "70%"}
                </span>
              </div>
            </div>

            {/* Suggestion per jenis jerawat */}
            <section>
              <h3 className="font-medium text-gray-900">
                Suggestions Based on Detected Acne Types
              </h3>
              <p className="mb-4 text-sm text-gray-400">
                Setiap jenis jerawat yang terdeteksi memiliki saran penanganan
                masing-masing.
              </p>

              {hasDetection ? (
                <div className="space-y-4">
                  {detectedTypes.map((item, index) => {
                    const normalizedLabel = String(
                      item?.label || "",
                    ).toLowerCase();
                    const style =
                      CLASS_STYLES[normalizedLabel] || CLASS_STYLES.komedo;

                    return (
                      <article
                        key={`${normalizedLabel}-${index}`}
                        className={`p-4 border rounded-xl ${style.border} ${style.background}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-3.5 h-3.5 rounded-sm border border-white shadow-sm"
                              style={{ backgroundColor: style.color }}
                            />
                            <h4 className="font-semibold text-gray-900">
                              {style.label || item?.label}
                            </h4>
                          </div>

                          <span className={`font-semibold ${style.text}`}>
                            {formatConfidence(item)}
                          </span>
                        </div>

                        <div className="p-4 mt-4 bg-white/80 rounded-xl">
                          <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-blue-700">
                            <Info className="w-4 h-4" />
                            Suggestion
                          </div>

                          <p className="text-sm leading-7 text-gray-700">
                            {item?.suggestion ||
                              "Belum tersedia saran untuk jenis jerawat ini."}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-yellow-800">
                    <Info className="w-4 h-4" />
                    Informasi
                  </div>

                  <p className="text-sm leading-relaxed text-yellow-700">
                    {result?.suggestion ||
                      "Jerawat tidak terdeteksi. Pastikan gambar menampilkan area kulit berjerawat dengan fokus dan pencahayaan yang cukup."}
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Tombol aksi tunggal */}
        <div className="mt-10">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center justify-center w-full gap-2 py-3 font-medium text-blue-600 transition-colors rounded-xl bg-blue-50 hover:bg-blue-100"
          >
            <Upload className="w-4 h-4" />
            New Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
