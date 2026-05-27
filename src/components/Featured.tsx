export default function Featured() {
  return (
    <div
      className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0"
      style={{ background: "linear-gradient(180deg, #060d2e 0%, #0d1b4b 100%)" }}
    >
      <div className="flex-1 h-[400px] lg:h-[700px] mb-8 lg:mb-0 lg:order-2 rounded-2xl overflow-hidden border border-purple-500/20">
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #1a0533, #0d1b4b, #1a0533)" }}
        >
          <div className="text-center">
            <div className="text-8xl mb-4">🌐</div>
            <p className="text-purple-300/60 text-sm uppercase tracking-widest">Страницы</p>
          </div>
        </div>
      </div>
      <div className="flex-1 text-left lg:h-[700px] flex flex-col justify-center lg:mr-12 lg:order-1">
        <h3 className="uppercase mb-4 text-sm tracking-widest text-purple-400">Всё в одном месте</h3>
        <p className="text-2xl lg:text-4xl mb-8 text-white leading-tight">
          Страницы, ссылки, контент — всё что нужно собрано в одном удобном месте для тебя и твоей аудитории.
        </p>
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:from-purple-500 hover:to-blue-500 cursor-pointer w-fit uppercase tracking-wide shadow-lg shadow-purple-900/40">
          Подробнее
        </button>
      </div>
    </div>
  );
}
