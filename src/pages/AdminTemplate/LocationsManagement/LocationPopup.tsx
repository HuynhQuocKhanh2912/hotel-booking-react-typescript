import { useForm, Controller } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProvinceQuery, useLocationAddQuery } from "@/hooks/useLocation";
import type { Location } from "@/interfaces/location.interface";
import { TriangleAlert, X } from "lucide-react";

interface LocationPopupProps {
  mode: "add" | "edit";
  detailLocation?: Location | null;
}

// const baseSchema = z.object({
//   id: z.number(),
//   name: z.string().min(1, "Vui lòng nhập họ tên"),
//   email: z.string().email("Vui lòng nhập đúng định dạng email"),
//   phone: z.string().regex(/^[0-9]+$/, { message: "Vui lòng nhập số" }),
//   birthday: z.string().nonempty("Vui lòng nhập ngày sinh"),
//   gender: z
//     .boolean()
//     .optional()
//     .refine((val) => val !== undefined, {
//       message: "Vui lòng chọn giới tính",
//     }),
//   role: z.string().min(1, "Vui lòng chọn vai trò"),
// });

// const editSchema = baseSchema.extend({
//   password: z.string().optional(),
// });

// const addSchema = editSchema.extend({
//   password: z.string().min(1, "Vui lòng nhập mật khẩu"),
// });

// type UserForms = z.infer<typeof editSchema>;

export default function LocationPopup({
  detailLocation,
  mode,
}: LocationPopupProps) {
  console.log("🎄 ~ LocationPopup ~ mode:", mode);

  // Api
  const { data: dataProvince } = useProvinceQuery();
  const { mutate: mutateAdd } = useLocationAddQuery();


  // const resolverSchema = mode === "add" ? addSchema : editSchema;
  // Form
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    // reset,
    formState: { errors },
  } = useForm<Location>({
    defaultValues: {
      id: 0,
      tenViTri: "",
      tinhThanh: "",
      quocGia: "Việt Nam",
      hinhAnh: "",
    },
    // resolver: zodResolver(resolverSchema as typeof baseSchema),
  });

  //watch form
  const locationImg = watch("hinhAnh");

  const onSubmit = (data: Location) => {
    mutateAdd(data)
  };

  return (
    <DialogContent className="sm:max-w-2xl p-0 border-0 rounded-none bg-transparent">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle className="hidden">Popup Form</DialogTitle>
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            {detailLocation ? "Chỉnh sửa vị trí" : "Thêm vị trí mới"}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-4">
                <Label htmlFor="address" className="text-slate-700 mb-2">
                  Địa điểm
                </Label>
                <Input
                  id="address"
                  className="w-full h-11"
                  {...register("tenViTri")}
                />
                {errors.tenViTri && (
                  <p className="text-red-300 text-sm mt-1.5 flex gap-1 items-center">
                    <TriangleAlert className="size-3.5 animate-fade-in" />
                    {errors.tenViTri.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <Label htmlFor="city" className="text-slate-700 mb-2">
                  Tỉnh thành
                </Label>
                <Controller
                  name="tinhThanh"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full h-11!" id="city">
                        <SelectValue placeholder="Chọn tỉnh thành" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {dataProvince?.map((p) => {
                            return (
                              <SelectItem key={p.code} value={p.name}>
                                {p.name}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="country" className="text-slate-700 mb-2">
                  Quốc gia
                </Label>
                <Input
                  id="country"
                  className="w-full h-11"
                  {...register("quocGia")}
                />
                {errors.quocGia && (
                  <p className="text-red-300 text-sm mt-1.5 flex gap-1 items-center">
                    <TriangleAlert className="size-3.5 animate-fade-in" />
                    {errors.quocGia.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <p className="text-slate-700 font-medium text-sm mb-2">
                Hình ảnh
              </p>
              <div className="relative flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-51 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  {!locationImg && (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                  )}
                  {locationImg && (
                    <img
                      src={locationImg}
                      className="w-full max-h-full object-contain"
                      alt=""
                    />
                  )}
                  <input
                    id="dropzone-file"
                    type="file"
                    accept=".png,jpeg,.jpg"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? "";
                      const link = file && URL.createObjectURL(file);
                      return setValue("hinhAnh", link);
                    }}
                  />
                </label>
                {locationImg && (
                  <X
                    onClick={() => setValue("hinhAnh", '')}
                    className="absolute z-2 top-3 right-3 cursor-pointer hover:text-red-400 transition-all duration-300"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="p-2 w-36 h-10.5 border border-slate-300 rounded-lg hover:bg-black hover:text-white"
              >
                Hủy
              </Button>
            </DialogClose>

            <Button className="p-2 w-36 h-10.5 bg-blue-600 text-white hover:bg-blue-700">
              {detailLocation ? "Sửa" : "Thêm"}
            </Button>
          </div>
        </div>
      </form>
    </DialogContent>
  );
}
