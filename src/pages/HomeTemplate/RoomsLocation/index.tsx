import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Bed,
  Bath,
  Wifi,
  UtensilsCrossed,
  Droplet,
  Tv,
  Wind,
  Car,
  MapPin,
  Star,
  ChevronRight
} from 'lucide-react';

const RoomListingApp = () => {
  const [rooms, setRooms] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(true);

  const roomsData = [
    {
      id: 1,
      tenPhong: "NewApt D1 - Cozy studio - NU apt - 500m Bui Vien!",
      khach: 3,
      phongNgu: 1,
      giuong: 1,
      phongTam: 1,
      moTa: "Tự nhận phòng bằng khóa thông minh",
      giaTien: 28,
      mayGiat: true,
      banLa: true,
      tivi: true,
      dieuHoa: false,
      wifi: true,
      bep: false,
      doXe: true,
      hoBoi: true,
      banUi: true,
      maViTri: 1,
      hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/phong1.jpg"
    },
    {
      id: 2,
      tenPhong: "STUDIO MỚI NETFLIX MIỄN PHÍ/ĐỖ XE MIỄN PHÍ",
      khach: 2,
      phongNgu: 1,
      giuong: 1,
      phongTam: 1,
      moTa: "Không gian riêng để làm việc, Wi-fi tốc độ cao",
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
      hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/phong2.png"
    },
    {
      id: 3,
      tenPhong: "Phòng sang trọng với ban công tại D.1 - 200m đến Bitexco",
      khach: 2,
      phongNgu: 1,
      giuong: 1,
      phongTam: 1,
      moTa: "Chủ nhà siêu cấp, 100% khách đánh giá 5 sao",
      giaTien: 17,
      mayGiat: true,
      banLa: true,
      tivi: true,
      dieuHoa: false,
      wifi: false,
      bep: false,
      doXe: true,
      hoBoi: true,
      banUi: true,
      maViTri: 1,
      hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/phong3.png"
    },
    {
      id: 244235,
      tenPhong: "Động Bàn Tơ",
      khach: 4,
      phongNgu: 1,
      giuong: 2,
      phongTam: 1,
      moTa: "Phòng thoải mái với các tiện nghi cơ bản",
      giaTien: 12,
      mayGiat: false,
      banLa: false,
      tivi: false,
      dieuHoa: true,
      wifi: true,
      bep: false,
      doXe: false,
      hoBoi: false,
      banUi: false,
      maViTri: 1,
      hinhAnh: "https://airbnbnew.cybersoft.edu.vn/avatar/22-11-2025-07-58-27-❣️avatar-couple.jpg"
    }
  ];

  const citiesData = [
    { id: 1, tenThanhPho: "Hồ Chí Minh" }
  ];

  useEffect(() => {
    setRooms(roomsData);
    setCities(citiesData);
    setSelectedCity(citiesData[0].id);
    setLoading(false);
  }, []);

  const getRoomsByCity = (cityId) => {
    return rooms.filter(room => room.maViTri === cityId);
  };

  const getAmenitiesCount = (room) => {
    return [room.wifi, room.bep, room.hoBoi, room.mayGiat, room.tivi, room.dieuHoa, room.doXe, room.banUi]
      .filter(Boolean).length;
  };

  const RoomCard = ({ room }) => (
    <Card className="group cursor-pointer hover:shadow-md transition-all border border-gray-200 overflow-hidden">
      <div className="flex flex-col h-full">
        {/* Image Section */}
        <div className="relative overflow-hidden h-48 bg-gray-100">
          <img
            src={room.hinhAnh}
            alt={room.tenPhong}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=Room';
            }}
          />
          <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-lg shadow-sm">
            <p className="font-semibold text-gray-900">${room.giaTien}</p>
            <p className="text-xs text-gray-600">mỗi đêm</p>
          </div>
        </div>

        <CardContent className="flex-1 p-4 flex flex-col">
          {/* Title and Description */}
          <div className="mb-3">
            <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-1">
              {room.tenPhong}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-1">
              {room.moTa}
            </p>
          </div>

          {/* Room Info */}
          <div className="flex gap-4 text-sm text-gray-700 mb-4 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-gray-500" />
              <span>{room.khach}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4 text-gray-500" />
              <span>{room.phongNgu}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4 text-gray-500" />
              <span>{room.phongTam}</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex-1">
            <div className="flex gap-2 flex-wrap">
              {room.wifi && <AmenityBadge icon={Wifi} label="WiFi" />}
              {room.bep && <AmenityBadge icon={UtensilsCrossed} label="Bếp" />}
              {room.dieuHoa && <AmenityBadge icon={Wind} label="Điều hòa" />}
              {room.tivi && <AmenityBadge icon={Tv} label="TV" />}
              {room.mayGiat && <AmenityBadge icon={Tv} label="Máy giặt" />}
              {room.doXe && <AmenityBadge icon={Car} label="Đỗ xe" />}
              {room.hoBoi && <AmenityBadge icon={Droplet} label="Hồ bơi" />}
              {room.banUi && <AmenityBadge icon={Star} label="Ban công" />}
            </div>
          </div>

          {/* View Button */}
          <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-200">
            <span className="text-xs text-gray-500">{getAmenitiesCount(room)} tiện nghi</span>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-700 transition-colors" />
          </div>
        </CardContent>
      </div>
    </Card>
  );

  const AmenityBadge = ({ icon: Icon, label }) => (
    <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs gap-1">
      <Icon className="w-3 h-3" />
      <span>{label}</span>
    </Badge>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <p className="text-gray-500">Đang tải...</p>
      </div>
    );
  }

  const currentCityData = cities.find(c => c.id === selectedCity);
  const currentRooms = getRoomsByCity(selectedCity);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Phòng cho thuê</h1>
              <p className="text-sm text-gray-600 mt-1">Tìm kiếm và đặt phòng của bạn</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* City Filter */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-600 mb-3">CHỌN THÀNH PHỐ</h2>
          <div className="flex gap-3 flex-wrap">
            {cities.map(city => (
              <button
                key={city.id}
                onClick={() => setSelectedCity(city.id)}
                className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                  selectedCity === city.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <MapPin className="w-4 h-4 inline-block mr-2" />
                {city.tenThanhPho}
              </button>
            ))}
          </div>
        </div>

        {/* Room Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Hiển thị <span className="font-semibold text-gray-900">{currentRooms.length}</span> phòng 
            {currentCityData && ` tại ${currentCityData.tenThanhPho}`}
          </p>
        </div>

        {/* Room Grid */}
        {currentRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              Không có phòng nào tại {currentCityData?.tenThanhPho}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12 py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm text-gray-600 text-center">
            © 2024 Danh sách phòng cho thuê. Tất cả các quyền được bảo lưu.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RoomListingApp;