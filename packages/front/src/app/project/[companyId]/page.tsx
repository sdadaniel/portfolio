import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import path from "path";
import { companies } from "@/data/companies";
import CompanyMarkdown from "@/components/CompanyMarkdown";

const mdFileMap: Record<string, string> = {
  funble: "05.funble.md",
  santa: "04.santa.md",
  flyingcat: "03.flyingcat.md",
  aboutgoods: "02.aboutgoods.md",
  idermabio: "01.idermabio.md",
};

export function generateStaticParams() {
  return companies.map((c) => ({ companyId: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ companyId: string }>;
}): Promise<Metadata> {
  const { companyId } = await params;
  const company = companies.find((c) => c.id === companyId);
  if (!company) return {};
  return {
    title: `${company.name} | 경력 프로젝트`,
    description: company.summary,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const company = companies.find((c) => c.id === companyId);
  if (!company) notFound();

  const mdFile = mdFileMap[companyId];
  if (!mdFile) notFound();

  const mdPath = path.join(process.cwd(), "src", "content", "corp", mdFile);
  let markdown: string;
  try {
    markdown = await readFile(mdPath, "utf-8");
  } catch {
    notFound();
  }

  return <CompanyMarkdown markdown={markdown} company={company} />;
}
