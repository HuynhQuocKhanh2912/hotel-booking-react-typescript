import { Shield, Key, Briefcase, Award } from "lucide-react";

export default function Highlights() {
  const highlights = [
    {
      icon: Briefcase,
      title: "Không gian làm việc",
      desc: "Khu vực riêng với Wi-fi tốc độ cao",
    },
    {
      icon: Key,
      title: "Tự nhận phòng",
      desc: "Khóa thông minh, checkin dễ dàng",
    },
    {
      icon: Award,
      title: "Chủ nhà siêu cấp",
      desc: "Đánh giá cao, kinh nghiệm lâu năm",
    },
    { icon: Shield, title: "An toàn & Bảo mật", desc: "Camera an ninh 24/7" },
  ];
  
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Điểm nổi bật</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {highlights.map((highlight, idx) => (
          <div
            key={idx}
            className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors"
          >
            <div className="shrink-0">
              <div className="w-12 h-12 bg-linear-to-r from-blue-400 to-cyan-300 rounded-xl flex items-center justify-center">
                <highlight.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">
                {highlight.title}
              </h3>
              <p className="text-sm text-gray-600">{highlight.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
