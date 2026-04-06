export default function Skills() {
  return (
    <section className="py-12 md:py-24 px-4 md:px-6 border-b border-border">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Skills" subtitle="Tech Stack" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
          <SkillCategory
            title="Frontend"
            skills={[
              "React",
              "Next.js",
              "TypeScript",
              "Vue 3",
              "React Native",
              "React Query",
              "Zustand",
              "Recoil",
            ]}
          />
          <SkillCategory
            title="Quality & Tools"
            skills={[
              "Jest",
              "React Testing Library",
              "Storybook",
              "MSW",
              "ESLint",
              "Husky",
            ]}
          />
          <SkillCategory
            title="Backend (supplementary)"
            skills={["Node.js", "Express", "MySQL"]}
          />
          <SkillCategory
            title="Deploy & Infra"
            skills={[
              "GitHub Actions",
              "Jenkins",
              "AWS ECR",
              "Docker",
              "Circle CI",
            ]}
          />
          <SkillCategory
            title="Analytics & Collaboration"
            skills={["GA / GTM", "Data Studio", "Figma", "Design System"]}
          />
          <SkillCategory
            title="Build & Monorepo"
            skills={["Lerna", "Rollup", "Webpack", "CJS/ESM", "Tree Shaking"]}
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
      <h2 className="text-3xl md:text-4xl font-bold mt-1 text-gray-900">
        {title}
      </h2>
      <div className="w-12 h-1 bg-primary rounded mt-3" />
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
    <div className="p-4 md:p-6 bg-surface rounded-xl border border-border">
      <h3 className="text-sm font-semibold text-primary mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 text-xs bg-white rounded-md border border-border text-gray-600 hover:border-primary/50 hover:text-primary transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
