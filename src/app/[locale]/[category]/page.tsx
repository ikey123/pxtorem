// src/app/[locale]/[category]/page.tsx
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, defaultLocale, validCategories } from '@/i18n/request';
import CategoryContent from '@/components/category/CategoryContent';

type CategoryParams = {
  params: Promise<{ locale: string; category: string }>;
};

export async function generateMetadata({ params }: CategoryParams): Promise<Metadata> {
  const { locale, category } = await params;
  const effectiveLocale = locales.includes(locale) ? locale : defaultLocale;

  // 检查是否可能是 slug 误识别为类别
  if (category.match(/^\d+-px-to-rem$/) || category.match(/^\d+(?:-\d+)?-rem-to-px$/)) {
    console.warn(`Slug 被误识别为类别 in generateMetadata: ${category}`);
    return { title: 'Invalid Category', description: 'This is a conversion value, not a category' };
  }

  if (!validCategories.includes(category)) {
    console.warn(`无效的类别 in generateMetadata: ${category}`);
    return { title: 'Category Not Found', description: 'The requested category does not exist' };
  }

  try {
    const t = await getTranslations({ locale: effectiveLocale, namespace: 'Category' });
    return {
      title: {
        absolute: t(`${category}.title`),
      },
      description: t(`${category}.description`),
    };
  } catch (error) {
    console.error('generateMetadata 错误:', error);
    if (category === 'px-to-rem') {
      return {
        title: { absolute: "PX to REM Converter - Pixel to REM Conversion & Calculator" },
        description: "Instantly convert PX to REM with our free online calculator. Easy PX to REM conversion and pixel to REM conversion. Ideal for responsive CSS design."
      };
    } else if (category === 'rem-to-px') {
      return {
        title: { absolute: "REM to Pixels Converter - Accurate REM/REMs to PX Tool" },
        description: "Need to convert REM or REMs to pixels? Our free online tool provides accurate and fast conversions. Perfect for CSS design and debugging."
      };
    }
    return { 
      title: { absolute: `${category} Converter` }, 
      description: `Convert ${category} units` 
    };
  }
}

export default async function CategoryPage({ 
  params 
}: CategoryParams) {
  const { locale, category } = await params;
  const effectiveLocale = locales.includes(locale) ? locale : defaultLocale;
  console.log(`CategoryPage - 原始语言: ${locale}, 类别: ${category}, 解析后语言: ${effectiveLocale}`);

  // 检查是否可能是 slug 误识别为类别
  if (category.match(/^\d+-px-to-rem$/) || category.match(/^\d+(?:-\d+)?-rem-to-px$/)) {
    console.warn(`Slug 被误识别为类别: ${category}, 将交给 [slug] 页面处理`);
    notFound(); // 触发 404，交给 [slug] 页面
  }

  if (!validCategories.includes(category)) {
    console.warn(`无效的类别: ${category}`);
    notFound();
  }

  try {
    const t = await getTranslations({ locale: effectiveLocale, namespace: 'Category' });
    const title = t('title', { category });
    return <CategoryContent locale={effectiveLocale} category={category} title={title} />;
  } catch (error) {
    console.error('CategoryPage 错误:', error);
    return <div className="container mx-auto px-4 py-8">加载错误，请稍后再试。</div>;
  }
}
