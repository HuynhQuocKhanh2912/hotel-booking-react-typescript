import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User, Phone, Calendar, UserPlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-2xl">
      <Card className="shadow-2xl rounded-2xl border border-gray-200 bg-white overflow-hidden pt-0">
        <CardHeader className="text-center pb-6 pt-8 bg-linear-to-br from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="mx-auto w-20 h-20 bg-linear-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <UserPlus className="text-white w-10 h-10" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 tracking-tight">
            Đăng ký tài khoản
          </CardTitle>
          <p className="text-base text-gray-600 mt-2">
            Tạo tài khoản mới để bắt đầu trải nghiệm tuyệt vời
          </p>
        </CardHeader>

        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Họ tên */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-semibold text-gray-700"
              >
                Họ và tên
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Nhập họ và tên"
                  className="pl-12 pr-4 h-12 border-2 border-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700"
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="pl-12 pr-4 h-12 border-2 border-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Số điện thoại */}
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-semibold text-gray-700"
              >
                Số điện thoại
              </Label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  className="pl-12 pr-4 h-12 border-2 border-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Ngày sinh */}
            <div className="space-y-2">
              <Label
                htmlFor="birthday"
                className="text-sm font-semibold text-gray-700"
              >
                Ngày sinh
              </Label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <Input
                  id="birthday"
                  type="date"
                  className="pl-12 pr-4 h-12 border-2 border-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Giới tính */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Giới tính
            </Label>
            <RadioGroup defaultValue="true" className="flex gap-6 mt-2">
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="true"
                  id="male"
                  className="border-gray-300"
                />
                <Label
                  htmlFor="male"
                  className="text-gray-700 font-medium cursor-pointer"
                >
                  Nam
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="false"
                  id="female"
                  className="border-gray-300"
                />
                <Label
                  htmlFor="female"
                  className="text-gray-700 font-medium cursor-pointer"
                >
                  Nữ
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Mật khẩu */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-semibold text-gray-700"
            >
              Mật khẩu
            </Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <Input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu của bạn"
                className="pl-12 pr-4 h-12 border-2 border-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>
          </div>

          {/* Vai trò */}
          <div className="space-y-2">
            <Label
              htmlFor="role"
              className="text-sm font-semibold text-gray-700"
            >
              Vai trò
            </Label>
            <Select>
              <SelectTrigger className="w-full h-12 border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl bg-gray-50 focus:bg-white transition-all duration-200">
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="USER">USER</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Hoặc</span>
            </div>
          </div>

          {/* Nút đăng ký */}
          <Button
            type="submit"
            className="w-full h-12 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Đăng ký
          </Button>

          {/* Chuyển hướng */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Đã có tài khoản?{" "}
              <a
                href="#"
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                Đăng nhập ngay
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
