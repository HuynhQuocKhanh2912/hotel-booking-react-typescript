import type { Location } from "@/interfaces/location.interface";
import { Edit, Globe, MapPin, Trash2 } from "lucide-react";

type LocationItemGridProps = {
  location: Location;
  handleLocationDetail: (location: Location) => void;
};

export default function LocationItemGrid({
  location,
  handleLocationDetail,
}: LocationItemGridProps) {
  return (
    <div
      key={location.id}
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 hover:shadow-lg transition-all group"
    >
      <div
        className="relative h-56 overflow-hidden cursor-pointer"
        onClick={() => handleLocationDetail(location)}
      >
        <img
          src={location.hinhAnh}
          alt={location.tenViTri}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{location.tinhThanh}</span>
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
            onClick={() => handleLocationDetail(location)}
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
  );
}
