import { Star, Wifi, Wind, Waves, Tv, Utensils, Car } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getRoomListApi } from "@/services/room.api";

export default function RoomList() {
  const { data: rooms } = useQuery({
    queryKey: ["getListRoom"],
    queryFn: () => getRoomListApi(1, 6),
  });
  const navigate = useNavigate();
  const handleGetRoom = (id: number) => {
    navigate(`/detail-room/${id}`);
  };

  return (
    <div className="bg-linear-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Chỗ ở tại Thành phố Hồ Chí Minh
          </h1>
          {rooms?.data && (
            <p className="text-gray-600 text-base mt-2">
              {rooms.data.length} chỗ ở phổ biến
            </p>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms?.data.map((room) => (
            <div
              key={room.id}
              onClick={() => handleGetRoom(room.id)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl shadow-md"
            >
              {/* Image container */}
              <div className="relative h-72 overflow-hidden bg-gray-100">
                <img
                  src={room.hinhAnh}
                  alt={room.tenPhong}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Price badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg border border-white/50">
                  <div className="flex items-baseline gap-1">
                    <p className="text-xl font-bold text-gray-900">
                      ${room.giaTien?.toLocaleString("en-US") || "0"}
                    </p>
                    <p className="text-xs text-gray-600 font-medium">/đêm</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Title */}
                <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {room.tenPhong}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-sm font-semibold text-gray-900">
                      5.0
                    </span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                  <span className="text-sm text-gray-600 font-medium">
                    128 đánh giá
                  </span>
                </div>

                {/* Room info */}
                <div className="flex items-center gap-3 text-sm text-gray-700 mb-5 pb-5 border-b border-gray-200">
                  <span className="font-medium">{room.phongNgu} phòng</span>
                  <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                  <span className="font-medium">{room.giuong} giường</span>
                  <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                  <span className="font-medium">{room.phongTam} phòng tắm</span>
                </div>

                {/* Amenities */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {room.wifi && (
                    <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                      <Wifi className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">Wifi</span>
                    </div>
                  )}
                  {room.tivi && (
                    <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                      <Tv className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">TV</span>
                    </div>
                  )}
                  {room.dieuHoa && (
                    <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                      <Wind className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">Điều hòa</span>
                    </div>
                  )}
                  {room.bep && (
                    <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                      <Utensils className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">Bếp</span>
                    </div>
                  )}
                  {room.doXe && (
                    <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                      <Car className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">Đỗ xe</span>
                    </div>
                  )}
                  {room.hoBoi && (
                    <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                      <Waves className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">Hồ bơi</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-5 line-clamp-2 leading-relaxed">
                  {room.moTa}
                </p>

                {/* CTA Button */}
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGetRoom(room.id);
                  }}
                  className="w-full cursor-pointer bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-6 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Xem chi tiết
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Button
            onClick={() => navigate("/list-room")}
            variant="outline"
            className="cursor-pointer px-8 py-6 text-base font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded-xl max-w-[350px] w-full"
          >
            Xem thêm chỗ ở
          </Button>
        </div>
      </div>
    </div>
  );
}
