import React, { useEffect, useState } from "react";
import { Star, Shield, MessageCircle, Phone, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRoomDetail } from "@/stores/useRoomDetails.store";
import { Controller, useForm } from "react-hook-form";
import { useAuthStore } from "@/stores/auth.store";
import { format } from "date-fns";
import { formatDateSafe } from "@/hooks/useFormatDateSafe";
interface FormBoook {
  id: number;
  maPhong: number | undefined;
  ngayDen: string | undefined;
  ngayDi: string | undefined;
  soLuongKhach: number;
  maNguoiDung: number;
}

export default function BookingForm() {
  const [open1, setOpen1] = React.useState(false);
  const [date1, setDate1] = React.useState<Date | undefined>(undefined);
  const [open2, setOpen2] = React.useState(false);
  const [date2, setDate2] = React.useState<Date | undefined>(undefined);
  const { user } = useAuthStore();
  const { roomID } = useRoomDetail();
  const room = roomID;
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormBoook>({
    defaultValues: {
      id: 0,
      maPhong: room?.id,
      ngayDen: "",
      ngayDi: "",
      soLuongKhach: 0,
      maNguoiDung: user?.user.id,
    },
  });
  setValue("maPhong", room?.id);

  const onsubmit = (data: FormBoook) => {
    console.log("Lấy thông tin đặt phòng: ", data);
  };

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-6">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-purple-100">
          {/* Price */}
          <div className="mb-6 pb-6 border-b border-gray-100">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                ${room?.giaTien}
              </span>
              <span className="text-gray-600 text-lg">/đêm</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">4.9</span>
              <span className="text-gray-600">· 127 đánh giá</span>
            </div>
          </div>
          {/* Booking Form */}
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-3">
                <Controller
                  name="ngayDen"
                  control={control}
                  render={({ field }) => (
                    <div className="border-2 border-gray-200 rounded-xl p-3 hover:border-purple-300 transition-colors">
                      <label className="text-xs font-semibold text-gray-600 block mb-1">
                        Nhận phòng
                      </label>
                      <Popover open={open1} onOpenChange={setOpen1}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between font-normal border-none shadow-none pl-2!"
                          >
                            {field.value
                              ? formatDateSafe(field.value)
                              : "dd/MM/yyyy"}
                            <CalendarDays />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            captionLayout="dropdown"
                            onSelect={(date) => {
                              setDate1(date);
                              setOpen1(false);
                              if (date) {
                                field.onChange(format(date, "dd/MM/yyyy"));
                              }
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                />
                <Controller
                  name="ngayDi"
                  control={control}
                  render={({ field }) => (
                    <div className="border-2 border-gray-200 rounded-xl p-3 hover:border-purple-300 transition-colors">
                      <label className="text-xs font-semibold text-gray-600 block mb-1">
                        Trả phòng
                      </label>
                      <Popover open={open2} onOpenChange={setOpen2}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="date"
                            className="w-full justify-between font-normal border-none shadow-none pl-2!"
                          >
                            {field.value
                              ? formatDateSafe(field.value)
                              : "dd/MM/yyyy"}
                            <CalendarDays />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            captionLayout="dropdown"
                            onSelect={(date) => {
                              setDate2(date);
                              setOpen2(false);
                              if (date) {
                                field.onChange(format(date, "dd/MM/yyyy"));
                              }
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                />
              </div>
              <div className="border-2 border-gray-200 rounded-xl p-3 hover:border-purple-300 transition-colors">
                <Label className="text-xs font-semibold text-gray-600 block mb-1">
                  Số khách
                </Label>
                <Controller
                  name="soLuongKhach"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="6">6</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Book Button */}
            <button className="w-full cursor-pointer bg-linear-to-r from-blue-400 to-cyan-300 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 mb-4 relative overflow-hidden group">
              <span className="relative z-10">Đặt phòng ngay</span>
              <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mb-6">
            Bạn sẽ chưa bị trừ tiền
          </p>

          {/* Price Breakdown */}
          <div className="space-y-3 pt-6 border-t border-gray-100">
            <div className="flex justify-between text-gray-700">
              <span>${room?.giaTien} x 5 đêm</span>
              <span>${room ? room.giaTien * 5 : 0}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Phí dịch vụ</span>
              <span>$10</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200">
              <span>Tổng cộng</span>
              <span className="text-purple-600">
                ${room ? room.giaTien * 5 + 10 : 0}
              </span>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button className="flex items-center justify-center gap-2 bg-linear-to-r from-blue-50 to-blue-100 text-blue-700 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
              <MessageCircle className="w-5 h-5" />
              Chat
            </button>
            <button className="flex items-center justify-center gap-2 bg-linear-to-r from-green-50 to-green-100 text-green-700 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
              <Phone className="w-5 h-5" />
              Gọi
            </button>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-6 bg-linear-to-r from-purple-50 to-pink-50 rounded-2xl p-6 text-center">
          <Shield className="w-12 h-12 text-purple-600 mx-auto mb-3" />
          <h3 className="font-bold text-gray-900 mb-2">Đặt phòng an toàn</h3>
          <p className="text-sm text-gray-600">
            Thanh toán bảo mật và chính sách hoàn tiền linh hoạt
          </p>
        </div>
      </div>
    </div>
  );
}
