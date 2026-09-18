// ภาษาที่รองรับ ใช้กำหนดสี syntax แบบง่ายๆ
export type LanguageType = 'html' | 'css' | 'js' | 'ts' | 'plain';

// 1 บรรทัดโค้ด/ข้อความ ที่จะถูกพิมพ์
export interface CodeLine {
  id: string;
  text: string;
  language: LanguageType;
}

// 1 snippet = กลุ่มของบรรทัดโค้ด (เช่น 1 ไฟล์ HTML ทั้งไฟล์)
export interface CodeSnippet {
  id: string;
  title: string;
  language: LanguageType;
  lines: CodeLine[];
}

// ---- ส่วนที่เพิ่มสำหรับ TypingTest (โหมดพิมพ์เองแข่งเวลา) ----

// โหมดของแบบทดสอบ: พิมพ์ข้อความทั่วไป หรือพิมพ์โค้ด
export type TestMode = 'plain' | 'code';

// ตัวเลือกเวลานับถอยหลัง (วินาที)
export type TestDuration = 15 | 30 | 60;

// ผลลัพธ์หลังพิมพ์เสร็จ/หมดเวลา
export interface TypingResult {
  wpm: number;
  accuracy: number; // เปอร์เซ็นต์ 0-100
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
}