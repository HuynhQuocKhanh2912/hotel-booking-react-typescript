import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 2000000, suffix: "+", label: "Khách hàng hài lòng" },
  { value: 50000, suffix: "+", label: "Khách sạn đối tác" },
  { value: 100, suffix: "+", label: "Quốc gia & vùng lãnh thổ" },
  { value: 4.8, suffix: "/5", label: "Đánh giá trung bình" },
];

export default function CounterNumber() {
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

  // 🚀 Counter animation siêu mượt với stagger effect
  useEffect(() => {
    if (!visible) return;

    stats.forEach((stat, index) => {
      const start = performance.now();
      const duration = 2500; // 2.5 giây
      const delay = index * 150; // Stagger delay
      const target = stat.value;

      const animate = (time: number) => {
        const elapsed = time - start;
        if (elapsed < delay) {
          requestAnimationFrame(animate);
          return;
        }

        const adjustedElapsed = elapsed - delay;
        const progress = Math.min(adjustedElapsed / duration, 1);
        const eased = easeOutExpo(progress);
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
      className="bg-white py-24 transition-all duration-1000"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center transition-all duration-700 ease-out"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${index * 120}ms`,
              }}
            >
              <div className="bg-gray-50 rounded-3xl p-6 lg:p-8 hover:bg-blue-50 transition-all duration-500 border border-gray-100 hover:border-blue-200 hover:shadow-lg">
                <div className="mb-5">
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-1 tracking-tight">
                    {counts[index] % 1 === 0
                      ? Math.floor(counts[index]).toLocaleString()
                      : counts[index].toFixed(1)}
                    <span className="text-2xl lg:text-3xl font-semibold text-blue-600 ml-1">
                      {stat.suffix}
                    </span>
                  </div>
                </div>
                <div className="text-gray-600 font-medium text-sm lg:text-base leading-relaxed transition-colors duration-300 group-hover:text-gray-800">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
