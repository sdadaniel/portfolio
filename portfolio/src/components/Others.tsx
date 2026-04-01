export default function Others() {
  return (
    <section id="others" className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Others" subtitle="Activities & Awards" />

        <div className="mt-12 grid md:grid-cols-2 gap-12">
          {/* Left column */}
          <div className="space-y-8">
            {/* estudy & rks-java */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Side Projects</h3>
              <div className="space-y-4">
                <SideProject
                  title="estudy"
                  period="2022.06 ~ Present"
                  description="지식을 습득하고 메타인지 활성화를 위한 기록장. 서버, 백엔드, 소프트웨어 학문을 학습하고 기록."
                  badge="GitHub Star 200+"
                />
                <SideProject
                  title="rks-java"
                  period="2024.04 ~ Present"
                  description="CLI 환경에서 Redis의 주요 사용 통계를 분석하고 모니터링하기 위한 CLI Tool."
                />
              </div>
            </div>

            {/* Open Source */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Open Source Contributions
              </h3>
              <div className="space-y-2">
                {[
                  "spring-kafka: sample 결과 출력 문서 개선",
                  "spring-framework: webflux 확장함수 null값 처리 개선",
                  "spring-boot: Actuator HealthMetric 조건 검사 개선",
                  "armeria: Type 클래스 확장 함수명 네이밍 개선",
                  "Exposed: SQL, update Statement 개선",
                  "kotlin-jdsl: 산술 연산자 CEILING 스펙 정의",
                  "cglib: Spring DI, Enhancer private method 이슈 트래킹",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 text-xs text-gray-400"
                  >
                    <span className="text-primary mt-0.5">+</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            {/* Certificates */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Certificates</h3>
              <div className="space-y-2">
                <CertItem title="정보처리기능사" />
                <CertItem title="SQL 개발자 (SQLD)" />
              </div>
            </div>

            {/* Awards */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Awards</h3>
              <div className="space-y-2">
                <AwardItem title="역량 인증대회 우수상" org="G학교" />
                <AwardItem title="해커톤 우수상" />
                <AwardItem title="연합 해커톤 AWS 기업상" />
                <AwardItem
                  title="삼성 창업놀이터 70만원 투자 유치"
                  org="Samsung"
                />
              </div>
            </div>

            {/* Presentations */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Presentations</h3>
              <div className="space-y-3">
                <PresentationItem
                  title="KotlinConf'24 Global in South Korea"
                  description="스피커 활동"
                  highlight
                />
                <PresentationItem
                  title="제 1회 컨퍼런스"
                  description="Spring Boot 근데 코틀린을 곁들인"
                />
                <PresentationItem
                  title="Conference"
                  description="개발자로서 미친 성장을 이루어내는 방법"
                />
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

function SideProject({
  title,
  period,
  description,
  badge,
}: {
  title: string;
  period: string;
  description: string;
  badge?: string;
}) {
  return (
    <div className="p-4 bg-[#0a0a0a] rounded-lg border border-border">
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-semibold text-sm">{title}</h4>
        {badge && (
          <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[10px] text-gray-500 font-mono">{period}</span>
      <p className="text-xs text-gray-400 mt-2">{description}</p>
    </div>
  );
}

function CertItem({ title }: { title: string }) {
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
    </div>
  );
}

function AwardItem({ title, org }: { title: string; org?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-300">
      <span className="text-primary text-xs">*</span>
      {title}
      {org && <span className="text-[10px] text-gray-500">({org})</span>}
    </div>
  );
}

function PresentationItem({
  title,
  description,
  highlight,
}: {
  title: string;
  description: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-3 rounded-lg border ${
        highlight
          ? "border-primary/30 bg-primary/5"
          : "border-border bg-[#0a0a0a]"
      }`}
    >
      <h4
        className={`text-sm font-semibold ${highlight ? "text-primary" : ""}`}
      >
        {title}
      </h4>
      <p className="text-xs text-gray-500 mt-0.5">{description}</p>
    </div>
  );
}
