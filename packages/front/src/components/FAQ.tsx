
const faqItems = [
  {
    category: "퇴사 사유",
    items: [
      {
        q: "펀블",
        a: "경영 악화로 권고사직(조직 전체 대상)으로 퇴사.",
      },
      {
        q: "산타",
        a: "경영 환경 변화로 사무실 이전(신논현 → 판교)이 있었고, 통근 거리/시간(왕복 약 3시간)이 현실적으로 어려워 퇴사.",
      },
      {
        q: "플라잉캣",
        a: "경영 악화 및 사업 피봇으로 조직 규모가 축소되며(초기 5명 → 확장 후 최대 100명 근접 → 다시 5명 이하), 커리어 방향을 위해 이직.",
      },
      {
        q: "어바웃굿즈",
        a: "1인 개발 체계에서 역할이 고착되어 성장/협업 환경의 한계를 느껴 퇴사.",
      },
      {
        q: "아이더마바이오",
        a: "개발·디자인 등 다양한 업무를 병행했으나, 개발 전문성을 더 높이기 위해 이직.",
      },
    ],
  },
  {
    category: "강점",
    items: [
      {
        q: "하드 스킬",
        a: "다양한 스택/환경 경험: 하이브리드(App·WebView), RN, 웹 프론트, 운영 자동화 등 문제 성격에 맞춰 필요한 기술을 빠르게 적용해 옴. Figma 기반 협업: 단순히 시안을 전달받아 구현하는 수준을 넘어, 컴포넌트/디자인 시스템 관점에서 제약·대안·일관성을 근거로 피드백하며 디자이너와의 커뮤니케이션 비용을 줄임.",
      },
      {
        q: "소프트 스킬",
        a: "상황을 정리해서 소통: 요구사항·제약·우선순위를 문서/합의로 정리해 관계자 간 오해를 줄이고, 마찰이 있는 환경에서도 목표 중심으로 협업을 맞추는 편. 그레이 영역을 학습해 메우기: 개발/기획/마케팅 사이처럼 경계가 애매한 영역을 '내 일이 아니다'로 두지 않고 필요한 만큼 학습해 연결하는 것을 선호함. 팀 효율 관점: 병목이 되는 작업을 먼저 파악하고 정리해, 동료가 불필요하게 야근하지 않도록(반복·수동 작업이 쌓이지 않도록) 업무 흐름을 개선하려고 함.",
      },
    ],
  },
  {
    category: "약점",
    items: [
      {
        q: "디테일 QA",
        a: "초기에는 디테일 QA에서 실수가 나는 편이었고, 2~3번 확인해도 놓치는 케이스가 발생하곤 했음. 개선을 위해 작업 완료 전 QA 체크리스트를 기준으로 직접 검증하고, 핵심 플로우는 재현 절차·스크린샷(증적)을 함께 남기는 방식으로 누락을 줄이고 있음.",
      },
    ],
  },
  {
    category: "경험",
    items: [
      {
        q: "가장 힘들었던 프로젝트 — 플라잉캣: BE(Node.js)에서 RN 앱으로 전환 투입",
        a: "상황: 프론트 인력 공백이 생기면서, 백엔드 인력 일부가 프론트로 전환해 React Native 앱 개발을 맡아야 하는 상황이었음. 당시 나는 Node.js 백엔드 업무를 맡고 있었고, 웹 React 경험이 없는 상태였음(Vue 경험은 있었음). 문제: 짧은 시간 안에 React/React Native를 학습하고, 실제 서비스 개발·운영 품질을 맞춰야 했음. 행동: 투입 직전 약 2주 동안 집중 학습(핵심 컴포넌트/상태/네비게이션/빌드·배포 흐름) 후 곧바로 개발에 합류했고, 운영 과정에서 발생하는 이슈를 빠르게 흡수·수정하며 안정화에 집중함. 결과: 단기간에 역량을 끌어올려 운영·배포까지 단독으로 책임질 수 있는 수준으로 성장했고, 이후에는 새로운 스택/도메인에 대한 진입 장벽이 크게 낮아졌음.",
      },
      {
        q: "가장 자랑스러운 개선 — 라이브러리/번들 경량화로 배포·로딩 개선",
        a: "문제: 번들 용량이 커지면서 배포 산출물 크기가 증가했고, 설치(yarn install)·실행·로딩까지 전반적인 속도 저하가 발생함. 진단: 번들 분석 도구(예: bundle visualizer)로 용량 기여도가 큰 모듈/스타일을 확인해 병목을 특정함. 개선: CJS → ESM 전환(가능한 의존성 교체 포함)과 트리 셰이킹을 적용했고, 잘못된 Sass 사용으로 과다 포함되던 CSS를 정리함. 또한 dynamic import / code splitting으로 초기 로딩에 필요한 코드만 내려받도록 구성함. 결과: 번들/자산 용량을 30%+ 절감하며 설치·로딩 체감을 개선했고, 이후에도 성능 이슈를 데이터로 진단해 반복 개선할 수 있는 기준을 만들었음.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-12 md:py-24 px-4 md:px-6 bg-surface border-b border-border">
      <div className="max-w-5xl mx-auto">
        <div>
          <span className="text-primary text-sm font-mono">
            Questions & Answers
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-1 text-gray-900">
            FAQ
          </h2>
          <div className="w-12 h-1 bg-primary rounded mt-3" />
        </div>

        <div className="mt-8 md:mt-12 space-y-8 md:space-y-10">
          {faqItems.map((group) => (
            <div key={group.category}>
              <h3
                id={group.category
                  .replace(/[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s-]/g, "")
                  .trim()
                  .replace(/\s+/g, "-")
                  .toLowerCase()}
                className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2 scroll-mt-20"
              >
                <span className="w-2 h-2 rounded-full bg-primary" />
                {group.category}
              </h3>
              <div>
                {group.items.map((item) => (
                  <div key={item.q} className="mb-4 last:mb-0">
                    <p className="text-sm font-medium text-gray-700">{item.q}</p>
                    <p className="text-sm text-gray-500 leading-relaxed mt-1.5">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}