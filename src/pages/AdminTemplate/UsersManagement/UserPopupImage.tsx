import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useUsersAvatarQuery } from "@/hooks/useUserQuery";

// type UserProps = {
//   data : string,
// }

type AvatarForm = {
  avatar: File | null;
};

export default function UserPopupImage() {
  // API
  const { mutate: mutateUserAvatar } = useUsersAvatarQuery();

  // Form
  const {
    // register,
    watch,
    handleSubmit,
    setValue,
  } = useForm<AvatarForm>({
    defaultValues: {
      avatar: null,
    },
  });

  const avatarLink = watch("avatar");
  const previewImage = (data: File) => {
    return URL.createObjectURL(data);
  };

  const onSubmit = (data : AvatarForm) => {
    if (!data.avatar) return;
    const formData = new FormData();
    formData.append("formFile", data.avatar);
    mutateUserAvatar(formData);
  };

  return (
    <DialogContent className="sm:max-w-2xl p-0 border-0 rounded-none bg-transparent">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle className="hidden">Popup Form</DialogTitle>
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Chỉnh sửa ảnh
          </h2>
          <div className="overflow-auto">
            <div className="max-h-[400px]">
              <div className="grid gap-4 row-span-3">
                <div className="block space-y-2">
                  <div className="relative flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-71 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      {!avatarLink && (
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
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                      )}
                      {avatarLink && (
                        <img
                          src={previewImage(avatarLink)}
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
                          const file = e.target.files?.[0] ?? null;
                          return setValue("avatar", file);
                        }}
                      />
                    </label>
                    {avatarLink && (
                      <X
                        onClick={() => setValue("avatar", null)}
                        className="absolute z-2 top-3 right-3 cursor-pointer hover:text-red-400 transition-all duration-300"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            {/* <DialogClose asChild>
              <Button
                variant="outline"
                className="p-2 w-36 h-10.5 border border-slate-300 rounded-lg hover:bg-black hover:text-white"
              >
                Hủy
              </Button>
            </DialogClose> */}
            <Button className="p-2 w-36 h-10.5 bg-blue-600 text-white hover:bg-blue-700">
              Xác nhận
            </Button>
          </div>
        </div>
      </form>
    </DialogContent>
  );
}
