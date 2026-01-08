import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Search,
  Plus,
  User,
  Users,
  Crown,
  Filter,
  Mars,
  Venus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  useUsersDeleteQuery,
  useUsersListAllQuery,
  useUsersListQuery,
} from "@/hooks/useUserQuery";
import type { UserItem } from "@/interfaces/user.interface";
import { PaginationAdmin } from "../_Component/PaginationAdmin";
import Loading from "../_Component/Loading";
import { Dialog } from "@/components/ui/dialog";
import UserDetailPopup from "./UserDetailPopup";
import UserPopup from "./UserPopup";
import { useDebounce } from "@/hooks/useDebounce";
import { useUserAdminStore } from "@/stores/userManagement.store";
import { showComfirmSwal } from "@/utils/swal";
import UserPopupImage from "./UserPopupImage";
import UserItemGrid from "./UserItemGrid";
import UserItemTable from "./UserItemTable";

//Type Filters and Actions
type Actions = {
  fsearch: string;
  fselect: string;
};

const UsersManagement = () => {
  const itemUserNumber: number = 9;
  // Store
  const { isModal, setIsModal, setIdUser } = useUserAdminStore();

  // State
  const [viewMode, setViewMode] = useState<"grid | list" | string>("grid");
  const [pagiCurrent, setPagiCurrent] = useState(1);
  const [listUsers, setListUsers] = useState<UserItem[] | null>(null);
  const [detailUser, setDetailUser] = useState<UserItem | null>(null);
  const [mode, setMode] = useState<"add" | "edit" | "detail" | "img" | null>(
    null
  );

  // Form
  const { register, control, watch } = useForm<Actions>({
    defaultValues: {
      fsearch: "",
      fselect: "ALL",
    },
  });

  const watchSearch = watch("fsearch");
  const watchSelect = watch("fselect");

  const keyDebounce = useDebounce(watchSearch, 500);
  // API
  const { data: dataUserListAll } = useUsersListAllQuery();
  const { data: dataUserList, isLoading: isLoadingList } = useUsersListQuery(
    pagiCurrent,
    itemUserNumber,
    keyDebounce
  );
  const { mutate: mutateUserDelete } = useUsersDeleteQuery();

  useEffect(() => {
    const list = dataUserList?.data ?? [];
    const result =
      watchSelect === "ALL"
        ? list
        : list.filter(
            (f) => f.role.toUpperCase() === watchSelect.toUpperCase()
          );
    setListUsers(result);
  }, [dataUserList, pagiCurrent, watchSelect]);

  const handleUserDetail = (user: UserItem) => {
    setDetailUser(user);
    setIsModal();
    setMode("detail");
    setIdUser(user.id);
  };

  const handleUserAdd = () => {
    setMode("add");
    setIsModal();
  };

  const handleUserEdit = (user: UserItem) => {
    setDetailUser(user);
    setMode("edit");
    // modal is open when switching from detail to edit
    if (!isModal) {
      setIsModal();
    }
  };

  const handleUserImg = () => {
    setMode("img");
    setIsModal();
  };

  const handleUserDelete = (id: number) => {
    // Close Dialog before show SweetAlert2
    if (isModal) {
      setIsModal();
      setMode(null);
    }
    setTimeout(() => {
      showComfirmSwal({
        text: "Bạn có chắc chắn muốn xóa người dùng này không?",
        onConfirm: () => mutateUserDelete(id),
      });
    }, 100);
  };

  // Stats
  const stats = {
    total: dataUserListAll?.length || 0,
    admin: dataUserListAll?.filter((user) => user.role === "ADMIN").length || 0,
    user: dataUserListAll?.filter((user) => user.role === "USER").length || 0,
    male: dataUserListAll?.filter((user) => user.gender === true).length || 0,
    female:
      dataUserListAll?.filter((user) => user.gender === false).length || 0,
  };

  // Pagination
  const infoPagi = {
    pageIndex: dataUserList?.pageIndex || 0,
    pageSize: dataUserList?.pageSize || 0,
    totalRow: dataUserList?.totalRow || 0,
  };

  const handlePagi = (data: number) => {
    setPagiCurrent(data);
  };

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 animate-fade-in-up gap-6 md:gap-3 lg:gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-4 lg:p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Tổng tài khoản</p>
              <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-4 lg:p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Admin</p>
              <p className="text-3xl font-bold text-purple-600">
                {stats.admin}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Crown className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-4 lg:p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">User</p>
              <p className="text-3xl font-bold text-blue-600">{stats.user}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-4 lg:p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Nam</p>
              <p className="text-3xl font-bold text-cyan-600">{stats.male}</p>
            </div>
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl text-blue-600">
                <Mars />
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-4 lg:p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Nữ</p>
              <p className="text-3xl font-bold text-pink-600">{stats.female}</p>
            </div>
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl text-pink-600">
                <Venus />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-slate-200 animate-fade-in-up">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-1 gap-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Tìm kiếm theo tên..."
                className="pl-10 h-11"
                {...register("fsearch")}
              />
            </div>

            {/* Filter Select */}
            <div className="relative w-[180px] max-sm:w-full">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
              <Controller
                name="fselect"
                control={control}
                render={({ field }) => {
                  return (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="pl-10 !h-11 w-full">
                        <SelectValue placeholder="Tất cả vai trò" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALL">Tất cả vai trò</SelectItem>
                        <SelectItem value="ADMIN">Quản lí</SelectItem>
                        <SelectItem value="USER">Người dùng</SelectItem>
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            </div>
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
              className="flex items-center gap-2 h-11 bg-blue-600 hover:bg-blue-700 shadow-sm"
              onClick={handleUserAdd}
            >
              <Plus className="w-4 h-4" />
              Thêm người dùng
            </Button>
          </div>
        </div>
      </div>

      {/* Users Table && Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
          {listUsers?.map((user) => {
            return (
              <UserItemGrid
                key={user.id}
                user={user}
                handleUserImg={handleUserImg}
                handleUserDelete={handleUserDelete}
                handleUserDetail={handleUserDetail}
                handleUserEdit={handleUserEdit}
              />
            );
          })}
        </div>
      ) : (
        <div
          className={`bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 ${listUsers?.length === 0 && "mb-4"}`}
        >
          <div className="overflow-x-auto">
            <table className="w-full table-fixed min-w-[1200px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase w-[24%]">
                    Người dùng
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase w-[24%]">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase ">
                    SĐT
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase ">
                    Ngày sinh
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase ">
                    Vai trò
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase w-[10%]">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {listUsers?.map((user) => {
                  return (
                    <UserItemTable
                      key={user.id}
                      user={user}
                      handleUserImg={handleUserImg}
                      handleUserDetail={handleUserDetail}
                      handleUserEdit={handleUserEdit}
                      handleUserDelete={handleUserDelete}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Loading */}
      {isLoadingList && <Loading />}

      {listUsers?.length === 0 && (
        <p className="text-center p-2 text-gray-400">
          Không tìm thấy kết quả "{keyDebounce}"
        </p>
      )}

      {/* Pagination */}
      {infoPagi.totalRow > itemUserNumber && (
        <div className="w-full mt-6">
          <PaginationAdmin infoPagi={infoPagi} handlePagi={handlePagi} />
        </div>
      )}

      {/* Dialog */}
      <Dialog open={isModal} onOpenChange={() => setIsModal()}>
        {mode === "detail" && (
          <UserDetailPopup
            detailUser={detailUser}
            onDelete={handleUserDelete}
            onEdit={handleUserEdit}
          />
        )}
        {mode === "img" && <UserPopupImage />}
        {mode === "add" && <UserPopup mode="add" />}
        {mode === "edit" && <UserPopup mode="edit" detailUser={detailUser} />}
      </Dialog>
    </>
  );
};

export default UsersManagement;
