import Navigation from "@/components/Navigation";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function FAQPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
