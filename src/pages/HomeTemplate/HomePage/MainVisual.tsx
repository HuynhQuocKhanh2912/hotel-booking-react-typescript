import React from "react";
import { Search, MapPin, Users, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function MainVisual() {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [date1, setDate1] = React.useState<Date | undefined>(undefined);
  const [date2, setDate2] = React.useState<Date | undefined>(undefined);

  return (
    <section className="relative bg-linear-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Trải Nghiệm Kỳ Nghỉ <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
              Đẳng Cấp Thế Giới
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Khám phá hơn 50,000 khách sạn cao cấp với giá ưu đãi độc quyền
          </p>
        </div>

        {/* Advanced Search Box */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
              <Label className="block text-sm font-semibold text-slate-700 mb-2">
                Địa điểm / Khách sạn
              </Label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Bạn muốn đi đâu?"
                  className="pl-14 pt-5 pb-6 text-black"
                />
              </div>
            </div>

            <div>
              <Label className="block text-sm font-semibold text-slate-700 mb-2">
                Nhận phòng
              </Label>
              <div className="relative">
                <Popover open={open1} onOpenChange={setOpen1}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full h-full justify-between font-normal text-black pt-3 pb-3 "
                    >
                      {date1 ? date1.toLocaleDateString() : "Chọn ngày"}
                      <CalendarDays />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0 "
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date1}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate1(date);
                        setOpen1(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <Label className="block text-sm font-semibold text-slate-700 mb-2">
                Trả phòng
              </Label>
              <div className="relative">
                <Popover open={open2} onOpenChange={setOpen2}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full h-full justify-between font-normal text-black pt-3 pb-3 "
                    >
                      {date2 ? date2.toLocaleDateString() : "Chọn ngày"}
                      <CalendarDays />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0 "
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date2}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate2(date);
                        setOpen2(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <Label className="block text-sm font-semibold text-slate-700 mb-2">
                Khách & Phòng
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <Users className="absolute left-3 top-3.5 text-slate-400 w-4 h-4" />
                  <Select>
                    <SelectTrigger className="w-full h-full! text-black pt-3 pb-3 pl-12">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="apple">2</SelectItem>
                        <SelectItem value="banana">4</SelectItem>
                        <SelectItem value="blueberry">6</SelectItem>
                        <SelectItem value="grapes">8</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Select>
                  <SelectTrigger className="w-full h-full! text-black">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="apple">1</SelectItem>
                      <SelectItem value="banana">2</SelectItem>
                      <SelectItem value="blueberry">3</SelectItem>
                      <SelectItem value="grapes">4</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Button className="cursor-pointer w-full mt-6 bg-linear-to-r from-blue-600 to-blue-700 text-white py-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition shadow-lg flex items-center justify-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Tìm kiếm khách sạn</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
