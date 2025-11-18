import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Users,
  Home,
  User,
  Clock,
  Download,
  X,
  Filter,
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

const BookingManagement = () => {
  const [bookings, setBookings] = useState([
    {
      id: 36461,
      maPhong: 1,
      ngayDen: "2025-02-03T00:00:00",
      ngayDi: "2025-02-11T00:00:00",
      soLuongKhach: 8,
      maNguoiDung: 44776,
    },
    {
      id: 37188,
      maPhong: 2,
      ngayDen: "2025-01-22T00:00:00",
      ngayDi: "2025-01-25T00:00:00",
      soLuongKhach: 2,
      maNguoiDung: 43828,
    },
    {
      id: 37550,
      maPhong: 8,
      ngayDen: "2025-01-30T00:00:00",
      ngayDi: "2025-02-18T00:00:00",
      soLuongKhach: 7,
      maNguoiDung: 43599,
    },
    {
      id: 37551,
      maPhong: 18,
      ngayDen: "2025-01-31T00:00:00",
      ngayDi: "2025-02-05T00:00:00",
      soLuongKhach: 1,
      maNguoiDung: 43599,
    },
    {
      id: 37552,
      maPhong: 5,
      ngayDen: "2025-02-10T00:00:00",
      ngayDi: "2025-02-15T00:00:00",
      soLuongKhach: 4,
      maNguoiDung: 44001,
    },
    {
      id: 37553,
      maPhong: 12,
      ngayDen: "2025-02-01T00:00:00",
      ngayDi: "2025-02-07T00:00:00",
      soLuongKhach: 3,
      maNguoiDung: 44002,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getBookingStatus = (checkIn, checkOut) => {
    const now = new Date();
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (now < start) return "upcoming";
    if (now >= start && now <= end) return "active";
    return "completed";
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "upcoming":
        return { bg: "bg-blue-100", text: "text-blue-800", label: "Sắp tới" };
      case "active":
        return { bg: "bg-green-100", text: "text-green-800", label: "Đang ở" };
      case "completed":
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          label: "Đã hoàn thành",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          label: "Không xác định",
        };
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toString().includes(searchTerm) ||
      booking.maPhong.toString().includes(searchTerm) ||
      booking.maNguoiDung.toString().includes(searchTerm);

    const status = getBookingStatus(booking.ngayDen, booking.ngayDi);
    const matchesStatus = filterStatus === "all" || status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const showBookingDetail = (booking) => {
    setSelectedBooking(booking);
    setShowDetailModal(true);
  };

  const stats = {
    total: bookings.length,
    upcoming: bookings.filter(
      (b) => getBookingStatus(b.ngayDen, b.ngayDi) === "upcoming"
    ).length,
    active: bookings.filter(
      (b) => getBookingStatus(b.ngayDen, b.ngayDi) === "active"
    ).length,
    completed: bookings.filter(
      (b) => getBookingStatus(b.ngayDen, b.ngayDi) === "completed"
    ).length,
    totalGuests: bookings.reduce((sum, b) => sum + b.soLuongKhach, 0),
  };

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8 animate-fade-in-up md:gap-3 lg:gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Tổng đặt phòng</p>
              <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Sắp tới</p>
              <p className="text-3xl font-bold text-blue-600">
                {stats.upcoming}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Đang ở</p>
              <p className="text-3xl font-bold text-green-600">
                {stats.active}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Hoàn thành</p>
              <p className="text-3xl font-bold text-gray-600">
                {stats.completed}
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✓</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Tổng khách</p>
              <p className="text-3xl font-bold text-orange-600">
                {stats.totalGuests}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-slate-200 animate-fade-in-up">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="max-sm:flex-col flex flex-1 gap-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Tìm kiếm theo ID, mã phòng, mã người dùng..."
                className="pl-10 h-11"
              />
            </div>
            {/* Filter Select */}
            <div className=" relative w-[180px] max-sm:w-full">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
              <Select defaultValue="all">
                <SelectTrigger className="pl-10 !h-11 w-full">
                  <SelectValue placeholder="Tất cả vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="admin">Sắp tới</SelectItem>
                  <SelectItem value="user">Đang ở</SelectItem>
                  <SelectItem value="zxc">Hoàn thành</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="flex items-center gap-2  h-11 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Thêm đặt phòng
          </Button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 animate-fade-in-up">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1190px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                  ID Đặt phòng
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                  Phòng
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                  Khách
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                  Check-in
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                  Check-out
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                  Số đêm
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredBookings.map((booking) => {
                const status = getBookingStatus(
                  booking.ngayDen,
                  booking.ngayDi
                );
                const statusBadge = getStatusBadge(status);
                const nights = calculateNights(booking.ngayDen, booking.ngayDi);

                return (
                  <tr
                    key={booking.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">
                            #{booking.id}
                          </div>
                          <div className="text-sm text-slate-500">
                            Mã: {booking.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-slate-400" />
                        <span className="font-medium text-slate-900">
                          Phòng {booking.maPhong}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-900">
                            {booking.soLuongKhach} khách
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <User className="w-3 h-3" />
                          <span>User #{booking.maNguoiDung}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900">
                        {formatDate(booking.ngayDen)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900">
                        {formatDate(booking.ngayDi)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded text-sm font-medium text-slate-700">
                        <Clock className="w-3 h-3" />
                        {nights} đêm
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}
                      >
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => showBookingDetail(booking)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
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

      {showDetailModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
            <div className="border-b border-slate-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">
                Chi tiết đặt phòng
              </h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-slate-600">ID Đặt phòng</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-800">
                    #{selectedBooking.id}
                  </div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Home className="w-5 h-5 text-orange-600" />
                    <span className="text-sm text-slate-600">Mã phòng</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-800">
                    Phòng {selectedBooking.maPhong}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 border border-slate-200 rounded-lg">
                  <div className="text-sm text-slate-600 mb-1">Check-in</div>
                  <div className="text-lg font-semibold text-slate-800">
                    {formatDate(selectedBooking.ngayDen)}
                  </div>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg">
                  <div className="text-sm text-slate-600 mb-1">Check-out</div>
                  <div className="text-lg font-semibold text-slate-800">
                    {formatDate(selectedBooking.ngayDi)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-slate-600" />
                    <span className="text-sm text-slate-600">
                      Số lượng khách
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-slate-800">
                    {selectedBooking.soLuongKhach}
                  </div>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-slate-600" />
                    <span className="text-sm text-slate-600">Số đêm</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-800">
                    {calculateNights(
                      selectedBooking.ngayDen,
                      selectedBooking.ngayDi
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-slate-600" />
                  <span className="text-sm text-slate-600">Mã người dùng</span>
                </div>
                <div className="text-lg font-semibold text-slate-800">
                  #{selectedBooking.maNguoiDung}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusBadge(getBookingStatus(selectedBooking.ngayDen, selectedBooking.ngayDi)).bg} ${getStatusBadge(getBookingStatus(selectedBooking.ngayDen, selectedBooking.ngayDi)).text}`}
                  >
                    {
                      getStatusBadge(
                        getBookingStatus(
                          selectedBooking.ngayDen,
                          selectedBooking.ngayDi
                        )
                      ).label
                    }
                  </span>
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Chỉnh sửa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingManagement;
