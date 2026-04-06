"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
import ReactMarkdown, { type ExtraProps } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import type { Company } from "@/data/companies";

function scrollToHashId(hashId: string) {
  if (!hashId) return false;
  const el = document.getElementById(hashId);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

const sanitizeSchema = {
  ...defaultSchema,
  clobberPrefix: "",
  tagNames: [...(defaultSchema.tagNames ?? []), "img", "div"],
  attributes: {
    ...(defaultSchema.attributes ?? {}),
    img: [
      ...(defaultSchema.attributes?.img ?? []),
      "src",
      "alt",
      "title",
      "class",
      "className",
      "style",
      "width",
      "height",
      "loading",
      "decoding",
    ],
    div: [...(defaultSchema.attributes?.div ?? []), "class", "className", "id"],
  },
};

export default function CompanyMarkdown({
  markdown,
}: {
  markdown: string;
  company: Company;
}) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (!pathname?.startsWith("/project/")) return;
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const tryScroll = () => scrollToHashId(hash);
    tryScroll();
    const t0 = window.setTimeout(tryScroll, 0);
    const t1 = window.setTimeout(tryScroll, 50);
    const t2 = window.setTimeout(tryScroll, 200);
    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname, markdown]);

  useEffect(() => {
    if (!pathname?.startsWith("/project/")) return;
    const onHashChange = () => {
      const hash = window.location.hash.replace(/^#/, "");
      scrollToHashId(hash);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  return (
    <div className="p-4 sm:p-8 md:p-12">
      {/* Markdown content */}
      <article className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-h1:text-2xl prose-h1:sm:text-3xl prose-h1:font-bold prose-h1:mb-2 prose-h2:text-lg prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-3 prose-h3:text-sm prose-h3:font-semibold prose-h3:text-primary prose-h3:uppercase prose-h3:tracking-wider prose-p:text-sm prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-sm prose-li:text-gray-600 prose-strong:text-gray-800 prose-img:rounded-lg prose-img:my-4 prose-a:no-underline prose-a:text-primary prose-a:font-medium prose-a:hover:text-primary-dark">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeRaw,
            [rehypeSanitize, sanitizeSchema],
          ]}
          components={{
            div({
              id,
              className,
              node: _node,
              ...props
            }: React.ComponentProps<"div"> & ExtraProps) {
              return (
                <div
                  {...props}
                  id={id}
                  className={
                    [id ? "scroll-mt-24" : undefined, className]
                      .filter(Boolean)
                      .join(" ") || undefined
                  }
                />
              );
            },
            code({ children }) {
              const text = String(children).replace(/\n$/, "");
              return (
                <span className="not-prose inline align-baseline px-1.5 py-0.5 text-[11px] rounded-full bg-primary/8 text-primary font-medium">
                  {text}
                </span>
              );
            },
            table({ children }) {
              return (
                <div className="not-prose my-4 overflow-x-auto">
                  <table
                    style={{
                      tableLayout: "fixed",
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "none",
                    }}
                  >
                    {children}
                  </table>
                </div>
              );
            },
            th({ children }) {
              return (
                <th
                  style={{
                    border: "none",
                    padding: 4,
                    verticalAlign: "top",
                    fontWeight: 600,
                    textAlign: "left",
                  }}
                >
                  {children}
                </th>
              );
            },
            td({ children }) {
              return (
                <td
                  style={{
                    border: "none",
                    padding: 4,
                    verticalAlign: "top",
                  }}
                >
                  {children}
                </td>
              );
            },
            img({
              node: _imgNode,
              className,
              style: styleProp,
              width: widthAttr,
              ...props
            }: React.ComponentProps<"img"> & ExtraProps) {
              const userStyle = (styleProp ?? {}) as React.CSSProperties;
              const hasExplicitWidth =
                (userStyle.width != null && userStyle.width !== "") ||
                widthAttr != null;

              /*
               * React 인라인 스타일은 !important를 못 씀 → MD의 width:200px !important가 먹지 않으면
               * 아래 기본 width:100%만 남아 첫 페인트에 이미지가 컬럼 전체로 커짐(클라이언트 이동 시 특히).
               * 기본은 intrinsic + maxWidth로 큰 이미지만 줄이고, 작은 이미지는 의도 크기 유지.
               */
              const baseStyle: React.CSSProperties = {
                height: "auto",
                margin: 0,
                border: "none",
                outline: "none",
                boxShadow: "none",
                maxWidth: "100%",
                ...(hasExplicitWidth ? {} : { width: "auto" }),
              };

              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  {...props}
                  width={widthAttr}
                  style={{ ...baseStyle, ...userStyle }}
                  className={[
                    "block mx-auto",
                    className,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />
              );
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      </article>
    </div>
  );
}
