// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server'; // 显式导入 getRequestConfig

// 直接定义常量，不需要从外部导入
export const locales = ['en', 'es'] as const;
export const defaultLocale = 'en';
export const validCategories = ['px-to-rem', 'rem-to-px'] as const;
export const rootFontSize = 16; // 根字体大小，用于计算

export default getRequestConfig(async ({ locale }) => {
  // 验证语言是否有效
  if (!locale || !locales.includes(locale)) {
    console.warn(`无效的语言: ${locale}, 使用默认语言: ${defaultLocale}`);
    locale = defaultLocale;
  }

  try {
    // 加载对应语言的翻译文件
    const messages = (await import(`../messages/${locale}.json`)).default;
    return { locale, messages };
  } catch (error) {
    console.error(`无法加载语言 ${locale} 的翻译文件: ${error.message}`);
    // 回退到默认语言
    const messages = (await import(`../messages/${defaultLocale}.json`)).default;
    return { locale: defaultLocale, messages };
  }
});