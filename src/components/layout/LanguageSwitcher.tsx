'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  
  const locales = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }
  ];

  const handleLocaleChange = (newLocale: string) => {
    // 将当前路径中的 locale 部分替换为新的 locale
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-gray-600 hover:text-primary-600 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md px-2 py-1"
      >
        <GlobeAltIcon className="h-5 w-5" />
        <span>{locale.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
          <div className="py-1">
            {locales.map((localeOption) => (
              <button
                key={localeOption.code}
                onClick={() => handleLocaleChange(localeOption.code)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  locale === localeOption.code
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {localeOption.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 