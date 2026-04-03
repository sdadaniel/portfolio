import { notFound } from "next/navigation";
import { aiProjects } from "@/data/ai-projects";
import AIProjectPage from "@/components/AIProjectPage";

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

  return <AIProjectPage project={project} />;
}
