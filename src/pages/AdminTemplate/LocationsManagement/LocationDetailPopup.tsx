import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Location } from "@/interfaces/location.interface";
import { Globe, Map, MapPin } from "lucide-react";

type LocationDetailPopup = {
  detailLocation: Location | null;
};

export default function RoomDetailPopup({
  detailLocation,
}: LocationDetailPopup) {
  return (
    <DialogContent className="sm:max-w-2xl p-0 border-0 rounded-none bg-transparent">
      <DialogTitle className="hidden">Popup Detail</DialogTitle>
      <div className="w-full max-h-[96vh] overflow-y-auto no-overflow bg-white rounded-xl">
        <div className="shadow-xl">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">
                Chi tiết vị trí
              </h2>
            </div>
            <div className="p-6">
              <div className="relative h-80 rounded-xl overflow-hidden mb-6">
                <img
                  src={detailLocation?.hinhAnh}
                  alt={detailLocation?.tenViTri}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-3xl font-bold mb-2">
                    {detailLocation?.tenViTri}
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Map className="w-5 h-5" />
                      <span>{detailLocation?.tinhThanh}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      <span>{detailLocation?.quocGia}</span>
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
                        {detailLocation?.tenViTri}
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
                        {detailLocation?.tinhThanh}
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
                        {detailLocation?.quocGia}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm text-slate-600 mb-1">ID vị trí</div>
                <div className="text-lg font-bold text-slate-800">
                  #{detailLocation?.id}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
