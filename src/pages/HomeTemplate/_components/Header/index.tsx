import { useState, useEffect, useRef } from "react";
import { Building2, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth.store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, clearUser } = useAuthStore();

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handelClearUser = () => {
    clearUser();
    setOpen(false);
    navigate("/auth/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900 block leading-none tracking-tight">
                LuxeStay
              </span>
              <span className="text-xs text-gray-500 font-medium">
                Premium Hotel Booking
              </span>
            </div>
          </div>
          <nav className="hidden lg:flex items-center space-x-6">
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              className="cursor-pointer text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Trang chủ
            </Button>
            <Button
              onClick={() => navigate("/list-room")}
              variant="ghost"
              className="cursor-pointer text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Khách sạn
            </Button>
            <Button
              onClick={() => navigate("/location")}
              variant="ghost"
              className="cursor-pointer text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Địa điểm
            </Button>
            <Button
              variant="ghost"
              className="cursor-pointer text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Ưu đãi
            </Button>
            <Button
              onClick={() => navigate("/contact")}
              variant="ghost"
              className="cursor-pointer text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Liên hệ
            </Button>
          </nav>
          {/* User Dropdown */}
          {user ? (
            <div className="flex items-center gap-4">
              <div className="relative" ref={dropdownRef}>
                <Avatar
                  className="cursor-pointer w-11 h-11 border-2 border-gray-200 hover:border-blue-500 transition-colors duration-200"
                  onClick={handleOpen}
                >
                  <AvatarImage src={user?.user?.avatar ?? undefined} />
                  <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                    {user.user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                {open && (
                  <div
                    id="userDropdown"
                    className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                      <div className="font-semibold text-gray-900 text-sm">
                        {user.user.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate mt-1">
                        {user.user.email}
                      </div>
                    </div>
                    <ul className="py-2" aria-labelledby="avatarButton">
                      {user.user.role === "ADMIN" && (
                        <li>
                          <Button
                            onClick={() => {
                              navigate("/dashboard");
                              setOpen(false);
                            }}
                            variant="ghost"
                            className="w-full cursor-pointer justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-none font-medium"
                          >
                            Dashboard
                          </Button>
                        </li>
                      )}
                      <li>
                        <Button
                          onClick={handelClearUser}
                          variant="ghost"
                          className="w-full cursor-pointer justify-start text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-none font-medium"
                        >
                          Đăng xuất
                        </Button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <Button
                className="lg:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => navigate("/auth/login")}
                variant="ghost"
                className="hidden cursor-pointer lg:inline-flex text-gray-700 hover:text-blue-600 font-medium px-4 py-2 transition-colors duration-200"
              >
                Đăng nhập
              </Button>

              <Button
                onClick={() => navigate("/auth/register")}
                className="hidden lg:inline-flex bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 cursor-pointer text-white px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg font-medium transition-all duration-200"
              >
                Đăng ký
              </Button>

              <Button
                className="lg:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-gray-50">
          <nav className="px-4 py-4 space-y-1">
            <Button
              onClick={() => {
                navigate("/");
                setMobileMenuOpen(false);
              }}
              variant="ghost"
              className="w-full cursor-pointer justify-start text-gray-700 hover:text-blue-600 hover:bg-white font-medium"
            >
              Trang chủ
            </Button>
            <Button
              onClick={() => {
                navigate("/list-room");
                setMobileMenuOpen(false);
              }}
              variant="ghost"
              className="w-full cursor-pointer justify-start text-gray-700 hover:text-blue-600 hover:bg-white font-medium"
            >
              Khách sạn
            </Button>
            <Button
              onClick={() => {
                navigate("/location");
                setMobileMenuOpen(false);
              }}
              variant="ghost"
              className="w-full cursor-pointer justify-start text-gray-700 hover:text-blue-600 hover:bg-white font-medium"
            >
              Địa điểm
            </Button>
            <Button
              variant="ghost"
              className="w-full cursor-pointer justify-start text-gray-700 hover:text-blue-600 hover:bg-white font-medium"
            >
              Ưu đãi
            </Button>
            <Button
              onClick={() => {
                navigate("/contact");
                setMobileMenuOpen(false);
              }}
              variant="ghost"
              className="w-full cursor-pointer justify-start text-gray-700 hover:text-blue-600 hover:bg-white font-medium"
            >
              Liên hệ
            </Button>
            {!user && (
              <>
                <div className="border-t border-gray-200 my-2"></div>
                <Button
                  onClick={() => {
                    navigate("/auth/login");
                    setMobileMenuOpen(false);
                  }}
                  variant="ghost"
                  className="w-full cursor-pointer justify-start text-gray-700 hover:text-blue-600 hover:bg-white font-medium"
                >
                  Đăng nhập
                </Button>
                <Button
                  onClick={() => {
                    navigate("/auth/register");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full cursor-pointer bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium mt-2"
                >
                  Đăng ký
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
