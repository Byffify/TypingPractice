import { useCallback, useEffect, useRef, useState } from "react";
import type { TestDuration, TypingResult } from "../types/typing.types";

interface UseTypingTestProps {
  targetText: string;
  duration: TestDuration;
}

interface UseTypingTestResult {
  input: string;
  timeLeft: number;
  isRunning: boolean;
  isFinished: boolean;
  result: TypingResult | null;
  handleChange: (value: string) => void;
  reset: () => void;
}

export function useTypingTest({
  targetText,
  duration,
}: UseTypingTestProps): UseTypingTestResult {
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState<TypingResult | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // คำนวณผลลัพธ์จาก input ปัจจุบัน เทียบกับ targetText
  const calculateResult = useCallback(
    (finalInput: string, elapsedSeconds: number): TypingResult => {
      let correctChars = 0;
      let incorrectChars = 0;

      for (let i = 0; i < finalInput.length; i++) {
        if (finalInput[i] === targetText[i]) {
          correctChars++;
        } else {
          incorrectChars++;
        }
      }

      const totalChars = finalInput.length;
      const minutes = Math.max(elapsedSeconds / 60, 1 / 60); // กันหารด้วย 0
      const wpm = Math.round(correctChars / 5 / minutes);
      const accuracy =
        totalChars === 0 ? 0 : Math.round((correctChars / totalChars) * 100);

      return { wpm, accuracy, correctChars, incorrectChars, totalChars };
    },
    [targetText],
  );

  const finishTest = useCallback(
    (finalInput: string) => {
      setIsRunning(false);
      setIsFinished(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
      const elapsedSeconds = duration - timeLeft;
      setResult(calculateResult(finalInput, elapsedSeconds || duration));
    },
    [calculateResult, duration, timeLeft],
  );

  // เริ่มจับเวลาถอยหลังเมื่อ isRunning = true
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  // เมื่อเวลาหมด -> จบเทสอัตโนมัติ
  useEffect(() => {
    if (isRunning && timeLeft === 0) {
      finishTest(input);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const handleChange = (value: string) => {
    if (isFinished) return;

    // เริ่มจับเวลาตอนพิมพ์ตัวแรก
    if (!isRunning && value.length > 0) {
      setIsRunning(true);
    }

    setInput(value);

    // พิมพ์ครบ target แล้ว -> จบเทสทันทีไม่ต้องรอหมดเวลา
    if (value.length >= targetText.length) {
      finishTest(value);
    }
  };

  const reset = () => {
    setInput("");
    setTimeLeft(duration);
    setIsRunning(false);
    setIsFinished(false);
    setResult(null);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return {
    input,
    timeLeft,
    isRunning,
    isFinished,
    result,
    handleChange,
    reset,
  };
}
