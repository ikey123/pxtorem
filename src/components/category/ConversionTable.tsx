'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { pxToRem, remToPx } from '@/lib/unit-conversions';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface ConversionTableProps {
  category: string;
  hideSearchVolume?: boolean;
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

export default function ConversionTable({ 
  category,
  hideSearchVolume = true
}: ConversionTableProps) {
  const [conversions, setConversions] = useState<ConversionItem[]>([]);
  const [rootFontSize, setRootFontSize] = useState(16);
  const [showAll, setShowAll] = useState(false);
  
  useEffect(() => {
    const items: ConversionItem[] = [];
    
    if (category === 'px-to-rem') {
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
    } else if (category === 'rem-to-px') {
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
  }, [category]);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {category === 'px-to-rem' ? 'PX to REM Conversion Table' : 'REM to PX Conversion Table'}
      </h2>
      
      {/* 字体大小调整 */}
      <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="table-font-size" className="text-sm font-medium text-gray-700">
            Base Font Size: {rootFontSize}px
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
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">
                  {category === "px-to-rem" ? "PX" : "REM"}
                </th>
                <th className="border px-4 py-2 text-left">
                  {category === "px-to-rem" ? "REM" : "PX"} (16px base)
                </th>
                {!hideSearchVolume && (
                  <th className="border px-4 py-2 text-left">Search Volume</th>
                )}
              </tr>
            </thead>
            <tbody>
              {conversions.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border px-4 py-2">{item.from}</td>
                  <td className="border px-4 py-2">{item.formattedResult} {item.toUnit}</td>
                  {!hideSearchVolume && (
                    <td className="border px-4 py-2">
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
                  )}
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