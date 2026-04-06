"use client";

import mermaid from "mermaid";
import { useEffect, useState } from "react";

const mermaidConfig = {
  startOnLoad: false,
  theme: "base" as const,
  themeVariables: {
    background: "transparent",
    primaryColor: "#334155",
    primaryTextColor: "#f8fafc",
    primaryBorderColor: "#64748b",
    lineColor: "#94a3b8",
    secondaryColor: "#475569",
    secondaryTextColor: "#f8fafc",
    tertiaryColor: "#334155",
    tertiaryTextColor: "#f8fafc",
    edgeLabelBackground: "transparent",
    nodeBorder: "#64748b",
    clusterBkg: "transparent",
    titleColor: "#f8fafc",
  },
  securityLevel: "loose" as const,
  fontFamily: "inherit",
};

export default function MermaidDiagram({ chart }: { chart: string }) {
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mermaid.initialize(mermaidConfig);
    const id = `mmd-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    let cancelled = false;
    mermaid
      .render(id, chart.trim())
      .then(({ svg: out }) => {
        if (!cancelled) {
          setSvg(out);
          setError(null);
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e));
          setSvg(null);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return (
      <pre className="not-prose my-4 overflow-x-auto rounded-lg bg-red-50 p-3 text-xs text-red-700">
        {error}
      </pre>
    );
  }
  if (!svg) {
    return (
      <div
        className="not-prose my-4 h-36 animate-pulse rounded-lg bg-slate-100"
        aria-hidden
      />
    );
  }

  return (
    <div
      className="not-prose my-4 flex justify-center overflow-x-auto rounded-lg p-4 [&_svg]:max-h-none [&_svg]:max-w-full [&_svg]:h-auto [&_.nodeLabel]:!text-slate-100 [&_.edgeLabel]:!text-slate-300 [&_.label]:!text-slate-100 [&_text]:!fill-slate-100"
      // eslint-disable-next-line react/no-danger -- Mermaid SVG output (author-controlled MD)
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
