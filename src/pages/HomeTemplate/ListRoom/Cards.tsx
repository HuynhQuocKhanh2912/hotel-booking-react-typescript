import {
  Wifi,
  Wind,
  Tv,
  Waves,
  MapPin,
  Star,
  Utensils,
  Car,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getLocation } from "@/services/location.api";
import { Card, CardContent } from "@/components/ui/card";
import { getListRoomByLocation, getRoomListApi } from "@/services/room.api";
import { useState } from "react";
import PaginationLayout from "@/layouts/Pagination";
import type { Location } from "@/interfaces/location.interface";
import type { RoomItems } from "@/interfaces/room.interface";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function RoomListing() {
  const [province, setProvince] = useState<string>();
  const [filteredLocation, setFilterdLocation] = useState<Location[]>([]);
  const [selectID, getSelectID] = useState<string>("");
  const navigate = useNavigate();

  //set pagination
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 9;

  const { data: listRooms } = useQuery({
    queryKey: ["getListRoom", pageIndex, pageSize],
    queryFn: () => getRoomListApi(pageIndex, pageSize),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });

  // Get Province
  const { data: locations = [] } = useQuery({
    queryKey: ["getListLocation"],
    queryFn: getLocation,
  });

  const { data: listRoomsLocation } = useQuery({
    queryKey: ["getListRoomsLocation", selectID],
    queryFn: () => getListRoomByLocation(selectID),
    enabled: !!selectID,
  });

  const handleSelectProvince = (val: string): void => {
    setProvince(val);
    const filtered = locations.filter((location) => location.tinhThanh === val);
    setFilterdLocation(filtered);
  };
  const handleGetIDLocation = (e: string) => {
    getSelectID(e);
  };

  const roomsToRender = selectID
    ? (listRoomsLocation ?? [])
    : (listRooms?.data ?? []);

  // get detail rooms by id
  const handleGetRoomsById = (value: number) => {
    navigate(`/detail-room/${value}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
            Khám phá khách sạn
          </h1>
          <p className="text-lg text-gray-600">
            Tìm kiếm nơi ở hoàn hảo cho kỳ nghỉ của bạn
          </p>
        </div>

        {/* Location Filter */}
        <Card className="mb-10 border border-gray-200 shadow-lg bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
              <Filter className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-gray-900 text-xl">
                Lọc tìm kiếm
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Province Select */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Tỉnh / Thành phố
                </label>
                <Select
                  onValueChange={handleSelectProvince}
                  value={province || undefined}
                >
                  <SelectTrigger className="w-full h-12 border-2 border-gray-200 hover:border-blue-400 transition-colors">
                    <SelectValue
                      placeholder="Chọn tỉnh / thành phố"
                      className="w-full"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {locations.map((add) => (
                        <SelectItem key={add.id} value={add.tinhThanh}>
                          {add.tinhThanh}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Location Select */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Vị trí
                </label>
                <Select
                  disabled={!province}
                  onValueChange={(value) => handleGetIDLocation(value)}
                >
                  <SelectTrigger className="w-full h-12 border-2 border-gray-200 hover:border-blue-400 transition-colors disabled:opacity-50">
                    <SelectValue
                      placeholder={
                        province ? "Chọn vị trí" : "Vui lòng chọn tỉnh trước"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {filteredLocation.map((location) => (
                        <SelectItem
                          key={location.id}
                          value={location.id.toString()}
                        >
                          {location.tenViTri}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          id="toSection"
        >
          {roomsToRender.map((room: RoomItems) => (
            <div
              key={room.id}
              onClick={() => handleGetRoomsById(room.id)}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-300 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden bg-linear-to-br from-gray-200 to-gray-300">
                <img
                  src={room.hinhAnh}
                  alt={room.tenPhong}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Location Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-md border border-white/50">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-900">
                    {room.maViTri}
                  </span>
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-xl border border-white/50">
                  <div className="flex items-baseline gap-1">
                    <p className="text-2xl font-bold text-gray-900">
                      ${room.giaTien?.toLocaleString("en-US") || "0"}
                    </p>
                    <p className="text-xs text-gray-600 font-medium">/đêm</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="font-bold text-gray-900 text-lg mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {room.tenPhong}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-sm font-semibold text-gray-900">
                      5.0
                    </span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                  <span className="text-sm text-gray-600 font-medium">
                    128 đánh giá
                  </span>
                </div>

                {/* Room Info */}
                <div className="grid grid-cols-3 gap-4 mb-5 pb-5 border-b border-gray-200">
                  <div className="text-center bg-gray-50 rounded-lg py-3">
                    <p className="text-xl font-bold text-gray-900">
                      {room.phongNgu}
                    </p>
                    <p className="text-xs text-gray-600 font-medium mt-1">
                      Phòng
                    </p>
                  </div>
                  <div className="text-center bg-gray-50 rounded-lg py-3">
                    <p className="text-xl font-bold text-gray-900">
                      {room.giuong}
                    </p>
                    <p className="text-xs text-gray-600 font-medium mt-1">
                      Giường
                    </p>
                  </div>
                  <div className="text-center bg-gray-50 rounded-lg py-3">
                    <p className="text-xl font-bold text-gray-900">
                      {room.phongTam}
                    </p>
                    <p className="text-xs text-gray-600 font-medium mt-1">
                      Phòng tắm
                    </p>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {room.wifi && (
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                      <Wifi className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-gray-700 font-medium">
                        Wifi
                      </span>
                    </div>
                  )}
                  {room.tivi && (
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                      <Tv className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-gray-700 font-medium">
                        TV
                      </span>
                    </div>
                  )}
                  {room.dieuHoa && (
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                      <Wind className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-gray-700 font-medium">
                        Điều hòa
                      </span>
                    </div>
                  )}
                  {room.bep && (
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                      <Utensils className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-gray-700 font-medium">
                        Bếp
                      </span>
                    </div>
                  )}
                  {room.doXe && (
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                      <Car className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-gray-700 font-medium">
                        Đỗ xe
                      </span>
                    </div>
                  )}
                  {room.hoBoi && (
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                      <Waves className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-gray-700 font-medium">
                        Hồ bơi
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-5 line-clamp-2 leading-relaxed">
                  {room.moTa}
                </p>

                {/* CTA Button */}
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGetRoomsById(room.id);
                  }}
                  className="cursor-pointer w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-6 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Xem chi tiết
                </Button>
              </div>
            </div>
          ))}
        </div>
        {!selectID && (
          <div className="mt-12">
            <PaginationLayout
              pageSize={pageSize}
              pageIndex={pageIndex}
              totalRow={listRooms?.totalRow ?? 0}
              onPageChange={(page) => setPageIndex(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
