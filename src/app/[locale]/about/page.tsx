import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

// 使用 Promise 类型
interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('title'),
    description: t('subtitle')
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <p className="text-lg text-gray-700 mb-6">{t('subtitle')}</p>
      <div className="prose max-w-none">
        <p>{t('description')}</p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">{t('missionTitle')}</h2>
        <p>{t('missionDescription')}</p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">{t('visionTitle')}</h2>
        <p>{t('visionDescription')}</p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">{t('valuesTitle')}</h2>
        <ul className="list-disc list-inside">
          <li>{t('value1')}</li>
          <li>{t('value2')}</li>
          <li>{t('value3')}</li>
        </ul>
      </div>
    </div>
  );
} 