import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import {
  BarChart3,
  MessageSquare,
  Calendar,
  Users,
  Home,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";

export default function Dashboard() {
  // Lib
  const location = useLocation();
  const navigate = useNavigate();

  // State
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tabSidebar, setTabSidebar] = useState("");

  // Resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // location sidebar
  useEffect(() => {
    const local = location.pathname.split("/")[2];
    setTabSidebar(local || "");
  }, [location]);

  const menuItems = [
    {
      id: "overview",
      label: "Tổng Quan",
      icon: BarChart3,
      link: "",
      icpage: "📊",
    },
    {
      id: "comments",
      label: "Bình Luận",
      icon: MessageSquare,
      link: "comment-management",
      icpage: "💬",
    },
    {
      id: "bookings",
      label: "Đặt Phòng",
      icon: Calendar,
      link: "booking-management",
      icpage: "📅",
    },
    {
      id: "users",
      label: "Quản lý Người dùng",
      icon: Users,
      link: "user-management",
      icpage: "👤",
    },
    {
      id: "rooms",
      label: "Quản lý Phòng",
      icon: Home,
      link: "room-management",
      icpage: "🏠",
    },
    {
      id: "locations",
      label: "Quản lý Vị Trí",
      icon: MapPin,
      link: "location-management",
      icpage: "🗺️",
    },
  ];

  const { user } = useAuthStore();
  if (user && user.user.role === "USER") {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden max-md:pb-12">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-20"
        } bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col shadow-lg relative max-md:fixed max-md:bottom-0 max-md:left-0 max-md:w-full max-md:z-50 max-md:h-13 max-md:flex-row max-md:border-r-0 max-md:border-t`}
      >
        {/* Logo Section */}
        <div
          className={`${sidebarOpen ? "p-6" : "p-3"} border-b border-slate-200 flex items-center justify-between max-md:hidden`}
        >
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div className="">
                <h1 className="text-lg font-bold text-slate-800">
                  AirBnB Admin
                </h1>
                <p className="text-xs text-slate-500">Dashboard</p>
              </div>
            </div>
          )}
          {!sidebarOpen && (
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg mx-auto">
              <Home className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto max-md:flex max-md:flex-row max-md:py-0 max-md:px-0 max-md:justify-around max-md:items-center">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setTabSidebar(item.link);
                navigate(item.link);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 mb-1 rounded-lg transition-all duration-200 group max-md:h-full max-md:justify-center max-md:flex-col max-md:gap-1 max-md:py-2 max-md:mb-0 max-md:rounded-none ${
                tabSidebar === item.link
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <item.icon
                size={20}
                className={`flex-shrink-0 transition-transform duration-200 ${
                  tabSidebar === item.link
                    ? "scale-110"
                    : "group-hover:scale-110"
                }`}
              />
              {sidebarOpen && (
                <span className="text-sm font-medium truncate max-md:text-xs max-md:block">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-24 w-6 h-6 bg-white border border-slate-200 rounded-full shadow-md flex items-center justify-center hover:bg-slate-50 transition-colors max-md:hidden"
        >
          {sidebarOpen ? (
            <ChevronLeft size={14} className="text-slate-600" />
          ) : (
            <ChevronRight size={14} className="text-slate-600" />
          )}
        </button>

        {/* Footer */}
        {sidebarOpen && (
          <div className="p-4 border-t border-slate-200 max-md:hidden">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">
                  Admin User
                </p>
                <p className="text-xs text-slate-500 truncate">
                  admin@airbnb.com
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto ">
        <div className="p-8 max-md:p-5">
          {/* Header */}
          <div className="mb-8 animate-slide-in-right">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 transition-all duration-500">
              {menuItems.find((ic) => ic.id === tabSidebar)?.icpage}{" "}
              {menuItems.find((m) => m.id === tabSidebar)?.label}
            </h2>
            <p className="text-gray-600">Quản lý thông tin hệ thống</p>
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
