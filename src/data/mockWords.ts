export const mockWords: string[] = [
  'the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog',
  'react', 'typescript', 'tailwind', 'component', 'function', 'state',
  'hackathon', 'software', 'engineer', 'design', 'system', 'build',
  'code', 'test', 'speed', 'accuracy', 'keyboard', 'type', 'practice',
  'array', 'object', 'string', 'number', 'boolean', 'hook', 'effect',
];

// สุ่มคำมา n คำ ต่อกันเป็นข้อความเดียว ใช้เป็น target text ของ plain mode
export function generateWordsText(count: number = 40): string {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomWord = mockWords[Math.floor(Math.random() * mockWords.length)];
    result.push(randomWord);
  }
  return result.join(' ');
}