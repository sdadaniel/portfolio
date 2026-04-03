export default function Others() {
  return (
    <section className="py-12 md:py-24 px-4 md:px-6 border-b border-border">
      <div className="max-w-6xl mx-auto">
        <div>
          <span className="text-primary text-sm font-mono">
            Education & Activities
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-1 text-gray-900">
            Others
          </h2>
          <div className="w-12 h-1 bg-primary rounded mt-3" />
        </div>

        <div className="mt-8 md:mt-12 grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Education
              </h3>
              <div className="p-5 bg-surface rounded-xl border border-border">
                <h4 className="font-semibold text-sm text-gray-900">
                  금오공과대학교
                </h4>
                <span className="text-[11px] text-gray-400 font-mono">
                  2011.03 – 2016.03 졸업
                </span>
                <p className="text-xs text-gray-500 mt-2">
                  산업공학부 / 디자인공학과 ·{" "}
                  <span className="text-primary font-semibold">수석 졸업</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  거북선신화 발명동아리 활동
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Languages
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check />
                  영어 · 일상 회화
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check />
                  TOEIC{" "}
                  <span className="text-primary font-semibold text-xs">
                    930
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Activities
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-primary text-xs">*</span>
                  Google Analytics 스터디 운영
                  <span className="text-[10px] text-gray-400">(2020.03)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary text-xs">*</span>
                  GA·마케팅 오픈 채팅방 운영
                  <span className="text-[10px] text-gray-400">(약 500명)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary text-xs">*</span>
                  카페24 빌더호스팅으로 회사 홈페이지 제작
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Best Achievement
              </h3>
              <div className="p-5 bg-surface rounded-xl border border-primary/20">
                <h4 className="text-sm font-semibold text-primary mb-2">
                  라이브러리/번들 경량화로 배포·로딩 개선
                </h4>
                <div className="space-y-2 text-xs text-gray-500 leading-relaxed">
                  <p>
                    번들 분석 도구로 병목 특정. CJS → ESM 전환, 트리 셰이킹,
                    Sass 과다 포함 CSS 정리, dynamic import / code splitting
                    적용.
                  </p>
                  <p className="text-primary font-semibold">
                    번들/자산 용량 30%+ 절감
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Hardest Challenge
              </h3>
              <div className="p-5 bg-surface rounded-xl border border-border">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  플라잉캣 — BE(Node.js)에서 RN 앱으로 전환
                </h4>
                <div className="space-y-2 text-xs text-gray-500 leading-relaxed">
                  <p>
                    프론트 인력 공백 → Node.js 백엔드에서 React Native 앱 개발로
                    전환. 웹 React 경험 없이 약 2주 집중 학습 후 합류.
                  </p>
                  <p>
                    단기간에{" "}
                    <span className="text-primary font-semibold">
                      운영·배포까지 단독 책임
                    </span>{" "}
                    수준으로 성장.
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

function Check() {
  return (
    <svg
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      className="text-primary shrink-0"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
