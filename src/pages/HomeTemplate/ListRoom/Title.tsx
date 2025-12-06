import { Sparkles } from "lucide-react";

export default function Title() {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full shadow-lg mb-4 animate-bounce">
        <Sparkles className="w-5 h-5 text-yellow-500" />
        <span className="text-sm font-semibold text-gray-700">
          Ưu đãi đặc biệt hôm nay
        </span>
      </div>
      <h1 className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
        Khám Phá Phòng Của Bạn
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Tìm không gian hoàn hảo cho kỳ nghỉ của bạn với giá tuyệt vời
      </p>
    </div>
  );
}
