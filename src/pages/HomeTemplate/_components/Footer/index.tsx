import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4">Về chúng tôi</h4>
            <p className="text-gray-400">
              Nền tảng đặt phòng khách sạn hàng đầu Việt Nam với hàng ngàn lựa
              chọn chất lượng.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Liên kết</h4>
            <ul className="space-y-2 text-gray-500">
              <li>
                <Link to="#" className="hover:text-white">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Điều khoản
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Chính sách
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="#" className="hover:text-white">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Trợ giúp
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Theo dõi chúng tôi</h4>
            <div className="flex space-x-4">
              <Link
                to="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
              >
                <span>f</span>
              </Link>
              <Link
                to="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
              >
                <span>t</span>
              </Link>
              <Link
                to="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
              >
                <span>in</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 HotelBooking. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
