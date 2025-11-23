import {
  Wifi,
  Tv,
  Wind,
  Car,
  Waves,
  UtensilsCrossed,
  Shirt,
  Armchair,
  Zap,
  X,
  Check,
} from "lucide-react";
import type { RoomItems } from "@/interfaces/room.interface";

interface AmenitiesProps {
  amenity?: RoomItems;
}

export default function Amenities({ amenity }: AmenitiesProps) {
  const room = amenity;

  const amenities = [
    {
      icon: Wifi,
      label: "Wifi miễn phí",
      available: room?.wifi,
      description: "Tốc độ cao 100Mbps",
    },
    {
      icon: Tv,
      label: "TV & Netflix",
      available: room?.tivi,
      description: "Smart TV 4K",
    },
    {
      icon: Wind,
      label: "Điều hòa",
      available: room?.dieuHoa,
      description: "Nhiệt độ thoải mái",
    },
    {
      icon: UtensilsCrossed,
      label: "Bếp đầy đủ",
      available: room?.bep,
      description: "Dụng cụ nấu ăn",
    },
    {
      icon: Car,
      label: "Đỗ xe miễn phí",
      available: room?.doXe,
      description: "Chỗ đỗ an toàn",
    },
    {
      icon: Waves,
      label: "Hồ bơi",
      available: room?.hoBoi,
      description: "Hồ bơi riêng",
    },
    {
      icon: Zap,
      label: "Máy giặt",
      available: room?.mayGiat,
      description: "Máy giặt tự động",
    },
    {
      icon: Shirt,
      label: "Bàn là",
      available: room?.banLa,
      description: "Dụng cụ là đồ",
    },
    {
      icon: Armchair,
      label: "Bàn ăn",
      available: room?.banUi,
      description: "Không gian ăn uống",
    },
  ];

  const availableAmenities = amenities.filter((a) => a.available);
  const unavailableAmenities = amenities.filter((a) => !a.available);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Tiện nghi</h2>

      {/* Available Amenities Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Check className="w-5 h-5 text-green-600" />
          Tiện nghi có sẵn ({availableAmenities.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableAmenities.map((amenity, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 rounded-2xl border-2 border-green-200 bg-green-50 hover:border-green-300 transition-all hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-100 flex-shrink-0">
                <amenity.icon className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900">
                  {amenity.label}
                </div>
                <div className="text-sm text-gray-600">
                  {amenity.description}
                </div>
              </div>
              <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Unavailable Amenities Section */}
      {unavailableAmenities.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <X className="w-5 h-5 text-gray-400" />
            Tiện nghi không có ({unavailableAmenities.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unavailableAmenities.map((amenity, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-200 bg-gray-50 opacity-60 transition-all"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-200 flex-shrink-0">
                  <amenity.icon className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-600">
                    {amenity.label}
                  </div>
                  <div className="text-sm text-gray-500">
                    {amenity.description}
                  </div>
                </div>
                <X className="w-6 h-6 text-gray-400 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
