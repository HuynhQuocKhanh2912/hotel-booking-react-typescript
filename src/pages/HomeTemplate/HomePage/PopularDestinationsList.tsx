import { ChevronRight, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getLocation } from "@/services/location.api";
import { useNavigate } from "react-router-dom";

export default function PopularDestinationsList() {
  const { data: location } = useQuery({
    queryKey: ["getLocation"],
    queryFn: getLocation,
  });
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Điểm Đến Phổ Biến
            </h2>
            <p className="text-slate-600 text-lg">
              Khám phá những địa điểm du lịch được yêu thích nhất
            </p>
          </div>
          <Button
            onClick={() => navigate("/location")}
            className="cursor-pointer p-0! hidden md:flex items-center text-blue-600 font-semibold hover:text-blue-700 bg-transparent hover:bg-transparent"
          >
            Xem tất cả <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {location?.slice(0, 4).map((dest, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-4/3 overflow-hidden">
                <img
                  src={dest.hinhAnh.trim().replace(/\s+/g, " ")}
                  alt={dest.tinhThanh}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <Map />
                  <h3 className="text-2xl font-bold">{dest.tinhThanh}</h3>
                </div>
                <p className="text-white">{dest.tenViTri} khách sạn</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
