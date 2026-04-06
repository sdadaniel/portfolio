"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { aiProjects } from "@/data/ai-projects";

interface Heading {
  id: string;
  text: string;
  level: number;
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

function useArticleHeadings(pathname: string) {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const extract = () => {
      const article = document.getElementById("ai-markdown-content");
      if (!article) return;
      /* ###(h3)까지만 목차에 표시 — ####(h4) 이하는 본문 앵커만 유지 */
      const els = article.querySelectorAll("h2[id], h3[id]");
      const list: Heading[] = [];
      els.forEach((el) => {
        const id = el.getAttribute("id");
        const text = el.textContent?.trim();
        if (id && text) {
          const level = parseInt(el.tagName[1], 10);
          list.push({ id, text, level });
        }
      });
      setHeadings(list);
    };

    // Wait for markdown to render
    const timer = setTimeout(extract, 300);
    const observer = new MutationObserver(extract);
    const article = document.getElementById("ai-markdown-content");
    if (article) {
      observer.observe(article, { childList: true, subtree: true });
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return headings;
}

export default function AISidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const headings = useArticleHeadings(pathname);

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
            AI / Side Projects
          </h2>
          <nav className="space-y-1">
            {aiProjects.map((project) => {
              const isActive = pathname === `/ai/${project.id}`;
              return (
                <div key={project.id}>
                  <Link
                    href={`/ai/${project.id}`}
                    onClick={() => setMobileOpen(false)}
                    className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 hover:bg-surface"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {project.title}
                      <span
                        className={`text-[10px] font-normal px-1.5 py-0.5 rounded-full ${
                          project.status === "완료"
                            ? "bg-emerald-50 text-emerald-500"
                            : project.status === "진행중"
                              ? "bg-blue-50 text-blue-500"
                              : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </Link>

                  {isActive && headings.length > 0 && (
                    <div className="ml-3 mt-1 mb-2 border-l-2 border-primary/20 pl-3 space-y-0.5">
                      {headings.map((h) => (
                        <button
                          key={h.id}
                          onClick={() => {
                            setMobileOpen(false);
                            scrollToAnchor(h.id);
                          }}
                          className={`block w-full text-left py-1.5 rounded text-xs transition-colors leading-snug text-gray-500 hover:text-gray-700 hover:bg-surface ${
                            h.level === 3 ? "pl-4" : "pl-2"
                          }`}
                        >
                          {h.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
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
