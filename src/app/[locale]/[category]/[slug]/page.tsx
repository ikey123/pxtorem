// src/app/[locale]/[category]/[slug]/page.tsx
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, defaultLocale, validCategories } from '@/i18n/request';
import SlugContent from '@/components/slug/SlugContent';

type SlugParams = {
  params: Promise<{ locale: string; category: string; slug: string }>;
};

export async function generateMetadata({ 
  params 
}: SlugParams): Promise<Metadata> {
  const { locale, category, slug } = await params;
  const effectiveLocale = locales.includes(locale) ? locale : defaultLocale;

  if (!validCategories.includes(category)) {
    return { title: 'Invalid Category', description: 'The requested category does not exist' };
  }

  try {
    const t = await getTranslations({ locale: effectiveLocale, namespace: 'Slug' });
    return {
      title: t('metaTitle', { slug, category }),
      description: t('metaDescription', { slug, category }),
      openGraph: {
        title: t('metaTitle', { slug, category }),
        description: t('metaDescription', { slug, category }),
      }
    };
  } catch (error) {
    console.error('generateMetadata 错误:', error);
    return {
      title: `${category} - ${slug}`,
      description: `${category} 转换工具 - ${slug}`
    };
  }
}

export default async function SlugPage({ 
  params 
}: SlugParams) {
  const { locale, category, slug } = await params;
  const effectiveLocale = locales.includes(locale) ? locale : defaultLocale;
  console.log(`SlugPage - 原始语言: ${locale}, 类别: ${category}, Slug: ${slug}, 解析后语言: ${effectiveLocale}`);

  if (!validCategories.includes(category)) {
    console.warn(`无效的类别: ${category}`);
    notFound();
  }

  let initialValue = 0;
  if (category === 'px-to-rem') {
    const match = slug.match(/^(\d+)-px-to-rem$/);
    if (!match) {
      console.warn(`无效的 slug 格式: ${slug}`);
      notFound();
    }
    initialValue = parseInt(match[1]);
  } else if (category === 'rem-to-px') {
    const match = slug.match(/^(\d+(?:-\d+)?)-rem-to-px$/);
    if (!match) {
      console.warn(`无效的 slug 格式: ${slug}`);
      notFound();
    }
    initialValue = parseFloat(match[1].replace('-', '.'));
  }

  try {
    const t = await getTranslations({ locale: effectiveLocale, namespace: 'Slug' });
    const title = t('title', { slug, category });
    return <SlugContent locale={effectiveLocale} category={category} slug={slug} title={title} initialValue={initialValue} />;
  } catch (error) {
    console.error('SlugPage 错误:', error);
    return <div className="container mx-auto px-4 py-8">加载错误，请稍后再试。</div>;
  }
}