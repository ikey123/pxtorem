'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('nav');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-primary-600">
            pxtorem.org
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/px-to-rem" 
              className="text-gray-600 hover:text-primary-600 font-medium"
            >
              {t('pxToRem')}
            </Link>
            <Link 
              href="/rem-to-px" 
              className="text-gray-600 hover:text-primary-600 font-medium"
            >
              {t('remToPx')}
            </Link>
            <span className="text-gray-400 font-medium cursor-not-allowed">
              {t('pxToEm')}
            </span>
            <LanguageSwitcher />
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/px-to-rem" 
                className="text-gray-600 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('pxToRem')}
              </Link>
              <Link 
                href="/rem-to-px" 
                className="text-gray-600 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('remToPx')}
              </Link>
              <span className="text-gray-400 font-medium cursor-not-allowed">
                {t('pxToEm')}
              </span>
              <div className="pt-2">
                <LanguageSwitcher />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 