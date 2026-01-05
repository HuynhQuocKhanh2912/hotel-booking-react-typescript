import { useState, useEffect } from "react";
import type { FC } from "react";
import { Star, ThumbsUp, MoreVertical, Send } from "lucide-react";
import { getCommentsList } from "@/services/comments.api";
import { useQuery } from "@tanstack/react-query";
import { useRoomDetail } from "@/stores/useRoomDetails.store";
import type { CommentsID } from "@/interfaces/commentsID.interface";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

interface InputComments {
  maPhong: 0;
  maNguoiBinhLuan: 0;
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: 0;
}

const MovieReviewSection: FC = () => {
  const idRoom = useRoomDetail((state) => state.roomID);
  const [expandedComments, setExpandedComments] = useState<Set<number>>(
    new Set()
  );
  const [clampedComments, setClampedComments] = useState<Set<number>>(
    new Set()
  );

  const { data: listComments, isPending } = useQuery<CommentsID[] | undefined>({
    queryKey: ["commentsList", idRoom?.id],
    queryFn: () => getCommentsList(Number(idRoom?.id)),
    enabled: !!idRoom?.id,
  });

  // Reset clamped comments khi listComments thay đổi
  useEffect(() => {
    setClampedComments(new Set());
    setExpandedComments(new Set());
  }, [listComments?.length]);

  const checkClamped = (
    element: HTMLParagraphElement | null,
    commentId: number
  ) => {
    if (
      !element ||
      expandedComments.has(commentId) ||
      clampedComments.has(commentId)
    ) {
      return;
    }
    // Kiểm tra xem text có bị clamp không (chỉ khi đang ở trạng thái collapsed)
    if (element.scrollHeight > element.clientHeight) {
      setClampedComments((prev) => new Set(prev).add(commentId));
    }
  };

  const toggleExpand = (commentId: number) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return "Vừa xong";
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} ngày trước`;

    return date.toLocaleDateString("vi-VN");
  };
  // post comment form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputComments>();
  const today = new Date();

  const onSubmit = (data: InputComments) => {
    const payload = {
      ...data,
      ngayBinhLuan: format(today, "dd-MMMM-yyyy"),
    };
    console.log(payload);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={
              i < rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-purple-50 to-white">
      {/* Main Content */}
      <div className="mx-auto px-4 py-8">
        {/* Rating Overview Card */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Đánh giá chung
              </h2>
              <div className="flex items-center gap-4">
                <div className="text-5xl font-bold text-yellow-500">4.2</div>
                <div>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className="fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">
                    Dựa trên {listComments?.length} đánh giá
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comment Form */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Viết đánh giá
          </h2>

          <div className="space-y-6">
            {/* Rating */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">
                Đánh giá của bạn <span className="text-red-500">*</span>
              </Label>

              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      variant="ghost"
                      size="icon"
                      className="hover:scale-125 transition-transform"
                    >
                      <Star className="h-8 w-8 text-muted-foreground hover:fill-yellow-400 hover:text-yellow-400" />
                    </Button>
                  ))}
                </div>

                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-700 px-4 py-1"
                >
                  Tuyệt vời!
                </Badge>
              </div>
            </div>

            {/* Comment */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Nhận xét của bạn <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  placeholder="Chia sẻ cảm nhận của bạn về sản phẩm này..."
                  className="min-h-[120px] resize-none"
                  {...register("noiDung")}
                />

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Mô tả chi tiết sẽ giúp người khác hơn</span>
                  <span>0/500</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
                <Button variant="outline">Hủy</Button>

                <Button className="gap-2">
                  <Send className="h-4 w-4" />
                  Gửi đánh giá
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {isPending ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : listComments?.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p>Chưa có bình luận nào</p>
            </div>
          ) : (
            listComments?.map((comment) => (
              <div
                key={comment.id}
                className="bg-white border border-gray-200 rounded-lg p-5 hover:bg-gray-50 transition-all duration-300 hover:border-blue-300 shadow-sm hover:shadow-md"
              >
                {/* User Info */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <img
                      src={comment.tenNguoiBinhLuan}
                      alt={comment.avatar}
                      className="w-12 h-12 rounded-full border-2 border-blue-300"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-gray-800">
                          {comment.tenNguoiBinhLuan}
                        </h4>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-medium">
                          Người dùng
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          {renderStars(comment.saoBinhLuan)}
                          <span className="ml-1 font-semibold text-yellow-500">
                            {comment.saoBinhLuan}.0
                          </span>
                        </div>
                        <span>•</span>
                        <span>{formatDate(comment.ngayBinhLuan)}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </div>

                {/* Review Content */}
                <div className="ml-16">
                  <div>
                    <p
                      ref={(el) => checkClamped(el, comment.id)}
                      className={`text-gray-700 leading-relaxed mb-2 ${
                        expandedComments.has(comment.id) ? "" : "line-clamp-2"
                      }`}
                    >
                      {comment.noiDung}
                    </p>

                    {clampedComments.has(comment.id) && (
                      <button
                        onClick={() => toggleExpand(comment.id)}
                        className="cursor-pointer text-blue-500 text-sm font-medium hover:underline"
                      >
                        {expandedComments.has(comment.id)
                          ? "Thu gọn"
                          : "Xem thêm"}
                      </button>
                    )}
                  </div>

                  {/* Interaction Buttons */}
                  <div className="flex items-center gap-6 pt-3 border-t border-gray-200">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group">
                      <ThumbsUp
                        size={18}
                        className="group-hover:fill-blue-600"
                      />
                      <span className="text-sm">Hữu ích</span>
                    </button>
                    <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      Phản hồi
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieReviewSection;
