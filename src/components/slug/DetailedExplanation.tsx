interface DetailedExplanationProps {
  value: string;
  fromUnit: string;
  toUnit: string;
  result: string;
  rootFontSize: number;
  slug: string;
}

export default function DetailedExplanation({
  value,
  fromUnit,
  toUnit,
  result,
  rootFontSize,
  slug
}: DetailedExplanationProps) {
  // 计算在不同根字体大小下的结果
  const calculateResults = () => {
    if (fromUnit === 'px' && toUnit === 'rem') {
      // PX to REM
      return [
        { rootSize: 12, result: parseFloat(value) / 12 },
        { rootSize: 14, result: parseFloat(value) / 14 },
        { rootSize: 16, result: parseFloat(value) / 16 },
        { rootSize: 18, result: parseFloat(value) / 18 },
        { rootSize: 20, result: parseFloat(value) / 20 },
      ];
    } else {
      // REM to PX
      return [
        { rootSize: 12, result: parseFloat(value) * 12 },
        { rootSize: 14, result: parseFloat(value) * 14 },
        { rootSize: 16, result: parseFloat(value) * 16 },
        { rootSize: 18, result: parseFloat(value) * 18 },
        { rootSize: 20, result: parseFloat(value) * 20 },
      ];
    }
  };

  const results = calculateResults();

  const formatNumber = (num: number): string => {
    return num.toFixed(4).replace(/\.?0+$/, '');
  };

  const getUsageScenario = () => {
    switch (slug) {
      case '1-rem-to-px':
        return (
          <>
            <p>
              1rem 是 REM 单位的基础值，常用于设置基准字体大小或间距。以 16px 的根字体大小计算，1rem = 16px。这是测试转换器核心功能的关键用例。
            </p>
            <pre className="bg-gray-100 p-2 rounded mt-2">{`body { font-size: 1rem; /* 16px */ }`}</pre>
          </>
        );
      case '0-5-rem-to-px':
        return (
          <>
            <p>
              0.5rem 是一个常见的小数值 REM，常用于微调间距或小型元素。测试结果应为 8px（基于 16px 根字体），验证小数转换的准确性。
            </p>
            <pre className="bg-gray-100 p-2 rounded mt-2">{`small { margin: 0.5rem; /* 8px */ }`}</pre>
          </>
        );
      case '1-5-rem-to-px':
        return (
          <>
            <p>
              1.5rem 是一个常见的中间值，通常用于行高或标题间距。测试结果应为 24px（基于 16px 根字体），验证中间值转换。
            </p>
            <pre className="bg-gray-100 p-2 rounded mt-2">{`p { line-height: 1.5rem; /* 24px */ }`}</pre>
          </>
        );
      case '16-px-to-rem':
        return (
          <>
            <p>
              16px 是浏览器的默认字体大小，转换为 REM 应为 1rem（基于 16px 根字体）。此测试验证从像素到 REM 的双向转换功能。
            </p>
            <pre className="bg-gray-100 p-2 rounded mt-2">{`html { font-size: 16px; } div { padding: 1rem; }`}</pre>
          </>
        );
      default:
        return <p>此转换适用于多种设计场景，具体取决于您的项目需求。</p>;
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">
        Detailed Explanation
      </h3>

      <div className="prose max-w-none">
        <p>
          {fromUnit === 'px'
            ? `When converting ${value}px to rem, we divide the pixel value by the root font size. With the default browser font size of ${rootFontSize}px, the calculation is:`
            : `When converting ${value}rem to pixels, we multiply the rem value by the root font size. With the default browser font size of ${rootFontSize}px, the calculation is:`}
        </p>

        <div className="bg-gray-50 p-4 rounded-md my-4 font-mono text-lg">
          {fromUnit === 'px'
            ? `${value}px ÷ ${rootFontSize}px = ${result}rem`
            : `${value}rem × ${rootFontSize}px = ${result}px`}
        </div>

        {getUsageScenario()}

        <h4>Results with Different Root Font Sizes</h4>
        <p>
          The rem value changes depending on the root font size set in your CSS. Here are the results with different common root font sizes:
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Root Font Size
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {fromUnit === 'px' ? 'REM Value' : 'Pixel Value'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.rootSize}px
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatNumber(item.result)}{toUnit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose max-w-none mt-6">
        <h4>When to Use {toUnit.toUpperCase()} Units</h4>
        {fromUnit === 'px' && toUnit === 'rem' ? (
          <>
            <p>
              REM units are ideal for:
            </p>
            <ul>
              <li>Creating responsive layouts that scale with user preferences</li>
              <li>Building accessible websites that respect browser font size settings</li>
              <li>Maintaining consistent spacing and proportions throughout your design</li>
              <li>Setting font sizes, margins, and padding in a scalable way</li>
            </ul>
          </>
        ) : (
          <>
            <p>
              While REM units are preferred for responsive design, knowing the pixel equivalent is useful for:
            </p>
            <ul>
              <li>Communicating exact dimensions with designers</li>
              <li>Debugging layout issues</li>
              <li>Understanding the absolute size of elements</li>
              <li>Setting border widths and other small details</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
} 