'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { pxToRem, remToPx } from '@/lib/unit-conversions';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface ConversionTableProps {
  category: string;
}

interface ConversionItem {
  from: number;
  fromUnit: string;
  to: number;
  toUnit: string;
  formattedResult: string;
  searchVolume: 'High' | 'Medium' | 'Low';
  slug: string;
}

export default function ConversionTable({ category }: ConversionTableProps) {
  const [conversions, setConversions] = useState<ConversionItem[]>([]);
  const [rootFontSize, setRootFontSize] = useState(16);
  const [showAll, setShowAll] = useState(false);
  
  const isPxToRem = category === 'px-to-rem';
  
  useEffect(() => {
    const items: ConversionItem[] = [];
    
    if (isPxToRem) {
      // 生成常用的PX到REM转换
      [8, 10, 12, 14, 16, 18, 20, 24, 32, 48, 64].forEach(px => {
        const result = pxToRem(px);
        items.push({
          from: px,
          fromUnit: 'px',
          to: result,
          toUnit: 'rem',
          formattedResult: result.toFixed(4).replace(/\.?0+$/, ''),
          searchVolume: px === 16 ? 'High' : px % 8 === 0 ? 'Medium' : 'Low',
          slug: `${px}-px-to-rem`
        });
      });
    } else {
      // 生成常用的REM到PX转换
      [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5].forEach(rem => {
        const result = remToPx(rem);
        items.push({
          from: rem,
          fromUnit: 'rem',
          to: result,
          toUnit: 'px',
          formattedResult: result.toFixed(0),
          searchVolume: rem === 1 ? 'High' : rem % 0.5 === 0 ? 'Medium' : 'Low',
          slug: `${rem.toString().replace('.', '-')}-rem-to-px`
        });
      });
    }
    
    setConversions(items);
  }, [isPxToRem]);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {isPxToRem ? 'PX to REM Conversion Table' : 'REM to PX Conversion Table'}
      </h2>
      
      {/* 字体大小调整 */}
      <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="table-font-size" className="text-sm font-medium text-gray-700">
            Root Font Size: {rootFontSize}px
          </label>
        </div>
        <input
          id="table-font-size"
          type="range"
          min="8"
          max="24"
          value={rootFontSize}
          onChange={(e) => setRootFontSize(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      
      {/* 转换表格 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {isPxToRem ? 'Pixels (px)' : 'REM'}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {isPxToRem ? 'REM' : 'Pixels (px)'}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Search Volume
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {conversions.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.from} {item.fromUnit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.formattedResult} {item.toUnit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      item.searchVolume === 'High' 
                        ? 'bg-green-100 text-green-800' 
                        : item.searchVolume === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.searchVolume}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link 
                      href={`/${category}/${item.slug}`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      <ArrowTopRightOnSquareIcon className="inline h-4 w-4 mr-1" />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* 展开/收起按钮 */}
      <div className="text-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  );
} 