export default function Others() {
  return (
    <section id="others" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Others" subtitle="Education & Activities" />

        <div className="mt-12 grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Education</h3>
              <div className="p-4 bg-surface rounded-lg border border-border">
                <h4 className="font-semibold text-sm">금오공과대학교</h4>
                <span className="text-[10px] text-gray-500 font-mono">
                  2011.03 – 2016.03 졸업
                </span>
                <p className="text-xs text-gray-400 mt-2">
                  산업공학부 / 디자인공학과 ·{" "}
                  <span className="text-primary">수석 졸업</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  거북선신화 발명동아리 활동
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Languages</h3>
              <div className="space-y-2">
                <LangItem title="영어" detail="일상 회화" />
                <LangItem title="TOEIC" detail="930" highlight />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Strengths</h3>
              <div className="space-y-3">
                <StrengthItem
                  title="다양한 스택/환경 경험"
                  description="하이브리드(App·WebView), RN, 웹 프론트, 운영 자동화 등 문제 성격에 맞춰 필요한 기술을 빠르게 적용"
                />
                <StrengthItem
                  title="Figma 기반 협업"
                  description="컴포넌트/디자인 시스템 관점에서 제약·대안·일관성을 근거로 피드백하며 디자이너와의 커뮤니케이션 비용 절감"
                />
                <StrengthItem
                  title="그레이 영역을 학습해 메우기"
                  description="개발/기획/마케팅 사이 경계가 애매한 영역을 필요한 만큼 학습해 연결하는 것을 선호"
                />
                <StrengthItem
                  title="팀 효율 관점"
                  description="병목이 되는 작업을 먼저 파악하고 정리해, 반복·수동 작업이 쌓이지 않도록 업무 흐름을 개선"
                />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Activities & Study
              </h3>
              <div className="space-y-2">
                <ActivityItem
                  title="Google Analytics 스터디 운영"
                  detail="2020.03"
                />
                <ActivityItem
                  title="GA·마케팅 관련 오픈 채팅방 운영"
                  detail="약 500명"
                />
                <ActivityItem title="카페24 빌더호스팅으로 회사 홈페이지 제작" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Best Achievement
              </h3>
              <div className="p-4 bg-surface rounded-lg border border-primary/30">
                <h4 className="text-sm font-semibold text-primary mb-2">
                  라이브러리/번들 경량화로 배포·로딩 개선
                </h4>
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                  <p>
                    번들 분석 도구로 용량 기여도가 큰 모듈/스타일을 확인해 병목
                    특정.
                  </p>
                  <p>
                    CJS → ESM 전환, 트리 셰이킹 적용, Sass 과다 포함 CSS 정리,
                    dynamic import / code splitting으로 초기 로딩 최적화.
                  </p>
                  <p className="text-primary font-semibold">
                    번들/자산 용량 30%+ 절감
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Hardest Challenge
              </h3>
              <div className="p-4 bg-surface rounded-lg border border-border">
                <h4 className="text-sm font-semibold mb-2">
                  플라잉캣 — BE(Node.js)에서 RN 앱으로 전환
                </h4>
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                  <p>
                    프론트 인력 공백이 생기면서, Node.js 백엔드에서 React Native
                    앱 개발로 전환. 웹 React 경험 없이 약 2주 집중 학습 후
                    곧바로 개발에 합류.
                  </p>
                  <p>
                    단기간에 역량을 끌어올려{" "}
                    <span className="text-primary">
                      운영·배포까지 단독으로 책임
                    </span>
                    할 수 있는 수준으로 성장.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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

function LangItem({
  title,
  detail,
  highlight,
}: {
  title: string;
  detail: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-300">
      <svg
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        className="text-primary"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
      {title}
      <span
        className={`text-xs ${highlight ? "text-primary font-semibold" : "text-gray-500"}`}
      >
        {detail}
      </span>
    </div>
  );
}

function StrengthItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-2 text-xs text-gray-400">
      <span className="text-primary mt-0.5">+</span>
      <div>
        <span className="text-gray-300 font-semibold">{title}</span>
        <span className="text-gray-500"> — {description}</span>
      </div>
    </div>
  );
}

function ActivityItem({ title, detail }: { title: string; detail?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-300">
      <span className="text-primary text-xs">*</span>
      {title}
      {detail && <span className="text-[10px] text-gray-500">({detail})</span>}
    </div>
  );
}
