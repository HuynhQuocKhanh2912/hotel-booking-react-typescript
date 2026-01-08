import { formatDateSafe } from "@/hooks/useFormatDateSafe";
import type { UserItem } from "@/interfaces/user.interface";
import { Calendar, Edit, ImagePlus, Mail, Phone, Trash2 } from "lucide-react";
import {
  getRoleBadge,
  getGenderLabel,
  getGenderIcon,
  getGenderBg,
} from "./user.helpers";

type UserItemGridProps = {
  user: UserItem;
  handleUserImg: () => void;
  handleUserDetail: (user: UserItem) => void;
  handleUserEdit: (user: UserItem) => void;
  handleUserDelete: (id: number) => void;
};

export default function UserItemGrid({
  user,
  handleUserImg,
  handleUserDetail,
  handleUserEdit,
  handleUserDelete,
}: UserItemGridProps) {
  const roleBadge = getRoleBadge(user.role);

  return (
    <div
      key={user.id}
      className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-all overflow-hidden"
    >
      <div className="relative h-32 bg-linear-to-r from-purple-500 to-indigo-600">
        <div
          className="absolute -bottom-12 left-6 w-24 h-24 rounded-full overflow-hidden cursor-pointer"
          onClick={() => handleUserImg()}
        >
          <div className="absolute inset-0 flex items-center justify-center text-white rounded-full bg-black/60 transition-all duration-300 z-2 opacity-0 hover:opacity-100">
            <ImagePlus />
          </div>
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full rounded-full border-4 border-white shadow-lg"
            />
          ) : (
            <div
              className={`w-full h-full bg-linear-to-r ${getGenderBg(user.gender)} flex items-center justify-center font-medium text-3xl text-white uppercase`}
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
          <span className="text-lg">{getGenderIcon(user.gender)}</span>
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
            <button
              onClick={() => handleUserEdit(user)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleUserDelete(user.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
