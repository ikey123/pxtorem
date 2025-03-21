// src/app/[locale]/[category]/[slug]/page.tsx
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, defaultLocale, validCategories } from '@/i18n/request';
import SlugContent from '@/components/slug/SlugContent';

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
  params: Promise<{ locale: string; category: string; slug: string }>;
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
  const { locale, category, slug } = await params;
  const effectiveLocale: Locale = isLocale(locale) ? locale : defaultLocale;

  if (!isValidCategory(category)) notFound();

  // 提取 initialValue (最小化修改)
  let initialValue: number = 16; // 默认值，确保安全
  
  // 尽可能简单地解析 slug 中的数值
  if (slug) {
    const numMatch = slug.match(/^(\d+(?:-\d+)?)/);
    if (numMatch) {
      initialValue = parseFloat(numMatch[1].replace('-', '.'));
    }
  }

  // 简单生成 title
  const title = `${category.toUpperCase()} Converter: ${slug}`;

  // 渲染内容
  return (
    <SlugContent
      locale={effectiveLocale}
      category={category}
      slug={slug}
      title={title}
      initialValue={initialValue}
    />
  );
}