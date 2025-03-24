// src/app/[locale]/[category]/page.tsx
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
  params: Promise<{ locale: string; category: string }>;
};

export async function generateMetadata({ params }: CategoryParams): Promise<Metadata> {
  const { locale, category } = await params;
  const effectiveLocale: Locale = isLocale(locale) ? locale : defaultLocale;
  const effectiveCategory = isValidCategory(category) ? category : isValidCategory(locale) ? locale : 'rem-to-px';

  return {
    title: `${effectiveCategory.toUpperCase()} Converter`,
    description: `Convert ${effectiveCategory} units`,
  };
}

export default async function CategoryPage({ params }: CategoryParams) {
  const { locale, category } = await params;
  const effectiveLocale: Locale = isLocale(locale) ? locale : defaultLocale;
  const effectiveCategory = isValidCategory(category) ? category : isValidCategory(locale) ? locale : notFound();
  const effectiveSlug = '';

  console.log(`[Category] - locale=${locale}, category=${category}, effectiveLocale=${effectiveLocale}, effectiveCategory=${effectiveCategory}`);
  const title = `${effectiveCategory.toUpperCase()} Converter`;
  return (
    <SlugContent
      locale={effectiveLocale}
      category={effectiveCategory}
      slug={effectiveSlug}
      title={title}
      initialValue={16}
    />
  );
}