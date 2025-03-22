'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import HomeContent from '@/components/home/HomeContent';

export default function RootPage() {
  const t = useTranslations('common');
  const [suggestedLocale, setSuggestedLocale] = useState<string | null>(null);
  const [showSuggestion, setShowSuggestion] = useState(false);

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    const detectedLocale = browserLang.includes('es') ? 'es' : 'en';
    if (detectedLocale !== 'en') {
      setSuggestedLocale(detectedLocale);
      setShowSuggestion(true);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <p className="mb-6">{t('description')}</p>
      <HomeContent locale="en" />
      {showSuggestion && suggestedLocale && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mt-6">
          <p className="mb-2">
            {suggestedLocale === 'es' ? 'We have a Spanish version, would you like to switch?' : 'We have an English version, would you like to switch?'}
          </p>
          <div className="flex justify-center gap-2">
            <Link href={`/${suggestedLocale}`} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
              {suggestedLocale === 'es' ? 'Switch to Spanish' : 'Switch to English'}
            </Link>
            <button onClick={() => setShowSuggestion(false)} className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">
              No, thanks
            </button>
          </div>
        </div>
      )}
      <p className="mb-6">Please choose your language:</p>
      <div className="flex justify-center gap-4">
        <Link href="/en" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          English
        </Link>
        <Link href="/es" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Español
        </Link>
      </div>
    </div>
  );
}
