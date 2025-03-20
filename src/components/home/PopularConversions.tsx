import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function PopularConversions() {
  const t = useTranslations();
  const locale = useLocale(); // 获取当前语言
  
  const pxToRemConversions = [
    { px: 16, slug: '16-px-to-rem' },
    { px: 14, slug: '14-px-to-rem' },
    { px: 18, slug: '18-px-to-rem' },
    { px: 20, slug: '20-px-to-rem' },
    { px: 24, slug: '24-px-to-rem' },
    { px: 32, slug: '32-px-to-rem' },
  ];
  
  const remToPxConversions = [
    { rem: 1, slug: '1-rem-to-px' },
    { rem: 1.5, slug: '1-5-rem-to-px' },
    { rem: 2, slug: '2-rem-to-px' },
    { rem: 0.5, slug: '0-5-rem-to-px' },
    { rem: 0.75, slug: '0-75-rem-to-px' },
    { rem: 2.5, slug: '2-5-rem-to-px' },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* PX to REM */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">PX to REM</h3>
        <div className="grid grid-cols-2 gap-3">
          {pxToRemConversions.map((item) => (
            <Link 
              key={item.slug}
              href={`/${locale}/px-to-rem/${item.slug}`}
              className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 text-center transition-colors"
            >
              {item.px}px to rem
            </Link>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link 
            href={`/${locale}/px-to-rem`}
            className="text-primary-600 hover:text-primary-800 font-medium"
          >
            {t('home.popular.viewMore')} &rarr;
          </Link>
        </div>
      </div>
      
      {/* REM to PX */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">REM to PX</h3>
        <div className="grid grid-cols-2 gap-3">
          {remToPxConversions.map((item) => (
            <Link 
              key={item.slug}
              href={`/${locale}/rem-to-px/${item.slug}`}
              className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 text-center transition-colors"
            >
              {item.rem}rem to px
            </Link>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link 
            href="/rem-to-px"
            className="text-primary-600 hover:text-primary-800 font-medium"
          >
            {t('home.popular.viewMore')} &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
} 