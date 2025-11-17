import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  User,
  Mail,
  Phone,
  Calendar,
  Users,
  Eye,
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
import { useUsersListAllQuery, useUsersListQuery } from "@/hooks/useUserQuery";
import type { UserItem } from "@/interfaces/user.interface";
import { formatDateSafe } from "@/hooks/useFormatDateSafe";
import { PaginationAdmin } from "../_Component/PaginationAdmin";
import Loading from "../_Component/Loading";
import { Dialog } from "@/components/ui/dialog";
import UserDetailPopup from "./UserDetailPopup";
import UserPopup from "./UserPopup";
import { useDebounce } from "@/hooks/useDebounce";

//Type Filters and Actions
type Actions = {
  fsearch: string;
  fselect: string;
};

const UsersManagement = () => {
  const itemUserNumber: number = 9;
  // State
  const [viewMode, setViewMode] = useState<"grid | list" | string>("grid"); 
  const [pagiCurrent, setPagiCurrent] = useState(1);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [listUsers, setListUsers] = useState<UserItem[] | null>(null);
  const [detailUser, setDetailUser] = useState<UserItem | null>(null);
  const [mode, setMode] = useState<"add" | "edit" | "detail" | null>(null);
  

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

  useEffect(() => {
    const list = dataUserList?.data ?? [];
    const result = watchSelect === "ALL" ? list : list.filter(f => f.role.toUpperCase() === watchSelect.toUpperCase())
    setListUsers(result);
  }, [dataUserList, pagiCurrent , watchSelect]);

  const handleUserDetail = (user: UserItem) => {
    setDetailUser(user);
    setShowDetailModal(true);
    setMode("detail");
  };

  const handleUserAdd = () => {
    setMode("add");
    setShowDetailModal(true);
  };

  // Style css && text && icon
  const getRoleBadge = (role: string) => {
    return role === "ADMIN"
      ? {
          bg: "bg-purple-100",
          color: "text-purple-800",
          icon: <Crown className="w-3 h-3" />,
          text: "Quản trị",
        }
      : {
          bg: "bg-blue-100",
          color: "text-blue-800",
          icon: <User className="w-3 h-3" />,
          text: "Người dùng",
        };
  };

  const getGenderLabel = (gender: boolean) => {
    return gender ? "Nam" : "Nữ";
  };

  const getGenderIcon = (gender: boolean) => {
    return gender ? (
      <Mars className="text-blue-600" />
    ) : (
      <Venus className="text-pink-600" />
    );
  };

  const getGenderBg = (gender: boolean) => {
    return gender
      ? "from-blue-600 to-indigo-600"
      : "bg-gradient-to-r from-pink-400 to-purple-500";
  };

  const stats = {
    total: dataUserListAll?.length,
    admin: dataUserListAll?.filter((u) => u.role === "ADMIN").length,
    user: dataUserListAll?.filter((u) => u.role === "USER").length,
    male: dataUserListAll?.filter((u) => u.gender === true).length,
    female: dataUserListAll?.filter((u) => u.gender === false).length,
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
            const roleBadge = getRoleBadge(user.role);
            return (
              <div
                key={user.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="relative h-32 bg-gradient-to-r from-purple-500 to-indigo-600">
                  <div className="absolute -bottom-12 left-6 w-24 h-24 rounded-full overflow-hidden">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full rounded-full border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div
                        className={`w-full h-full bg-gradient-to-r ${getGenderBg(user.gender)} flex items-center justify-center font-medium text-3xl text-white uppercase`}
                      >
                        {user.name.split("", 1)}
                      </div>
                    )}
                  </div>
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${roleBadge.bg} ${roleBadge.color}`}
                    >
                      {roleBadge.icon}
                      {roleBadge.text}
                    </span>
                  </div>
                </div>
                <div className="pt-14 px-6 pb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-slate-800 line-clamp-1">
                      {user.name}
                    </h3>
                    <span className="text-lg">
                      {getGenderIcon(user.gender)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <span>ID: {user.id}</span>
                    <span>•</span>
                    <span>{getGenderLabel(user.gender)}</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    {user.phone && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{formatDateSafe(user.birthday)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <button
                      onClick={() => handleUserDetail(user)}
                      className="text-sm text-purple-600 hover:underline font-medium"
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
                  const roleBadge = getRoleBadge(user.role);

                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                            {user.avatar ? (
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-full h-full rounded-full"
                              />
                            ) : (
                              <div
                                className={`w-full h-full bg-gradient-to-r ${getGenderBg(user.gender)} flex items-center justify-center font-medium text-lg text-white uppercase`}
                              >
                                {user.name.split("", 1)}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 flex items-center gap-2 break-all">
                              {user.name}
                              <span>{getGenderIcon(user.gender)}</span>
                            </div>
                            <div className="text-sm text-slate-500">
                              ID: {user.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-900 break-all">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-slate-900">
                        {user.phone || "-"}
                      </td>
                      <td className="px-6 py-4 text-slate-900">
                        {formatDateSafe(user.birthday)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${roleBadge.bg} ${roleBadge.color}`}
                        >
                          {roleBadge.icon}
                          {roleBadge.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleUserDetail(user)}
                            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
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
      <Dialog
        open={showDetailModal}
        onOpenChange={(open) => setShowDetailModal(open)}
      >
        {mode === "detail" && <UserDetailPopup detailUser={detailUser} />}
        {mode === "add" && <UserPopup />}
      </Dialog>
    </>
  );
};

export default UsersManagement;
