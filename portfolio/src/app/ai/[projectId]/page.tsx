import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import path from "path";
import { aiProjects } from "@/data/ai-projects";
import AIMarkdown from "@/components/AIMarkdown";

const mdFileMap: Record<string, string> = {
  "agent-orchestration": "01.agent-orchestration.md",
  "prompt-benchmark": "02.prompt-benchmark.md",
  "figma-plugin": "03.figma-plugin.md",
  zzoin: "04.join.md",
  "war-simulation": "05.war-simulation.md",
  continum: "06.continum.md",
  "funble-homepage": "07.funble-homepage.md",
};

export function generateStaticParams() {
  return aiProjects.map((p) => ({ projectId: p.id }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = aiProjects.find((p) => p.id === projectId);
  if (!project) notFound();

  const mdFile = mdFileMap[projectId];
  if (!mdFile) notFound();

  const mdPath = path.join(process.cwd(), "src", "content", "ai", mdFile);
  let markdown: string;
  try {
    markdown = await readFile(mdPath, "utf-8");
  } catch {
    notFound();
  }

  return <AIMarkdown markdown={markdown} project={project} />;
}
