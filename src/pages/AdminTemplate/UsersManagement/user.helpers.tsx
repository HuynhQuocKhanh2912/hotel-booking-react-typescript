import { Crown, User, Mars, Venus } from "lucide-react";

export const getRoleBadge = (role: string) => {
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

export const getGenderLabel = (gender: boolean) => (gender ? "Nam" : "Nữ");

export const getGenderIcon = (gender: boolean) =>
  gender ? (
    <Mars className="text-blue-600" />
  ) : (
    <Venus className="text-pink-600" />
  );

export const getGenderBg = (gender: boolean) => {
  return gender
    ? "from-blue-600 to-indigo-600"
    : "bg-gradient-to-r from-pink-400 to-purple-500";
};
