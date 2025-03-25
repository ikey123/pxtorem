'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  // 更新热门链接配置
  const popularLinks = [
   // { href: `/${locale}/rem-to-px/1-rem-to-px`, label: t('popularLinksItems.rem1') }, // 1 rem to px
   // { href: `/${locale}/rem-to-px/0-5-rem-to-px`, label: t('popularLinksItems.rem0_5') }, // 0.5 rem to px
   // { href: `/${locale}/rem-to-px/1-5-rem-to-px`, label: t('popularLinksItems.rem1_5') }, // 1.5 rem to px
    { href: `/${locale}/px-to-rem/16-px-to-rem`, label: t('popularLinksItems.px16') }, // 16px to rem
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 热门链接 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('popularLinks')}
            </h3>
            <ul className="space-y-2">
              {popularLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-600 hover:text-primary-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 快速导航 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('navigation')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/px-to-rem`} className="text-gray-600 hover:text-primary-600">
                  {t('pxToRem')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/rem-to-px`} className="text-gray-600 hover:text-primary-600">
                  {t('remToPx')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-gray-600 hover:text-primary-600">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-gray-600 hover:text-primary-600">
                  {t('contact')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/`} className="text-gray-600 hover:text-primary-600">
                  {t('home')}
                </Link>
              </li>
            </ul>
          </div>

          {/* 语言切换 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('language')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/en" className="text-gray-600 hover:text-primary-600">
                  {t('english')}
                </Link>
              </li>
              {/* 暂时隐藏西班牙语链接 */}
              {/* <li>
                <Link href="/es" className="text-gray-600 hover:text-primary-600">
                  {t('spanish')}
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          {t('copyright', { year: currentYear })}
        </div>
      </div>
    </footer>
  );
} 