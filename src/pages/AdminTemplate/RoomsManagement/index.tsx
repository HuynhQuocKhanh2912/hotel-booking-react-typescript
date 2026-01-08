import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Home,
  Users,
  MapPin,
  Wifi,
  Tv,
  Wind,
  Car,
  UtensilsCrossed,
  WashingMachine,
  Waves,
  Sofa,
  Heater,
} from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRoomListQuery, useUsersListAllQuery } from "@/hooks/useRoomQuery";
import type { RoomItems } from "@/interfaces/room.interface";
import RoomDetailPopup from "./RoomDetailPopup";
import { useRoomAdminStore } from "@/stores/roomManagement.store";
import RoomPopup from "./RoomPopup";

const RoomsManagement = () => {
  // Store
  const { isModal, setIsModal } = useRoomAdminStore();

  // State
  const itemRoomPagi: number = 9;
  const [mode, setMode] = useState<"add" | "edit" | "detail" | "img" | null>(
    null
  );
  const [viewMode, setViewMode] = useState("grid");
  const [detailRoom, setDetailRoom] = useState<RoomItems | null>(null);
  const [listRooms, setListRooms] = useState<RoomItems[] | null>(null);
  const [pagiCurrent, setPagiCurrent] = useState(1);

  // const keyDebounce = useDebounce(watchSearch, 500);
  const keyDebounce = "";
  // API
  const { data: dataRoomListAll } = useUsersListAllQuery();
  const { data: dataRoomList } = useRoomListQuery(
    pagiCurrent,
    itemRoomPagi,
    keyDebounce
  );

  useEffect(() => {
    const list = dataRoomList?.data ?? [];
    // const result =
    //   watchSelect === "ALL"
    //     ? list
    //     : list.filter(
    //         (f) => f.role.toUpperCase() === watchSelect.toUpperCase()
    //       );
    setListRooms(list);
  }, [dataRoomList, pagiCurrent]);

  const handleRoomDetail = (room: RoomItems) => {
    setDetailRoom(room);
    setIsModal();
    setMode("detail");
  };

  const handleRoomAdd = () => {
    setMode("add");
    setIsModal();
  };

  // Handler Amenities
  const getAmenities = (room: RoomItems) => {
    const amenities = [];
    if (room.wifi)
      amenities.push({ icon: <Wifi className="w-4 h-4" />, name: "Wifi" });
    if (room.tivi)
      amenities.push({ icon: <Tv className="w-4 h-4" />, name: "TV" });
    if (room.dieuHoa)
      amenities.push({ icon: <Wind className="w-4 h-4" />, name: "Điều hòa" });
    if (room.bep)
      amenities.push({
        icon: <UtensilsCrossed className="w-4 h-4" />,
        name: "Bếp",
      });
    if (room.mayGiat)
      amenities.push({
        icon: <WashingMachine className="w-4 h-4" />,
        name: "Máy giặt",
      });
    if (room.doXe)
      amenities.push({ icon: <Car className="w-4 h-4" />, name: "Đỗ xe" });
    if (room.hoBoi)
      amenities.push({ icon: <Waves className="w-4 h-4" />, name: "Hồ bơi" });
    if (room.banLa)
      amenities.push({ icon: <Sofa className="w-4 h-4" />, name: "Sofa" });
    if (room.banUi)
      amenities.push({ icon: <Heater className="w-4 h-4" />, name: "Bàn ủi" });
    return amenities;
  };

  const countAmenities = (room: RoomItems) => {
    return [
      room.wifi,
      room.tivi,
      room.dieuHoa,
      room.bep,
      room.mayGiat,
      room.doXe,
      room.hoBoi,
      room.banLa,
      room.banUi,
    ].filter(Boolean).length;
  };

  const stats = {
    total: dataRoomListAll?.length || 0,
    avgPrice:
      dataRoomListAll && dataRoomListAll.length > 0
        ? Math.round(
            dataRoomListAll.reduce((sum, r) => sum + r.giaTien, 0) /
              dataRoomListAll.length
          )
        : 0,
    maxGuests:
      dataRoomListAll && dataRoomListAll.length > 0
        ? Math.max(...dataRoomListAll.map((r) => r.khach))
        : 0,
    totalBedrooms:
      dataRoomListAll?.reduce((sum, r) => sum + r.phongNgu, 0) || 0,
  };

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8 animate-fade-in-up md:gap-3 lg:gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 md:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Tổng số phòng</p>
              <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center md:size-10 lg:size-12">
              <Home className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 md:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Giá TB</p>
              <p className="text-3xl font-bold text-green-600">
                ${stats.avgPrice}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center md:size-10 lg:size-12">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 md:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Khách tối đa</p>
              <p className="text-3xl font-bold text-purple-600">
                {stats.maxGuests}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center md:size-10 lg:size-12">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 md:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Tổng phòng ngủ</p>
              <p className="text-3xl font-bold text-orange-600">
                {stats.totalBedrooms}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center md:size-10 lg:size-12">
              <span className="text-2xl">🛏️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-slate-200 max-sm:p-5 animate-fade-in-up">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Tìm kiếm theo tên phòng..."
              className="pl-10 h-11"
            />
          </div>
          {/* ⚙️ Actions */}
          <div className="flex gap-3">
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 rounded-md transition-colors text-sm ${viewMode === "grid" ? "bg-white shadow-sm" : "cursor-pointer"}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1.5 rounded-md transition-colors text-sm ${viewMode === "list" ? "bg-white shadow-sm" : "cursor-pointer"}`}
              >
                List
              </button>
            </div>
            <Button
              className="flex items-center gap-2 h-11 bg-blue-600 hover:bg-blue-700 shadow-sm"
              onClick={() => handleRoomAdd()}
            >
              <Plus className="w-4 h-4" />
              Thêm phòng
            </Button>
          </div>
        </div>
      </div>

      {/* Rooms Table && Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-4 lg:gap-6 animate-fade-in-up">
          {listRooms?.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 hover:shadow-lg transition-all"
            >
              <div
                className="relative h-52 overflow-hidden cursor-pointer"
                // onClick={() => showRoomDetail(room)}
              >
                <img
                  src={room.hinhAnh}
                  alt={room.tenPhong}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md">
                  <span className="text-lg font-bold text-blue-600">
                    ${room.giaTien}
                  </span>
                  <span className="text-xs text-slate-600">/đêm</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-800 mb-2 h-fit h-14">
                  <span className="line-clamp-1">{room.tenPhong}</span>
                </h3>

                <div className="flex items-center gap-4 mb-3 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{room.khach}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🛏️</span>
                    <span>{room.phongNgu}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🚿</span>
                    <span>{room.phongTam}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-4 text-sm text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span>Vị trí {room.maViTri}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {getAmenities(room)
                    .slice(0, 4)
                    .map((amenity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded text-xs text-slate-700"
                      >
                        {amenity.icon}
                      </div>
                    ))}
                  {countAmenities(room) > 4 && (
                    <div className="px-2 py-1 bg-slate-200 rounded text-xs text-slate-700">
                      +{countAmenities(room) - 4}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <button
                    onClick={() => handleRoomDetail(room)}
                    className="text-sm text-blue-600 hover:underline"
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
                    Phòng
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                    Khách
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                    PN
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                    Giá
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                    Tiện nghi
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {listRooms?.map((room) => (
                  <tr
                    key={room.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={room.hinhAnh}
                          alt={room.tenPhong}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="max-w-xs">
                          <div className="font-medium text-slate-900 line-clamp-1">
                            {room.tenPhong}
                          </div>
                          <div className="text-sm text-slate-500">
                            ID: {room.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-900">{room.khach}</td>
                    <td className="px-6 py-4 text-slate-900">
                      {room.phongNgu}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-blue-600">
                        ${room.giaTien}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {getAmenities(room)
                          .slice(0, 3)
                          .map((amenity, idx) => (
                            <div key={idx} className="text-slate-700">
                              {amenity.icon}
                            </div>
                          ))}
                        {countAmenities(room) > 3 && (
                          <span className="text-xs text-slate-500">
                            +{countAmenities(room) - 3}
                          </span>
                        )}
                      </div>
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

      {/* Dialog */}
      <Dialog open={isModal} onOpenChange={() => setIsModal()}>
        {mode === "detail" && (
          <RoomDetailPopup
            detailRoom={detailRoom}
            getAmenities={getAmenities}
            // onDelete={handleUserDelete}
            // onEdit={handleUserEdit}
          />
        )}
        {/* {mode === "img" && <UserPopupImage />} */}
        {mode === "add" && <RoomPopup mode="add" />}
        {/* {mode === "edit" && <UserPopup mode="edit" detailUser={detailUser} />} */}
      </Dialog>
    </>
  );
};

export default RoomsManagement;
