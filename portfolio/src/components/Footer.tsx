export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-2">Thank You</h2>
        <p className="text-sm text-gray-500 mb-6">
          높은 퍼포먼스의 유연한 소프트웨어를 개발하는 엔지니어
        </p>
        <div className="flex justify-center gap-6 text-gray-400">
          <a
            href="mailto:email@gmail.com"
            className="hover:text-primary transition-colors text-sm"
          >
            Email
          </a>
          <a
            href="#"
            className="hover:text-primary transition-colors text-sm"
          >
            GitHub
          </a>
          <a
            href="#"
            className="hover:text-primary transition-colors text-sm"
          >
            Twitter
          </a>
        </div>
        <div className="mt-8 text-xs text-gray-600">
          Server Platform Engineer Portfolio
        </div>
      </div>
    </footer>
  );
}
