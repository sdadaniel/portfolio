"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { companies } from "@/data/companies";

export default function ProjectSidebar() {
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
            회사 / 프로젝트
          </h2>
          <nav className="space-y-1">
            {companies.map((company) => {
              const isActive = pathname === `/project/${company.id}`;
              return (
                <div key={company.id}>
                  <Link
                    href={`/project/${company.id}`}
                    onClick={() => setMobileOpen(false)}
                    className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 hover:bg-surface"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {company.name}
                      <span className="text-[10px] text-gray-400 font-normal">
                        {company.duration}
                      </span>
                    </div>
                  </Link>

                  {isActive && (
                    <div className="ml-3 mt-1 mb-2 border-l-2 border-primary/20 pl-3 space-y-0.5">
                      {company.projects.map((project) => (
                        <Link
                          key={project.id}
                          href={`/project/${company.id}#${project.id}`}
                          onClick={() => setMobileOpen(false)}
                          className="block w-full text-left px-2 py-1.5 rounded text-xs transition-colors leading-snug text-gray-500 hover:text-gray-700 hover:bg-surface"
                        >
                          {project.title}
                        </Link>
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
