'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';
import { formatConversionResult, getPxToRemFormula, getRemToPxFormula } from '@/lib/unit-conversions';

interface ConverterProps {
  initialValue?: string;
  initialFromUnit?: 'px' | 'rem';
  initialToUnit?: 'px' | 'rem';
}

export default function Converter({
  initialValue = '',
  initialFromUnit = 'px',
  initialToUnit = 'rem'
}: ConverterProps) {
  const t = useTranslations('converter');
  
  const [value, setValue] = useState(initialValue);
  const [fromUnit, setFromUnit] = useState<'px' | 'rem'>(initialFromUnit);
  const [toUnit, setToUnit] = useState<'px' | 'rem'>(initialToUnit);
  const [rootFontSize, setRootFontSize] = useState(16);
  const [result, setResult] = useState('');
  const [formula, setFormula] = useState('');
  const [copied, setCopied] = useState(false);
  
  // 当输入值或单位变化时，计算结果
  useEffect(() => {
    if (!value || isNaN(parseFloat(value))) {
      setResult('');
      setFormula('');
      return;
    }
    
    const numericValue = parseFloat(value);
    
    // 计算结果
    const conversionResult = formatConversionResult(
      numericValue,
      fromUnit,
      toUnit,
      rootFontSize
    );
    
    setResult(conversionResult);
    
    // 生成计算公式
    if (fromUnit === 'px' && toUnit === 'rem') {
      setFormula(getPxToRemFormula(numericValue, rootFontSize));
    } else if (fromUnit === 'rem' && toUnit === 'px') {
      setFormula(getRemToPxFormula(numericValue, rootFontSize));
    } else {
      setFormula(''); // 同单位无公式
    }
  }, [value, fromUnit, toUnit, rootFontSize]);
  
  // 切换单位
  const handleUnitSwitch = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };
  
  // 复制结果
  const handleCopy = () => {
    if (!result) return;
    
    navigator.clipboard.writeText(`${result}${toUnit}`);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 输入区域 */}
        <div>
          <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
            {t('from')}
          </label>
          <div className="flex">
            <input
              type="text"
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t('inputPlaceholder')}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value as 'px' | 'rem')}
              className="px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="px">px</option>
              <option value="rem">rem</option>
            </select>
          </div>
        </div>
        
        {/* 输出区域 */}
        <div>
          <label htmlFor="result" className="block text-sm font-medium text-gray-700 mb-1">
            {t('to')}
          </label>
          <div className="flex">
            <input
              type="text"
              id="result"
              value={result}
              readOnly
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md shadow-sm bg-gray-50"
            />
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value as 'px' | 'rem')}
              className="px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="px">px</option>
              <option value="rem">rem</option>
            </select>
            <button
              onClick={handleCopy}
              disabled={!result}
              className="ml-2 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              title={t('copy')}
            >
              {copied ? (
                <CheckIcon className="h-5 w-5 text-green-600" />
              ) : (
                <ClipboardIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* 根字体大小调整 */}
      <div className="mt-6">
        <label htmlFor="rootFontSize" className="block text-sm font-medium text-gray-700 mb-1">
          {t('rootFontSize')}
        </label>
        <div className="flex items-center">
          <input
            type="range"
            id="rootFontSize"
            min="8"
            max="24"
            step="1"
            value={rootFontSize}
            onChange={(e) => setRootFontSize(parseInt(e.target.value))}
            className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="ml-3 text-gray-700 font-medium">{rootFontSize}px</span>
        </div>
      </div>
      
      {/* 结果和公式 */}
      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <p className="text-lg font-medium text-gray-900">
            {t('result', { value, from: fromUnit, result, to: toUnit })}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {t('calculation', { formula })}
          </p>
        </div>
      )}
    </div>
  );
} 