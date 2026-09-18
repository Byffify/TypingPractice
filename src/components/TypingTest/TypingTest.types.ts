import type { TestDuration, TestMode } from '../../types/typing.types';

export interface TypingTestProps {
  mode: TestMode;
  targetText: string; // ข้อความ/โค้ดที่ต้องพิมพ์ตาม (สร้างจากข้างนอกแล้วส่งเข้ามา)
  duration: TestDuration;
}