import { getLocation } from "@/services/location.api";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";

export default function LocationPage() {
  const { data: location } = useQuery({
    queryKey: ["getLocation"],
    queryFn: getLocation,
  });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Khám phá các điểm đến nổi bật
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {location?.map((dest) => (
          <div key={dest.id} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl shadow-md group-hover:shadow-xl transition-shadow duration-300">
              <img
                src={dest.hinhAnh.trim().replace(/\s+/g, "")}
                alt={dest.tenViTri}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-top from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
                <Heart />
              </button>
            </div>
            <div className="mt-3">
              <h3 className="font-semibold text-gray-900">{dest.tenViTri}</h3>
              <p className="text-sm text-gray-600">{dest.quocGia}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors">
          Xem thêm vị trí
        </button>
      </div>
    </div>
  );
}
