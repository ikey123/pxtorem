'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ClipboardIcon, CheckIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
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
  
  // Swap units
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
    <div className="bg-white rounded-lg shadow-sm p-4 max-w-lg mx-auto">
      {/* 转换输入和输出区 - 紧凑布局 */}
      <div className="flex items-center space-x-2 mb-4">
        {/* 输入区域 */}
        <div className="flex-1">
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
              className="w-full px-3 py-2 text-base border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value as 'px' | 'rem')}
              className="px-2 py-2 text-base border border-l-0 border-gray-300 bg-gray-50 rounded-r-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="px">px</option>
              <option value="rem">rem</option>
            </select>
          </div>
        </div>
        
        {/* 切换按钮 */}
        <button
          onClick={handleUnitSwitch}
          className="mt-6 p-1 rounded-full hover:bg-gray-100 focus:outline-none"
          title="Switch units"
        >
          <ArrowsRightLeftIcon className="h-4 w-4 text-gray-500" />
        </button>
        
        {/* 输出区域 */}
        <div className="flex-1">
          <label htmlFor="result" className="block text-sm font-medium text-gray-700 mb-1">
            {t('to')}
          </label>
          <div className="flex">
            <input
              type="text"
              id="result"
              value={result}
              readOnly
              className="w-full px-3 py-2 text-base border border-gray-300 rounded-l-md shadow-sm bg-gray-50"
            />
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value as 'px' | 'rem')}
              className="px-2 py-2 text-base border border-l-0 border-gray-300 bg-gray-50 rounded-r-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="px">px</option>
              <option value="rem">rem</option>
            </select>
          </div>
        </div>
        
        {/* 复制按钮 */}
        <button
          onClick={handleCopy}
          disabled={!result}
          className="mt-6 p-1.5 rounded-md bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          title={t('copy')}
        >
          {copied ? (
            <CheckIcon className="h-4 w-4 text-green-600" />
          ) : (
            <ClipboardIcon className="h-4 w-4 text-gray-600" />
          )}
        </button>
      </div>
      
      {/* 根字体大小调整 - 更紧凑 */}
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
          {t('rootFontSize')}: {rootFontSize}px
        </span>
        <input
          type="range"
          min="8"
          max="24"
          step="1"
          value={rootFontSize}
          onChange={(e) => setRootFontSize(parseInt(e.target.value))}
          className="flex-grow h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      
      {/* 结果和公式 - 更紧凑 */}
      {result && (
        <div className="text-sm bg-gray-50 rounded-md p-2.5 border border-gray-100">
          <p className="font-medium text-gray-900">
            {value}{fromUnit} = {result}{toUnit}
          </p>
          {formula && (
            <p className="text-xs text-gray-600 mt-0.5">
              {t('calculation', { formula })}
            </p>
          )}
        </div>
      )}
    </div>
  );
} 