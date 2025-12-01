import { useAuthStore } from "@/stores/auth.store";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthTemplate() {
  const { user } = useAuthStore();
  if (user && user.user.role === "ADMIN") {
    return <Navigate to="/dashboard" />;
  }
  if (user && user.user.role === "USER") {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-200 p-6">
      <Outlet />
    </div>
  );
}
