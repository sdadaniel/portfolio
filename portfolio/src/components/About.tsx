export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="About" subtitle="Skills & Info" />

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          {/* Left - Info */}
          <div className="space-y-6">
            <div className="p-6 bg-surface rounded-xl border border-border">
              <h3 className="text-lg font-semibold mb-4">Info</h3>
              <div className="space-y-3 text-sm text-gray-400">
                <InfoRow icon="mail" text="email@gmail.com" />
                <InfoRow icon="github" text="github.com/hellowanted" />
                <InfoRow icon="twitter" text="twitter.com/hellowanted" />
              </div>
            </div>

            <div className="p-6 bg-surface rounded-xl border border-border">
              <h3 className="text-lg font-semibold mb-4">
                배움과 성장은 함께, 조직의 성장을 적극 도모합니다
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                조직의 성장을 위해 항상 지식을 공유하는 시간을 가집니다. 높은
                퍼포먼스를 위한 조직내의 역량을 강화하기 위하여 극도의 투명함과
                신뢰의 문화를 추구하고 협업합니다.
              </p>
            </div>
          </div>

          {/* Right - Skills */}
          <div className="space-y-6">
            <SkillCategory
              title="Languages & Frameworks"
              skills={[
                "Java",
                "Kotlin",
                "Spring Boot",
                "Spring Batch",
                "Spring WebFlux",
                "Spring Cloud",
              ]}
            />
            <SkillCategory
              title="Database"
              skills={["MySQL", "Redis", "MongoDB"]}
            />
            <SkillCategory
              title="Infrastructure & DevOps"
              skills={[
                "AWS",
                "Kubernetes",
                "Kafka",
                "Terraform",
                "ArgoCD",
                "Docker",
                "GitHub Actions",
              ]}
            />
            <SkillCategory
              title="Monitoring"
              skills={[
                "Prometheus",
                "Grafana",
                "Loki",
                "Datadog",
                "ELK",
              ]}
            />
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

function InfoRow({ icon, text }: { icon: string; text: string }) {
  const icons: Record<string, React.ReactNode> = {
    mail: (
      <svg
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    github: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    twitter: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-primary">{icons[icon]}</span>
      <span>{text}</span>
    </div>
  );
}

function SkillCategory({
  title,
  skills,
}: {
  title: string;
  skills: string[];
}) {
  return (
    <div className="p-6 bg-surface rounded-xl border border-border">
      <h3 className="text-sm font-semibold text-primary mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 text-xs bg-surface-light rounded-md border border-border text-gray-300 hover:border-primary/50 hover:text-primary transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
