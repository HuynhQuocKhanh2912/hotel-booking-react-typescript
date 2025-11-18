import { useState } from "react";
import { Building2, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-gradient-to from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="w-6 h-6 " />
            </div>
            <div>
              <span className="text-2xl font-bold text-slate-900 block leading-none">
                LuxeStay
              </span>
              <span className="text-xs text-slate-500">
                Premium Hotel Booking
              </span>
            </div>
          </div>
          <nav className="hidden lg:flex items-center space-x-8">
            <Button className="cursor-pointer bg-transparent text-slate-700 font-medium transition hover:bg-transparent hover:text-blue-700">
              Trang chủ
            </Button>
            <Button className="cursor-pointer text-slate-700 bg-transparent hover:bg-transparent font-medium transition hover:text-blue-700">
              Khách sạn
            </Button>
            <Button className="cursor-pointer text-slate-700 bg-transparent hover:bg-transparent font-medium transition hover:text-blue-700">
              Địa điểm
            </Button>
            <Button className="cursor-pointer bg-transparent text-slate-700 font-medium transition hover:bg-transparent hover:text-blue-700">
              Ưu đãi
            </Button>
            <Button className="cursor-pointer bg-transparent text-slate-700 font-medium transition hover:bg-transparent hover:text-blue-700">
              Liên hệ
            </Button>
          </nav>
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => navigate("/auth/login")}
              className="hidden cursor-pointer lg:inline-flex text-white  font-medium px-4 py-2 transition"
            >
              Đăng nhập
            </Button>
            <Button
              onClick={() => navigate("/auth/register")}
              className="hidden lg:inline-flex bg-blue-600 cursor-pointer text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-md font-medium"
            >
              Đăng ký
            </Button>
            <Button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-4 space-y-3">
            <Button className="cursor-pointer  block text-slate-700 hover:bg-transparent font-medium bg-transparent mb-0 p-0">
              Trang chủ
            </Button>
            <Button className="cursor-pointer  block text-slate-700 hover:bg-transparent font-medium bg-transparent mb-0 p-0">
              Khách sạn
            </Button>
            <Button className="cursor-pointer  block text-slate-700 hover:bg-transparent font-medium bg-transparent mb-0 p-0">
              Địa điểm
            </Button>
            <Button className="cursor-pointer  block text-slate-700 hover:bg-transparent font-medium bg-transparent mb-0 p-0">
              Ưu đãi
            </Button>
            <Button className="cursor-pointer  block text-slate-700 hover:bg-transparent font-medium bg-transparent mb-0 p-0">
              Liên hệ
            </Button>
            <Button className="cursor-pointer  block text-slate-700 hover:bg-transparent font-medium bg-transparent mb-0 p-0">
              Đăng Nhập
            </Button>
            <Button className="cursor-pointer  block text-slate-700 hover:bg-transparent font-medium bg-transparent mb-0 p-0">
              Đăng Xuất
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
