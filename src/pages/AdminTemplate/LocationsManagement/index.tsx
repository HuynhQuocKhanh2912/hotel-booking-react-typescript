import { useEffect, useState } from "react";
import { Search, Plus, MapPin, Globe, Map } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useLocationDeleteQuery,
  useLocationListAllQuery,
  useLocationListQuery,
} from "@/hooks/useLocation";
import type { Location } from "@/interfaces/location.interface";
import LocationItemGrid from "./LocationItemGrid";
import LocationItemTable from "./LocationItemTable";
import { Dialog } from "@radix-ui/react-dialog";
import LocationDetailPopup from "./LocationDetailPopup";
import { useLocationAdminStore } from "@/stores/locationManagement.store";
import { PaginationAdmin } from "../_Component/PaginationAdmin";
import LocationPopup from "./LocationPopup";
import { showComfirmSwal } from "@/utils/swal";

export default function LocationsManagement() {
  // Store
  const { isModal, setIsModal, setIdLocation } = useLocationAdminStore();

  // State
  const itemLocationPagi: number = 12;
  const [pagiCurrent, setPagiCurrent] = useState(1);
  const [listLocation, setListLocation] = useState<Location[] | null>(null);
  const [mode, setMode] = useState<"add" | "edit" | "detail" | "img" | null>(
    null
  );

  const [viewMode, setViewMode] = useState("grid");
  // const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailLocation, setDetailLocation] = useState<Location | null>(null);

  // API
  const keyDebounce = "";
  const { data: dataLocationListAll } = useLocationListAllQuery();
  const { data: dataLocationList } = useLocationListQuery(
    pagiCurrent,
    itemLocationPagi,
    keyDebounce
  );
  const { mutate: mutateLocationDelete } = useLocationDeleteQuery();

  useEffect(() => {
    const list = dataLocationList?.data ?? [];
    // const result =
    //   watchSelect === "ALL"
    //     ? list
    //     : list.filter(
    //         (f) => f.role.toUpperCase() === watchSelect.toUpperCase()
    //       );
    setListLocation(list);
  }, [dataLocationList, pagiCurrent]);

  // Handle
  const handleLocationDetail = (location: Location) => {
    setDetailLocation(location);
    setIsModal();
    setMode("detail");
    setIdLocation(location.id);
  };

  const handleLocationAdd = () => {
    setMode("add");
    setIsModal();
  };

  const handleLocationDelete = (id: number) => {
    if (isModal) {
      setIsModal();
      setMode(null);
    }
    setTimeout(() => {
      showComfirmSwal({
        text: "Bạn có chắc chắn muốn xóa vị trí này không?",
        onConfirm: () => mutateLocationDelete(id),
      });
    }, 100);
  };

  const handleLocationEdit = (location: Location) => {
    setDetailLocation(location);
    setMode("edit");
    // modal is open when switching from detail to edit
    setIsModal();
    // if (!isModal) {
    // }
  };

  // Stats
  const stats = {
    total: dataLocationListAll?.length,
    cities: new Set(dataLocationListAll?.map((l) => l.tinhThanh)).size,
    countries: new Set(dataLocationListAll?.map((l) => l.quocGia)).size,
    withImages: dataLocationListAll?.filter((l) => l.hinhAnh).length,
  };

  // Pagination
  const infoPagi = {
    pageIndex: dataLocationList?.pageIndex || 0,
    pageSize: dataLocationList?.pageSize || 0,
    totalRow: dataLocationList?.totalRow || 0,
  };

  const handlePagi = (data: number) => {
    setPagiCurrent(data);
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
            <Button
              onClick={() => handleLocationAdd()}
              className="flex items-center gap-2 h-11 bg-blue-600 hover:bg-blue-700 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Thêm vị trí
            </Button>
          </div>
        </div>
      </div>

      {/* Locations Table && Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up">
          {listLocation?.map((location) => (
            <LocationItemGrid
              key={location.id}
              location={location}
              handleLocationDelete={handleLocationDelete}
              handleLocationDetail={handleLocationDetail}
              handleLocationEdit={handleLocationEdit}
            />
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
                {listLocation?.map((location) => (
                  <LocationItemTable
                    key={location.id}
                    location={location}
                    handleLocationDetail={handleLocationDetail}
                    handleLocationDelete={handleLocationDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {infoPagi.totalRow > itemLocationPagi && (
        <div className="w-full mt-6">
          <PaginationAdmin infoPagi={infoPagi} handlePagi={handlePagi} />
        </div>
      )}

      {/* Dialog */}
      <Dialog open={isModal} onOpenChange={() => setIsModal()}>
        {mode === "detail" && (
          <LocationDetailPopup detailLocation={detailLocation} />
        )}
        {mode === "add" && <LocationPopup mode="add" />}
        {mode === "edit" && <LocationPopup mode="edit" detailLocation={detailLocation} />}
      </Dialog>
    </>
  );
}
