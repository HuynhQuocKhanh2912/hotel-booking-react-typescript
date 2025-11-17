import type { BaseApiResponse } from "@/interfaces/base.interface";
import type { PagiUser, UserItem, UserItemAdd } from "@/interfaces/user.interface";
import api from "./api";

export const getUsersListAllApi = async () => {
  try {
    const response = await api.get<BaseApiResponse<UserItem[]>>(`users/`);
    return response.data.content;
  } catch (error) {
    console.log("🎄 ~ getUsersListAllApi ~ error:", error)
    throw error;
  }
};

export const getUsersListApi = async (
  pageIndex: number,
  pageSize: number,
  keyword?: string
) => {
  try {
    const key = keyword ? `&keyword=${keyword}` : "";
    const response = await api.get<BaseApiResponse<PagiUser<UserItem[]>>>(
      `users/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}${key}`
    );
    return response.data.content;
  } catch (error) {
    console.log("🎄 ~ usersListApi ~ error:", error);
    throw error;
  }
};

export const postUsersApi = async (data: UserItemAdd) => {
  try {
    const response = await api.post<BaseApiResponse<UserItemAdd>>(`users/`, data);
    return response.data.content;
  } catch (error) {
    console.log("🎄 ~ postUsersApi ~ error:", error)
    throw error;
  }
};