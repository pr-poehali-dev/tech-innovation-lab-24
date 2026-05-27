import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
}

const COLORS = [
  "#ff6bff", "#a855f7", "#6366f1", "#3b82f6", "#06b6d4",
  "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#8b5cf6",
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef<number>(0);
  const [showNotification, setShowNotification] = useState(false);

  const initParticles = useCallback((w: number, h: number) => {
    particlesRef.current = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: Math.random() * 0.4 + 0.2,
      radius: Math.random() * 4 + 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: Math.random() * 0.7 + 0.3,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150 * 0.03;
          p.vx += dx * force;
          p.vy += dy * force;
        }
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.vy += 0.02;
        p.x += p.vx;
        p.y += p.vy;

        if (p.y > canvas.height + 10) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
          p.vy = Math.random() * 0.4 + 0.2;
          p.vx = (Math.random() - 0.5) * 0.6;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [initParticles]);

  const handleButtonClick = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="relative flex h-screen overflow-hidden" style={{ background: "linear-gradient(135deg, #1a0533 0%, #0d1b4b 50%, #060d2e 100%)" }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tight rainbow-text mb-6"
        >
          Ютер здесь
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-white/60 text-lg md:text-xl max-w-xl"
        >
          Личное пространство в сети. Быстро. Красиво. По-своему.
        </motion.p>
      </div>

      <div className="relative z-10 flex items-center justify-center px-6 md:px-12 py-8">
        <div className="flex flex-col items-center gap-4">
          <motion.button
            onClick={handleButtonClick}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="bg-red-600 hover:bg-red-500 text-white font-bold text-lg px-8 py-6 rounded-2xl shadow-2xl shadow-red-900/60 cursor-pointer transition-colors duration-200 min-w-[160px]"
            style={{ writingMode: "vertical-lr" }}
          >
            Нажми, нажми!
          </motion.button>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/10 backdrop-blur border border-white/20 text-white text-sm px-4 py-3 rounded-xl text-center max-w-[160px]"
            >
              🎉 Ты нажал!
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
