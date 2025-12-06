import { Star, TrendingUp, Award } from "lucide-react";

export default function Stats() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl p-4 shadow-lg text-center transform hover:scale-105 transition-all">
        <div className="flex justify-center mb-2">
          <Award className="w-8 h-8 text-yellow-500" />
        </div>
        <div className="text-2xl font-bold text-gray-900">500+</div>
        <div className="text-sm text-gray-600">Phòng</div>
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-lg text-center transform hover:scale-105 transition-all">
        <div className="flex justify-center mb-2">
          <TrendingUp className="w-8 h-8 text-green-500" />
        </div>
        <div className="text-2xl font-bold text-gray-900">98%</div>
        <div className="text-sm text-gray-600">Hài lòng</div>
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-lg text-center transform hover:scale-105 transition-all">
        <div className="flex justify-center mb-2">
          <Star className="w-8 h-8 text-purple-500" />
        </div>
        <div className="text-2xl font-bold text-gray-900">4.9</div>
        <div className="text-sm text-gray-600">Đánh giá</div>
      </div>
    </div>
  );
}
