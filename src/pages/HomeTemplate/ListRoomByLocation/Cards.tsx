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
import { useEffect, useState } from "react";
import PaginationLayout from "@/layouts/Pagination";
import type { Location } from "@/interfaces/location.interface";
import type { RoomItems } from "@/interfaces/room.interface";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function RoomListing() {
  const [province, setProvince] = useState<string>("");
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

  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }, [pageIndex]);

  // get detail rooms by id
  const handleGetRoomsById = (value: number) => {
    navigate(`/detail-room/${value}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Khám phá khách sạn
          </h1>
          <p className="text-slate-600">
            Tìm kiếm nơi ở hoàn hảo cho kỳ nghỉ của bạn
          </p>
        </div>

        {/* Location Filter */}
        <Card className="mb-8 border-gray-200">
          <CardContent className="flex flex-wrap flex-col pt-6">
            <div className="gap-2 mb-6">
              <Filter className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-gray-900 text-lg">
                Lọc tìm kiếm
              </span>
            </div>
            <div className="gap-6 space-y-4">
              {/* Province Select */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Tỉnh / Thành phố
                </label>
                <Select onValueChange={handleSelectProvince} value={province}>
                  <SelectTrigger className="w-full">
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
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Vị trí
                </label>
                <Select
                  disabled={!province}
                  onValueChange={(value) => handleGetIDLocation(value)}
                >
                  <SelectTrigger className="w-full">
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          id="toSection"
        >
          {roomsToRender.map((room: RoomItems) => (
            <div
              key={room.id}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
            >
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                <img
                  src={room.hinhAnh}
                  alt={room.tenPhong}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                {/* Location Badge */}
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-900">
                    {room.maViTri}
                  </span>
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg px-4 py-2 shadow-lg">
                  <p className="text-2xl font-bold">${room.giaTien}</p>
                  <p className="text-xs text-blue-100">/đêm</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Title */}
                <h3 className="font-bold text-gray-900 text-base mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {room.tenPhong}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    5.0
                  </span>
                  <span className="text-xs text-gray-500">(128)</span>
                </div>

                {/* Room Info */}
                <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">
                      {room.phongNgu}
                    </p>
                    <p className="text-xs text-gray-600">Phòng</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">
                      {room.giuong}
                    </p>
                    <p className="text-xs text-gray-600">Giường</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">
                      {room.phongTam}
                    </p>
                    <p className="text-xs text-gray-600">Phòng tắm</p>
                  </div>
                </div>

                {/* Amenities */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {room.wifi && (
                    <div className="flex items-center justify-center gap-1 bg-blue-50 rounded-lg p-2">
                      <Wifi className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-gray-700 font-medium">
                        Wifi
                      </span>
                    </div>
                  )}
                  {room.tivi && (
                    <div className="flex items-center justify-center gap-1 bg-blue-50 rounded-lg p-2">
                      <Tv className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-gray-700 font-medium">
                        TV
                      </span>
                    </div>
                  )}
                  {room.dieuHoa && (
                    <div className="flex items-center justify-center gap-1 bg-blue-50 rounded-lg p-2">
                      <Wind className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-gray-700 font-medium">
                        Điều hòa
                      </span>
                    </div>
                  )}
                  {room.bep && (
                    <div className="flex items-center justify-center gap-1 bg-blue-50 rounded-lg p-2">
                      <Utensils className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-gray-700 font-medium">
                        Bếp
                      </span>
                    </div>
                  )}
                  {room.doXe && (
                    <div className="flex items-center justify-center gap-1 bg-blue-50 rounded-lg p-2">
                      <Car className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-gray-700 font-medium">
                        Đỗ xe
                      </span>
                    </div>
                  )}
                  {room.hoBoi && (
                    <div className="flex items-center justify-center gap-1 bg-blue-50 rounded-lg p-2">
                      <Waves className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-gray-700 font-medium">
                        Hồ bơi
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {room.moTa}
                </p>

                {/* CTA Button */}
                <Button
                  onClick={() => handleGetRoomsById(room.id)}
                  className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Xem chi tiết
                </Button>
              </div>
            </div>
          ))}
        </div>
        <PaginationLayout
          pageSize={pageSize}
          pageIndex={pageIndex}
          totalRow={listRooms?.totalRow ?? 0}
          onPageChange={(page) => setPageIndex(page)}
        />
      </div>
    </div>
  );
}
