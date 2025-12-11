import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { ChevronDownIcon, TriangleAlert } from "lucide-react";
import { useUsersAddQuery, useUsersEditQuery } from "@/hooks/useUserQuery";

const baseSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Vui lòng nhập họ tên"),
  email: z.string().email("Vui lòng nhập đúng định dạng email"),
  phone: z.string().regex(/^[0-9]+$/, { message: "Vui lòng nhập số" }),
  birthday: z.string().nonempty("Vui lòng nhập ngày sinh"),
  gender: z
    .boolean()
    .optional()
    .refine((val) => val !== undefined, {
      message: "Vui lòng chọn giới tính",
    }),
  role: z.string().min(1, "Vui lòng chọn vai trò"),
});

const editSchema = baseSchema.extend({
  password: z.string().optional(),
});

const addSchema = editSchema.extend({
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

type UserForms = z.infer<typeof editSchema>;

interface UserPopupProps {
  mode: "add" | "edit";
  detailUser?: UserForms | null;
}

export default function UserPopup({ detailUser, mode }: UserPopupProps) {
  const [openBirthday, setOpenBirthday] = useState(false);
  // Api
  const { mutate: mutateUserAdd } = useUsersAddQuery();
  const { mutate: mutateUserEdit } = useUsersEditQuery();
  const resolverSchema = mode === "add" ? addSchema : editSchema;
  // Form
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UserForms>({
    defaultValues: {
      id: 0,
      name: "",
      email: "",
      phone: "",
      birthday: "",
      password: "",
      gender: undefined,
      role: "",
    },
    resolver: zodResolver(resolverSchema as typeof baseSchema),
  });
  const onSubmit = (data: UserForms) => {
    const payload = {
      ...data,
      gender: data.gender as boolean,
    };

    if (mode === "edit" && detailUser) {
      const { password, ...rest } = payload;
      void password;
      mutateUserEdit(rest);
      return;
    }

    mutateUserAdd(
      {
        ...payload,
        password: data.password ?? "",
      },
      {
        onSuccess: () => {
          reset({
            id: 0,
            name: "",
            email: "",
            phone: "",
            birthday: "",
            password: "",
            gender: undefined,
            role: "",
          });
        },
      }
    );
  };

  useEffect(() => {
    if (detailUser) {
      setValue("id", detailUser?.id);
      setValue("name", detailUser?.name);
      setValue("email", detailUser?.email);
      setValue("phone", detailUser?.phone);
      setValue("birthday", detailUser?.birthday);
      setValue("gender", detailUser?.gender);
      setValue("role", detailUser?.role);
    }
  }, [detailUser, setValue]);

  return (
    <DialogContent className="sm:max-w-2xl p-0 border-0 rounded-none bg-transparent">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle className="hidden">Popup Form</DialogTitle>
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            {detailUser ? "Chỉnh sửa tài khoản" : "Thêm tài khoản mới"}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-slate-700 mb-2">
                Họ tên
              </Label>
              <Input id="name" className="w-full h-11" {...register("name")} />
              {errors.name && (
                <p className="text-red-300 text-sm mt-1.5 flex gap-1 items-center">
                  <TriangleAlert className="size-3.5 animate-fade-in" />
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="email" className="text-slate-700 mb-2">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                className="w-full h-11"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-300 text-sm mt-1.5 flex gap-1 items-center">
                  <TriangleAlert className="size-3.5 animate-fade-in" />
                  {errors.email.message}
                </p>
              )}
            </div>
            {!detailUser && (
              <div>
                <Label htmlFor="password" className="text-slate-700 mb-2">
                  Mật khẩu
                </Label>
                <Input
                  type="password"
                  id="password"
                  className="w-full h-11"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-300 text-sm mt-1.5 flex gap-1 items-center">
                    <TriangleAlert className="size-3.5 animate-fade-in" />
                    {errors.password.message}
                  </p>
                )}
              </div>
            )}
            <div>
              <Label htmlFor="phone" className="text-slate-700 mb-2">
                SĐT
              </Label>
              <Input
                id="phone"
                className="w-full h-11"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-300 text-sm mt-1.5 flex gap-1 items-center">
                  <TriangleAlert className="size-3.5 animate-fade-in" />
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="birthday" className="text-slate-700 mb-2">
                Ngày sinh
              </Label>
              <Controller
                name="birthday"
                control={control}
                render={({ field }) => {
                  return (
                    <Popover open={openBirthday} onOpenChange={setOpenBirthday}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="birthday"
                          className="w-full h-11 justify-between font-normal"
                        >
                          {field.value
                            ? new Date(field.value).toLocaleDateString("en-GB")
                            : "Chọn ngày sinh"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          captionLayout="dropdown"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) => {
                            if (date) {
                              const formatted = format(
                                new Date(date),
                                "yyyy-MM-dd"
                              );
                              field.onChange(formatted);
                            }
                            setOpenBirthday(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  );
                }}
              />
              {errors.birthday && (
                <p className="text-red-300 text-sm mt-1.5 flex gap-1 items-center">
                  <TriangleAlert className="size-3.5 animate-fade-in" />
                  {errors.birthday.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="gender" className="text-slate-700 mb-2">
                Giới tính
              </Label>
              <Controller
                name="gender"
                control={control}
                defaultValue={undefined}
                render={({ field }) => {
                  return (
                    <Select
                      onValueChange={(val) => field.onChange(val === "Nam")}
                      value={
                        field.value === undefined
                          ? undefined
                          : field.value
                            ? "Nam"
                            : "Nữ"
                      }
                    >
                      <SelectTrigger className="w-full h-11!" id="gender">
                        <SelectValue placeholder="Chọn giới tính" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Nam">Nam</SelectItem>
                          <SelectItem value="Nữ">Nữ</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  );
                }}
              />
              {errors.gender && (
                <p className="text-red-300 text-sm mt-1.5 flex gap-1 items-center">
                  <TriangleAlert className="size-3.5 animate-fade-in" />
                  {errors.gender.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="role" className="text-slate-700 mb-2">
                Vai trò
              </Label>
              <Controller
                name="role"
                control={control}
                defaultValue=""
                render={({ field }) => {
                  return (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full h-11!" id="role">
                        <SelectValue placeholder="Chọn chức vụ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="USER">User</SelectItem>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  );
                }}
              />
              {errors.role && (
                <p className="text-red-300 text-sm mt-1.5 flex gap-1 items-center">
                  <TriangleAlert className="size-3.5 animate-fade-in" />
                  {errors.role.message}
                </p>
              )}
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
              {detailUser ? "Sửa" : "Thêm"}
            </Button>
          </div>
        </div>
      </form>
    </DialogContent>
  );
}
