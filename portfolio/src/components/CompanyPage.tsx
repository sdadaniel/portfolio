import { Company, ProjectItem } from "@/data/companies";

export default function CompanyPage({ company }: { company: Company }) {
  return (
    <div className="p-4 sm:p-8 md:p-12">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          {company.name}
        </h1>
        <span className="px-2.5 py-0.5 text-[10px] bg-primary/10 text-primary rounded-full font-medium">
          정규직
        </span>
      </div>
      <p className="text-sm text-gray-400 font-mono mb-6">
        {company.period} · {company.duration}
      </p>

      <div className="w-16 h-1 bg-primary rounded mb-6" />

      <p className="text-sm font-medium text-primary mb-3">{company.role}</p>
      <p className="text-sm text-gray-500 leading-relaxed mb-8">
        {company.summary}
      </p>

      <div className="mb-10">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {company.techStack.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-xs rounded-full bg-primary/5 text-primary/80"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">
          Projects ({company.projects.length})
        </h3>
        <div className="space-y-14">
          {company.projects.map((project) => (
            <ProjectSection key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectSection({ project }: { project: ProjectItem }) {
  return (
    <div id={project.id} className="scroll-mt-20">
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <h4 className="text-lg font-bold text-gray-900">{project.title}</h4>
      </div>
      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 bg-primary/8 text-primary rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {project.type === "par" ? (
        <div className="space-y-6">
          <SectionBlock label="Problem" color="text-red-500">
            <p className="text-sm text-gray-600 leading-relaxed">
              {project.problem}
            </p>
          </SectionBlock>

          <SectionBlock label="Approach" color="text-primary">
            <ul className="space-y-1.5">
              {project.approach!.map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-gray-600 leading-relaxed flex gap-2 items-start"
                >
                  <span className="text-primary mt-0.5 shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </SectionBlock>

          <SectionBlock label="Result" color="text-emerald-600">
            <ul className="space-y-1.5">
              {project.result!.map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-gray-600 leading-relaxed flex gap-2 items-start"
                >
                  <span className="text-emerald-600 mt-0.5 shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </SectionBlock>

          {project.reflection && (
            <SectionBlock label="Reflection" color="text-amber-600">
              <p className="text-sm text-gray-500 leading-relaxed italic">
                {project.reflection}
              </p>
            </SectionBlock>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-sm text-gray-600 leading-relaxed">
            {project.overview}
          </p>
          {project.result && project.result.length > 0 && (
            <SectionBlock label="Result" color="text-emerald-600">
              <ul className="space-y-1.5">
                {project.result.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-600 leading-relaxed flex gap-2 items-start"
                  >
                    <span className="text-emerald-600 mt-0.5 shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </SectionBlock>
          )}
          {project.resultText && (
            <SectionBlock label="Result" color="text-emerald-600">
              <p className="text-sm text-gray-600 leading-relaxed">
                {project.resultText}
              </p>
            </SectionBlock>
          )}
          {project.reflection && (
            <SectionBlock label="Reflection" color="text-amber-600">
              <p className="text-sm text-gray-500 leading-relaxed italic">
                {project.reflection}
              </p>
            </SectionBlock>
          )}
        </div>
      )}

      <div className="mt-8 h-px bg-gray-100" />
    </div>
  );
}

function SectionBlock({
  label,
  color,
  children,
}: {
  label: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pl-4">
      <h5
        className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${color}`}
      >
        {label}
      </h5>
      {children}
    </div>
  );
}
