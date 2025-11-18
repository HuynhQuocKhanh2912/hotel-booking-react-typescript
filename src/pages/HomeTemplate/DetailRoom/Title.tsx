import { useState } from "react";
import {
  Users,
  Bed,
  Bath,
  // Wifi,
  // Tv,
  // Wind,
  // Car,
  // Waves,
  // UtensilsCrossed,
  Star,
  MapPin,
} from "lucide-react";

export default function Title() {
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

  // const amenities = [
  //   {
  //     icon: Wifi,
  //     label: "Wifi miễn phí",
  //     available: room.wifi,
  //     description: "Tốc độ cao 100Mbps",
  //   },
  //   {
  //     icon: Tv,
  //     label: "TV & Netflix",
  //     available: room.tivi,
  //     description: "Smart TV 4K",
  //   },
  //   {
  //     icon: Wind,
  //     label: "Điều hòa",
  //     available: room.dieuHoa,
  //     description: "Nhiệt độ thoải mái",
  //   },
  //   {
  //     icon: UtensilsCrossed,
  //     label: "Bếp đầy đủ",
  //     available: room.bep,
  //     description: "Dụng cụ nấu ăn",
  //   },
  //   {
  //     icon: Car,
  //     label: "Đỗ xe miễn phí",
  //     available: room.doXe,
  //     description: "Chỗ đỗ an toàn",
  //   },
  //   {
  //     icon: Waves,
  //     label: "Hồ bơi",
  //     available: room.hoBoi,
  //     description: "Hồ bơi riêng",
  //   },
  // ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {room.tenPhong}
          </h1>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-5 h-5" />
              <span>Vị trí #{room.maViTri}</span>
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
              {room.khach} khách
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-purple-100 px-5 py-3 rounded-2xl">
          <Bed className="w-6 h-6 text-purple-600" />
          <div>
            <div className="text-sm text-purple-900 font-semibold">
              {room.phongNgu} phòng ngủ
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-gradient-to-r from-pink-50 to-pink-100 px-5 py-3 rounded-2xl">
          <Bed className="w-6 h-6 text-pink-600" />
          <div>
            <div className="text-sm text-pink-900 font-semibold">
              {room.giuong} giường
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-green-100 px-5 py-3 rounded-2xl">
          <Bath className="w-6 h-6 text-green-600" />
          <div>
            <div className="text-sm text-green-900 font-semibold">
              {room.phongTam} phòng tắm
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
