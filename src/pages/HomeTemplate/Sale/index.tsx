// import React, { useState } from "react";
// import {
//   Sparkles,
//   Gift,
//   Clock,
//   Star,
//   Zap,
//   Calendar,
//   Users,
//   MapPin,
//   CheckCircle,
//   Crown,
//   Flame,
//   Info,
//   X,
//   PercentCircleIcon,
//   TrophyIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export default function PromotionPage() {
//   const [selectedDeal, setSelectedDeal] = useState(null);
//   const [activeTab, setActiveTab] = useState("all");

//   const hotDeals = [
//     {
//       id: 1,
//       title: "Flash Sale Cuối Tuần",
//       subtitle: "Giảm đến 50% cho đặt phòng 3 đêm",
//       discount: 50,
//       type: "flash",
//       image:
//         "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
//       originalPrice: 100,
//       salePrice: 50,
//       timeLeft: "2h 35p",
//       badge: "Hot",
//       locations: ["Đà Nẵng", "Nha Trang", "Vũng Tàu"],
//       validFrom: "01/12/2025",
//       validTo: "31/12/2025",
//       conditions: [
//         "Áp dụng từ thứ 6 đến chủ nhật hàng tuần",
//         "Đặt phòng tối thiểu 3 đêm liên tục",
//         "Thanh toán trước toàn bộ giá trị đặt phòng",
//         "Không áp dụng trong dịp lễ, tết",
//       ],
//       description:
//         "Chương trình ưu đãi đặc biệt dành cho khách hàng đặt phòng vào cuối tuần. Tận hưởng kỳ nghỉ của bạn với mức giá tốt nhất!",
//       color: "from-red-500 to-orange-500",
//     },
//     {
//       id: 2,
//       title: "Ưu Đãi Thành Viên VIP",
//       subtitle: "Giảm 30% + Tặng bữa sáng miễn phí",
//       discount: 30,
//       type: "vip",
//       image:
//         "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
//       originalPrice: 150,
//       salePrice: 105,
//       badge: "VIP",
//       locations: ["Hà Nội", "TP.HCM", "Phú Quốc"],
//       validFrom: "15/11/2025",
//       validTo: "15/03/2026",
//       conditions: [
//         "Dành riêng cho thành viên VIP của hệ thống",
//         "Tặng kèm buffet sáng cho 2 người",
//         "Miễn phí hủy phòng trước 24h",
//         "Check-in sớm, check-out muộn (theo tình trạng phòng)",
//       ],
//       description:
//         "Chương trình tri ân dành cho khách hàng VIP thân thiết với nhiều đặc quyền cao cấp.",
//       color: "from-purple-500 to-pink-500",
//     },
//     {
//       id: 3,
//       title: "Du Lịch Gia Đình",
//       subtitle: "Giảm 40% phòng Family Suite",
//       discount: 40,
//       type: "family",
//       image:
//         "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
//       originalPrice: 200,
//       salePrice: 120,
//       badge: "New",
//       locations: ["Đà Lạt", "Sapa", "Hội An"],
//       validFrom: "01/12/2025",
//       validTo: "28/02/2026",
//       conditions: [
//         "Áp dụng cho phòng từ 4 người trở lên",
//         "Trẻ em dưới 6 tuổi được miễn phí",
//         "Tặng kèm tour tham quan trong ngày",
//         "Phục vụ bữa sáng tại phòng",
//       ],
//       description:
//         "Gói ưu đãi đặc biệt cho gia đình, mang đến những kỷ niệm đáng nhớ cùng người thân yêu.",
//       color: "from-green-500 to-emerald-500",
//     },
//     {
//       id: 4,
//       title: "Nghỉ Dưỡng Sang Trọng",
//       subtitle: "Giảm 35% Resort 5 sao",
//       discount: 35,
//       type: "luxury",
//       image:
//         "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
//       originalPrice: 300,
//       salePrice: 195,
//       badge: "Premium",
//       locations: ["Phú Quốc", "Nha Trang", "Đà Nẵng"],
//       validFrom: "20/11/2025",
//       validTo: "20/04/2026",
//       conditions: [
//         "Chỉ áp dụng cho resort 5 sao",
//         "Bao gồm all-inclusive (ăn uống không giới hạn)",
//         "Miễn phí sử dụng spa, gym, hồ bơi",
//         "Đưa đón sân bay miễn phí",
//       ],
//       description:
//         "Trải nghiệm kỳ nghỉ đẳng cấp 5 sao với đầy đủ tiện nghi cao cấp và dịch vụ hoàn hảo.",
//       color: "from-yellow-500 to-amber-500",
//     },
//     {
//       id: 5,
//       title: "Đặt Sớm Tiết Kiệm",
//       subtitle: "Giảm 25% khi đặt trước 30 ngày",
//       discount: 25,
//       type: "early",
//       image:
//         "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
//       originalPrice: 80,
//       salePrice: 60,
//       badge: "Save",
//       locations: ["Toàn quốc"],
//       validFrom: "01/11/2025",
//       validTo: "31/12/2026",
//       conditions: [
//         "Đặt phòng trước ít nhất 30 ngày",
//         "Áp dụng cho tất cả loại phòng",
//         "Thanh toán linh hoạt (50% trước, 50% khi nhận phòng)",
//         "Được thay đổi lịch 1 lần miễn phí",
//       ],
//       description:
//         "Lên kế hoạch sớm và tiết kiệm chi phí với chương trình đặt phòng trước có lợi nhất.",
//       color: "from-blue-500 to-cyan-500",
//     },
//     {
//       id: 6,
//       title: "Honeymoon Package",
//       subtitle: "Giảm 45% + Tặng quà lưu niệm",
//       discount: 45,
//       type: "couple",
//       image:
//         "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
//       originalPrice: 250,
//       salePrice: 137,
//       badge: "Romance",
//       locations: ["Đà Lạt", "Phú Quốc", "Hội An"],
//       validFrom: "01/01/2026",
//       validTo: "31/12/2026",
//       conditions: [
//         "Dành cho các cặp đôi mới cưới (trong vòng 6 tháng)",
//         "Trang trí phòng lãng mạn với hoa và nến",
//         "Dinner lãng mạn bên bờ biển",
//         "Chụp ảnh kỷ niệm miễn phí (50 ảnh)",
//       ],
//       description:
//         "Gói trăng mật hoàn hảo cho các cặp đôi mới cưới, tạo nên những kỷ niệm đáng nhớ nhất.",
//       color: "from-pink-500 to-rose-500",
//     },
//   ];

//   const stats = [
//     {
//       icon: Users,
//       label: "Khách hàng hài lòng",
//       value: "250K+",
//       color: "blue",
//     },
//     {
//       icon: PercentCircleIcon,
//       label: "Giảm giá lên đến",
//       value: "50%",
//       color: "green",
//     },
//     { icon: Gift, label: "Ưu đãi đang có", value: "150+", color: "purple" },
//     {
//       icon: TrophyIcon,
//       label: "Đánh giá trung bình",
//       value: "4.9★",
//       color: "yellow",
//     },
//   ];

//   const tabs = [
//     { id: "all", label: "Tất cả", icon: Sparkles },
//     { id: "flash", label: "Flash Sale", icon: Zap },
//     { id: "vip", label: "VIP", icon: Crown },
//     { id: "new", label: "Mới nhất", icon: Star },
//   ];

//   const filteredDeals =
//     activeTab === "all"
//       ? hotDeals
//       : hotDeals.filter((deal) => {
//           if (activeTab === "flash") return deal.type === "flash";
//           if (activeTab === "vip") return deal.type === "vip";
//           if (activeTab === "new") return deal.badge === "New";
//           return true;
//         });

//   const getBadgeColor = (badge) => {
//     switch (badge) {
//       case "Hot":
//         return "bg-gradient-to-r from-red-500 to-orange-500";
//       case "VIP":
//         return "bg-gradient-to-r from-purple-500 to-pink-500";
//       case "New":
//         return "bg-gradient-to-r from-green-500 to-emerald-500";
//       case "Premium":
//         return "bg-gradient-to-r from-yellow-500 to-amber-500";
//       case "Save":
//         return "bg-gradient-to-r from-blue-500 to-cyan-500";
//       case "Romance":
//         return "bg-gradient-to-r from-pink-500 to-rose-500";
//       default:
//         return "bg-gradient-to-r from-gray-500 to-gray-600";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
//       <div className="relative">
//         {/* Hero Section */}
//         <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 py-20 px-4">
//           <div className="absolute inset-0 opacity-20">
//             <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
//           </div>

//           <div className="relative max-w-7xl mx-auto text-center">
//             <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 animate-bounce">
//               <Flame className="w-6 h-6 text-white" />
//               <span className="text-white font-bold">
//                 Ưu đãi HOT nhất tháng này!
//               </span>
//             </div>

//             <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
//               Ưu Đãi & Khuyến Mãi
//             </h1>
//             <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto">
//               Cập nhật thông tin các chương trình ưu đãi hấp dẫn nhất
//             </p>
//             <p className="text-lg text-white/80 max-w-2xl mx-auto">
//               Khám phá các gói ưu đãi đặc biệt để có kỳ nghỉ hoàn hảo với giá
//               tốt nhất
//             </p>
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-10">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {stats.map((stat, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white rounded-2xl p-6 shadow-xl text-center transform hover:scale-105 transition-all"
//               >
//                 <div
//                   className={`w-14 h-14 bg-gradient-to-br from-${stat.color}-400 to-${stat.color}-600 rounded-xl mx-auto mb-3 flex items-center justify-center`}
//                 >
//                   <stat.icon className="w-7 h-7 text-white" />
//                 </div>
//                 <div className="text-3xl font-bold text-gray-900 mb-1">
//                   {stat.value}
//                 </div>
//                 <div className="text-sm text-gray-600">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="max-w-7xl mx-auto px-4 py-16">
//           {/* Tabs */}
//           <div className="flex flex-wrap justify-center gap-4 mb-12">
//             {tabs.map((tab) => (
//               <Button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`cursor-pointer flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
//                   activeTab === tab.id
//                     ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg scale-105"
//                     : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
//                 }`}
//               >
//                 <tab.icon className="w-5 h-5" />
//                 {tab.label}
//               </Button>
//             ))}
//           </div>

//           {/* Deals Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
//             {filteredDeals.map((deal) => (
//               <div
//                 key={deal.id}
//                 className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
//                 onClick={() => setSelectedDeal(deal)}
//               >
//                 {/* Image */}
//                 <div className="relative h-64 overflow-hidden">
//                   <img
//                     src={deal.image}
//                     alt={deal.title}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

//                   {/* Badge */}
//                   <div
//                     className={`absolute top-4 left-4 ${getBadgeColor(deal.badge)} px-4 py-2 rounded-full shadow-lg`}
//                   >
//                     <span className="text-white font-bold text-sm flex items-center gap-1">
//                       <Sparkles className="w-4 h-4" />
//                       {deal.badge}
//                     </span>
//                   </div>

//                   {/* Discount Badge */}
//                   <div className="absolute top-4 right-4 bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl">
//                     <div className="text-center">
//                       <div className="text-2xl font-bold text-red-600">
//                         -{deal.discount}%
//                       </div>
//                     </div>
//                   </div>

//                   {/* Timer */}
//                   {deal.timeLeft && (
//                     <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2">
//                       <Clock className="w-4 h-4" />
//                       <span className="font-semibold text-sm">
//                         Còn {deal.timeLeft}
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Content */}
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">
//                     {deal.title}
//                   </h3>
//                   <p className="text-gray-600 text-sm mb-4">{deal.subtitle}</p>

//                   {/* Locations */}
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {deal.locations.map((loc, idx) => (
//                       <span
//                         key={idx}
//                         className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
//                       >
//                         <MapPin className="w-3 h-3" />
//                         {loc}
//                       </span>
//                     ))}
//                   </div>

//                   {/* Price */}
//                   <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-gray-100">
//                     <span className="text-gray-400 line-through text-lg">
//                       ${deal.originalPrice}
//                     </span>
//                     <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
//                       ${deal.salePrice}
//                     </span>
//                     <span className="text-gray-600 text-sm">/đêm</span>
//                   </div>

//                   {/* Info button */}
//                   <Button className="cursor-pointer w-full text-2xl bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-8 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-300 group-hover:text-white">
//                     <Info className="w-5 h-5" />
//                     Xem chi tiết
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Info Section */}
//           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 shadow-xl border-2 border-blue-100">
//             <div className="max-w-4xl mx-auto text-center">
//               <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
//                 <Info className="w-10 h-10 text-white" />
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 Lưu ý quan trọng
//               </h2>
//               <div className="text-left space-y-3 text-gray-700">
//                 <p className="flex items-start gap-3">
//                   <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
//                   <span>
//                     Tất cả các chương trình ưu đãi có thể thay đổi mà không cần
//                     báo trước
//                   </span>
//                 </p>
//                 <p className="flex items-start gap-3">
//                   <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
//                   <span>
//                     Vui lòng đọc kỹ điều kiện áp dụng trước khi đặt phòng
//                   </span>
//                 </p>
//                 <p className="flex items-start gap-3">
//                   <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
//                   <span>Không áp dụng đồng thời nhiều chương trình ưu đãi</span>
//                 </p>
//                 <p className="flex items-start gap-3">
//                   <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
//                   <span>
//                     Liên hệ bộ phận chăm sóc khách hàng để biết thêm chi tiết
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {selectedDeal && (
//         <div
//           className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//           onClick={() => setSelectedDeal(null)}
//         >
//           <div
//             className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="relative">
//               <img
//                 src={selectedDeal.image}
//                 alt={selectedDeal.title}
//                 className="w-full h-80 object-cover"
//               />
//               <button
//                 onClick={() => setSelectedDeal(null)}
//                 className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//               <div
//                 className={`absolute top-4 left-4 ${getBadgeColor(selectedDeal.badge)} px-4 py-2 rounded-full`}
//               >
//                 <span className="text-white font-bold">
//                   {selectedDeal.badge}
//                 </span>
//               </div>
//               <div className="absolute top-4 right-20 bg-white rounded-full px-6 py-3 shadow-xl">
//                 <span className="text-3xl font-bold text-red-600">
//                   -{selectedDeal.discount}%
//                 </span>
//               </div>
//             </div>

//             <div className="p-8">
//               <div className="mb-6">
//                 <h2 className="text-3xl font-bold text-gray-900 mb-3">
//                   {selectedDeal.title}
//                 </h2>
//                 <p className="text-xl text-gray-600 mb-4">
//                   {selectedDeal.subtitle}
//                 </p>
//                 <p className="text-gray-700 leading-relaxed">
//                   {selectedDeal.description}
//                 </p>
//               </div>

//               <div className="grid grid-cols-2 gap-4 mb-6 p-6 bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl">
//                 <div>
//                   <div className="text-sm text-gray-600 mb-1">Giá gốc</div>
//                   <div className="text-2xl text-gray-400 line-through">
//                     ${selectedDeal.originalPrice}/đêm
//                   </div>
//                 </div>
//                 <div>
//                   <div className="text-sm text-gray-600 mb-1">Giá ưu đãi</div>
//                   <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
//                     ${selectedDeal.salePrice}/đêm
//                   </div>
//                 </div>
//               </div>

//               <div className="mb-6 p-6 bg-blue-50 rounded-2xl">
//                 <div className="flex items-center gap-3 mb-3">
//                   <Calendar className="w-6 h-6 text-blue-600" />
//                   <h3 className="text-xl font-bold text-gray-900">
//                     Thời gian áp dụng
//                   </h3>
//                 </div>
//                 <p className="text-gray-700">
//                   Từ <span className="font-bold">{selectedDeal.validFrom}</span>{" "}
//                   đến <span className="font-bold">{selectedDeal.validTo}</span>
//                 </p>
//               </div>

//               <div className="mb-6">
//                 <div className="flex items-center gap-3 mb-4">
//                   <MapPin className="w-6 h-6 text-purple-600" />
//                   <h3 className="text-xl font-bold text-gray-900">
//                     Địa điểm áp dụng
//                   </h3>
//                 </div>
//                 <div className="flex flex-wrap gap-3">
//                   {selectedDeal.locations.map((loc, idx) => (
//                     <span
//                       key={idx}
//                       className="bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800 px-4 py-2 rounded-xl font-medium flex items-center gap-2"
//                     >
//                       <MapPin className="w-4 h-4" />
//                       {loc}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <div className="flex items-center gap-3 mb-4">
//                   <CheckCircle className="w-6 h-6 text-green-600" />
//                   <h3 className="text-xl font-bold text-gray-900">
//                     Điều kiện áp dụng
//                   </h3>
//                 </div>
//                 <ul className="space-y-3">
//                   {selectedDeal.conditions.map((condition, idx) => (
//                     <li
//                       key={idx}
//                       className="flex items-start gap-3 bg-green-50 p-4 rounded-xl"
//                     >
//                       <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
//                       <span className="text-gray-700">{condition}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
//                 <div className="flex items-start gap-3">
//                   <Info className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <h4 className="font-bold text-gray-900 mb-2">Lưu ý</h4>
//                     <p className="text-gray-700 text-sm">
//                       Chương trình có thể kết thúc sớm khi đạt số lượng khách
//                       hàng tham gia tối đa. Vui lòng liên hệ trực tiếp với cơ sở
//                       lưu trú để biết thêm chi tiết và đặt phòng.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
