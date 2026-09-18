# Typing Practice

แอปพลิเคชันฝึกพิมพ์ดีดความเร็วแบบเว็บเบราว์เซอร์ สร้างด้วย **React + TypeScript + Vite** รับแรงบันดาลใจจาก
[Monkeytype](https://monkeytype.com/) โดยใช้ UI แบบข้อความซ้อนทับ (overlay) — พิมพ์ตรงไหน ตัวอักษรตรงนั้นจะเปลี่ยนเป็นสี
**เขียว = พิมพ์ถูก**, **แดง = พิมพ์ผิด**

## Overview

เว็บสำหรับวัดความเร็วและความแม่นยำในการพิมพ์ มี 2 โหมดหลัก:

- **Text** — สุ่มคำภาษาอังกฤษ (คำศัพท์ทั่วไป + คำศัพท์สาย dev เช่น `react`, `typescript`, `hook`) มาเรียงต่อกันเป็นข้อความ
- **Code** — พิมพ์โค้ดจริงทีละบรรทัด เลือกภาษาที่ต้องการได้แก่ HTML / CSS / JavaScript / TypeScript (ตัวอย่าง Todo App)

เลือกเวลาทดสอบได้ 15 / 30 / 60 วินาที จับเวลาเริ่มอัตโนมัติเมื่อพิมพ์ตัวแรก พิมพ์ครบหรือเวลาหมดจะสรุปผลลัพธ์เป็น
**WPM** และ **ความแม่นยำ (%)** พร้อมปุ่มลองใหม่

## Tech Stack

| เทคโนโลยี                    | ใช้ทำอะไร                                                      |
| ---------------------------- | -------------------------------------------------------------- |
| [React](https://react.dev) 19        | สร้าง UI ด้วย components และ hooks                        |
| [TypeScript](https://www.typescriptlang.org) | กำหนด types สำหรับโหมดการทดสอบ, ระยะเวลา, โค้ด snippet และผลลัพธ์ |
| [Vite](https://vite.dev)    | Dev server และ build tool                                     |
| [Tailwind CSS](https://tailwindcss.com) 4 | ตกแต่ง UI ด้วย utility classes และ CSS variables     |
| [React Icons](https://react-icons.github.io/react-icons) | ไอคอน e.g. ปุ่มลิงก์ GitHub          |