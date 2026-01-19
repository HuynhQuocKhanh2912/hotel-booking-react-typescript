import { useState } from "react";
import { Heart } from "lucide-react";
import { useParams } from "react-router-dom";

const RoomListingApp = () => {
  const [rooms, setRooms] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const location = [
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
      hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/phong1.jpg",
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
      hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/phong2.png",
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
      hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/phong3.png",
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
      hinhAnh:
        "https://airbnbnew.cybersoft.edu.vn/avatar/22-11-2025-07-58-27-❣️avatar-couple.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Khám phá các điểm đến nổi bật
        </h2>
        {!location || location.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Không có dữ liệu vị trí nào.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {location.map((dest) => (
              <div
                onClick={() => handleLocation(dest)}
                key={dest.id}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl shadow-md group-hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={
                      dest.hinhAnh?.trim().replace(/\s+/g, "") ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s"
                    }
                    alt={dest.tenViTri}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
                    <Heart />
                  </button>
                </div>
                <div className="mt-3">
                  <h3 className="font-semibold text-gray-900">
                    {dest.tenViTri}
                  </h3>
                  <p className="text-sm text-gray-600">{dest.quocGia}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <button className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors">
            Xem thêm vị trí
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomListingApp;
