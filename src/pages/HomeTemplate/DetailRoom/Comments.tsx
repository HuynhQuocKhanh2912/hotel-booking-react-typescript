import { useState, useEffect, FC } from "react";
import { Star, ThumbsUp, MoreVertical } from "lucide-react";

interface Comment {
  id: number;
  maPhong: number;
  maNguoiBinhLuan: number;
  ngayBinhLuan: Date;
  noiDung: string;
  saoBinhLuan: number;
}

type SortBy = "newest" | "highest" | "lowest";

const MovieReviewSection: FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<SortBy>("newest");

  const mockData: Comment[] = [
    {
      id: 20434,
      maPhong: 1,
      maNguoiBinhLuan: 54994,
      ngayBinhLuan: "2025-10-21T07:37:40.511Z",
      noiDung: "Phòng ổn, nhưng test này bỏ qua phần sao.",
      saoBinhLuan: 0,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=54994",
      userName: "Nguyễn Văn A",
    },
    {
      id: 20435,
      maPhong: 1,
      maNguoiBinhLuan: 54995,
      ngayBinhLuan: "2025-10-21T07:50:05.360Z",
      noiDung: "Phòng ổn, nhưng test này bỏ qua phần sao.",
      saoBinhLuan: 0,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=54995",
      userName: "Trần Thị B",
    },
    {
      id: 20436,
      maPhong: 1,
      maNguoiBinhLuan: 54996,
      ngayBinhLuan: "2025-10-21T07:50:06.262Z",
      noiDung: "Phòng sạch sẽ, nhân viên thân thiện!",
      saoBinhLuan: 4,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=54996",
      userName: "Lê Minh C",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setComments(mockData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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

  const renderStars = (rating: number): JSX.Element => {
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

  const sortedComments: Comment[] = [...comments].sort((a, b) => {
    if (sortBy === "newest") {
      return (
        new Date(b.ngayBinhLuan).getTime() - new Date(a.ngayBinhLuan).getTime()
      );
    }
    if (sortBy === "highest") {
      return b.saoBinhLuan - a.saoBinhLuan;
    }
    return a.saoBinhLuan - b.saoBinhLuan;
  });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSortBy(e.target.value as SortBy);
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
                    Dựa trên {comments.length} đánh giá
                  </p>
                </div>
              </div>
            </div>
            <button className="w-full md:w-auto bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300">
              + Viết đánh giá
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            Bình luận ({comments.length})
          </h3>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
          >
            <option value="newest">Mới nhất</option>
            <option value="highest">Đánh giá cao nhất</option>
            <option value="lowest">Đánh giá thấp nhất</option>
          </select>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : sortedComments.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p>Chưa có bình luận nào</p>
            </div>
          ) : (
            sortedComments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white border border-gray-200 rounded-lg p-5 hover:bg-gray-50 transition-all duration-300 hover:border-blue-300 shadow-sm hover:shadow-md"
              >
                {/* User Info */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <img
                      src={comment.avatar}
                      alt={comment.userName}
                      className="w-12 h-12 rounded-full border-2 border-blue-300"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-gray-800">
                          {comment.userName}
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
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {comment.noiDung}
                  </p>

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

        {/* Load More Button */}
        {!loading && comments.length > 0 && (
          <div className="flex justify-center mt-8">
            <button className="border border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300">
              Xem thêm bình luận
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieReviewSection;
