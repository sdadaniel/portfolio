export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Other Projects" subtitle="More Work" />

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <MiniProject
            title="Hi - HomeBase Interface"
            period="2022.08 ~ Present"
            description="G고등학교 교내 학습 공간 홈베이스 예약, 관리 서비스"
            contributions={[
              "서버 API 개발",
              "동시성 핸들링",
              "헥사고날 아키텍처 설계",
              "N+1 해결",
            ]}
            badge="DAU 80"
          />
          <MiniProject
            title="선도 - 선생님 도우미"
            period="2023.09 ~ 2024.04"
            description="G고등학교 교과, 비교과, 담임선생님 도우미 서비스"
            contributions={[
              "Wee클래스 1:1 채팅 기능 개발",
              "Java WebFlux NonBlocking API",
              "Docker, AWS EC2 배포/운영",
            ]}
          />
          <MiniProject
            title="Go API - GSM Open API"
            period="2022.11 ~ 2023.03"
            description="G고등학교 교내 정보 Open API 서비스"
            contributions={[
              "API Key 발급, 인증/인가 개발",
              "교내 정보 Open API 개발",
              "CI/CD 구축",
            ]}
          />
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

function MiniProject({
  title,
  period,
  description,
  contributions,
  badge,
}: {
  title: string;
  period: string;
  description: string;
  contributions: string[];
  badge?: string;
}) {
  return (
    <div className="p-6 bg-surface rounded-xl border border-border hover:border-primary/30 transition-all group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
          {title}
        </h3>
        {badge && (
          <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full">
            {badge}
          </span>
        )}
      </div>
      <span className="text-xs text-gray-500 font-mono">{period}</span>
      <p className="text-sm text-gray-400 mt-3 mb-4">{description}</p>
      <ul className="space-y-1.5">
        {contributions.map((c, i) => (
          <li key={i} className="text-xs text-gray-500 flex gap-2">
            <span className="text-primary">+</span>
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
