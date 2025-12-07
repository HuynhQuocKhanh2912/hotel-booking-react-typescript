import { useState } from "react";
import { Heart, Share2, ChevronLeft, Sparkles } from "lucide-react";
import { useRoomDetail } from "@/stores/useRoomDetails.store";

export default function Gallery() {
  const gallerry = useRoomDetail((state) => state.roomID);
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <div className="relative">
      {/* Back Button */}
      <button className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>

      {/* Action Buttons */}
      <div className="absolute top-6 right-6 z-20 flex gap-3">
        <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
          <Share2 className="w-6 h-6 text-gray-700" />
        </button>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"}`}
          />
        </button>
      </div>

      {/* Main Image Carousel */}
      <div className="relative h-[500px] overflow-hidden group cursor-pointer">
        <img
          src={gallerry?.hinhAnh}
          alt={gallerry?.tenPhong}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"></div>
        {/* Hot Badge */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-linear-to-r from-orange-500 to-red-500 px-6 py-2 rounded-full shadow-xl animate-pulse">
          <span className="text-white font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Đặt nhiều nhất tuần này
          </span>
        </div>
      </div>
    </div>
  );
}
