import { useRoomDetail } from "@/stores/useRoomDetails.store";

export default function Desc() {
  const data = useRoomDetail((state) => state.roomID);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Mô tả chi tiết</h2>
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 leading-relaxed mb-4">{data?.moTa}</p>
      </div>
    </div>
  );
}
