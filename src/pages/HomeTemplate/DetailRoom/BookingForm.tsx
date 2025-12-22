import React, { useEffect } from "react";
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
import { useMutation } from "@tanstack/react-query";
import { bookingRoom } from "@/services/bookingRoom.api";
import { format } from "date-fns";
import Swal from "sweetalert2";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const today = new Date();
today.setHours(0, 0, 0, 0);

const schema = z
  .object({
    maPhong: z.number().min(1, "Mã phòng không được để trống"),

    ngayDen: z
      .date()
      .nullable()
      .refine((v) => v !== null, { message: "Không bỏ trống" })
      .refine((v) => !v || v >= today, {
        message: "Ngày đến không được nhỏ hơn hôm nay",
      }),

    ngayDi: z
      .date()
      .nullable()
      .refine((v) => v !== null, { message: "Không bỏ trống" })
      .refine((v) => !v || v >= today, {
        message: "Ngày đi không được nhỏ hơn hôm nay",
      }),

    soLuongKhach: z.number().min(1, "Số lượng khách phải lớn hơn 0"),
    maNguoiDung: z.number().min(1),
  })
  .refine(
    (data) => !data.ngayDen || !data.ngayDi || data.ngayDi > data.ngayDen,
    {
      path: ["ngayDi"],
      message: "Ngày trả phòng phải sau ngày nhận phòng",
    }
  );

type BookingFormData = z.infer<typeof schema>;

export default function BookingForm() {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const { user } = useAuthStore();
  const { roomID } = useRoomDetail();
  const room = roomID;
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      // id: 0,
      maPhong: 0,
      ngayDen: null,
      ngayDi: null,
      soLuongKhach: 0,
      maNguoiDung: 0,
    },
  });

  useEffect(() => {
    if (room?.id) {
      setValue("maPhong", room?.id);
    }
    if (user?.user.id) {
      setValue("maNguoiDung", user.user.id);
    }
  }, [room?.id, user?.user.id, setValue]);

  const { mutate: handleBooking } = useMutation({
    mutationFn: (data: BookingFormData) => bookingRoom(data),
    onSuccess: () => {
      Swal.fire({
        title: "Drag me!",
        icon: "success",
        draggable: true,
      });
    },
    onError: () => {},
  });

  const onsubmit = (data: BookingFormData) => {
    if (!data.ngayDen || !data.ngayDi) return;

    const payload = {
      ...data,
      ngayDen: format(data.ngayDen, "yyyy-MM-dd"),
      ngayDi: format(data.ngayDi, "yyyy-MM-dd"),
    };
    // handleBooking(payload);
    console.log(payload);
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
                    <>
                      <div className="border-2 border-gray-200 rounded-xl p-3 hover:border-purple-300 transition-colors">
                        <label className="text-xs font-semibold text-gray-600 block mb-1">
                          Nhận phòng
                        </label>
                        <Popover open={open1} onOpenChange={setOpen1}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-between font-normal border-none shadow-none pl-2"
                            >
                              {field.value
                                ? format(field.value, "dd/MM/yyyy")
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
                              selected={field.value ?? undefined}
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                setOpen1(false);
                                field.onChange(date ?? null);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      {errors.ngayDen && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.ngayDen.message}
                        </p>
                      )}
                    </>
                  )}
                />
                <Controller
                  name="ngayDi"
                  control={control}
                  render={({ field }) => (
                    <>
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
                                ? format(field.value, "dd/MM/yyyy")
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
                              selected={field.value ?? undefined}
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                setOpen2(false);
                                field.onChange(date ?? null);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      {errors.ngayDi && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.ngayDi.message}
                        </p>
                      )}
                    </>
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
                    <>
                      <Select
                        value={field.value ? String(field.value) : ""}
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="1">1 Khách</SelectItem>
                            <SelectItem value="2">2 Khách</SelectItem>
                            <SelectItem value="3">3 Khách</SelectItem>
                            <SelectItem value="4">4 Khách</SelectItem>
                            <SelectItem value="5">5 Khách</SelectItem>
                            <SelectItem value="6">6 Khách</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {errors.soLuongKhach && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.soLuongKhach.message}
                        </p>
                      )}
                    </>
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
