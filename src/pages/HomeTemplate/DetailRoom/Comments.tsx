// import React, { useState, useEffect } from "react";
// import { Star, Send, Smile } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Label } from "@/components/ui/label";
// import { format, parse } from "date-fns";
// import { vi } from "date-fns/locale";

// // 🧩 Hàm parse ngày linh hoạt
// const parseDate = (dateString: string): Date | null => {
//   if (!dateString) return null;

//   // 1️⃣ ISO format (ví dụ: 2024-10-08T15:49:50.196Z)
//   if (!isNaN(Date.parse(dateString))) {
//     return new Date(dateString);
//   }

//   // 2️⃣ Dạng dd/MM/yyyy HH:mm:ss
//   const parsed = parse(dateString, "dd/MM/yyyy HH:mm:ss", new Date());
//   if (!isNaN(parsed.getTime())) {
//     return parsed;
//   }

//   // 3️⃣ Dạng chuỗi tự nhiên (vd: Tue Dec 17 2024 16:55:09 GMT+0700)
//   const native = new Date(dateString);
//   if (!isNaN(native.getTime())) {
//     return native;
//   }

//   // 4️⃣ Fallback
//   return new Date();
// };

// // 🧩 Hàm format an toàn
// const formatDateSafe = (dateString: string) => {
//   const date = parseDate(dateString);
//   if (!date || isNaN(date.getTime())) return "Không xác định";
//   return format(date, "dd/MM/yyyy", { locale: vi });
// };

// export default function CommentSection() {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [newRating, setNewRating] = useState(5);

//   // Fake API data
//   const fakeApiResponse = {
//     statusCode: 200,
//     content: [
//       {
//         id: 8111,
//         maPhong: 0,
//         maNguoiBinhLuan: 0,
//         ngayBinhLuan: "2024-10-08T15:49:50.196Z",
//         noiDung: "Phòng rộng, view đẹp lắm chủ nhiệt tình",
//         saoBinhLuan: 5,
//       },
//       {
//         id: 8237,
//         maPhong: 1,
//         maNguoiBinhLuan: 1,
//         ngayBinhLuan: "13/11/2024 09:43:33",
//         noiDung: "Phòng tốt",
//         saoBinhLuan: 5,
//       },
//       {
//         id: 8254,
//         maPhong: 233104,
//         maNguoiBinhLuan: 43792,
//         ngayBinhLuan: "2024-11-23T18:59:15.026Z",
//         noiDung: "Đồ đạc hơi cũ nhưng vẫn ổn",
//         saoBinhLuan: 3,
//       },
//       {
//         id: 8307,
//         maPhong: 0,
//         maNguoiBinhLuan: 0,
//         ngayBinhLuan: "Tue Dec 17 2024 16:55:09 GMT+0700 (Indochina Time)",
//         noiDung: "Tuyệt Vời!",
//         saoBinhLuan: 5,
//       },
//     ],
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       setComments(fakeApiResponse.content);
//     }, 500);
//   }, []);

//   const handleSubmitComment = () => {
//     if (newComment.trim()) {
//       const newCmt = {
//         id: Date.now(),
//         maPhong: 0,
//         maNguoiBinhLuan: 999,
//         ngayBinhLuan: new Date().toISOString(),
//         noiDung: newComment,
//         saoBinhLuan: newRating,
//       };
//       setComments([newCmt, ...comments]);
//       setNewComment("");
//       setNewRating(5);
//     }
//   };

//   return (
//     <div className="w-full mx-auto bg-[#F6F7F8] rounded-3xl p-8 shadow-2xl transition-all">
//       {/* Header */}
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
//           <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
//             <Star className="w-6 h-6 text-white" />
//           </div>
//           Đánh giá & Bình luận
//         </h2>
//         <p className="text-gray-700">
//           Chia sẻ trải nghiệm của bạn về phòng này
//         </p>
//       </div>

//       {/* Comment Input */}
//       <Card className="bg-white rounded-2xl mb-8 shadow-lg border-2 border-gray-100">
//         <CardContent className="p-6">
//           <div className="flex gap-4 mb-4">
//             <Avatar className="w-12 h-12 border-2 border-blue-200">
//               <AvatarImage src="https://i.pravatar.cc/150?img=15" />
//               <AvatarFallback>KH</AvatarFallback>
//             </Avatar>

//             <div className="flex-1">
//               <Textarea
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//                 placeholder="Chia sẻ trải nghiệm của bạn..."
//                 className="min-h-[80px] border-2 border-gray-200 focus-visible:ring-blue-400 focus-visible:border-blue-400"
//               />
//             </div>
//           </div>

//           <div className="flex items-center justify-between mt-2">
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2">
//                 <Label className="text-sm font-semibold text-gray-700">
//                   Đánh giá:
//                 </Label>
//                 <div className="flex gap-1">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <button
//                       key={star}
//                       onClick={() => setNewRating(star)}
//                       className="transition-transform hover:scale-110"
//                     >
//                       <Star
//                         className={`w-6 h-6 ${
//                           star <= newRating
//                             ? "fill-yellow-400 text-yellow-400"
//                             : "text-gray-300"
//                         }`}
//                       />
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               <Button
//                 variant="ghost"
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <Smile className="w-5 h-5" />
//               </Button>
//             </div>

//             <Button
//               onClick={handleSubmitComment}
//               className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
//             >
//               <Send className="w-4 h-4" />
//               Gửi đánh giá
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Comments List */}
//       <div className="space-y-6">
//         {comments.length === 0 ? (
//           <p className="text-center text-gray-500">Chưa có bình luận nào.</p>
//         ) : (
//           comments.map((comment) => (
//             <Card
//               key={comment.id}
//               className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
//             >
//               <CardContent className="p-6">
//                 <div className="flex items-start gap-4 mb-4">
//                   <Avatar className="w-12 h-12 border-2 border-gray-200">
//                     <AvatarImage
//                       src={`https://i.pravatar.cc/150?img=${
//                         (comment.maNguoiBinhLuan % 70) + 1
//                       }`}
//                     />
//                     <AvatarFallback>U</AvatarFallback>
//                   </Avatar>

//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-1">
//                       <span className="font-bold text-gray-900">
//                         Người dùng #{comment.maNguoiBinhLuan}
//                       </span>
//                       <div className="flex gap-0.5 ml-2">
//                         {[...Array(comment.saoBinhLuan)].map((_, i) => (
//                           <Star
//                             key={i}
//                             className="w-4 h-4 fill-yellow-400 text-yellow-400"
//                           />
//                         ))}
//                       </div>
//                     </div>
//                     <span className="text-sm text-gray-500">
//                       {formatDateSafe(comment.ngayBinhLuan)}
//                     </span>
//                   </div>
//                 </div>

//                 <p className="text-gray-700 mb-2 leading-relaxed">
//                   {comment.noiDung}
//                 </p>
//               </CardContent>
//             </Card>
//           ))
//         )}
//       </div>

//       {/* Load More */}
//       <div className="text-center mt-8">
//         <Button
//           variant="outline"
//           className="bg-white text-gray-700 font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-2 border-gray-200 px-8 py-3"
//         >
//           Xem thêm bình luận
//         </Button>
//       </div>
//     </div>
//   );
// }
