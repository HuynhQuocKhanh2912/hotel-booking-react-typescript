import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Globe,
  Map,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LocationsManagement() {
  const [locations, setLocations] = useState([
    {
      id: 1,
      tenViTri: "Quận 1",
      tinhThanh: "Hồ Chí Minh",
      quocGia: "Việt Nam",
      hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt1.jpg",
    },
    {
      id: 2,
      tenViTri: "Cái Răng",
      tinhThanh: "Cần Thơ",
      quocGia: "Việt Nam",
      hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt2.jpg",
    },
    {
      id: 3,
      tenViTri: "Hòn Rùa",
      tinhThanh: "Nha Trang",
      quocGia: "Việt Nam",
      hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt3.jpg",
    },
    {
      id: 4,
      tenViTri: "Bãi Sau",
      tinhThanh: "Vũng Tàu",
      quocGia: "Việt Nam",
      hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt4.jpg",
    },
    {
      id: 5,
      tenViTri: "Hồ Hoàn Kiếm",
      tinhThanh: "Hà Nội",
      quocGia: "Việt Nam",
      hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt5.jpg",
    },
    {
      id: 6,
      tenViTri: "Phố Cổ",
      tinhThanh: "Hội An",
      quocGia: "Việt Nam",
      hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/vt6.jpg",
    },
  ]);

  const [viewMode, setViewMode] = useState("grid");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailLocation, setDetailLocation] = useState(null);

  const showLocationDetail = (location) => {
    setDetailLocation(location);
    setShowDetailModal(true);
  };

  const stats = {
    total: locations.length,
    cities: new Set(locations.map((l) => l.tinhThanh)).size,
    countries: new Set(locations.map((l) => l.quocGia)).size,
    withImages: locations.filter((l) => l.hinhAnh).length,
  };

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in-up md:gap-3 lg:gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 md:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Tổng vị trí</p>
              <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 md:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Tỉnh thành</p>
              <p className="text-3xl font-bold text-teal-600">{stats.cities}</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <Map className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 md:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Quốc gia</p>
              <p className="text-3xl font-bold text-cyan-600">
                {stats.countries}
              </p>
            </div>
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-cyan-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-slate-200 animate-fade-in-up">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Tìm kiếm theo tên vị trí..."
              className="pl-10 h-11"
            />
          </div>
          {/* ⚙️ Actions */}
          <div className="flex gap-3">
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 rounded-md transition-colors text-sm ${viewMode === "grid" ? "bg-white shadow-sm" : ""}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1.5 rounded-md transition-colors text-sm ${viewMode === "list" ? "bg-white shadow-sm" : ""}`}
              >
                List
              </button>
            </div>
            <Button className="flex items-center gap-2 h-11 bg-blue-600 hover:bg-blue-700 shadow-sm">
              <Plus className="w-4 h-4" />
              Thêm vị trí
            </Button>
          </div>
        </div>
      </div>

      {/* Locations Table && Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up">
          {locations.map((location) => (
            <div
              key={location.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 hover:shadow-lg transition-all group"
            >
              <div
                className="relative h-56 overflow-hidden cursor-pointer"
                onClick={() => showLocationDetail(location)}
              >
                <img
                  src={location.hinhAnh}
                  alt={location.tenViTri}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {location.tinhThanh}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">{location.tenViTri}</h3>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4 text-slate-600">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">{location.quocGia}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <button
                    onClick={() => showLocationDetail(location)}
                    className="text-sm text-emerald-600 hover:underline font-medium"
                  >
                    Chi tiết
                  </button>
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 animate-fade-in-up">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                    Vị trí
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                    Tỉnh thành
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                    Quốc gia
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                    Hình ảnh
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {locations.map((location) => (
                  <tr
                    key={location.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">
                            {location.tenViTri}
                          </div>
                          <div className="text-sm text-slate-500">
                            ID: {location.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-900">
                      {location.tinhThanh}
                    </td>
                    <td className="px-6 py-4 text-slate-900">
                      {location.quocGia}
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={location.hinhAnh}
                        alt={location.tenViTri}
                        className="w-20 h-14 rounded-lg object-cover cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => showLocationDetail(location)}
                      />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showDetailModal && detailLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">
                Chi tiết vị trí
              </h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="relative h-80 rounded-xl overflow-hidden mb-6">
                <img
                  src={detailLocation.hinhAnh}
                  alt={detailLocation.tenViTri}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-3xl font-bold mb-2">
                    {detailLocation.tenViTri}
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Map className="w-5 h-5" />
                      <span>{detailLocation.tinhThanh}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      <span>{detailLocation.quocGia}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-emerald-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                    <div>
                      <div className="text-xs text-slate-600">Vị trí</div>
                      <div className="font-semibold text-slate-800">
                        {detailLocation.tenViTri}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-teal-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Map className="w-6 h-6 text-teal-600" />
                    <div>
                      <div className="text-xs text-slate-600">Tỉnh thành</div>
                      <div className="font-semibold text-slate-800">
                        {detailLocation.tinhThanh}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-cyan-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Globe className="w-6 h-6 text-cyan-600" />
                    <div>
                      <div className="text-xs text-slate-600">Quốc gia</div>
                      <div className="font-semibold text-slate-800">
                        {detailLocation.quocGia}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm text-slate-600 mb-1">ID vị trí</div>
                <div className="text-lg font-bold text-slate-800">
                  #{detailLocation.id}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
