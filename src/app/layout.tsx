import './globals.css';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { locales, defaultLocale } from '@/i18n/request';
import { inter } from '@/app/fonts';

// 定义 Locale 类型
type Locale = typeof locales[number];

// 类型守卫函数
function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const metadata: Metadata = {
  title: {
    default: 'PX to REM Converter - Free CSS Unit Tool',
    template: '%s | PX to REM Converter',
  },
  description: 'Instantly convert PX to REM for free. Optimize your responsive web design with our accurate CSS unit converter.',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: Promise<{ locale: string }>; // params 为可选，因为根路径没有 locale
}) {
  try {
    // 如果有 params（即 /[locale] 路径），解析 locale；否则使用 defaultLocale
    const rawLocale = params ? (await params).locale : undefined;
    const locale: Locale = rawLocale && isLocale(rawLocale) ? rawLocale : defaultLocale;

    console.log(`Layout - 原始语言: ${rawLocale ?? 'undefined'}, 解析后语言: ${locale}`);

    const messages = await getMessages({ locale }).catch((error) => {
      console.error(`无法加载语言 ${locale} 的翻译: ${error.message}`);
      return import(`../messages/${defaultLocale}.json`).then((mod) => mod.default);
    });

    // 动态生成 Canonical URL
    const canonicalBase = 'https://pxtorem.org';
    const canonicalPath = locale === defaultLocale ? '' : `/${locale}`;
    const canonicalUrl = `${canonicalBase}${canonicalPath}`;

    return (
      <html lang={locale} className="scroll-smooth">
        <head>
          <link rel="canonical" href={`https://pxtorem.org${locale === 'en' ? '/' : `/${locale}`}`} />
        </head>
        <body className={inter.className}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </body>
      </html>
    );
  } catch (error) {
    console.error('Layout 错误:', error);
    return (
      <html lang={defaultLocale}>
        <body className={inter.className}>
          <div className="flex justify-center items-center min-h-screen">
            <div className="p-8 bg-red-50 rounded-lg border border-red-200">
              <h1 className="text-2xl font-bold text-red-600 mb-2">出错了</h1>
              <p className="text-red-500">加载页面时发生错误，请稍后再试。</p>
            </div>
          </div>
        </body>
      </html>
    );
  }
}