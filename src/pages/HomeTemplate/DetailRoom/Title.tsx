import { Users, Bed, Bath, Star, MapPin } from "lucide-react";
import type { RoomItems } from "@/interfaces/room.interface";

interface RoomProps {
  roomData?: RoomItems;
}

export default function Title({ roomData }: RoomProps) {
  const room = roomData;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {room?.tenPhong}
          </h1>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-5 h-5" />
              <span>Vị trí #{room?.maViTri}</span>
            </div>
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-gray-900">4.9</span>
              <span className="text-gray-600">(127 đánh giá)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Room Stats */}
      <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-blue-100 px-5 py-3 rounded-2xl">
          <Users className="w-6 h-6 text-blue-600" />
          <div>
            <div className="text-sm text-blue-900 font-semibold">
              {room?.khach} khách
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-purple-100 px-5 py-3 rounded-2xl">
          <Bed className="w-6 h-6 text-purple-600" />
          <div>
            <div className="text-sm text-purple-900 font-semibold">
              {room?.phongNgu} phòng ngủ
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-gradient-to-r from-pink-50 to-pink-100 px-5 py-3 rounded-2xl">
          <Bed className="w-6 h-6 text-pink-600" />
          <div>
            <div className="text-sm text-pink-900 font-semibold">
              {room?.giuong} giường
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-green-100 px-5 py-3 rounded-2xl">
          <Bath className="w-6 h-6 text-green-600" />
          <div>
            <div className="text-sm text-green-900 font-semibold">
              {room?.phongTam} phòng tắm
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
