import type { UserItem } from "@/interfaces/user.interface";
import {
  getRoleBadge,
  getGenderIcon,
  getGenderBg,
} from "./user.helpers";
import { formatDateSafe } from "@/hooks/useFormatDateSafe";
import { Edit, Eye, Trash2 } from "lucide-react";

type UserItemTableProps = {
  user: UserItem;
  handleUserImg: () => void;
  handleUserDetail: (user: UserItem) => void;
  handleUserEdit: (user: UserItem) => void;
  handleUserDelete: (id: number) => void;
};

export default function UserItemTable({
  user,
  handleUserImg,
  handleUserEdit,
  handleUserDetail,
  handleUserDelete,
}: UserItemTableProps) {
  const roleBadge = getRoleBadge(user.role);

  return (
    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full rounded-full"
                onClick={() => handleUserImg()}
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
            <div className="text-sm text-slate-500">ID: {user.id}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-slate-900 break-all">{user.email}</td>
      <td className="px-6 py-4 text-slate-900">{user.phone || "-"}</td>
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
          <button
            onClick={() => handleUserEdit(user)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleUserDelete(user.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
