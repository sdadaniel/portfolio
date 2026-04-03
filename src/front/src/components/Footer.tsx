export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-2">Thank You</h2>
        <p className="text-sm text-gray-500 mb-6">
          Next.js · React · TypeScript 기반 프론트엔드 개발자 곽성실
        </p>
        <div className="flex justify-center gap-6 text-gray-400">
          <a
            href="mailto:sdadaniel0206@gmail.com"
            className="hover:text-primary transition-colors text-sm"
          >
            Email
          </a>
          <a
            href="tel:010-6495-8263"
            className="hover:text-primary transition-colors text-sm"
          >
            Phone
          </a>
        </div>
        <div className="mt-8 text-xs text-gray-600">
          Frontend Developer Portfolio
        </div>
      </div>
    </footer>
  );
}
