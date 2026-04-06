"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import React, { useState, useCallback, useEffect } from "react";
import type { AIProject } from "@/data/ai-projects";
import MermaidDiagram from "@/components/MermaidDiagram";
import ImageSwiper from "@/components/ImageSwiper";

function ImageModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl leading-none cursor-pointer"
        aria-label="닫기"
      >
        &times;
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

function slugify(text: string) {
  return text
    .replace(/[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
}

function HeadingWithId({
  level,
  children,
  ...props
}: React.ComponentProps<"h1"> & { level: number }) {
  const text = React.Children.toArray(children)
    .map((c) => (typeof c === "string" ? c : ""))
    .join("");
  const id = slugify(text);
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  return React.createElement(Tag, { id, ...props }, children);
}

const SWIPER_RE = /<!--\s*swiper\s*-->([\s\S]*?)<!--\s*\/swiper\s*-->/g;
const IMG_RE = /<img\s+[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*\/?>/g;

function parseSwiperBlocks(md: string) {
  const parts: ({ type: "md"; content: string } | { type: "swiper"; images: { src: string; alt: string }[] })[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = SWIPER_RE.exec(md)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "md", content: md.slice(lastIndex, match.index) });
    }
    const images: { src: string; alt: string }[] = [];
    let imgMatch: RegExpExecArray | null;
    while ((imgMatch = IMG_RE.exec(match[1])) !== null) {
      images.push({ src: imgMatch[1], alt: imgMatch[2] });
    }
    if (images.length > 0) {
      parts.push({ type: "swiper", images });
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < md.length) {
    parts.push({ type: "md", content: md.slice(lastIndex) });
  }
  return parts.length > 0 ? parts : [{ type: "md" as const, content: md }];
}

const sanitizeSchema = {
  ...defaultSchema,
  clobberPrefix: "",
  tagNames: [...(defaultSchema.tagNames ?? []), "img", "div", "video", "source"],
  attributes: {
    ...(defaultSchema.attributes ?? {}),
    a: [...(defaultSchema.attributes?.a ?? []), "target", "rel", "title"],
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
    div: [...(defaultSchema.attributes?.div ?? []), "class", "className", "id", "data-images"],
    video: ["src", "controls", "autoplay", "muted", "loop", "playsinline", "style", "class", "className", "width", "height"],
    source: ["src", "type"],
  },
};

export default function AIMarkdown({
  markdown,
  project,
}: {
  markdown: string;
  project: AIProject;
}) {
  const [modalImg, setModalImg] = useState<{ src: string; alt: string } | null>(null);
  const closeModal = useCallback(() => setModalImg(null), []);

  return (
    <>
      {modalImg && <ImageModal src={modalImg.src} alt={modalImg.alt} onClose={closeModal} />}
    <div className="p-4 sm:p-8 md:p-12">

      <article id="ai-markdown-content" className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-h1:text-2xl prose-h1:sm:text-3xl prose-h1:font-bold prose-h1:mb-2 prose-h2:text-lg prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-3 prose-h3:text-base prose-h3:font-semibold prose-h3:text-gray-900 prose-h3:mt-8 prose-h3:mb-2 prose-h4:text-sm prose-h4:font-semibold prose-h4:text-gray-700 prose-h4:mt-6 prose-h4:mb-1 prose-p:text-sm prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-sm prose-li:text-gray-600 prose-strong:text-gray-800 prose-img:rounded-lg prose-img:my-4 prose-a:no-underline prose-a:text-primary prose-a:font-medium prose-a:hover:text-primary-dark">
        {parseSwiperBlocks(markdown).map((part, i) =>
          part.type === "swiper" ? (
            <ImageSwiper key={`swiper-${i}`} images={part.images} />
          ) : (
          <ReactMarkdown
            key={`md-${i}`}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeRaw,
              [rehypeSanitize, sanitizeSchema],
            ]}
            components={{
              h2: (props) => <HeadingWithId level={2} {...props} />,
              h3: (props) => <HeadingWithId level={3} {...props} />,
              h4: (props) => <HeadingWithId level={4} {...props} />,
            a({ href, children, className, ...props }: React.ComponentProps<"a">) {
              return (
                <a
                  href={href}
                  className={[
                    "not-prose inline-flex items-center gap-1.5 rounded-sm py-0.5 pl-0.5 pr-1 text-sm text-gray-700 outline-none ring-primary/30 hover:bg-slate-100 hover:text-gray-900 focus-visible:ring-2",
                    className,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  {...props}
                >
                  {children}
                </a>
              );
            },
            code({ className, children, ...props }) {
              const text = String(children).replace(/\n$/, "");
              const isFenced =
                (typeof className === "string" &&
                  className.startsWith("language-")) ||
                text.includes("\n");
              if (!isFenced) {
                return (
                  <span className="not-prose inline align-baseline px-1.5 py-0.5 text-[11px] rounded-full bg-primary/8 text-primary font-medium">
                    {text}
                  </span>
                );
              }
              if (className?.includes("language-mermaid")) {
                return <MermaidDiagram chart={text} />;
              }
              return (
                <pre className="not-prose my-4 overflow-x-auto rounded-lg bg-slate-50 p-4 text-xs text-slate-800 leading-relaxed">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              );
            },
            table({ children }) {
              return (
                <div className="not-prose my-4 overflow-x-auto">
                  <table
                    className="ai-markdown-table"
                    style={{
                      tableLayout: "auto",
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
            th({ children, style, ...props }) {
              const p = props as React.ComponentProps<"th">;
              const merged = {
                ...((p.style as React.CSSProperties) ?? {}),
                ...(style as React.CSSProperties),
              };
              const { style: _s, ...rest } = p;
              return (
                <th
                  {...rest}
                  style={{
                    border: "none",
                    padding: 4,
                    verticalAlign: "top",
                    fontWeight: 600,
                    textAlign: "left",
                    ...merged,
                  }}
                >
                  {children}
                </th>
              );
            },
            td({ children, style, ...props }) {
              const p = props as React.ComponentProps<"td">;
              const merged = {
                ...((p.style as React.CSSProperties) ?? {}),
                ...(style as React.CSSProperties),
              };
              const { style: _s, className: tdClass, ...rest } = p;
              return (
                <td
                  {...rest}
                  className={
                    ["whitespace-normal", tdClass].filter(Boolean).join(" ") ||
                    undefined
                  }
                  style={{
                    border: "none",
                    padding: 4,
                    verticalAlign: "top",
                    ...merged,
                  }}
                >
                  {children}
                </td>
              );
            },
            img({
              className,
              style: styleProp,
              width: widthAttr,
              height: heightAttr,
              ...props
            }: React.ComponentProps<"img">) {
              const userStyle = (styleProp ?? {}) as React.CSSProperties;
              const hasExplicitSize =
                (userStyle.width != null && userStyle.width !== "") ||
                widthAttr != null ||
                heightAttr != null;

              const baseStyle: React.CSSProperties = {
                height: "auto",
                margin: 0,
                border: "none",
                outline: "none",
                boxShadow: "none",
                maxWidth: "100%",
                ...(hasExplicitSize ? {} : { width: "100%" }),
              };

              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  {...props}
                  width={widthAttr}
                  height={heightAttr}
                  style={{ ...baseStyle, ...userStyle, cursor: "pointer" }}
                  className={[
                    hasExplicitSize ? "inline-block align-middle" : "block mx-auto",
                    "hover:opacity-80 transition-opacity",
                    className,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => {
                    const src = props.src;
                    if (src && typeof src === "string") setModalImg({ src, alt: props.alt ?? "" });
                  }}
                />
              );
            },
            }}
          >
            {part.content}
          </ReactMarkdown>
          )
        )}
      </article>
    </div>
    </>
  );
}
