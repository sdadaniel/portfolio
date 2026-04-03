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
    id: "figma-plugin",
    title: "피그마 플러그인",
    status: "준비중",
    summary: "상세 내용이 곧 업데이트됩니다.",
  },
  {
    id: "war-simulation",
    title: "전쟁 시뮬레이션",
    status: "준비중",
    summary: "상세 내용이 곧 업데이트됩니다.",
  },
  {
    id: "claude-orchestration",
    title: "클로드 오케스트레이션",
    status: "준비중",
    summary: "상세 내용이 곧 업데이트됩니다.",
  },
  {
    id: "zzoin",
    title: "쪼인",
    status: "준비중",
    summary: "상세 내용이 곧 업데이트됩니다.",
  },
  {
    id: "continum",
    title: "Continum",
    status: "준비중",
    summary: "상세 내용이 곧 업데이트됩니다.",
  },
  {
    id: "funble-homepage",
    title: "펀블 회사홈페이지 개선",
    status: "준비중",
    summary: "상세 내용이 곧 업데이트됩니다.",
  },
];
