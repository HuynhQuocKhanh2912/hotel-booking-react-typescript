import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { formatDateSafe } from "@/hooks/useFormatDateSafe";
import type { UserItem } from "@/interfaces/user.interface";
import {
  getRoleBadge,
  getGenderLabel,
  getGenderIcon,
  getGenderBg,
} from "./user.helpers";
import {
  Calendar,
  LockKeyhole,
  Mail,
  Phone,
  Shield,
  User,
} from "lucide-react";

type detailUser = {
  detailUser: UserItem | null;
  onDelete: (id: number) => void;
  onEdit: (user: UserItem) => void;
};

export default function UserDetailPopup({
  detailUser,
  onDelete,
  onEdit,
}: detailUser) {
  const roleBadge = getRoleBadge(detailUser?.role ?? "");

  return (
    <DialogContent className="sm:max-w-2xl p-0 border-0 rounded-none bg-transparent">
      <DialogTitle className="hidden">Popup Detail</DialogTitle>
      <div className="w-full max-h-[96vh] overflow-y-auto no-overflow bg-white rounded-xl">
        <div className="shadow-xl">
          <div className="relative h-32 bg-linear-to-r from-purple-500 to-indigo-600 rounded-t-xl">
            <div className="absolute -bottom-12 left-6 w-24 h-24 rounded-full overflow-hidden">
              {detailUser?.avatar ? (
                <img
                  src={detailUser?.avatar}
                  alt={detailUser?.name}
                  className="w-full h-full rounded-full border-4 border-white shadow-lg"
                />
              ) : (
                <div
                  className={`w-full h-full ${getGenderBg(detailUser?.gender ?? false)} flex items-center justify-center font-medium text-3xl text-white uppercase`}
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
              <span>{getGenderIcon(detailUser?.gender ?? false)}</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${roleBadge.bg} ${roleBadge.color}`}
              >
                {roleBadge.icon}
                {roleBadge.text}
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
                  {getGenderLabel(detailUser?.gender ?? false)}
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
                type="button"
                className="flex-1 h-11.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => detailUser && onEdit(detailUser)}
              >
                Chỉnh sửa
              </Button>
              <Button
                type="button"
                onClick={() => detailUser?.id && onDelete(detailUser?.id)}
                className="h-11.5 px-4 py-2.5 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                Xóa
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
