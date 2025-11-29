import { Shield, Clock, CalendarDays } from "lucide-react";
export default function Rules() {
  const rules = [
    { label: "Nhận phòng", value: "Sau 14:00", icon: Clock },
    { label: "Trả phòng", value: "Trước 12:00", icon: Clock },
    { label: "Hủy đặt phòng", value: "Miễn phí trước 48h", icon: CalendarDays },
    {
      label: "Chính sách",
      value: "Không hút thuốc, Không thú cưng",
      icon: Shield,
    },
  ];
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Quy định & Chính sách
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rules.map((rule, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl"
          >
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shrink-0">
              <rule.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-900 mb-1">
                {rule.label}
              </div>
              <div className="text-sm text-gray-600">{rule.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
