import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { formatDateSafe } from "@/hooks/useFormatDateSafe";
import type { UserItem } from "@/interfaces/user.interface";
import { showComfirmSwal } from "@/utils/swal";
import {
  Calendar,
  Crown,
  LockKeyhole,
  Mail,
  Mars,
  Phone,
  Shield,
  User,
  Venus,
  // X,
} from "lucide-react";

type detailUser = {
  detailUser: UserItem | null;
  onDelete: (id:number) => void;
};

export default function UserDetailPopup({
  detailUser,
  onDelete,
}: detailUser) {
  const getRoleBadge = (role: string | undefined) => {
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
  const getGenderLabel = (gender: boolean | undefined) => {
    return gender ? "Nam" : "Nữ";
  };
  const getGenderIcon = (gender: boolean | undefined) => {
    return gender ? (
      <Mars className="text-blue-600" />
    ) : (
      <Venus className="text-pink-600" />
    );
  };
  const getGenderBg = (gender: boolean | undefined) => {
    return gender
      ? "from-blue-600 to-indigo-600"
      : "bg-gradient-to-r from-pink-400 to-purple-500";
  };

  return (
    <DialogContent className="sm:max-w-2xl p-0 border-0 rounded-none bg-transparent">
      <DialogTitle className="hidden">Popup Detail</DialogTitle>
      <div className="bg-white rounded-xl shadow-xl w-full">
        <div className="relative h-32 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-t-xl">
          {/* <button
            // onClick={() => setShowDetailModal(false)}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm"
          >
            <X className="w-5 h-5 text-white" />
          </button> */}
          <div className="absolute -bottom-12 left-6 w-24 h-24 rounded-full overflow-hidden">
            {detailUser?.avatar ? (
              <img
                src={detailUser?.avatar}
                alt={detailUser?.name}
                className="w-full h-full rounded-full border-4 border-white shadow-lg"
              />
            ) : (
              <div
                className={`w-full h-full bg-gradient-to-r ${getGenderBg(detailUser?.gender)} flex items-center justify-center font-medium text-3xl text-white uppercase`}
              >
                {detailUser?.name.split("", 1)}
              </div>
            )}
          </div>
        </div>
        <div className="pt-16 px-6 pb-6">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              {detailUser?.name}
            </h2>
            <span>{getGenderIcon(detailUser?.gender)}</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${getRoleBadge(detailUser?.role).bg} ${getRoleBadge(detailUser?.role).text}`}
            >
              {getRoleBadge(detailUser?.role).icon}
              {detailUser?.role}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-5 h-5 text-slate-600" />
                <span className="text-sm text-slate-600">Email</span>
              </div>
              <div className="font-medium text-slate-800">
                {detailUser?.email}
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-5 h-5 text-slate-600" />
                <span className="text-sm text-slate-600">Điện thoại</span>
              </div>
              <div className="font-medium text-slate-800">
                {detailUser?.phone || "Chưa có"}
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-slate-600" />
                <span className="text-sm text-slate-600">Ngày sinh</span>
              </div>
              <div className="font-medium text-slate-800">
                {formatDateSafe(detailUser?.birthday)}
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-5 h-5 text-slate-600" />
                <span className="text-sm text-slate-600">Giới tính</span>
              </div>
              <div className="font-medium text-slate-800">
                {getGenderLabel(detailUser?.gender)}
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg mb-6">
            <div className="flex items-center gap-2 mb-2">
              <LockKeyhole className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-blue-900 font-medium">
                Thông tin hệ thống
              </span>
            </div>
            <div className="text-blue-800 text-sm">
              <span className="font-semibold">{detailUser?.password}</span>
            </div>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-purple-900 font-medium">
                Thông tin hệ thống
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-purple-800">
                ID: <span className="font-semibold">#{detailUser?.id}</span>
              </div>
              <div className="text-purple-800">
                Vai trò:{" "}
                <span className="font-semibold">{detailUser?.role}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              className="flex-1 h-11.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Chỉnh sửa
            </Button>
            <Button
              type="submit"
              onClick={() => detailUser?.id && onDelete(detailUser?.id)}
              className="h-11.5 px-4 py-2.5 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              Xóa
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

{
  /* {showDetailModal && detailUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
            <div className="relative h-32 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-t-xl">
              <button
                onClick={() => setShowDetailModal(false)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <div className="absolute -bottom-12 left-6 w-24 h-24 rounded-full overflow-hidden">
                {detailUser.avatar ? (
                  <img
                    src={detailUser.avatar}
                    alt={detailUser.name}
                    className="w-full h-full rounded-full border-4 border-white shadow-lg"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-r ${getGenderBg(detailUser.gender)} flex items-center justify-center font-medium text-3xl text-white uppercase`}
                  >
                    {detailUser.name.split("", 1)}
                  </div>
                )}
              </div>
            </div>
            <div className="pt-16 px-6 pb-6">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  {detailUser.name}
                </h2>
                <span>{getGenderIcon(detailUser.gender)}</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${getRoleBadge(detailUser.role).bg} ${getRoleBadge(detailUser.role).text}`}
                >
                  {getRoleBadge(detailUser.role).icon}
                  {detailUser.role}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-5 h-5 text-slate-600" />
                    <span className="text-sm text-slate-600">Email</span>
                  </div>
                  <div className="font-medium text-slate-800">
                    {detailUser.email}
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-5 h-5 text-slate-600" />
                    <span className="text-sm text-slate-600">Điện thoại</span>
                  </div>
                  <div className="font-medium text-slate-800">
                    {detailUser.phone || "Chưa có"}
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-slate-600" />
                    <span className="text-sm text-slate-600">Ngày sinh</span>
                  </div>
                  <div className="font-medium text-slate-800">
                    {formatDateSafe(detailUser.birthday)}
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-5 h-5 text-slate-600" />
                    <span className="text-sm text-slate-600">Giới tính</span>
                  </div>
                  <div className="font-medium text-slate-800">
                    {getGenderLabel(detailUser.gender)}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <LockKeyhole className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-blue-900 font-medium">
                    Thông tin hệ thống
                  </span>
                </div>
                <div className="text-blue-800 text-sm">
                  <span className="font-semibold">{detailUser.password}</span>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-purple-900 font-medium">
                    Thông tin hệ thống
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-purple-800">
                    ID: <span className="font-semibold">#{detailUser.id}</span>
                  </div>
                  <div className="text-purple-800">
                    Vai trò:{" "}
                    <span className="font-semibold">{detailUser.role}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Chỉnh sửa
                </button>
                <button className="px-4 py-2.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */
}
