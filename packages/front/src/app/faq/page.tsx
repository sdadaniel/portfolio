import Navigation from "@/components/Navigation";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FAQSidebar from "@/components/FAQSidebar";

export default function FAQPage() {
  return (
    <>
      <Navigation />
      <div className="pt-16 max-w-5xl mx-auto flex min-h-[calc(100vh-4rem)]">
        <FAQSidebar />
        <main className="flex-1 min-w-0">
          <FAQ />
        </main>
      </div>
      <Footer />
    </>
  );
}
