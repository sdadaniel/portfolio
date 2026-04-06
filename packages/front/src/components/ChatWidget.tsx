"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatPanelRef = useRef<HTMLDivElement>(null);

  // 열릴 때만 애니메이션 트리거
  useEffect(() => {
    if (isChatOpen) {
      setShouldAnimate(true);
      const timer = setTimeout(() => setShouldAnimate(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isChatOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 채팅창 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        chatPanelRef.current &&
        !chatPanelRef.current.contains(e.target as Node)
      ) {
        setIsChatOpen(false);
      }
    };
    if (isChatOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isChatOpen]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // 임시 응답 (추후 백엔드 연결)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "아직 백엔드가 연결되지 않았습니다. 곧 연결할게요!",
        },
      ]);
    }, 600);
  };

  const sampleQuestions = [
    "어떤 기술 스택을 사용하나요?",
    "경력이 어떻게 되나요?",
    "프로젝트 경험이 궁금해요",
    "연락처를 알 수 있을까요?",
  ];

  const handleSampleClick = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div ref={chatPanelRef} className="max-w-3xl mx-auto px-4 pb-6 pointer-events-auto">
        <div
          className={`bg-white border border-border rounded-2xl shadow-lg overflow-hidden ${
            shouldAnimate ? "chat-slide-up" : ""
          }`}
        >
          {/* 채팅 영역 - input 포커스 시 표시 */}
          {isChatOpen && (
            <>
              {messages.length === 0 ? (
                /* 샘플 질문 영역 */
                <div className="px-5 pt-5 pb-3">
                  <p className="text-sm text-gray-500 mb-3">
                    이런 것들을 물어볼 수 있어요
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sampleQuestions.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => handleSampleClick(q)}
                        className="px-3.5 py-2 text-xs rounded-full border border-border text-gray-600 hover:bg-surface hover:border-primary hover:text-primary transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* 메시지 영역 */
                <div className="max-h-[350px] overflow-y-auto px-5 pt-5 pb-3 space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-primary text-white rounded-br-md"
                            : "bg-surface text-gray-800 border border-border rounded-bl-md"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </>
          )}

          {/* 입력 바 */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className={`flex items-end gap-3 px-4 py-3 ${isChatOpen ? "border-t border-border" : ""}`}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsChatOpen(true)}
              placeholder="곽성실님에 대해 궁금한 점을 물어봐주세요!"
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-gray-400 max-h-[120px] leading-relaxed py-1"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="shrink-0 w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
