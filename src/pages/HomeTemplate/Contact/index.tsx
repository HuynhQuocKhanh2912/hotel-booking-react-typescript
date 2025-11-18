import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  CheckCircle,
  Building,
  Globe,
  Headphones,
  Calendar,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      formData.name &&
      formData.email &&
      formData.subject &&
      formData.message
    ) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }, 3000);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Địa chỉ",
      content: "123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      title: "Điện thoại",
      content: "+84 123 456 789",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Mail,
      title: "Email",
      content: "contact@hotel.com",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "Giờ làm việc",
      content: "Thứ 2 - Chủ nhật: 8:00 - 22:00",
      color: "from-orange-500 to-red-500",
    },
  ];

  const reasons = [
    {
      icon: Headphones,
      title: "Hỗ trợ 24/7",
      desc: "Luôn sẵn sàng hỗ trợ bạn mọi lúc",
    },
    {
      icon: CheckCircle,
      title: "Phản hồi nhanh",
      desc: "Trả lời trong vòng 2 giờ",
    },
    { icon: Globe, title: "Đa ngôn ngữ", desc: "Hỗ trợ tiếng Việt, English" },
    {
      icon: Calendar,
      title: "Tư vấn miễn phí",
      desc: "Tư vấn lịch trình du lịch",
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: "Facebook",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      icon: Instagram,
      name: "Instagram",
      color: "bg-pink-600 hover:bg-pink-700",
    },
    { icon: Twitter, name: "Twitter", color: "bg-sky-500 hover:bg-sky-600" },
    {
      icon: Linkedin,
      name: "LinkedIn",
      color: "bg-blue-700 hover:bg-blue-800",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="relative">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-20 px-4">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
          </div>

          <div className="relative max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
              <MessageSquare className="w-6 h-6 text-white" />
              <span className="text-white font-bold">
                Chúng tôi luôn lắng nghe bạn
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Liên Hệ Với Chúng Tôi
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Gửi câu hỏi, góp ý hoặc yêu cầu hỗ trợ. Chúng tôi sẽ phản hồi
              trong thời gian sớm nhất
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 -mt-12 relative z-10">
            {contactInfo.map((info, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-xl mb-4 flex items-center justify-center`}
                >
                  <info.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-600">{info.content}</p>
              </div>
            ))}
          </div>

          {/* Form and Map Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Gửi Tin Nhắn
                </h2>
                <p className="text-gray-600">
                  Điền thông tin bên dưới và chúng tôi sẽ liên hệ lại với bạn
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Gửi thành công!
                  </h3>
                  <p className="text-gray-600">
                    Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <Label className="block text-sm font-semibold text-gray-700 mb-2">
                      Họ và tên <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-6 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="Nhập họ và tên"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-6 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="block text-sm font-semibold text-gray-700 mb-2">
                        Số điện thoại
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-6 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                          placeholder="0123456789"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="block text-sm font-semibold text-gray-700 mb-2">
                      Chủ đề <span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full px-4 py-6 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors">
                        <SelectValue placeholder="Chọn chủ đề" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="booking">Đặt phòng</SelectItem>
                          <SelectItem value="support">
                            Hỗ trợ kỹ thuật
                          </SelectItem>
                          <SelectItem value="complaint">Khiếu nại</SelectItem>
                          <SelectItem value="feedback">Góp ý</SelectItem>
                          <SelectItem value="other">Khác</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nội dung <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      // rows="6"
                      className="w-full h-52 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none"
                      placeholder="Nhập nội dung tin nhắn..."
                    ></Textarea>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-6 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Gửi tin nhắn
                  </Button>
                </div>
              )}
            </div>

            {/* Map and Info */}
            <div className="space-y-6">
              {/* Map */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4989537139063!2d106.69309931533419!3d10.77499319230425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc9%3A0x5a8b5c5e5d5c5e5d!2zMTIzIMSQLiBMw6ogTOG7o2ksIELhur9uIE5naMOoLCBRdeG6rW4gMSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Office Info */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Building className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">Văn Phòng Chính</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Địa chỉ:</p>
                      <p className="text-white/90">
                        123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Giờ làm việc:</p>
                      <p className="text-white/90">
                        Thứ 2 - Chủ nhật: 8:00 - 22:00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Hotline:</p>
                      <p className="text-white/90">+84 123 456 789</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Email:</p>
                      <p className="text-white/90">contact@hotel.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reasons Section */}
          <div className="bg-white rounded-3xl p-12 shadow-2xl mb-16">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tại Sao Chọn Chúng Tôi?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {reasons.map((reason, idx) => (
                <div key={idx} className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <reason.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600">{reason.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 text-center shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-4">
              Kết Nối Với Chúng Tôi
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Theo dõi để cập nhật tin tức và ưu đãi mới nhất
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((social, idx) => (
                <button
                  key={idx}
                  className={`${social.color} text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-110 flex items-center gap-3 font-semibold`}
                >
                  <social.icon className="w-6 h-6" />
                  {social.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
