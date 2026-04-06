"use client";

import { useState } from "react";

const categories = [
  "강점과 약점에 대해 설명해주세요",
  "가지고 있는 경험을 알려주세요",
  "어떤 회사를 선호하시나요",
  "향후 어떤 개발자가 되고 싶은가요",
  "지금까지 다닌 회사의 퇴사 사유가 무엇인가요",
];

function slugify(text: string) {
  return text
    .replace(/[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
}

function scrollToAnchor(id: string) {
  const run = () =>
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  run();
  requestAnimationFrame(run);
  window.setTimeout(run, 80);
  window.setTimeout(run, 200);
}

export default function FAQSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-6 left-6 z-40 w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {mobileOpen ? (
            <path d="M6 6l8 8M6 14l8-8" />
          ) : (
            <path d="M3 6h14M3 10h14M3 14h14" />
          )}
        </svg>
      </button>

      <aside
        className={`fixed lg:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)] w-64 bg-white border-r border-border overflow-y-auto transition-transform lg:translate-x-0 shrink-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            FAQ
          </h2>
          <nav className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setMobileOpen(false);
                  scrollToAnchor(slugify(cat));
                }}
                className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors text-gray-700 hover:bg-surface"
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
