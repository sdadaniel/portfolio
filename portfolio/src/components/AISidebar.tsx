"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { aiProjects } from "@/data/ai-projects";

export default function AISidebar() {
  const pathname = usePathname();
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
            AI / Side Projects
          </h2>
          <nav className="space-y-1">
            {aiProjects.map((project) => {
              const isActive = pathname === `/ai/${project.id}`;
              return (
                <Link
                  key={project.id}
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
