import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { RoomItems } from "@/interfaces/room.interface";
import type { UserItem } from "@/interfaces/user.interface";
import {
  Users,
} from "lucide-react";

type RoomDetailPopupProp = {
  detailRoom: RoomItems | null;
  getAmenities: (room: RoomItems) => { icon: React.ReactNode; name: string }[];
  // onDelete: (id:number) => void;
  // onEdit: (user:UserItem) => void;
};

export default function RoomDetailPopup({
  detailRoom,
  getAmenities,
  // onDelete,
  // onEdit,
}: RoomDetailPopupProp) {
  console.log(detailRoom);

  return (
    <DialogContent className="sm:max-w-2xl p-0 border-0 rounded-none bg-transparent">
      <DialogTitle className="hidden">Popup Detail</DialogTitle>
      <div className="w-full max-h-[96vh] overflow-y-auto no-overflow bg-white rounded-xl">
        <div className="shadow-xl">
          <div className="p-6">
            <img
              src={detailRoom?.hinhAnh}
              alt={detailRoom?.tenPhong}
              className="w-full h-64 object-cover rounded-xl mb-6"
            />
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              {detailRoom?.tenPhong}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="text-sm text-slate-600">Khách</div>
                <div className="text-xl font-bold">{detailRoom?.khach}</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <span className="text-2xl mb-2 block">🛏️</span>
                <div className="text-sm text-slate-600">Phòng ngủ</div>
                <div className="text-xl font-bold">{detailRoom?.phongNgu}</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <span className="text-2xl mb-2 block">🛏️</span>
                <div className="text-sm text-slate-600">Giường</div>
                <div className="text-xl font-bold">{detailRoom?.giuong}</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <span className="text-2xl mb-2 block">🚿</span>
                <div className="text-sm text-slate-600">Phòng tắm</div>
                <div className="text-xl font-bold">{detailRoom?.phongTam}</div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-bold text-slate-800 mb-3">Mô tả</h4>
              <p className="text-slate-600 leading-relaxed">
                {detailRoom?.moTa}
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-bold text-slate-800 mb-3">
                Tiện nghi
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {getAmenities(detailRoom!).map((amenity, idx) => {
                  console.log("🎄 ~ RoomDetailPopup ~ amenity:", amenity)
                  return <div
                    key={idx}
                    className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg"
                  >
                    {amenity.icon}
                    <span className="text-sm text-slate-700">
                      {amenity.name}
                    </span>
                  </div>;
                })}
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <div>
                <div className="text-sm text-slate-600">Giá phòng</div>
                <div className="text-3xl font-bold text-blue-600">
                  ${detailRoom?.giaTien}
                  <span className="text-lg text-slate-600">/đêm</span>
                </div>
              </div>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Đặt phòng ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
