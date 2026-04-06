import { readFile } from "fs/promises";
import path from "path";
import Navigation from "@/components/Navigation";
import AIMarkdown from "@/components/AIMarkdown";
import Footer from "@/components/Footer";
import FAQSidebar from "@/components/FAQSidebar";

export default async function FAQPage() {
  const mdPath = path.join(process.cwd(), "src", "content", "faq", "main.md");
  const markdown = await readFile(mdPath, "utf-8");

  return (
    <>
      <Navigation />
      <div className="pt-16 max-w-5xl mx-auto flex min-h-[calc(100vh-4rem)]">
        <FAQSidebar />
        <main className="flex-1 min-w-0">
          <AIMarkdown
            markdown={markdown}
            project={{ id: "faq", title: "FAQ", status: "완료", summary: "" }}
          />
        </main>
      </div>
      <Footer />
    </>
  );
}
