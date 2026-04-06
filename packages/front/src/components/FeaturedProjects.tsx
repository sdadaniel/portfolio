import Link from "next/link";
import { companies } from "@/data/companies";

const featured = [
  { companyId: "funble", projectId: "funble-auth" },
  { companyId: "santa", projectId: "santa-monorepo" },
  { companyId: "flyingcat", projectId: "fc-app" },
  { companyId: "aboutgoods", projectId: "ag-seo" },
];

export default function FeaturedProjects() {
  const items = featured.map(({ companyId, projectId }) => {
    const company = companies.find((c) => c.id === companyId)!;
    const project = company.projects.find((p) => p.id === projectId)!;
    return { company, project };
  });

  return (
    <section className="py-12 md:py-24 px-4 md:px-6 border-b border-border">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8 md:mb-12">
          <div>
            <span className="text-primary text-sm font-mono">
              Featured Work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-1 text-gray-900">
              Projects
            </h2>
            <div className="w-12 h-1 bg-primary rounded mt-3" />
          </div>
          <Link
            href="/project"
            className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
          >
            전체 보기 →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {items.map(({ company, project }) => (
            <Link
              key={project.id}
              href={`/project/${company.id}#${project.id}`}
              className="group p-5 md:p-6 bg-surface rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">
                  {company.name}
                </span>
                <span className="text-[10px] text-gray-400">
                  {company.period}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors mb-3 leading-snug">
                {project.title}
              </h3>

              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">
                {project.type === "par" ? project.problem : project.overview}
              </p>

              {project.result && project.result.length > 0 && (
                <ul className="space-y-1">
                  {project.result.slice(0, 2).map((r, i) => (
                    <li
                      key={i}
                      className="text-xs text-emerald-600 flex gap-1.5 items-start"
                    >
                      <span className="mt-0.5 shrink-0">→</span>
                      {r}
                    </li>
                  ))}
                </ul>
              )}
              {project.resultText && (
                <p className="text-xs text-emerald-600 flex gap-1.5 items-start">
                  <span className="mt-0.5 shrink-0">→</span>
                  {project.resultText}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
