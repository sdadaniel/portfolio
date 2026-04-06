export interface AIProject {
  id: string;
  title: string;
  status: "준비중" | "진행중" | "완료";
  summary: string;
  techStack?: string[];
  details?: string[];
}

export const aiProjects: AIProject[] = [
  {
    id: "agent-orchestration",
    title: "Agent 오케스트레이션",
    status: "완료",
    summary: "상세 내용이 곧 업데이트됩니다.",
  },
  {
    id: "prompt-benchmark",
    title: "프롬프트 벤치마크",
    status: "완료",
    summary: "상세 내용이 곧 업데이트됩니다.",
  },
  {
    id: "figma-plugin",
    title: "피그마 플러그인",
    status: "완료",
    summary: "상세 내용이 곧 업데이트됩니다.",
  },
];
