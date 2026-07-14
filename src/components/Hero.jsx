import { AlertCircle } from "lucide-react";

const Hero = () => {
  return (
    <div className="py-10 text-center md:py-16">
      <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
        Klasifikasi <span className="text-blue-600">Acne Vulgaris</span>
      </h1>
      <p className="max-w-2xl px-4 mx-auto mb-8 text-lg text-gray-600">
        Sistem cerdas berbasis kecerdasan buatan untuk membantu mengidentifikasi
        jenis jerawat Papula, Pustula, Komedo, Nodul, dan Kista melalui analisis citra wajah secara instan.
      </p>

      <div className="inline-flex items-start max-w-2xl gap-3 px-5 py-3 mx-auto text-sm text-left border shadow-sm md:items-center bg-amber-50 border-amber-200 text-amber-800 rounded-xl">
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 md:mt-0" />
        <p>
          <span className="font-bold">Peringatan:</span> Hanya sebagai alat
          bantu informasi dan edukasi, dan bukan sebagai pengganti diagnosis
          medis dari dokter profesional.
        </p>
      </div>
    </div>
  );
};

export default Hero;
