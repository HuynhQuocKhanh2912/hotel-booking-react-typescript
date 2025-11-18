import { useState } from "react";

export default function Desc() {
  const [roomData] = useState({
    statusCode: 200,
    content: {
      id: 2,
      tenPhong: "STUDIO MỚI NETFLIX MIỄN PHÍ/ĐỖ XE MIỄN PHÍ",
      khach: 2,
      phongNgu: 1,
      giuong: 1,
      phongTam: 1,
      moTa: "Không gian riêng để làm việc\r\nMột khu vực chung có Wi-fi, phù hợp để làm việc.\r\nTự nhận phòng\r\nTự nhận phòng bằng khóa thông minh.\r\nKim Nam là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.",
      giaTien: 21,
      mayGiat: true,
      banLa: true,
      tivi: true,
      dieuHoa: true,
      wifi: true,
      bep: true,
      doXe: false,
      hoBoi: false,
      banUi: false,
      maViTri: 1,
      hinhAnh: "https://airbnbnew.cybersoft.edu.vn/images/phong2.png",
    },
    dateTime: "2025-10-30T11:01:39.1557655+07:00",
  });
  const room = roomData.content;
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Mô tả chi tiết</h2>
      <div className="prose prose-lg max-w-none">
        {room.moTa.split("\r\n").map((paragraph, idx) => (
          <p key={idx} className="text-gray-700 leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
