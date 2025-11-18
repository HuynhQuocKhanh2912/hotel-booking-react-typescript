import { useState } from "react";
import {
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function Gallery() {
  const [roomData] = useState({
    statusCode: 200,
    content: {
      id: 2,
      tenPhong: "STUDIO MỚI NETFLIX MIỄN PHÍ/ĐỖ XE MIỄN PHÍ",
      khach: 2,
      phongNgu: 1,
      giuong: 1,
      phongTam: 1,
      moTa: "Không gian riêng để làm việc\r\nMột khu vực chung có Wi-fi, phù hợp để làm việc.\r\nTự nhận phòng\r\nTự nhận phòng bằng khóa thông minh.\r\nKim Nam là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.",
      giaTien: 21,
      mayGiat: true,
      banLa: true,
      tivi: true,
      dieuHoa: true,
      wifi: true,
      bep: true,
      doXe: false,
      hoBoi: false,
      banUi: false,
      maViTri: 1,
      hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/phong2.png",
    },
    dateTime: "2025-10-30T11:01:39.1557655+07:00",
  });
  const room = roomData.content;
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [room.hinhAnh, room.hinhAnh, room.hinhAnh, room.hinhAnh];
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
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
          src={images[currentImageIndex]}
          alt={room.tenPhong}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
          {currentImageIndex + 1} / {images.length}
        </div>

        {/* Hot Badge */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2 rounded-full shadow-xl animate-pulse">
          <span className="text-white font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Đặt nhiều nhất tuần này
          </span>
        </div>
      </div>
    </div>
  );
}
