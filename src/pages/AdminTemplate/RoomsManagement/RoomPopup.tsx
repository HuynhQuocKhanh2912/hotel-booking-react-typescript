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
import type { RoomItems } from "@/interfaces/room.interface";

interface RoomPopupProps {
  mode: "add" | "edit";
  detailRoom?: RoomItems | null;
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

export default function RoomPopup({ detailRoom, mode }: RoomPopupProps) {
  //   const [openBirthday, setOpenBirthday] = useState(false);
  //   // Api
  //   const { mutate: mutateUserAdd } = useUsersAddQuery();
  //   const { mutate: mutateUserEdit } = useUsersEditQuery();
  //   const resolverSchema = mode === "add" ? addSchema : editSchema;
  //   // Form
  //   const {
  //     register,
  //     handleSubmit,
  //     control,
  //     setValue,
  //     reset,
  //     formState: { errors },
  //   } = useForm<UserForms>({
  //     defaultValues: {
  //       id: 0,
  //       name: "",
  //       email: "",
  //       phone: "",
  //       birthday: "",
  //       password: "",
  //       gender: undefined,
  //       role: "",
  //     },
  //     resolver: zodResolver(resolverSchema as typeof baseSchema),
  //   });
  //   const onSubmit = (data: UserForms) => {
  //     const payload = {
  //       ...data,
  //       gender: data.gender as boolean,
  //     };

  //     if (mode === "edit" && detailUser) {
  //       const { password, ...rest } = payload;
  //       void password;
  //       mutateUserEdit(rest);
  //       return;
  //     }

  //     mutateUserAdd(
  //       {
  //         ...payload,
  //         password: data.password ?? "",
  //       },
  //       {
  //         onSuccess: () => {
  //           reset({
  //             id: 0,
  //             name: "",
  //             email: "",
  //             phone: "",
  //             birthday: "",
  //             password: "",
  //             gender: undefined,
  //             role: "",
  //           });
  //         },
  //       }
  //     );
  //   };

  //   useEffect(() => {
  //     if (detailUser) {
  //       setValue("id", detailUser?.id);
  //       setValue("name", detailUser?.name);
  //       setValue("email", detailUser?.email);
  //       setValue("phone", detailUser?.phone ?? "");
  //       setValue("birthday", detailUser?.birthday);
  //       setValue("gender", detailUser?.gender);
  //       setValue("role", detailUser?.role);
  //     }
  //   }, [detailUser, setValue]);

  return (
    <DialogContent className="sm:max-w-2xl p-0 border-0 rounded-none bg-transparent">
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <form>
        <DialogTitle className="hidden">Popup Form</DialogTitle>
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            {detailRoom ? "Chỉnh sửa phòng" : "Thêm phòng mới"}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-slate-700 mb-2">
                Họ tên
              </Label>
              {/* <Input id="name" className="w-full h-11" {...register("name")} /> */}
              <Input id="name" className="w-full h-11" />
              {/* {errors.name && (
                <p className="text-red-300 text-sm mt-1.5 flex gap-1 items-center">
                  <TriangleAlert className="size-3.5 animate-fade-in" />
                  {errors.name.message}
                </p>
              )} */}
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
              {detailRoom ? "Sửa" : "Thêm"}
            </Button>
          </div>
        </div>
      </form>
    </DialogContent>
  );
}
