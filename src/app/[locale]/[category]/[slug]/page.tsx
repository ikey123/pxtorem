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
  params: Promise<{ locale: string; category: string; slug?: string }>;
};

export async function generateMetadata({
  params,
}: CategoryParams): Promise<Metadata> {
  const { locale, category, slug } = await params;
  let effectiveLocale: Locale = isLocale(locale) ? locale : defaultLocale;
  let effectiveCategory = category;
  let effectiveSlug: string = slug || ''; // 显式声明为 string 并提供默认值

  if (!isLocale(locale) && isValidCategory(locale)) {
    effectiveLocale = defaultLocale;
    effectiveCategory = locale;
    effectiveSlug = category; // category 是 string
  }

  console.log(`generateMetadata - 原始: locale=${locale}, category=${category}, slug=${slug || 'undefined'}`);
  console.log(`generateMetadata - 解析后: effectiveLocale=${effectiveLocale}, effectiveCategory=${effectiveCategory}, effectiveSlug=${effectiveSlug}`);

  if (!isValidCategory(effectiveCategory)) {
    console.warn(`无效的类别 in generateMetadata: ${effectiveCategory}`);
    return { title: 'Category Not Found', description: 'The requested category does not exist' };
  }

  try {
    const t = await getTranslations({ locale: effectiveLocale, namespace: 'Category' });
    return {
      title: t('metaTitle', { category: effectiveCategory }),
      description: t('metaDescription', { category: effectiveCategory }),
    };
  } catch (error) {
    console.error('generateMetadata 错误:', error);
    return { title: `${effectiveCategory} Converter`, description: `Convert ${effectiveCategory} units` };
  }
}

export default async function CategoryPage({ params }: CategoryParams) {
  const { locale, category, slug } = await params;
  let effectiveLocale: Locale = isLocale(locale) ? locale : defaultLocale;
  let effectiveCategory = category;
  let effectiveSlug: string = slug || ''; // 显式声明为 string 并提供默认值

  if (!isLocale(locale) && isValidCategory(locale)) {
    effectiveLocale = defaultLocale;
    effectiveCategory = locale;
    effectiveSlug = category; // category 是 string
  }

  console.log(`CategoryPage - 原始语言: ${locale}, 类别: ${category}, Slug: ${slug || 'undefined'}, 解析后语言: ${effectiveLocale}`);
  console.log(`解析后: effectiveLocale=${effectiveLocale}, effectiveCategory=${effectiveCategory}, effectiveSlug=${effectiveSlug}`);

  if (!isValidCategory(effectiveCategory)) {
    console.warn(`无效的类别: ${effectiveCategory}`);
    notFound();
  }

  // 提取 initialValue
  let initialValue: number = 16;
  if (effectiveSlug) {
    const numMatch = effectiveSlug.match(/^(\d+(?:-\d+)?)/);
    if (numMatch) {
      initialValue = parseFloat(numMatch[1].replace('-', '.'));
    }
  }

  const title = `${effectiveCategory.toUpperCase()} Converter${effectiveSlug ? `: ${effectiveSlug}` : ''}`;
  console.log(`渲染参数: title=${title}, initialValue=${initialValue}`);
  return (
    <SlugContent
      locale={effectiveLocale}
      category={effectiveCategory}
      slug={effectiveSlug} // 类型已是 string
      title={title}
      initialValue={initialValue}
    />
  );
}