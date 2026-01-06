import type { CommentsID } from "@/interfaces/commentsID.interface";
import api from "./api";
import type { BaseApiResponse } from "@/interfaces/base.interface";
import type { CommentsList } from "@/interfaces/comment.interface";

export const getCommentsList = async (
  id: number
): Promise<CommentsID[] | undefined> => {
  try {
    const response = await api.get<BaseApiResponse<CommentsID[]>>(
      `/binh-luan/lay-binh-luan-theo-phong/${id}`
    );
    return response.data.content;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addComments = async (data: CommentsList) => {
  try {
    const response = await api.post<BaseApiResponse<CommentsList>>(
      "/binh-luan",
      data
    );
    return response.data.content;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
