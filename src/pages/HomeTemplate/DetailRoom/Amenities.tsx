import { useState } from "react";
import {
  Wifi,
  Tv,
  Wind,
  Car,
  Waves,
  UtensilsCrossed,
  X,
  Check,
} from "lucide-react";

export default function Amenities() {
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
  const amenities = [
    {
      icon: Wifi,
      label: "Wifi miễn phí",
      available: room.wifi,
      description: "Tốc độ cao 100Mbps",
    },
    {
      icon: Tv,
      label: "TV & Netflix",
      available: room.tivi,
      description: "Smart TV 4K",
    },
    {
      icon: Wind,
      label: "Điều hòa",
      available: room.dieuHoa,
      description: "Nhiệt độ thoải mái",
    },
    {
      icon: UtensilsCrossed,
      label: "Bếp đầy đủ",
      available: room.bep,
      description: "Dụng cụ nấu ăn",
    },
    {
      icon: Car,
      label: "Đỗ xe miễn phí",
      available: room.doXe,
      description: "Chỗ đỗ an toàn",
    },
    {
      icon: Waves,
      label: "Hồ bơi",
      available: room.hoBoi,
      description: "Hồ bơi riêng",
    },
  ];
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tiện nghi</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {amenities.map((amenity, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
              amenity.available
                ? "border-green-200 bg-green-50 hover:border-green-300"
                : "border-gray-200 bg-gray-50 opacity-50"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                amenity.available ? "bg-green-100" : "bg-gray-200"
              }`}
            >
              <amenity.icon
                className={`w-6 h-6 ${amenity.available ? "text-green-600" : "text-gray-400"}`}
              />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{amenity.label}</div>
              <div className="text-sm text-gray-600">{amenity.description}</div>
            </div>
            {amenity.available ? (
              <Check className="w-6 h-6 text-green-600" />
            ) : (
              <X className="w-6 h-6 text-gray-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
