"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-border"
    >
      <HeroScene />
      <div className="absolute top-0 right-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-primary/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* 왼쪽: 소개 */}
          <div>
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium">
              Frontend Developer · 경력 약 7년
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900">
              곽성실
            </h1>

            <p className="text-gray-600 text-lg md:text-xl mb-4 leading-relaxed">
              복잡한 서비스를 깔끔하게 풀어내고, AI로 더 나은 방법을 찾는
              프론트엔드 개발자입니다.
            </p>

            <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">
              7년간 서비스 리뉴얼부터 디자인 시스템, CI/CD 자동화까지 프론트엔드
              전반을 다뤄 왔고, 최근에는 AI Agent 오케스트레이션으로 워크플로
              자동화에 도전하고 있습니다.
            </p>

          </div>

          {/* 오른쪽: 연락처 */}
          <div className="flex flex-col gap-4">
            <ContactItem label="Email" value="sdadaniel0206@gmail.com" href="mailto:sdadaniel0206@gmail.com" />
            <ContactItem label="Phone" value="010-6495-8263" href="tel:010-6495-8263" />
            <ContactItem label="GitHub" value="github.com/sdadaniel" href="https://github.com/sdadaniel" />
            <ContactItem label="Velog" value="velog.io/@sdadaniel" href="https://velog.io/@sdadaniel" />
          </div>
        </div>

        <p className="text-center text-sm text-gray-700 mt-20 font-bold">
          궁금한 부분은 아래 챗봇에게 물어보세요
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary/40"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

function ContactItem({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="flex items-center gap-4 px-5 py-4 bg-white rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all"
    >
      <span className="text-xs font-medium text-gray-400 w-14 shrink-0">{label}</span>
      <span className="text-sm text-gray-700">{value}</span>
    </a>
  );
}
