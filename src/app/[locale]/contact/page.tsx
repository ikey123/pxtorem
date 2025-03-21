import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations('contact');

  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function ContactPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations('contact');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <div className="prose max-w-none">
        <p>{t('description')}</p>
      </div>
    </div>
  );
} 