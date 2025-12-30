import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Lock, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/services/auth.api";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "react-router-dom";

// Schema for type inference
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const schema = z.object({
  email: z.string().nonempty("Không bỏ trống"),
  password: z.string().nonempty("Không bỏ trống"),
});

type LoginFormInput = z.infer<typeof schema>;

export default function LoginPage() {
  const { setUser } = useAuthStore();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: (data: LoginFormInput) => loginApi(data),
    onSuccess: (currentUser) => {
      setUser(currentUser);
      const isUser = currentUser.user.role === "USER";
      navigate(isUser ? "/" : "/dashboard");
    },
    onError: (error: unknown) => {
      console.log(error);
    },
  });
  const onSubmit = (data: LoginFormInput) => {
    handleLogin(data);
  };
  return (
    <div className="w-full max-w-md">
      <Card className="shadow-2xl rounded-2xl border border-gray-200 bg-white overflow-hidden pt-0">
        <CardHeader className="text-center pb-6 pt-8 bg-linear-to-br from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="mx-auto w-20 h-20 bg-linear-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <LogIn className="text-white w-10 h-10" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 tracking-tight">
            Đăng nhập
          </CardTitle>
          <p className="text-base text-gray-600 mt-2">
            Chào mừng trở lại! Vui lòng đăng nhập vào tài khoản của bạn
          </p>
        </CardHeader>

        <CardContent className="p-8">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="pl-12 pr-4 h-12 border-2 border-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
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
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu của bạn"
                  className="pl-12 pr-4 h-12 border-2 border-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
              >
                Quên mật khẩu?
              </a>
            </div>

            {/* Button */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <LogIn className="w-5 h-5 mr-2" />
              {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Hoặc</span>
            </div>
          </div>

          {/* Extra links */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <a
                href="#"
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                Đăng ký ngay
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
