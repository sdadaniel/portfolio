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

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium">
          Frontend Developer · 경력 약 7년
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-gray-900">
          곽성실
        </h1>

        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
          Next.js · React · TypeScript 기반 서비스 개발을 주도해 온
          <br className="hidden md:block" />
          프론트엔드 개발자입니다.
        </p>

        <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
          대규모 서비스 리뉴얼, WebView–Native 인증 통합, Monorepo 구축,
          대시보드·포털 개발 등 복잡한 도메인과 구조적 문제를 다루는 일을 꾸준히
          맡아 왔습니다. 디자인 시스템·빌드 시스템·CI/CD 자동화까지 프론트엔드
          개발 전반을 개선하는 역할을 맡아 왔습니다.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Stat label="경력" value="약 7년" />
          <Stat label="번들 절감" value="30%+" />
          <Stat label="개발 효율" value="50%+" />
          <Stat label="운영 개선" value="80%+" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <ContactChip label="sdadaniel0206@gmail.com" />
          <ContactChip label="010-6495-8263" />
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Vue 3",
              "React Native",
              "React Query",
              "Zustand",
              "Storybook",
              "Jest",
              "GitHub Actions",
              "Docker",
              "GA / GTM",
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs rounded-full border border-primary/20 text-primary bg-primary/5 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-2 md:px-5 md:py-3 bg-white rounded-lg border border-border shadow-sm">
      <div className="text-base md:text-xl font-bold text-primary">{value}</div>
      <div className="text-[10px] md:text-xs text-gray-400">{label}</div>
    </div>
  );
}

function ContactChip({ label }: { label: string }) {
  return (
    <span className="px-3 py-1.5 text-xs bg-surface rounded-full border border-border text-gray-500">
      {label}
    </span>
  );
}
