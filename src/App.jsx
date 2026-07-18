import { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ImageUploader from "./components/ImageUploader";
import Guide from "./components/Guide";
import CameraCapture from "./components/CameraCapture";
import ImageCropper from "./components/ImageCropper";
import ResultCard from "./components/ResultCard";
<<<<<<< HEAD
​
=======

// Alamat backend AcneScan (Google Cloud Run).
// - Saat development lokal: otomatis pakai URL di bawah ini.
// - Saat deploy di Vercel: set environment variable VITE_API_URL agar mudah diganti
//   tanpa mengubah kode.
>>>>>>> 31e9624 (tambah fitur custom crop gambar)
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://acne-scan-api-332600230450.asia-southeast2.run.app";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Fungsi pembantu untuk mengubah Data URL (Base64) menjadi objek Blob (Biner)
  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };
<<<<<<< HEAD
​
  // Fungsi mengirim gambar ke FastAPI backend via Axios
=======

  // Fungsi utama untuk mengirim gambar ke FastAPI backend via Axios
>>>>>>> 31e9624 (tambah fitur custom crop gambar)
  const handleStartAnalysis = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      //  Konversi gambar Base64 menjadi file biner Blob
      const imageBlob = dataURLtoBlob(selectedImage);
<<<<<<< HEAD
      
      const formData = new FormData();
      formData.append("file", imageBlob, "acne_image.jpg");
​
      const response = await axios.post(
        `${API_BASE_URL}/predict`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
=======

      // 2. Masukkan ke dalam FormData sesuai spesifikasi HTTP Multipart Request
      const formData = new FormData();
      formData.append("file", imageBlob, "acne_image.jpg");

      // 3. Kirim data menggunakan Axios ke endpoint FastAPI
      const response = await axios.post(`${API_BASE_URL}/predict`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
>>>>>>> 31e9624 (tambah fitur custom crop gambar)
        },
      });

      // 4. Menyimpan hasil respon JSON dari server ke dalam state aplikasi
      setPredictionResult(response.data);
    } catch (error) {
      console.error("Gagal melakukan koneksi ke server API:", error);
      alert(
        "Terjadi kesalahan saat menyambungkan ke server backend. Pastikan server FastAPI sudah menyala.",
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAll = () => {
    setSelectedImage(null);
    setPredictionResult(null);
    setShowCamera(false);
    setShowCropper(false);
  };

  return (
    <div className="min-h-screen pb-16 font-sans bg-gray-50">
      <Navbar />
      <main className="container px-4 mx-auto">
        <Hero />

        {/* Alur Tampilan SPA (Single Page Application) */}
        {!predictionResult ? (
          <ImageUploader
            image={selectedImage}
            onImageSelect={setSelectedImage}
            onCameraOpen={() => setShowCamera(true)}
            onCropOpen={() => setShowCropper(true)}
            onStart={handleStartAnalysis}
            isAnalyzing={isAnalyzing}
          />
        ) : (
          <ResultCard
            result={predictionResult}
            image={selectedImage}
            onReset={resetAll}
          />
        )}

        <Guide />
      </main>

      {/* Modal Kamera */}
      {showCamera && (
        <CameraCapture
          onCapture={(img) => {
            setSelectedImage(img);
            setShowCamera(false);
            // Setelah mengambil foto, langsung buka cropper agar user bisa memilih area.
            setShowCropper(true);
          }}
          onCancel={() => setShowCamera(false)}
        />
      )}

      {/* Modal Crop Gambar */}
      {showCropper && selectedImage && (
        <ImageCropper
          image={selectedImage}
          onConfirm={(croppedImage) => {
            setSelectedImage(croppedImage);
            setShowCropper(false);
          }}
          onCancel={() => setShowCropper(false)}
        />
      )}
    </div>
  );
}
<<<<<<< HEAD
​
=======

>>>>>>> 31e9624 (tambah fitur custom crop gambar)
export default App;
