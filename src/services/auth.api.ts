import type { BaseApiResponse } from "@/interfaces/base.interface";
import type { BaseUserApi, CurrentUser } from "@/interfaces/auth.interface";
import api from "./api";
type LoginDataRequest = {
  email: string;
  password: string;
};

export const loginApi = async (data: LoginDataRequest) => {
  try {
    const response = await api.post<BaseApiResponse<BaseUserApi<CurrentUser>>>(
      "/auth/signin",
      data
    );
    return response.data.content;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
