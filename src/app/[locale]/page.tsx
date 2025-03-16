import { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Converter from '@/components/converter/Converter';
import PopularConversions from '@/components/home/PopularConversions';
import FeatureSection from '@/components/home/FeatureSection';

export async function generateViewport({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Viewport> {
  const { locale } = await params;
  return {
    width: "device-width",
    initialScale: 1,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function Home({ children }: { children: React.ReactNode }) {
  // 分别获取不同命名空间的翻译函数
  const t = useTranslations('common');
  const homeT = useTranslations('home');
  
  return (
    <main>
      {/* 英雄区域 */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {homeT('hero.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {homeT('hero.subtitle')}
            </p>
            
            {/* 转换器 */}
            <div className="mt-8">
              <Converter />
            </div>
          </div>
        </div>
      </section>
      
      {/* 热门转换 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {homeT('popular.title')}
          </h2>
          <PopularConversions />
        </div>
      </section>
      
      {/* 关于REM的信息 */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureSection 
              title={homeT('about.whatIsRem.title')}
              content={homeT('about.whatIsRem.content')}
            />
            <FeatureSection 
              title={homeT('about.whyUseRem.title')}
              content={homeT('about.whyUseRem.content')}
            />
            <FeatureSection 
              title={homeT('about.howToUse.title')}
              content={homeT('about.howToUse.content')}
              codeExample={`html {
  font-size: 16px;
}

.title {
  font-size: 1.5rem;  /* 24px */
  margin-bottom: 1rem; /* 16px */
}

.container {
  padding: 0.75rem; /* 12px */
}`}
            />
          </div>
        </div>
      </section>
      
      {/* 号召性用语 */}
      <section className="py-12 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to simplify your CSS unit conversions?
          </h2>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/px-to-rem"
              className="px-6 py-3 bg-white text-primary-600 font-medium rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 transition-colors"
            >
              {t('startConverting')}
            </Link>
            <Link 
              href="/about"
              className="px-6 py-3 bg-primary-700 text-white font-medium rounded-lg shadow-md hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 transition-colors"
            >
              {t('about')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}