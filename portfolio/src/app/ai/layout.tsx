import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AISidebar from "@/components/AISidebar";

export default function AILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <div className="pt-16 max-w-5xl mx-auto flex min-h-[calc(100vh-4rem)]">
        <AISidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
      <Footer />
    </>
  );
}
