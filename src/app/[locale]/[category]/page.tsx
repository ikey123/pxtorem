// src/app/[locale]/[category]/page.tsx
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, defaultLocale, validCategories } from '@/i18n/request';
import CategoryContent from '@/components/category/CategoryContent';

// 定义类型
type Locale = typeof locales[number];
type ValidCategory = typeof validCategories[number];

// 类型守卫函数
function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

function isValidCategory(value: string): value is ValidCategory {
  return (validCategories as readonly string[]).includes(value);
}

type CategoryParams = {
  params: Promise<{ locale: string; category: string }>;
};

export async function generateMetadata({
  params
}: CategoryParams): Promise<Metadata> {
  const { locale, category } = await params;
  const effectiveLocale: Locale = isLocale(locale) ? locale : defaultLocale;

  // 检查是否可能是 slug 误识别为类别
  if (category.match(/^\d+-px-to-rem$/) || category.match(/^\d+(?:-\d+)?-rem-to-px$/)) {
    console.warn(`Slug 被误识别为类别 in generateMetadata: ${category}`);
    return { title: 'Invalid Category', description: 'This is a conversion value, not a category' };
  }

  if (!isValidCategory(category)) {
    console.warn(`无效的类别 in generateMetadata: ${category}`);
    return { title: 'Category Not Found', description: 'The requested category does not exist' };
  }

  try {
    const t = await getTranslations({ locale: effectiveLocale, namespace: 'Category' });
    return {
      title: t('metaTitle', { category }),
      description: t('metaDescription', { category }),
    };
  } catch (error) {
    console.error('generateMetadata 错误:', error);
    return { title: `${category} Converter`, description: `Convert ${category} units` };
  }
}

export default async function CategoryPage({
  params
}: CategoryParams) {
  const { locale, category } = await params;
  const effectiveLocale: Locale = isLocale(locale) ? locale : defaultLocale;
  console.log(`CategoryPage - 原始语言: ${locale}, 类别: ${category}, 解析后语言: ${effectiveLocale}`);

  // 检查是否可能是 slug 误识别为类别
  if (category.match(/^\d+-px-to-rem$/) || category.match(/^\d+(?:-\d+)?-rem-to-px$/)) {
    console.warn(`Slug 被误识别为类别: ${category}, 将交给 [slug] 页面处理`);
    notFound(); // 触发 404，交给 [slug] 页面
  }

  if (!isValidCategory(category)) {
    console.warn(`无效的类别: ${category}`);
    notFound();
  }

  try {
    // 只将所需的属性传递给 CategoryContent
    return <CategoryContent locale={effectiveLocale} category={category} />;
  } catch (error) {
    console.error('CategoryPage 错误:', error);
    return <div className="container mx-auto px-4 py-8">加载错误，请稍后再试。</div>;
  }
}
