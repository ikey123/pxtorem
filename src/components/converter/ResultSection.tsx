'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { ConversionResult } from '@/lib/unit-conversions';

interface ResultSectionProps {
  inputValue: string;
  fromUnit: string;
  toUnit: string;
  result: ConversionResult;
}

const ResultSection = ({ inputValue, fromUnit, toUnit, result }: ResultSectionProps) => {
  const t = useTranslations();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const textToCopy = `${inputValue}${fromUnit} = ${result.formattedResult}${toUnit}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-3">
      <div className="text-2xl font-semibold text-gray-900">
        {inputValue}{fromUnit} = {result.formattedResult}{toUnit}
      </div>
      
      <div className="text-sm text-gray-500">
        {t('converter.calculation', { formula: result.formula })}
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {copied ? (
            <>
              <CheckIcon className="w-4 h-4 mr-2" /> {t('common.copied')}
            </>
          ) : (
            <>
              <ClipboardIcon className="w-4 h-4 mr-2" /> {t('common.copy')}
            </>
          )}
        </button>
        
        <a
          href={`/${toUnit === 'rem' ? 'px-to-rem' : 'rem-to-px'}/${inputValue}-${fromUnit}-to-${toUnit}`}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {t('common.details')}
        </a>
      </div>
    </div>
  );
};

export default ResultSection; 