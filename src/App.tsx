import { useMemo, useState } from "react";
import { TypingTest } from "./components/TypingTest/TypingTest";
import { mockSnippets } from "./data/mockSnippets";
import { generateWordsText } from "./data/mockWords";
import type { TestDuration } from "./types/typing.types";
import { FaGithub } from "react-icons/fa";

type ViewMode = "text" | "code";

const MODES: { id: ViewMode; label: string }[] = [
  { id: "text", label: "Text" },
  { id: "code", label: "Code" },
];

const DURATIONS: TestDuration[] = [15, 30, 60];

// TODO: เปลี่ยนเป็น URL repo ตัวจริงหลังอัปโหลด
const REPO_URL = "https://github.com/your-username/texttyping";

function App() {
  const [view, setView] = useState<ViewMode>("text");
  const [selectedId, setSelectedId] = useState(mockSnippets[0].id);
  const [duration, setDuration] = useState<TestDuration>(30);

  const selectedSnippet = mockSnippets.find((s) => s.id === selectedId)!;

  // สร้าง target text ใหม่ทุกครั้งที่เปลี่ยน view/duration (ไม่ regenerate ทุก render)
  const plainTargetText = useMemo(
    () => generateWordsText(40),
    [view, duration],
  );
  const codeTargetText = useMemo(
    () => selectedSnippet.lines.map((l) => l.text).join("\n"),
    [selectedSnippet],
  );

  return (
    <div className="min-h-screen bg-(--app-bg) flex flex-col items-center justify-center gap-8 p-6 font-sans">
      <header className="text-center px-4">
        <h1 className="text-4xl font-semibold tracking-tight text-(--app-text) my-2">
          Typing Practice By
          <a
            href="https://github.com/Byffify"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 hover:text-cyan-200 ml-2"
          >
            Borworn
          </a>
        </h1>

        <a
          href="https://github.com/Byffify/typing-practice"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-slate-400 hover:text-cyan-300 inline-flex items-center gap-2"
        >
          <FaGithub />
          Repository
        </a>
      </header>

      {/* ตัวกรองแบบแยกกลุ่มมีกรอบ เรียงในบรรทัดเดียวกัน */}
      <div className="w-full max-w-3xl flex flex-wrap items-center justify-center gap-3">
        {/* สลับโหมดหลัก */}
        <div className="flex items-center gap-1 rounded-full bg-(--app-field) p-1">
          {MODES.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setView(id)}
              className={`rounded-full px-6 py-1.5 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-(--app-accent) ${
                view === id
                  ? "bg-(--app-seg) text-(--app-seg-text) shadow-sm"
                  : "text-(--app-text-secondary) hover:text-(--app-text)"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* เลือกเวลาถอยหลัง */}
        <div className="flex items-center gap-1 rounded-full bg-(--app-field) p-1">
          {DURATIONS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDuration(d)}
              className={`rounded-full px-4 py-1.5 text-sm tabular-nums font-medium transition-all focus-visible:outline-2 focus-visible:outline-(--app-accent) ${
                duration === d
                  ? "bg-(--app-seg) text-(--app-seg-text) shadow-sm"
                  : "text-(--app-text-secondary) hover:text-(--app-text)"
              }`}
            >
              {d}s
            </button>
          ))}
        </div>

        {/* เลือกภาษา - แสดงเฉพาะโหมด code */}
        {view === "code" && (
          <div className="flex items-center gap-1 rounded-full bg-(--app-field) p-1">
            {mockSnippets.map((snippet) => (
              <button
                key={snippet.id}
                type="button"
                onClick={() => setSelectedId(snippet.id)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-(--app-accent) ${
                  selectedId === snippet.id
                    ? "bg-(--app-seg) text-(--app-seg-text) shadow-sm"
                    : "text-(--app-text-secondary) hover:text-(--app-text)"
                }`}
              >
                {snippet.language.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* เนื้อหาหลักตามโหมดที่เลือก */}
      {view === "text" && (
        <TypingTest
          key={`plain-${duration}-${plainTargetText}`}
          mode="plain"
          targetText={plainTargetText}
          duration={duration}
        />
      )}

      {view === "code" && (
        <TypingTest
          key={`code-${selectedId}-${duration}`}
          mode="code"
          targetText={codeTargetText}
          duration={duration}
        />
      )}
    </div>
  );
}

export default App;
