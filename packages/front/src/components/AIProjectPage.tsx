import { AIProject } from "@/data/ai-projects";

export default function AIProjectPage({ project }: { project: AIProject }) {
  return (
    <div className="p-4 sm:p-8 md:p-12">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          {project.title}
        </h1>
        <span
          className={`px-2.5 py-0.5 text-[10px] rounded-full font-medium ${
            project.status === "완료"
              ? "bg-emerald-50 text-emerald-600"
              : project.status === "진행중"
                ? "bg-blue-50 text-blue-600"
                : "bg-gray-100 text-gray-400"
          }`}
        >
          {project.status}
        </span>
      </div>

      <div className="w-16 h-1 bg-primary rounded mb-6 mt-4" />

      {project.techStack && project.techStack.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs rounded-full bg-primary/5 text-primary/80"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="text-sm text-gray-500 leading-relaxed mb-8">
        {project.summary}
      </p>

      {project.details && project.details.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Details
          </h3>
          <ul className="space-y-2">
            {project.details.map((detail, i) => (
              <li
                key={i}
                className="text-sm text-gray-600 leading-relaxed flex gap-2 items-start"
              >
                <span className="text-primary mt-0.5 shrink-0">—</span>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
