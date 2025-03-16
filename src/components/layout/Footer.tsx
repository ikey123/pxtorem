import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  // 热门长尾页面链接
  const popularLinks = [
    { href: '/px-to-rem/16-px-to-rem', label: '16px to rem' },
    { href: '/px-to-rem/10-px-to-rem', label: '10px to rem' },
    { href: '/px-to-rem/20-px-to-rem', label: '20px to rem' },
    { href: '/rem-to-px/1-rem-to-px', label: '1rem to px' },
    { href: '/rem-to-px/1-5-rem-to-px', label: '1.5rem to px' },
    { href: '/rem-to-px/2-rem-to-px', label: '2rem to px' },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 热门链接 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('popularLinks')}
            </h3>
            <ul className="space-y-2">
              {popularLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-primary-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 快速导航 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('contact')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/px-to-rem"
                  className="text-gray-600 hover:text-primary-600"
                >
                  PX to REM
                </Link>
              </li>
              <li>
                <Link 
                  href="/rem-to-px"
                  className="text-gray-600 hover:text-primary-600"
                >
                  REM to PX
                </Link>
              </li>
              <li>
                <Link 
                  href="/"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* 语言和版权信息 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('language')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/en"
                  className="text-gray-600 hover:text-primary-600"
                >
                  English
                </Link>
              </li>
              <li>
                <Link 
                  href="/es"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Español
                </Link>
              </li>
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