// src/app/fonts.ts
import { Inter } from 'next/font/google';

// 定义 Inter 字体，仅导入一次
const inter = Inter({ subsets: ['latin'] });

// 仅导出一次
export { inter };