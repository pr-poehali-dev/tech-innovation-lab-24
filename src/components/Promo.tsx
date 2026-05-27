import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Promo() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
        background: "linear-gradient(135deg, #1a0533 0%, #0d1b4b 100%)",
      }}
    >
      <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
        <motion.div style={{ y }} className="relative w-full h-full flex items-center justify-center">
          <div
            className="w-full h-full"
            style={{
              background: "radial-gradient(ellipse at 30% 50%, rgba(168,85,247,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(59,130,246,0.15) 0%, transparent 60%)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-purple-500/10"
                style={{
                  width: `${(i + 1) * 200}px`,
                  height: `${(i + 1) * 200}px`,
                  animation: `spin ${8 + i * 4}s linear infinite`,
                  opacity: 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <h3 className="absolute top-12 right-6 text-purple-300 uppercase z-10 text-sm md:text-base lg:text-lg tracking-widest">
        Короткие ссылки
      </h3>

      <p className="absolute bottom-12 right-6 text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl z-10 leading-tight">
        Длинные ссылки — в прошлом. Делай короткие, красивые и запоминающиеся адреса прямо здесь.
      </p>
    </div>
  );
}
