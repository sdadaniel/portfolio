export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Projects" subtitle="Main Projects" />

        <div className="mt-12 space-y-20">
          {/* Project 1 - NNN 서비스 (도토리) */}
          <ProjectCard
            title="기숙사 관리 서비스"
            period="2021.03 ~ Present"
            description="G 기숙사 고등학교의 교내 기숙사 관리 서비스입니다. 전국 단위의 기숙사 관리 SaaS 플랫폼을 목표로 계속해서 발전하고 있습니다."
            stats={[
              { label: "DAU", value: "200+" },
              { label: "총 유저", value: "3,000+" },
              { label: "신규 유저/년", value: "지속 증가" },
            ]}
            role={[
              "V2 - 서버 엔지니어로서 RestfulAPI 개발, 성능 개선, 모니터링 환경 구축, CI/CD",
              "V3 - 마이크로서비스아키텍처 전환(설계, 구축, 개발), RESTful / gRPC API 개발, 배치 애플리케이션 개발",
            ]}
            skills={[
              "Java",
              "Kotlin",
              "Spring Boot",
              "Spring Batch",
              "Spring WebFlux",
              "Spring Cloud",
              "AWS",
              "Kubernetes",
              "Kafka",
              "Prometheus",
              "Grafana",
              "Loki",
              "Helm Charts",
              "ArgoCD",
              "MySQL",
              "Redis",
            ]}
            achievements={[
              {
                title: "서비스 애플리케이션 API 개발",
                content:
                  "예약 시스템, 음악 신청 시스템, 유저 정보 관리 시스템의 서비스를 개발. REST/gRPC 기반의 API를 개발하고, WebFlux, Coroutine 기반의 비동기 Non-Blocking 기술로 TPS 300% 향상.",
                highlight: "TPS 300% 향상",
              },
              {
                title: "Gateway 미들웨어 개발",
                content:
                  "모든 서비스들의 요청을 한 url에서 endpoint로 구분하기 위해 게이트웨이 서버를 개발. JWT 값을 파싱하여 header에 담아 포워딩하도록 미들웨어를 구현.",
                highlight: "JWT 기반 인증 미들웨어",
              },
              {
                title: "분산 트랜잭션 관리, 이벤트 소싱",
                content:
                  "마이크로서비스간 강결합 문제를 해결하기 위해 Kafka를 통한 이벤트 소싱으로 데이터 처리. 분산 트랜잭션 관리를 통해 데이터 일관성 보장.",
                highlight: "Kafka 이벤트 소싱",
              },
              {
                title: "슬로우 쿼리 개선, Indexing",
                content:
                  "페이징 검색 쿼리들의 슬로우 쿼리를 커버링 인덱스, 프로젝션을 통해 성능 개선.",
                highlight: "794ms → 211ms (73% 개선)",
              },
              {
                title: "예약 시스템 동시성 문제 해결",
                content:
                  "Redis Redission을 통해 분산락을 구현. TTL 설정을 통해 일정 시간내에 락을 처리하지 못하면 실패, 트랜잭션 커밋 이후 락 반납으로 데이터 일관성 보장.",
                highlight: "Redis 분산락",
              },
              {
                title: "EKS 환경 구축 (V3 마이크로서비스 전환)",
                content:
                  "고가용성 확보를 위해 마이크로서비스로 전환. K8s 리소스를 Helm Charts로 템플릿화하고 ArgoCD로 배포. Karpenter를 도입하여 Node 가용성 문제 해결.",
                highlight: "Karpenter JIT 배포",
              },
              {
                title: "Redis 메모리 관리 최적화",
                content:
                  "max-memory 설정으로 swap 영역 사용 방지, LFU 알고리즘 적용으로 캐시 메모리 성능 개선.",
                highlight: "LFU 캐시 정책",
              },
            ]}
          />

          {/* Project 2 - 취업 동아리 활동관리 서비스 */}
          <ProjectCard
            title="취업 동아리 활동관리 / 지원 서비스"
            period="2023.09 ~ 2024.03"
            description="G고등학교 학교기업 동아리와 교육청과 함께 진행한 취업 동아리 활동관리, 지원 서비스입니다. 특성화 고등학교, 대학, 기업체 강사들이 사용하는 서비스입니다."
            stats={[
              { label: "총 유저", value: "3,000+" },
              { label: "비용 절감", value: "38%" },
            ]}
            role={[
              "서버 엔지니어 - 애플리케이션 I/O 레이턴시 최적화, 쿼리 최적화, 배치 애플리케이션, RESTful API 개발, 멀티모듈 아키텍처 설계",
              "인프라 엔지니어 - AWS 아키텍처 설계, CI/CD 구축, Terraform 인프라 스펙 선언, ELK 모니터링, 인스턴스 매니저 개발",
            ]}
            skills={[
              "Kotlin",
              "Spring Boot",
              "Spring Batch",
              "Shell Script",
              "AWS",
              "Docker",
              "Terraform",
              "GitHub Actions",
              "Datadog",
              "MySQL",
              "Redis",
              "Tibero",
            ]}
            achievements={[
              {
                title: "Persistable, 쿼리 성능 최적화",
                content:
                  "Spring Data JPA에서 insert/update 시 추가 select 쿼리 발생 문제를 BasePkEntity + Persistable 인터페이스로 해결. Hibernate proxy 객체 동등성 검사를 위한 equals 오버라이드.",
                highlight: "추가 select 쿼리 제거",
              },
              {
                title: "Terraform 인프라 스펙 선언",
                content:
                  "IaC 기술을 사용한 유지보수 이점을 고려하여 Terraform으로 프로젝트의 AWS 인프라 스펙을 선언.",
                highlight: "IaC 도입",
              },
              {
                title: "AWS 인스턴스 매니저 개발",
                content:
                  "AWS CLI 기반 인스턴스 중지 매니저를 Shell Script로 개발. 새벽에 인스턴스를 중지하여 서버 비용 38% 절감.",
                highlight: "서버 비용 38% 절감",
              },
              {
                title: "멀티모듈 아키텍처 설계",
                content:
                  "batch-module, api-module, domain-module로 분리된 레이어드 아키텍처를 설계하여 모듈별 의존성을 낮춤.",
                highlight: "멀티모듈 분리",
              },
            ]}
          />

          {/* Project 3 - GAuth */}
          <ProjectCard
            title="GAuth - 교내 계정 통합 소셜 로그인"
            period="2022.07 ~ Present"
            description="G고등학교 교내 계정 통합 소셜 로그인 서비스. 교내 계정 관리, OAuth OpenAPI, SDK, OAuth Project API를 제공중인 서비스입니다."
            stats={[
              { label: "유저", value: "NNN+" },
              { label: "연간 증가", value: "70명/년" },
            ]}
            role={[
              "OAuth 인증/인가 플로우 설계, 개발",
              "애플리케이션 API, Open API 관련 API 설계/개발, 성능 개선",
              "JVM 환경에서 간단하게 GAuth를 사용할 수 있게 도와주는 SDK 개발",
            ]}
            skills={[
              "Kotlin",
              "Spring Boot",
              "AWS",
              "Docker",
              "Terraform",
              "GitHub Actions",
              "MySQL",
              "Redis",
            ]}
            achievements={[
              {
                title: "OAuth 플로우 설계/개발",
                content:
                  "다른 교내 프로젝트에서 GAuth 계정을 이용하기 위한 인증/인가 플로우를 구상하고 Open API, SDK를 개발.",
                highlight: "OAuth 2.0 구현",
              },
              {
                title: "GAuth SDK 개발",
                content:
                  "GAuth Open API를 사용한 인증/인가 작업을 JVM 환경에서 간단하게 개발할 수 있도록 Kotlin SDK 개발.",
                highlight: "Kotlin SDK",
              },
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

function ProjectCard({
  title,
  period,
  description,
  stats,
  role,
  skills,
  achievements,
}: {
  title: string;
  period: string;
  description: string;
  stats: { label: string; value: string }[];
  role: string[];
  skills: string[];
  achievements: { title: string; content: string; highlight: string }[];
}) {
  return (
    <div className="group">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
          <span className="text-sm text-gray-500 font-mono">{period}</span>
        </div>
        <div className="flex gap-3 mt-3 md:mt-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="px-4 py-2 bg-[#0a0a0a] rounded-lg border border-border"
            >
              <div className="text-primary font-bold text-sm">{stat.value}</div>
              <div className="text-[10px] text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-3xl">
        {description}
      </p>

      {/* Role */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Role
        </h4>
        <ul className="space-y-1">
          {role.map((r, i) => (
            <li key={i} className="text-sm text-gray-300 flex gap-2">
              <span className="text-primary mt-0.5">+</span>
              {r}
            </li>
          ))}
        </ul>
      </div>

      {/* Skills */}
      <div className="mb-8">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Tech Stack
        </h4>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 text-xs bg-[#0a0a0a] rounded border border-border text-gray-400"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Key Achievements
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {achievements.map((a) => (
            <div
              key={a.title}
              className="p-4 bg-[#0a0a0a] rounded-xl border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h5 className="text-sm font-semibold text-white">{a.title}</h5>
                <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full whitespace-nowrap ml-2">
                  {a.highlight}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                {a.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 border-b border-border" />
    </div>
  );
}
