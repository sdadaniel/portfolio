export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium">
          Server Platform Engineer
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Higher Performance,
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Flexible Software
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          압도적인 결과 산출을 위해 끊임없이 고민하고 개선하는 엔지니어입니다.
          <br className="hidden md:block" />
          서버 퍼포먼스 향상과 고가용성 아키텍처를 위해 기여합니다.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Stat label="TPS 향상" value="300%" />
          <Stat label="레이턴시 단축" value="60~80%" />
          <Stat label="서비스 유저" value="3,000+" />
          <Stat label="DAU" value="200+" />
        </div>

        <div className="flex justify-center gap-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary-light transition-colors"
          >
            프로젝트 보기
          </a>
          <a
            href="#about"
            className="px-6 py-3 border border-border text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-colors"
          >
            About Me
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-gray-500"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-5 py-3 bg-surface rounded-lg border border-border">
      <div className="text-xl font-bold text-primary">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}
