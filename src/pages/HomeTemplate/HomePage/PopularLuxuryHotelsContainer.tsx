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
    <div className=" bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Chỗ ở tại Thành phố Hồ Chí Minh
          </h1>
          {/* <p className="text-gray-600 text-sm mt-1">{rooms.length} chỗ ở</p> */}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms?.data.map((room) => (
            <div
              key={room.id}
              className="group cursor-pointer rounded-lg overflow-hidden bg-white border border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg"
            >
              {/* Image container */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <img
                  src={room.hinhAnh}
                  alt={room.tenPhong}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Price badge */}
                <div className="absolute bottom-3 left-3 bg-white rounded-lg px-3 py-2 shadow-md">
                  <p className="text-lg font-bold text-gray-900">
                    ${room.giaTien}
                  </p>
                  <p className="text-xs text-gray-600">/đêm</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Title */}
                <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-2 group-hover:text-gray-700">
                  {room.tenPhong}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-gray-900 text-gray-900" />
                  <span className="text-sm font-medium text-gray-900">5.0</span>
                  <span className="text-sm text-gray-600">(128 đánh giá)</span>
                </div>

                {/* Room info */}
                <div className="flex gap-3 text-sm text-gray-700 mb-4 pb-4 border-b border-gray-200">
                  <span>{room.phongNgu} phòng</span>
                  <span>•</span>
                  <span>{room.giuong} giường</span>
                  <span>•</span>
                  <span>{room.phongTam} phòng tắm</span>
                </div>

                {/* Amenities */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {room.wifi && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Wifi className="w-4 h-4 text-gray-600" />
                      <span>Wifi</span>
                    </div>
                  )}
                  {room.tivi && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Tv className="w-4 h-4 text-gray-600" />
                      <span>TV</span>
                    </div>
                  )}
                  {room.dieuHoa && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Wind className="w-4 h-4 text-gray-600" />
                      <span>Điều hòa</span>
                    </div>
                  )}
                  {room.bep && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Utensils className="w-4 h-4 text-gray-600" />
                      <span>Bếp</span>
                    </div>
                  )}
                  {room.doXe && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Car className="w-4 h-4 text-gray-600" />
                      <span>Đỗ xe</span>
                    </div>
                  )}
                  {room.hoBoi && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Waves className="w-4 h-4 text-gray-600" />
                      <span>Hồ bơi</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {room.moTa}
                </p>

                {/* CTA Button */}
                <Button
                  onClick={() => handleGetRoom(room.id)}
                  className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-5 px-4 rounded-lg transition-colors"
                >
                  Xem chi tiết
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button
          onClick={() => navigate("/list-room")}
          className="cursor-pointer table mx-auto mt-9 bg-blue-500 max-w-[350px] w-full h-full py-4 uppercase"
        >
          Xem thêm
        </Button>
      </div>
    </div>
  );
}
