"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";

const careers = [
  {
    id: "funble",
    name: "펀블",
    period: "2025.01 – 2025.10",
    duration: "10개월",
    role: "금융권 하이브리드 앱(WebView + Native) 운영·개발 주도",
    highlights: [
      "React Native·네이티브 모듈, 코스콤 클라우드 인증·법인 인증",
      "Airbridge 딥링크, WebView(Vue 3) 번들(CJS→ESM) 최적화",
      "WebSocket 실시간 채팅·거래, 디자인 시스템·Storybook",
    ],
  },
  {
    id: "santa",
    name: "산타",
    period: "2023.04 – 2024.12",
    duration: "1년 9개월",
    role: "Monorepo(Lerna)·Rollup·SSO 정리 및 코어 서비스 고도화",
    highlights: [
      "수강생·운영자 인증 통합 → 유지보수 2→1",
      "어드민·수강생·디자인 라이브러리 워크스페이스 연동 → 효율 50%+",
      "공통 폴더 구조, React Hook Form + Yup 통일",
    ],
  },
  {
    id: "flyingcat",
    name: "플라잉캣",
    period: "2021.07 – 2023.02",
    duration: "1년 8개월",
    role: "퀵커머스(10분특공대)·스마트 스케줄링(Sync) 풀스택·프론트 주도",
    highlights: [
      "React Native 앱 + Node·Express API + Vue 관리자 E2E",
      "실제 배달하며 현장 이슈 파악 → 품목별 선반 위치 표시",
      "Sync: Next.js, MUI, FullCalendar, i18n, Jest",
    ],
  },
  {
    id: "aboutgoods",
    name: "어바웃굿즈",
    period: "2019.06 – 2021.01",
    duration: "1년 8개월",
    role: "카페24 기반 쇼핑몰 8개+ 제작, 브랜드 12개 유지보수 · 1인 프론트 전담",
    highlights: [
      "Vanilla JS·jQuery, SEO·메타·robots, GA3·GTM·퍼널",
      "Data Studio 대시보드, VBA 운영 자동화 (업무 속도 80%+ 개선)",
    ],
  },
  {
    id: "idermabio",
    name: "아이더마바이오",
    period: "2018.02 – 2019.01",
    duration: "1년",
    role: "웹페이지 제작 및 운영 관리",
    highlights: [
      "그누보드 유지보수·콘텐츠 반영",
      "카페24 신규 홈페이지 구축·운영",
    ],
  },
];

export default function CareerSummary() {
  return (
    <section className="py-12 md:py-24 px-4 md:px-6 bg-surface border-b border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8 md:mb-12">
          <div>
            <span className="text-primary text-sm font-mono">
              Work Experience
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-1 text-gray-900">
              Career
            </h2>
            <div className="w-12 h-1 bg-primary rounded mt-3" />
          </div>
          <Link
            href="/project"
            className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
          >
            상세 보기 →
          </Link>
        </div>

        <CareerTimeline />
      </div>
    </section>
  );
}

const OVERLAP = 40; // 카드 간 겹침 px

function CareerTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [positions, setPositions] = useState<{ top: number }[]>([]);
  const [totalHeight, setTotalHeight] = useState(0);

  useEffect(() => {
    const calculate = () => {
      const cards = cardRefs.current;
      if (!cards.length) return;

      const tops: { top: number }[] = [];
      let leftBottom = 0;
      let rightBottom = 0;

      cards.forEach((card, idx) => {
        const h = card?.offsetHeight ?? 0;
        const isLeft = idx % 2 === 0;

        if (isLeft) {
          tops.push({ top: leftBottom });
          leftBottom += h + OVERLAP;
          // 첫 오른쪽 카드는 왼쪽 첫 카드의 중간쯤에서 시작
          if (idx === 0) rightBottom = Math.round(h * 0.5);
        } else {
          tops.push({ top: rightBottom });
          rightBottom += h + OVERLAP;
        }
      });

      setPositions(tops);
      setTotalHeight(Math.max(leftBottom - OVERLAP, rightBottom - OVERLAP));
    };

    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, []);

  return (
    <>
      {/* 모바일: 기존 수직 타임라인 */}
      <div className="md:hidden relative">
        <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-gray-200" />
        {careers.map((c) => (
          <div key={c.name} className="relative flex items-start mb-6 last:mb-0">
            <div className="absolute left-0 top-1 z-10 w-[15px] h-[15px] rounded-full border-[3px] border-primary bg-white" />
            <div className="ml-8">
              <TimelineCard career={c} />
            </div>
          </div>
        ))}
      </div>

      {/* md 이상: 좌우 교대 타임라인 */}
      <div ref={containerRef} className="hidden md:block relative" style={{ height: totalHeight || "auto" }}>
        {/* 중앙 세로선 */}
        <div className="absolute left-1/2 -translate-x-[1px] top-0 bottom-0 w-0.5 bg-gray-200" />

        {careers.map((c, idx) => {
          const isLeft = idx % 2 === 0;
          const top = positions[idx]?.top ?? 0;

          return (
            <div
              key={c.name}
              ref={(el) => { cardRefs.current[idx] = el; }}
              className="absolute w-[calc(50%-2rem)]"
              style={{
                top,
                ...(isLeft ? { left: 0 } : { right: 0 }),
              }}
            >
              {/* 도트 */}
              <div
                className="absolute top-5 z-10 w-[15px] h-[15px] rounded-full border-[3px] border-primary bg-white"
                style={isLeft ? { right: "-2.5rem" } : { left: "-2.5rem" }}
              />
              <TimelineCard career={c} />
            </div>
          );
        })}
      </div>
    </>
  );
}

function TimelineCard({ career: c }: { career: typeof careers[number] }) {
  return (
    <Link href={`/project/${c.id}`} className="block p-5 bg-white rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
      <div className="flex items-center gap-3 mb-1">
        <h3 className="text-xl font-bold text-gray-900">{c.name}</h3>
        <span className="px-2.5 py-0.5 text-[10px] bg-primary/10 text-primary rounded-full font-medium">
          정규직
        </span>
      </div>
      <span className="text-xs text-gray-400 font-mono">
        {c.period} · {c.duration}
      </span>
      <p className="text-sm text-primary font-medium mt-3 mb-2">{c.role}</p>
      <ul className="space-y-1.5">
        {c.highlights.map((h, i) => (
          <li key={i} className="text-xs text-gray-500 flex gap-2 items-start">
            <span className="text-primary mt-0.5 shrink-0">—</span>
            {h}
          </li>
        ))}
      </ul>
    </Link>
  );
}
