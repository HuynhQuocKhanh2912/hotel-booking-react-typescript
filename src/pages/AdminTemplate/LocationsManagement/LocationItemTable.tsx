import { Edit, MapPin, Trash2 } from "lucide-react";
import type { Location } from "@/interfaces/location.interface";

type LocationItemTableProps = {
  location: Location;
  handleLocationDetail: (location: Location) => void;
  handleLocationDelete: (id: number) => void;
};

export default function LocationItemTable({
  location,
  handleLocationDetail,
  handleLocationDelete,
}: LocationItemTableProps) {
  return (
    <tr key={location.id} className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
            <MapPin className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <div className="font-medium text-slate-900">
              {location.tenViTri}
            </div>
            <div className="text-sm text-slate-500">ID: {location.id}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-slate-900">{location.tinhThanh}</td>
      <td className="px-6 py-4 text-slate-900">{location.quocGia}</td>
      <td className="px-6 py-4">
        <img
          src={location.hinhAnh}
          alt={location.tenViTri}
          className="w-20 h-14 rounded-lg object-cover cursor-pointer hover:scale-105 transition-transform"
          onClick={() => handleLocationDetail(location)}
        />
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleLocationDelete(location.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
