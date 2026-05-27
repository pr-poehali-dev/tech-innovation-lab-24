interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={`absolute top-0 left-0 right-0 z-20 px-6 py-4 ${className ?? ""}`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-white text-lg font-bold tracking-widest uppercase bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Ютер
        </div>
        <nav className="flex gap-6 md:gap-8">
          {["Главная", "Страницы", "Короткие ссылки", "Обо мне", "Контакты"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-medium hidden sm:block"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
