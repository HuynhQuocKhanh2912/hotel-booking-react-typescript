import { useEffect, useRef, useState } from "react";

export default function CounterNumber() {
  const stats = [
    { value: 2000000, suffix: "+", label: "Khách hàng hài lòng" },
    { value: 50000, suffix: "+", label: "Khách sạn đối tác" },
    { value: 100, suffix: "+", label: "Quốc gia & vùng lãnh thổ" },
    { value: 4.8, suffix: "/5", label: "Đánh giá trung bình" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // 👁 Khi phần tử xuất hiện
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.4 }
    );

    const current = sectionRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  // 🎨 Hàm easing: nhanh đầu, chậm cuối
  const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

  // 🚀 Counter animation siêu mượt
  useEffect(() => {
    if (!visible) return;

    stats.forEach((stat, index) => {
      const start = performance.now();
      const duration = 2000; // 2 giây
      const target = stat.value;

      const animate = (time: number) => {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutExpo(progress); //
        const currentValue = target * eased;

        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = currentValue;
          return updated;
        });

        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    });
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      className="bg-slate-50 py-16 border-b transition-all duration-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2 transition-all duration-300">
                {counts[index] % 1 === 0
                  ? Math.floor(counts[index]).toLocaleString()
                  : counts[index].toFixed(1)}
                {stat.suffix}
              </div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
