import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { locales } from '@/i18n/request';
import { Viewport } from 'next';

// 加载字体
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'PX to REM Converter - Free CSS Unit Tool',
    template: '%s | PX to REM Converter'
  },
  description: 'Instantly convert PX to REM for free. Optimize your responsive web design with our accurate CSS unit converter.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icons/icon-16.png', sizes: '16x16' },
      { url: '/icons/icon-32.png', sizes: '32x32' },
      { url: '/icons/icon-48.png', sizes: '48x48' },
      { url: '/icons/icon-64.png', sizes: '64x64' },
      { url: '/icons/icon-96.png', sizes: '96x96' },
      { url: '/icons/icon-128.png', sizes: '128x128' },
      { url: '/icons/icon-192.png', sizes: '192x192' },
      { url: '/icons/icon-256.png', sizes: '256x256' },
      { url: '/icons/icon-512.png', sizes: '512x512' },
    ],
    apple: [
      { url: '/icons/apple-icon.png', sizes: '180x180' },
    ],
    shortcut: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ params, children }: { params: { locale: string }; children: React.ReactNode }) {
  const { locale } = await params;
  
  // 验证语言
  if (!locales.includes(locale as any)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}