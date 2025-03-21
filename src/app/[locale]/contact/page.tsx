import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

// 使用 Promise 类型
interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <div className="prose max-w-none">
        <p>{t('description')}</p>
      </div>
    </div>
  );
} 