import {
  TrendingUp,
  TrendingDown,
  Users,
  Home,
  MapPin,
  MessageSquare,
  Calendar,
  DollarSign,
  Star,
  Activity,
  ArrowUpRight,
  MoreVertical,
  Eye,
} from "lucide-react";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/stores/auth.store";
import { Navigate } from "react-router-dom";

export const description = "An interactive area chart";
const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
};

const DashboardOverview = () => {
  const stats = {
    users: {
      total: 1247,
      change: 12.5,
      trend: "up",
      newToday: 23,
      active: 892,
    },
    rooms: {
      total: 156,
      change: 8.2,
      trend: "up",
      available: 89,
      occupied: 67,
    },
    locations: {
      total: 45,
      change: 5.3,
      trend: "up",
      cities: 12,
      countries: 3,
    },
    bookings: {
      total: 3521,
      change: 15.8,
      trend: "up",
      pending: 47,
      completed: 3400,
    },
    comments: {
      total: 8942,
      change: -2.4,
      trend: "down",
      avgRating: 4.6,
      positive: 7823,
    },
    revenue: {
      total: 245800,
      change: 18.3,
      trend: "up",
      thisMonth: 68500,
      lastMonth: 57900,
    },
  };

  const recentBookings = [
    {
      id: 1,
      user: "Nguyễn Văn A",
      room: "Phòng 101",
      checkIn: "15/01/2025",
      status: "confirmed",
      amount: 1500000,
    },
    {
      id: 2,
      user: "Trần Thị B",
      room: "Phòng 205",
      checkIn: "16/01/2025",
      status: "pending",
      amount: 2300000,
    },
    {
      id: 3,
      user: "Lê Văn C",
      room: "Phòng 312",
      checkIn: "17/01/2025",
      status: "confirmed",
      amount: 1800000,
    },
    {
      id: 4,
      user: "Phạm Thị D",
      room: "Phòng 108",
      checkIn: "18/01/2025",
      status: "confirmed",
      amount: 2100000,
    },
  ];

  const recentComments = [
    {
      id: 1,
      user: "Minh Anh",
      rating: 5,
      comment: "Phòng rất tuyệt vời!",
      time: "2 giờ trước",
    },
    {
      id: 2,
      user: "Thanh Tùng",
      rating: 4,
      comment: "Dịch vụ tốt",
      time: "5 giờ trước",
    },
    {
      id: 3,
      user: "Lan Hương",
      rating: 5,
      comment: "Sẽ quay lại",
      time: "1 ngày trước",
    },
    {
      id: 4,
      user: "John Doe",
      rating: 3,
      comment: "Tạm được",
      time: "2 ngày trước",
    },
  ];

  const topLocations = [
    { id: 1, name: "Quận 1, HCM", rooms: 45, bookings: 892, revenue: 89000000 },
    { id: 2, name: "Hà Nội", rooms: 38, bookings: 756, revenue: 76000000 },
    { id: 3, name: "Nha Trang", rooms: 32, bookings: 645, revenue: 65000000 },
    { id: 4, name: "Đà Nẵng", rooms: 28, bookings: 534, revenue: 54000000 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "confirmed":
        return "Đã xác nhận";
      case "pending":
        return "Chờ xác nhận";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  // Hander chart
  const [timeRange, setTimeRange] = useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });
  const { user } = useAuthStore();

  // if (user && user.user.role === "ADMIN") {
  //   return <Navigate to="/dashboard" />;
  // }
  // if (user && user.user.role === "USER") {
  //   return <Navigate to="/" />;
  // }
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg text-white">
        <div className="flex max-md:flex-col-reverse max-md:text-center items-center md:justify-between">
          <div>
            <h1 className="text-xl md:text-3xl font-bold md:mb-2">
              Xin chào, Admin! 👋
            </h1>
            <p className="text-blue-100 max-md:hidden">
              Đây là tổng quan hệ thống của bạn hôm nay
            </p>
          </div>
          <div className="max-md:mb-2 md:text-right">
            <div className="text-sm text-blue-100">Hôm nay</div>
            <div className="text-2xl font-bold">
              {new Date().toLocaleDateString("vi-VN")}
            </div>
          </div>
        </div>
      </div>

      {/* Test Chart */}
      <Card className="mb-8">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1">
            <CardTitle>Đặt phòng gần đây</CardTitle>
            <CardDescription>Tổng Quan Phòng Gần Đây</CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-mobile)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-mobile)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="mobile"
                type="natural"
                fill="url(#fillMobile)"
                stroke="var(--color-mobile)"
                stackId="a"
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="url(#fillDesktop)"
                stroke="var(--color-desktop)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Users Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${stats.users.trend === "up" ? "text-green-600" : "text-red-600"}`}
            >
              {stats.users.trend === "up" ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {stats.users.change}%
            </div>
          </div>
          <div className="mb-2">
            <div className="text-2xl font-bold text-slate-800">
              {stats.users.total.toLocaleString()}
            </div>
            <div className="text-sm text-slate-600">Người dùng</div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">
              Hoạt động: {stats.users.active}
            </span>
            <span className="text-green-600 font-medium">
              +{stats.users.newToday} hôm nay
            </span>
          </div>
        </div>

        {/* Rooms Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-purple-600" />
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${stats.rooms.trend === "up" ? "text-green-600" : "text-red-600"}`}
            >
              {stats.rooms.trend === "up" ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {stats.rooms.change}%
            </div>
          </div>
          <div className="mb-2">
            <div className="text-2xl font-bold text-slate-800">
              {stats.rooms.total}
            </div>
            <div className="text-sm text-slate-600">Phòng</div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-600">
              Trống: {stats.rooms.available}
            </span>
            <span className="text-blue-600">
              Đang thuê: {stats.rooms.occupied}
            </span>
          </div>
        </div>

        {/* Locations Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-emerald-600" />
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${stats.locations.trend === "up" ? "text-green-600" : "text-red-600"}`}
            >
              {stats.locations.trend === "up" ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {stats.locations.change}%
            </div>
          </div>
          <div className="mb-2">
            <div className="text-2xl font-bold text-slate-800">
              {stats.locations.total}
            </div>
            <div className="text-sm text-slate-600">Vị trí</div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">
              {stats.locations.cities} tỉnh thành
            </span>
            <span className="text-slate-500">
              {stats.locations.countries} quốc gia
            </span>
          </div>
        </div>

        {/* Bookings Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${stats.bookings.trend === "up" ? "text-green-600" : "text-red-600"}`}
            >
              {stats.bookings.trend === "up" ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {stats.bookings.change}%
            </div>
          </div>
          <div className="mb-2">
            <div className="text-2xl font-bold text-slate-800">
              {stats.bookings.total.toLocaleString()}
            </div>
            <div className="text-sm text-slate-600">Đặt phòng</div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-yellow-600">
              Chờ: {stats.bookings.pending}
            </span>
            <span className="text-green-600">
              Hoàn thành: {stats.bookings.completed}
            </span>
          </div>
        </div>

        {/* Comments Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-pink-600" />
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${stats.comments.trend === "up" ? "text-green-600" : "text-red-600"}`}
            >
              {stats.comments.trend === "up" ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {Math.abs(stats.comments.change)}%
            </div>
          </div>
          <div className="mb-2">
            <div className="text-2xl font-bold text-slate-800">
              {stats.comments.total.toLocaleString()}
            </div>
            <div className="text-sm text-slate-600">Bình luận</div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-amber-600 flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-600" />
              {stats.comments.avgRating}/5
            </span>
            <span className="text-green-600">
              {stats.comments.positive} tích cực
            </span>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-sm p-6 text-white hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              {stats.revenue.change}%
            </div>
          </div>
          <div className="mb-2">
            <div className="text-2xl font-bold">
              {(stats.revenue.total / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-green-100">Doanh thu (VNĐ)</div>
          </div>
          <div className="flex items-center justify-between text-sm text-green-100">
            <span>
              Tháng này: {(stats.revenue.thisMonth / 1000).toFixed(0)}K
            </span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-md font-bold text-slate-800">
              Lịch sửa đặt phòng
            </h3>
            <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
              Xem tất cả
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="divide-y divide-slate-200">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                      {booking.user.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">
                        {booking.user}
                      </div>
                      <div className="text-sm text-slate-500">
                        {booking.room}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
                  >
                    {getStatusLabel(booking.status)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">
                    Check-in: {booking.checkIn}
                  </span>
                  <span className="font-semibold text-green-600">
                    {booking.amount.toLocaleString()}đ
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Comments */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800">
              Bình luận mới nhất
            </h3>
            <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
              Xem tất cả
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="divide-y divide-slate-200">
            {recentComments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold">
                      {comment.user.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">
                        {comment.user}
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < comment.rating ? "text-amber-400 fill-amber-400" : "text-slate-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">{comment.time}</span>
                </div>
                <p className="text-sm text-slate-600 pl-13">
                  {comment.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Locations */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Vị trí hàng đầu</h3>
          <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
            Xem chi tiết
            <Eye className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                  Vị trí
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                  Số phòng
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                  Lượt đặt
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                  Doanh thu
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {topLocations.map((location, index) => (
                <tr
                  key={location.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          index === 0
                            ? "bg-amber-100 text-amber-600"
                            : index === 1
                              ? "bg-slate-200 text-slate-600"
                              : index === 2
                                ? "bg-orange-100 text-orange-600"
                                : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        #{index + 1}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="font-medium text-slate-800">
                          {location.name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{location.rooms}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-slate-800">
                        {location.bookings}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-green-600">
                      {(location.revenue / 1000000).toFixed(1)}M
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-slate-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all group">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-sm font-medium text-slate-800">
            Quản lý người dùng
          </div>
        </button>
        <button className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all group">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Home className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-sm font-medium text-slate-800">
            Quản lý phòng
          </div>
        </button>
        <button className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all group">
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <MapPin className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="text-sm font-medium text-slate-800">
            Quản lý vị trí
          </div>
        </button>
        <button className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all group">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Calendar className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-sm font-medium text-slate-800">
            Quản lý đặt phòng
          </div>
        </button>
      </div>
    </>
  );
};

export default DashboardOverview;
