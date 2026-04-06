export interface AIProject {
  id: string;
  title: string;
  status: "준비중" | "진행중" | "완료";
  summary: string;
  techStack?: string[];
  details?: string[];
  result?: string[];
}

export const aiProjects: AIProject[] = [
  {
    id: "agent-orchestration",
    title: "Agent 오케스트레이션",
    status: "완료",
    summary: "웹에서 다중 Claude agent를 orchestrate하여 24시간 자율 개발·할당·검증을 수행하는 서비스",
    result: [
      "1,400+ 커밋, 340+ 태스크 자동 처리",
      "야간 무인 운영으로 코드 스캔·수정·머지 자동화",
    ],
  },
  {
    id: "prompt-benchmark",
    title: "프롬프트 벤치마크",
    status: "완료",
    summary: "동일 PRD를 여러 프롬프트로 병렬 실행하고 토큰·비용·코드 품질을 정량 비교하는 로컬 벤치마크 도구",
    result: [
      "11종 프롬프트 × 2개 PRD, 17회 실행으로 정량 비교 데이터 확보",
      "\"복잡한 프롬프트 = 좋은 결과\" 가설을 데이터로 반증",
    ],
  },
  {
    id: "figma-plugin",
    title: "피그마 플러그인",
    status: "완료",
    summary: "Figma 디자인을 분석하여 코드로 변환하는 플러그인",
  },
];
