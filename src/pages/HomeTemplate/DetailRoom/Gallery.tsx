import { Sparkles } from "lucide-react";
import { useRoomDetail } from "@/stores/useRoomDetails.store";

export default function Gallery() {
  const gallerry = useRoomDetail((state) => state.roomID);
  return (
    <div className="relative">
      {/* Main Image Carousel */}
      <div className="relative h-[500px] overflow-hidden group">
        <img
          src={gallerry?.hinhAnh}
          alt={gallerry?.tenPhong}
          className="w-full h-full object-cover transition-transform duration-700"
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
