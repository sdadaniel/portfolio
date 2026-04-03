import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectSidebar from "@/components/ProjectSidebar";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <div className="pt-16 max-w-5xl mx-auto flex min-h-[calc(100vh-4rem)]">
        <ProjectSidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
      <Footer />
    </>
  );
}
