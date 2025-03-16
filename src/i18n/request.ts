import {getRequestConfig} from 'next-intl/server';

// 定义支持的语言类型
type Locale = 'en' | 'es';

export const locales: Locale[] = ['en', 'es'];
export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({locale}) => {
  // 如果 locale 为 undefined，使用默认语言
  const resolvedLocale = locale || defaultLocale;
  
  // 类型安全的语言检查
  if (!locales.includes(resolvedLocale as Locale)) {
    console.error(`Invalid locale: ${resolvedLocale}`);
    // 使用默认语言而不是抛出错误
    return {
      messages: (await import(`../messages/${defaultLocale}.json`)).default,
      timeZone: 'UTC',
      locale: defaultLocale
    };
  }

  return {
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
    timeZone: 'UTC',
    locale: resolvedLocale
  };
}); 