import { useRef, useEffect } from "react";
import { Camera, X } from "lucide-react";

const CameraCapture = ({ onCapture, onCancel }) => {
  const videoRef = useRef(null);

  // Mengaktifkan kamera saat komponen muncul
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Detail error kamera:", err); // <--- Sekarang err digunakan!
        alert("Gagal mengakses kamera. Pastikan izin diberikan.");
        onCancel();
      }
    };
    startCamera();

    // Membersihkan kamera saat komponen ditutup
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const takePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg");
    onCapture(imageData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-[60] flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-lg overflow-hidden bg-white rounded-2xl">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full bg-black h-[400px] object-cover"
        />
        <div className="flex justify-center gap-4 p-6">
          <button
            onClick={onCancel}
            className="p-3 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={takePhoto}
            className="p-4 text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600"
          >
            <Camera className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;
