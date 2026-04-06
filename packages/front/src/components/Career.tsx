"use client";

import { useState } from "react";

interface ProjectItem {
  title: string;
  tags?: string[];
  type: "par" | "overview";
  problem?: string;
  approach?: string;
  result?: string;
  overview?: string;
  resultText?: string;
}

interface Company {
  name: string;
  period: string;
  duration: string;
  role: string;
  summary: string;
  techStack: string;
  projects: ProjectItem[];
}

const companies: Company[] = [
  {
    name: "펀블",
    period: "2025.01 – 2025.10",
    duration: "10개월",
    role: "금융권 하이브리드 앱(WebView + Native) 운영·개발 주도",
    summary:
      "금융 서비스 환경에서 하이브리드 앱(App·WebView) 구조를 안정화하고, 인증·딥링크·실시간 기능과 운영형 UI(에디터·설정)를 프로젝트 단위로 개선해 사용자 경험과 운영 효율을 함께 끌어올린 경험.",
    techStack:
      "React, React Native, WebView(Vue3), TypeScript, Storybook, WebSocket, Airbridge",
    projects: [
      {
        title: "하이브리드 앱 인증·딥링크·WebView–Native 연동 안정화",
        type: "par",
        problem:
          "금융 규정·보안을 고려한 인증/본인인증과 WebView–Native 연동이 복잡하고, iOS/Android 및 신규 OS 대응이 지속적으로 필요. 앱↔웹 이동 및 측정을 위한 딥링크 구조가 정리되지 않으면 운영·분석·CS 대응이 흔들림.",
        approach:
          "React Native 앱 기능 개발 및 네이티브 모듈 연동 / iOS 네이티브 키패드 모듈 커스터마이징 및 신규 OS 대응 / 코스콤 클라우드 인증서 로그인·법인 인증 플로우 구현 / Airbridge 기반 딥링크 구조 구축 / WebView–Native 본인인증 연동 통합·안정화",
        result:
          "인증·이동 경로를 예측 가능한 흐름으로 정리해 하이브리드 서비스 운영 안정화 및 구조 개선에 기여. 신규 OS/디바이스 이슈 대응 부담을 낮춤.",
      },
      {
        title: "WebView(Vue3) 번들·로딩 최적화 및 유지보수성 개선",
        type: "par",
        problem:
          "WebView(Vue3) 기능이 늘면서 번들·로딩 부담과 운영 수정 범위가 커짐.",
        approach:
          "webpack-bundle-analyzer로 병목을 분석하고, CJS → ESM 전환 등으로 번들 사이즈 최적화.",
        result:
          "WebView 측 성능·유지보수 여지를 확보하고 배포 단위별 변경 리스크를 낮추는 방향으로 개선.",
      },
      {
        title: "WebSocket 기반 실시간 채팅·거래 기능 개발",
        type: "par",
        problem:
          "실시간 커뮤니케이션/거래 흐름은 UX 요구치가 높고, 장애·지연이 발생하면 사용자 신뢰에 직접 영향.",
        approach:
          "WebSocket 기반의 실시간 채팅·거래 기능을 개발하고, 운영 중 발생하는 이슈를 반영해 고도화.",
        result: "실시간 UX 요구를 충족하는 기능 라인을 안정적으로 유지·발전.",
      },
      {
        title: "디자인 시스템 구조화 및 Storybook 도입",
        type: "par",
        problem:
          "공통 UI가 흩어져 있어 화면별 구현 품질이 달라지고, 컴포넌트 재사용/검증 비용이 커짐.",
        approach:
          "디자인 시스템을 구조화하고 Storybook을 도입해 UI 컴포넌트를 문서화. 공통 UI 패키지의 번들 최적화로 배포/적용 비용을 낮춤.",
        result:
          "디자인·개발·운영이 같은 컴포넌트 기준을 보도록 정리되어 UI 일관성과 재사용성 개선.",
      },
      {
        title: "운영용 에디터(Tiptap)·설정 및 도메인 화면 개선",
        type: "par",
        problem:
          "운영 콘텐츠 작성과 설정 변경 흐름에서 UX 제약이 있었고, 도메인 특화 화면(수익자총회)에서 판매·결과 반영 로직 정리가 필요.",
        approach:
          "Tiptap 에디터를 커스텀(테이블 균등 너비, 이미지 100% 폭, 캡션, 플레이스홀더, 문단 전환 등)하고 링크 버튼·텍스트 배경색 등 운영 UX를 보강. 설정 핵심 화면을 전면 리뉴얼(IA·UX 재정비). 수익자총회 페이지 구조 개선 및 판매·결과 반영 로직 구현.",
        result:
          "에디터·설정·도메인 화면의 반복 이슈를 줄이고, 운영 효율을 높이는 방향으로 개선.",
      },
    ],
  },
  {
    name: "산타",
    period: "2023.04 – 2024.12",
    duration: "1년 9개월",
    role: "Monorepo·코어 웹·React Native 앱 등 전사 프론트 효율·품질 개선",
    summary:
      "Monorepo 기반으로 인증·공통 모듈을 정리하고 Rollup 빌드와 SSO(단일 로그인) 흐름을 정착시켜, 다레포에서 발생하던 중복·분산을 줄임. 코어 서비스·대시보드·React Native 앱까지 폼·상태·폴더 구조·분석 스크립트를 같은 기준으로 맞춰 전사 프론트 개발·유지보수 효율을 끌어올림.",
    techStack:
      "React, React Native, TypeScript, Lerna, Rollup, Circle CI, React Hook Form, Yup, GA, GTM",
    projects: [
      {
        title: "수강생·운영자 프로젝트 로그인·인증 통합",
        type: "par",
        problem:
          "수강생용과 운영자(어드민)용 프로젝트가 각각 있었고, 같은 DB를 쓰는데도 로그인·인증이 동일하게 중복 구현. 인증 관련 로직이 겹쳐 두 프로젝트를 따로 유지보수해야 하는 부담.",
        approach:
          "중복되던 인증·로그인 로직을 통합하고, 이미 운영 중인 서비스를 안정적으로 유지한 채 레거시를 제거하며 한 흐름으로 맞춤.",
        result:
          "인증·로그인 유지보수를 2개에서 1개로 줄여 중복 제거 — 레포·패키지 경계도 정리되어 개발·배포 효율과 재사용·유지보수성이 함께 향상.",
      },
      {
        title: "어드민·수강생 페이지·디자인 라이브러리 (워크스페이스 연동)",
        type: "par",
        problem:
          "어드민, 수강생(학습) 페이지, 공통 디자인 라이브러리가 각각 있던 구조에서 라이브러리를 테스트하려면 배포 → 확인을 반복해야 했고 버전 번호만 빠르게 올라가는 비효율.",
        approach:
          "Monorepo로 세 축을 한 워크스페이스에서 묶어, 라이브러리를 배포하기 전에 어드민·수강생 프로젝트에 바로 연결·적용해 보며 검증. 배포 없이 디자인 시스템 변경을 반복 적용·테스트할 수 있는 흐름으로 전환.",
        result:
          "배포 없이 라이브러리·디자인 시스템을 빠르게 시험·적용 → 개발 효율 50% 이상 향상.",
      },
      {
        title: "서비스 안정성 및 효율성 향상",
        type: "par",
        problem:
          "테마 빌더·대시보드 등 코어 기능이 커지면서 폼·상태가 복잡해지고, 레포마다 폴더 구조가 달라 온보딩 비용이 큼. 3000줄에 가까운 대형 컴포넌트, 개발자마다 다른 폼 처리 방식, 중복 코드 증가.",
        approach:
          "파일당 300줄 초과가 없도록 리팩터링 — React Context·Provider로 상태 통합. React Hook Form + Yup으로 팀 전체에 스키마·validation 방식 통일. 3개 이상 레포에 공통 폴더 구조 규칙을 맞추고, Storybook·TypeDoc으로 문서화.",
        result:
          "신규 기능 진입 장벽 감소, 가독성·유지보수성·재사용성 개선.",
      },
      {
        title: "홈페이지 빌더 기능 개발",
        type: "overview",
        overview:
          "어드민에서 코드 없이 페이지를 구성하는 홈(랜딩) 빌더(노코드 빌더 흐름)에서 배너·슬라이드 배너·텍스트 등 블록 단위 기능을 개발. 블록마다 스타일 옵션을 고를 수 있게 하고, 테마 색(팔레트)을 정의해 적용.",
      },
    ],
  },
  {
    name: "플라잉캣",
    period: "2021.07 – 2023.02",
    duration: "1년 8개월",
    role: "퀵커머스(10분특공대)·스마트 스케줄링(Sync) 등 서비스별 풀스택·프론트 주도",
    summary:
      "퀵커머스(10분특공대)는 모바일 앱과 운영 관리자를 프로젝트 단위로 나눠 앱·백오피스·API까지 소수 인력 E2E로 맞추고, 이후 일정·캘린더(Sync) 서비스에서 기획부터 다국어·성능·테스트·배포까지 세팅한 경험. 10분특공대 기간에는 개발만 한 것이 아니라 실제 배달을 직접 하며 현장에서 서비스 문제점을 몸으로 겪고, 그때 느낀 불편·이슈를 바탕으로 앱·관리자·운영 흐름을 직접 고쳐 나감.",
    techStack:
      "React Native, React Query, TypeScript, Payple, Node.js, Express, MySQL, Vue, Next.js, MUI, Storybook, Jest, FullCalendar, i18n, Jenkins, GitHub Actions, AWS ECR",
    projects: [
      {
        title: "퀵커머스 「10분특공대」 모바일 앱",
        tags: ["React Native", "React Query", "TypeScript", "Payple"],
        type: "overview",
        overview:
          "모바일 앱의 초기 설계부터 개발, 배포·운영까지 경험. 리뷰·상품·장바구니 등 핵심 커머스 흐름을 구현하고 결제·정산은 외부 PG 연동. API 통신·캐싱 전략으로 카테고리 등 목록 로딩 체감 속도를 개선. 직접 배달을 하며 겪은 현장 이슈를 근거로 화면·흐름을 수정 — 매장에서 물품 위치를 찾기 어렵다는 문제를 겪고, 주문이 들어오면 품목마다 어느 선반에 있는지 표시하는 기능을 추가.",
        resultText:
          "카테고리 캐싱으로 체감 속도 개선, 앱–서버 데이터 구조 일원화로 오류·유지보수 부담 감소. 주문 단위로 품목별 선반 위치를 보여주는 흐름으로 찾는 시간 절감.",
      },
      {
        title: "10분특공대 관리자 페이지",
        tags: ["Node.js", "Express", "MySQL", "Vue", "Kakao Map"],
        type: "overview",
        overview:
          "앱·관리자가 함께 쓰는 API 서버를 구축하고, 운영용 관리자 화면에서 상품·주문·고객 등 핵심 운영 업무를 풀스택으로 설계·구현. MFC별로 지역을 나눠 매장을 관리하고, 카카오 지도를 붙여 polygon 기준 매장 영역 표시·관리.",
        resultText:
          "앱과 동일 API·데이터 모델 위에서 운영–앱 E2E 흐름 유지, 소수 인력으로 개발·운영 가능한 구조 확보. 상품–선반 데이터를 관리자에서 다루고 주문과 연결해 현장 이슈 경감.",
      },
      {
        title: "Sync 스마트 스케줄링",
        tags: [
          "Next.js",
          "TypeScript",
          "MUI",
          "Storybook",
          "Jest",
          "FullCalendar",
          "i18n",
        ],
        type: "overview",
        overview:
          "신규 프로젝트로 스마트 스케줄링 서비스 Sync를 진행. 빠른 신규 구축과 안정성을 동시에 맞추기 위해 프로젝트 템플릿을 쓰고, 디자인 시스템을 일정·캘린더 도메인에 맞춰 수정·정비. 기획·초기 설계부터 일정·캘린더 UI/UX, 다국어, 성능, 테스트, 배포·자동화 파이프라인까지 전 과정 담당.",
        resultText:
          "재사용 가능한 UI·문서화 체계와 성능·배포·테스트가 갖춘 스케줄링 제품 기반 마련.",
      },
    ],
  },
  {
    name: "어바웃굿즈",
    period: "2019.06 – 2021.01",
    duration: "1년 8개월",
    role: "카페24 기반 쇼핑몰 제작·운영, 1인 프론트엔드 전담",
    summary:
      "카페24 솔루션 기반으로 다수 쇼핑몰을 단독 구축하고, 자사 브랜드 사이트 유지보수·SEO·분석 체계를 함께 갖춘 1인 개발 환경에서 운영 효율과 데이터 기반 의사결정을 동시에 맞춘 경험.",
    techStack: "JavaScript, jQuery, Cafe24, GA3, GTM, Data Studio, Excel VBA",
    projects: [
      {
        title: "쇼핑몰 구축 및 브랜드 운영",
        tags: ["JavaScript", "jQuery", "Cafe24"],
        type: "overview",
        overview:
          "1인 프론트로 신규 브랜드 런칭(약 2달에 1개 수준)과 기존 사이트 유지보수를 병행. 브랜드마다 다른 디자인·기능 요구에 맞춰 카페24 기반 쇼핑몰을 8개 이상 제작하고 자사 12개 브랜드 사이트 유지보수·기능 고도화를 전담. 확장성 있는 템플릿을 활용해 브랜드별 변형에 대응.",
        resultText:
          "빠른 런칭 리듬에 맞춰 다수 몰을 지속적으로 출시·운영. 템플릿 전략으로 신규 구축·수정 비용을 줄이고 유지보수 범위 통제.",
      },
      {
        title: "SEO·웹 분석",
        tags: ["GA3", "GTM", "Data Studio", "전자상거래"],
        type: "par",
        problem:
          "쇼핑몰 수가 늘어나며 페이지별 검색·유입·전환을 잡기 어렵고, 마케팅·운영 판단에 쓸 데이터가 부족.",
        approach:
          "SEO: 웹 표준에 맞춰 페이지별 메타, sitemap, robots.txt, RSS 등 정비. GA3와 GTM을 설치·정리해 태그·이벤트 기준 통일. GTM 중심으로 GA3 퍼널 설계·적용. Data Studio로 트래픽·전환·퍼널 보고서 구성.",
        result:
          "전자상거래가 돌아가는 몰 위에서 검색·캠페인 유입을 점검할 수 있는 기준 마련. GA3·퍼널 분석으로 데이터 기반 의사결정 환경 구축. Data Studio로 별도 수동 집계 없이 실시간 조회·공유 가능.",
      },
      {
        title: "운영 자동화(발주·재고)",
        tags: ["Excel", "VBA"],
        type: "par",
        problem:
          "운영팀은 매일 아침 30분 이내에 재고 현황 입력과 신규 발주를 시스템에 넣어야 함. 이즈몰·핫트랙스·카페24 등 채널마다 양식이 모두 달라, 한 건씩 형식을 맞추는 수작업.",
        approach:
          "Excel VBA로 채널별 상이한 입력 포맷을 정리·통합하는 프로그램 작성. 재고·발주 반영을 일괄 처리.",
        result:
          "기존 수기 엑셀 처리 대비 업무 속도 80% 이상 개선, 운영팀 아침 30분 마감 업무 부담·리스크 완화.",
      },
    ],
  },
  {
    name: "아이더마바이오",
    period: "2018.02 – 2019.01",
    duration: "1년",
    role: "웹페이지 제작 및 운영 관리",
    summary:
      "그누보드 기반 레거시 사이트 유지보수와 카페24 기반 신규 사이트 구축·운영을 병행하며, 콘텐츠·이미지 중심 변경과 신규 채널 오픈을 동시에 맡은 경험.",
    techStack: "그누보드, Cafe24, HTML/CSS",
    projects: [
      {
        title: "그누보드 기반 홈페이지 유지보수",
        type: "overview",
        overview:
          "운영 중인 그누보드 기반 회사 홈페이지의 유지보수 및 콘텐츠·이미지 반영 업무를 담당.",
        resultText: "요청 사항을 반영해 중단 없이 일상 운영 리듬 유지.",
      },
      {
        title: "카페24 기반 신규 홈페이지",
        type: "overview",
        overview:
          "카페24 환경에서 신규 홈페이지 구축 후 운영 관리 담당.",
        resultText: "신규 채널을 출시 후 운영 가능한 상태로 마무리.",
      },
    ],
  },
];

export default function Career() {
  return (
    <section id="career" className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Career" subtitle="Work Experience" />

        <div className="mt-12 space-y-20">
          {companies.map((company, i) => (
            <CompanyCard key={company.name} company={company} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CompanyCard({ company, reverse }: { company: Company; reverse: boolean }) {
  const [expanded, setExpanded] = useState(false);

  const infoSection = (
    <div className="flex-1 min-w-0">
      <div className="flex flex-wrap items-end gap-3 mb-4">
        <h3 className="text-2xl md:text-3xl font-bold">{company.name}</h3>
        <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
          정규직
        </span>
      </div>
      <span className="text-sm text-gray-500 font-mono">
        {company.period} · {company.duration}
      </span>

      <p className="text-sm text-gray-400 mt-3 mb-2">{company.role}</p>
      <p className="text-sm text-gray-500 leading-relaxed mb-5">
        {company.summary}
      </p>

      <div>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Tech Stack
        </span>
        <div className="flex flex-wrap gap-2 mt-2">
          {company.techStack.split(", ").map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-xs bg-[#0a0a0a] rounded border border-border text-gray-400"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const projectSection = (
    <div className="flex-1 min-w-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-sm text-primary hover:text-primary-light transition-colors mb-4"
      >
        <svg
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform ${expanded ? "rotate-90" : ""}`}
        >
          <path d="M6 3l6 5-6 5" />
        </svg>
        프로젝트 상세 ({company.projects.length}개)
      </button>

      {expanded && (
        <div className="space-y-4 border-l-2 border-border pl-5">
          {company.projects.map((project) => (
            <ProjectBlock key={project.title} project={project} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="group">
      <div className={`flex flex-col lg:flex-row gap-8 lg:gap-12 ${reverse ? "lg:flex-row-reverse" : ""}`}>
        {infoSection}
        {projectSection}
      </div>
      <div className="mt-10 border-b border-border" />
    </div>
  );
}

function ProjectBlock({ project }: { project: ProjectItem }) {
  return (
    <div className="p-5 bg-[#0a0a0a] rounded-xl border border-border">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <h4 className="text-sm font-semibold text-white">{project.title}</h4>
        {project.tags?.map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {project.type === "par" ? (
        <div className="space-y-3 text-xs text-gray-400 leading-relaxed">
          <div>
            <span className="text-red-400 font-semibold text-[11px]">
              Problem
            </span>
            <p className="mt-1">{project.problem}</p>
          </div>
          <div>
            <span className="text-blue-400 font-semibold text-[11px]">
              Approach
            </span>
            <p className="mt-1">{project.approach}</p>
          </div>
          <div>
            <span className="text-green-400 font-semibold text-[11px]">
              Result
            </span>
            <p className="mt-1">{project.result}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
          <p>{project.overview}</p>
          {project.resultText && (
            <div>
              <span className="text-green-400 font-semibold text-[11px]">
                Result
              </span>
              <p className="mt-1">{project.resultText}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <span className="text-primary text-sm font-mono">{subtitle}</span>
      <h2 className="text-3xl md:text-4xl font-bold mt-1">{title}</h2>
      <div className="w-12 h-1 bg-primary rounded mt-3" />
    </div>
  );
}
