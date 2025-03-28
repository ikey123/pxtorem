// src/app/[locale]/[category]/[slug]/page.tsx
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, defaultLocale, validCategories } from '@/i18n/request';
import SlugContent from '@/components/slug/SlugContent';

type Locale = typeof locales[number];
type ValidCategory = typeof validCategories[number];

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

function isValidCategory(value: string): value is ValidCategory {
  return (validCategories as readonly string[]).includes(value);
}

type CategoryParams = {
  params: Promise<{ locale: string; category: string; slug?: string }>;
};

export async function generateMetadata({ params }: CategoryParams): Promise<Metadata> {
  const { locale, category, slug } = await params;
  const effectiveLocale: Locale = isLocale(locale) ? locale : defaultLocale;
  const effectiveCategory = isValidCategory(category) ? category : isValidCategory(locale) ? locale : notFound();
  const effectiveSlug = slug || '';

  console.log(`[Slug] Metadata - locale=${locale}, category=${category}, slug=${slug}`);
  return {
    title: `${effectiveCategory.toUpperCase()} Converter${effectiveSlug ? `: ${effectiveSlug}` : ''}`,
    description: `Convert ${effectiveCategory} units`,
  };
}

export default async function CategoryPage({ params }: CategoryParams) {
  const { locale, category, slug } = await params;
  const effectiveLocale: Locale = isLocale(locale) ? locale : defaultLocale;
  const effectiveCategory = isValidCategory(category) ? category : isValidCategory(locale) ? locale : notFound();
  const effectiveSlug = slug || '';

  console.log(`[Slug] - locale=${locale}, category=${category}, slug=${slug}, effectiveLocale=${effectiveLocale}, effectiveCategory=${effectiveCategory}, effectiveSlug=${effectiveSlug}`);

  let initialValue = 16;
  if (effectiveSlug) {
    const numMatch = effectiveSlug.match(/^(\d+(?:-\d+)?)/);
    if (numMatch) initialValue = parseFloat(numMatch[1].replace('-', '.'));
  }

  const title = `${effectiveCategory.toUpperCase()} Converter${effectiveSlug ? `: ${effectiveSlug}` : ''}`;
  return (
    <SlugContent
      locale={effectiveLocale}
      category={effectiveCategory}
      slug={effectiveSlug}
      title={title}
      initialValue={initialValue}
    />
  );
}