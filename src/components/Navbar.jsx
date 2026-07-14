import { CircleHelp } from "lucide-react";

const Navbar = () => {
  // Fungsi untuk menggeser ke area panduan
  const scrollToGuide = () => {
    const guideElement = document.getElementById("guide-section");
    if (guideElement) {
      guideElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Fungsi baru untuk menggeser ke area Upload Gambar
  const scrollToUpload = () => {
    const uploadElement = document.getElementById("upload-section");
    if (uploadElement) {
      uploadElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-sm sticky top-0 z-50">
      <div className="text-blue-500 font-bold text-xl tracking-tight">
        AcneScan
      </div>

      {/* Tambahkan onClick={scrollToUpload} pada bagian ini */}
      <div
        onClick={scrollToUpload}
        className="text-blue-500 font-medium border-b-2 border-blue-500 pb-1 cursor-pointer hover:text-blue-700 transition-colors"
        title="Menuju area unggah gambar"
      >
        Analysis
      </div>

      <div className="flex items-center text-blue-500">
        <button
          onClick={scrollToGuide}
          className="flex items-center gap-1.5 hover:text-blue-700 transition-colors focus:outline-none bg-transparent border-none cursor-pointer"
          title="Lihat Panduan Penggunaan"
        >
          <CircleHelp className="w-5 h-5" />
          <span className="text-sm font-medium hidden sm:inline">Panduan</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
