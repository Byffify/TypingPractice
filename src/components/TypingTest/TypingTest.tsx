import { useTypingTest } from '../../hooks/useTypingTest';
import type { TypingTestProps } from './TypingTest.types';

export function TypingTest({ mode, targetText, duration }: TypingTestProps) {
  const { input, timeLeft, isFinished, result, handleChange, reset } =
    useTypingTest({ targetText, duration });

  // ไฮไลต์ตัวอักษรทีละตัว: ถูก = เขียว, ผิด = แดง, ยังไม่พิมพ์ = เทา
  const renderTargetText = () => {
    return targetText.split('').map((char, idx) => {
      let colorClass = 'text-(--app-muted)';

      if (idx < input.length) {
        colorClass =
          char === input[idx]
            ? 'text-(--app-green)'
            : 'text-(--app-red)';
      } else if (idx === input.length) {
        colorClass = 'text-(--app-text)';
      }

      return (
        <span key={idx} className={colorClass}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="w-full">
      {/* header: mode + timer */}
      <div className="w-2/3 max-w-[90vw] mx-auto flex items-center justify-between mb-8">
        <span className="text-sm font-medium uppercase tracking-widest text-(--app-text-secondary)">
          {mode === 'code' ? 'Code' : 'Text'}
        </span>
        <span className="text-3xl font-semibold tabular-nums text-(--app-text)">
          {timeLeft}
          <span className="ml-0.5 text-base font-medium text-(--app-text-secondary)">
            s
          </span>
        </span>
      </div>

      {!isFinished ? (
        <>
        {/* target text + input ซ้อนทับเหมือน Monkeytype */}
        <div className="relative w-2/3 max-w-[90vw] mx-auto">
          <pre className="whitespace-pre-wrap break-words font-mono text-2xl leading-relaxed">
            {renderTargetText()}
          </pre>

          <textarea
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault();
            }}
            autoFocus
            rows={1}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            aria-label="พิมพ์ที่นี่"
            className="absolute inset-0 w-full h-full resize-none bg-transparent p-0 m-0 border-0 text-transparent caret-(--app-accent) font-mono text-2xl leading-relaxed overflow-hidden outline-none"
          />
        </div>

        {/* ข้อความเตือนด้านล่าง - หายไปเมื่อเริ่มพิมพ์ */}
        {input.length === 0 && (
          <p className="w-2/3 max-w-[90vw] mx-auto mt-5 text-center text-lg font-medium text-cyan-300 pointer-events-none">
            Press any key to start
          </p>
        )}
        </>
      ) : (
        // แสดงผลลัพธ์เมื่อจบเทส
        <div className="w-2/3 max-w-[90vw] mx-auto text-center py-6">
          <p className="text-sm font-medium uppercase tracking-widest text-(--app-text-secondary) mb-10">
            ผลลัพธ์
          </p>
          <div className="flex justify-center gap-16 mb-12">
            <div className="text-center">
              <p className="text-6xl font-semibold tabular-nums font-mono text-(--app-text)">
                {result?.wpm}
              </p>
              <p className="mt-2 text-sm text-(--app-text-secondary)">WPM</p>
            </div>
            <div className="text-center">
              <p className="text-6xl font-semibold tabular-nums font-mono text-(--app-text)">
                {result?.accuracy}%
              </p>
              <p className="mt-2 text-sm text-(--app-text-secondary)">
                ความแม่นยำ
              </p>
            </div>
          </div>
          <button
            onClick={reset}
            className="rounded-xl bg-cyan-300 px-7 py-2.5 text-sm font-medium text-black transition hover:opacity-85 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-(--app-accent)"
          >
            ลองใหม่
          </button>
        </div>
      )}
    </div>
  );
}