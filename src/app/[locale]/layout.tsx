import './globals.css';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { locales, defaultLocale } from '@/i18n/request';
import { inter } from '@/app/fonts';

export const metadata: Metadata = {
  title: {
    default: 'PX to REM Converter - Free CSS Unit Tool',
    template: '%s | PX to REM Converter',
  },
  description: 'Instantly convert PX to REM for free. Optimize your responsive web design with our accurate CSS unit converter.',
};

export default async function LocaleLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;  // 修改为 Promise 类型
  children: React.ReactNode;
}) {
  try {
    const { locale: rawLocale } = await params;  // 添加 await
    const locale = rawLocale && locales.includes(rawLocale) ? rawLocale : defaultLocale;
    
    console.log(`Layout - 原始语言: ${rawLocale}, 解析后语言: ${locale}`);
    
    const messages = await getMessages({ locale }).catch((error) => {
      console.error(`无法加载语言 ${locale} 的翻译: ${error.message}`);
      return import(`../../messages/${defaultLocale}.json`).then((mod) => mod.default);
    });
    
    return (
      <html lang={locale} className="scroll-smooth">
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
    console.error("Layout 错误:", error);
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