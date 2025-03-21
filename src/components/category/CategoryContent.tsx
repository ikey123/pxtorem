"use client";

import Converter from "@/components/converter/Converter";
import CategoryIntro from "@/components/category/CategoryIntro";
import ConversionTable from "@/components/category/ConversionTable";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function CategoryContent({
  locale,
  category,
  title,
}: {
  locale: string;
  category: string;
  title: string;
}) {
  // 动态设置单位
  const fromUnit = category === "px-to-rem" ? "px" 
    : category === "px-to-em" ? "px" 
    : category === "em-to-px" ? "em" 
    : "rem"; // 默认 rem 用于 rem-to-px
  const toUnit = category === "px-to-rem" ? "rem" 
    : category === "px-to-em" ? "em" 
    : category === "em-to-px" ? "px" 
    : "px"; // 默认 px 用于 rem-to-px

  // 常见转换值，基于假设的 em-to-px 关键词调研
  const commonValues = category === "em-to-px"
    ? [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 3, 3.5, 4, 5] // em-to-px 高流量值
    : category === "px-to-em"
    ? [10, 12, 14, 16, 18, 20, 24, 32, 36, 40, 48, 64, 72]
    : category === "px-to-rem"
    ? [8, 10, 12, 14, 16, 18, 20, 24, 32, 36, 40, 48, 64]
    : [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6];

  // 与 Footer.tsx 和 ConversionTable.tsx 一致的 slug 生成逻辑
  const getSlug = (value: number) => {
    if (category === "px-to-rem") {
      return `${value}-px-to-rem`;
    } else if (category === "rem-to-px") {
      return `${value.toString().replace('.', '-')}-rem-to-px`;
    } else if (category === "px-to-em") {
      return `${value}-px-to-em`;
    } else if (category === "em-to-px") {
      return `${value.toString().replace('.', '-')}-em-to-px`;
    }
    return `${value}`; // 默认值
  };

  // 转换函数，默认基准字体 16px
  const formatConversion = (value: number): string => {
    if (category === "px-to-em" || category === "px-to-rem") {
      const result = value / 16;
      return result.toFixed(4).replace(/\.?0+$/, "");
    } else {
      return (value * 16).toString(); // em-to-px 和 rem-to-px 都乘以 16
    }
  };

  const t = useTranslations('common');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <CategoryIntro category={category} />
      
      {/* 转换器部分 */}
      <div className="my-8">
        <Converter 
          conversionType={category} 
          initialFromUnit={category === 'px-to-rem' ? 'px' : 'rem'} 
          initialToUnit={category === 'px-to-rem' ? 'rem' : 'px'}
          initialValue={category === 'px-to-rem' ? 16 : 1}
        />
      </div>
      
      {/* 转换表部分 - 移除重复的标题 */}
      <div className="my-12">
        <div className="overflow-x-auto max-w-4xl mx-auto">
          <ConversionTable 
            category={category} 
            maxItems={20}
          />
        </div>
        {/* 修复 Show More 按钮功能和样式 */}
        {commonValues.length > 20 && (
          <div className="text-center mt-4">
            <button
              className="inline-flex items-center px-4 py-2 bg-primary-100 hover:bg-primary-200 text-primary-800 rounded-md transition-colors"
            >
              <span>Show More</span>
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
        )}
      </div>
      
      {/* Enhanced Intro Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {category === "em-to-px" ? "EM to PX Converter" 
              : category === "px-to-em" ? "PX to EM Converter" 
              : category === "px-to-rem" ? "PX to REM Converter" 
              : "REM to PX Converter"}
          </h2>
          <div className="mt-6 prose max-w-3xl">
            <p className="text-lg">
              {category === "px-to-rem"
                ? "Struggling with fixed pixel sizes in your CSS? Our free PX to REM converter makes it easy to switch to scalable REM units, ensuring your designs adapt seamlessly to any screen size. Whether you're designing typography, layouts, or spacing, this tool simplifies your workflow."
                : "Need to verify exact pixel values? Our REM to PX converter helps you debug layouts and ensure pixel-perfect designs. Convert REM units back to pixels for precise measurements and alignment."}
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Converter Section - 移除 h1 标题 */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="mb-6 max-w-3xl">
                {category === "em-to-px"
                  ? "Instantly convert EM to PX with our free EM to PX converter. Designed for web developers, this tool transforms EM units into pixel values, making it easy to align designs with pixel-based specifications or debug layouts."
                  : category === "px-to-em"
                  ? "Effortlessly convert PX to EM with our free PX to EM converter. Tailored for web developers, this tool transforms pixels into EM units, perfect for flexible layouts that adapt to parent font sizes."
                  : category === "px-to-rem"
                  ? "Easily convert PX to REM with our free online PX to REM converter. Perfect for responsive web design, this tool helps you transform pixel values into scalable REM units that adjust proportionally across devices."
                  : "Instantly convert REM to PX with our free REM to PX converter. Designed for developers and designers, this tool provides accurate pixel values from REM units, ideal for debugging or ensuring pixel-perfect implementations."}
              </p>
              
              {/* How to Use Guide */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h2 className="text-lg font-semibold mb-4">How to Use This Converter:</h2>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Enter your {fromUnit} value in the 'From' field</li>
                  <li>Adjust the root font size if needed (default is 16px)</li>
                  <li>Get your converted {toUnit} value instantly</li>
                </ol>
                <p className="mt-4 text-sm text-gray-600">
                  <strong>Tip:</strong> {category === "px-to-rem" 
                    ? "If your website uses a custom base font size (e.g., 18px), adjust it here for accurate results."
                    : "The default root font size in most browsers is 16px, but you can adjust it to match your specific project settings."}
                </p>
              </div>
            </div>
            
            <div>
              <Converter 
                initialFromUnit={fromUnit as "px" | "rem" | "em"} 
                initialToUnit={toUnit as "px" | "rem" | "em"} 
                locale={locale} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Why Use Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Why Convert {fromUnit.toUpperCase()} to {toUnit.toUpperCase()}?
          </h2>
          <div className="max-w-3xl">
            {category === "px-to-rem" ? (
              <>
                <p className="mb-6">
                  Using REM units instead of PX can transform your web design. REM (root em) is relative to the root element's font size, making it perfect for responsive layouts. For instance, if you set the base font size to 16px, then 1rem = 16px, 2rem = 32px, and so on.
                </p>
                <p className="mb-6">
                  This scalability ensures your text and elements adjust proportionally across devices, improving accessibility and user experience. It's ideal for typography, where users can adjust font sizes via browser settings, and for layouts that need to scale with screen size.
                </p>
              </>
            ) : category === "rem-to-px" ? (
              <p className="mb-6">
                Converting REM to PX is essential when you need exact pixel measurements. While REM units are great for responsive design, sometimes you need precise pixel values for debugging layouts, aligning with design specifications, or handling legacy systems that require pixel values.
              </p>
            ) : (
              <p className="mb-6">
                Converting {fromUnit} to {toUnit} is crucial for modern web development. Whether you're switching {category === "em-to-px" ? "EM to PX for precise debugging" : category === "px-to-em" ? "PX to EM for parent-based scaling" : category === "px-to-rem" ? "PX to REM for responsive design" : "REM to PX for pixel accuracy"}, this tool simplifies your workflow.
              </p>
            )}
            
            <ul className="list-disc pl-6 max-w-3xl space-y-2">
              {category === "px-to-rem" ? (
                <>
                  <li>Creates responsive layouts that scale with user preferences</li>
                  <li>Builds accessible websites that respect browser font size settings</li>
                  <li>Maintains consistent spacing and proportions throughout your design</li>
                  <li>Simplifies design systems with scalable units</li>
                </>
              ) : category === "rem-to-px" ? (
                <>
                  <li>Helps communicate exact dimensions with designers</li>
                  <li>Makes debugging layout issues easier</li>
                  <li>Provides absolute size understanding for elements</li>
                  <li>Useful for setting border widths and other small details</li>
                </>
              ) : (
                <>
                  <li>
                    {category === "em-to-px"
                      ? "Convert EM to PX to align with pixel-based designs or mockups."
                      : category === "px-to-em"
                      ? "PX to EM ensures elements scale relative to parent font sizes."
                      : category === "px-to-rem"
                      ? "PX to REM ensures responsive, accessible designs."
                      : "REM to PX helps verify pixel-perfect layouts."}
                  </li>
                  <li>Improves consistency across typography and spacing.</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Enhanced Comparison Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {fromUnit.toUpperCase()} vs {toUnit.toUpperCase()}: Key Differences
          </h2>
          <p className="mb-6 max-w-3xl">
            Understanding the differences between {fromUnit} and {toUnit} helps you choose the right unit for your CSS projects.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full max-w-3xl mx-auto border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Feature</th>
                  <th className="border px-4 py-2 text-left">{fromUnit.toUpperCase()}</th>
                  <th className="border px-4 py-2 text-left">{toUnit.toUpperCase()}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-medium">Unit Type</td>
                  <td className="border px-4 py-2">
                    {fromUnit === "px" ? "Absolute" : "Relative"}
                  </td>
                  <td className="border px-4 py-2">
                    {toUnit === "px" ? "Absolute" : "Relative"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">Relative To</td>
                  <td className="border px-4 py-2">
                    {fromUnit === "px" ? "None (fixed)" : 
                     fromUnit === "em" ? "Parent element" : "Root element"}
                  </td>
                  <td className="border px-4 py-2">
                    {toUnit === "px" ? "None (fixed)" : 
                     toUnit === "em" ? "Parent element" : "Root element"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">Best For</td>
                  <td className="border px-4 py-2">
                    {fromUnit === "px" ? "Fixed layouts, small details" : 
                     fromUnit === "em" ? "Component-based scaling" : "Global responsive scaling"}
                  </td>
                  <td className="border px-4 py-2">
                    {toUnit === "px" ? "Fixed layouts, small details" : 
                     toUnit === "em" ? "Component-based scaling" : "Global responsive scaling"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">Example</td>
                  <td className="border px-4 py-2">
                    <code>{fromUnit === "px" ? "font-size: 16px" : 
                           fromUnit === "em" ? "font-size: 1em" : "font-size: 1rem"}</code>
                  </td>
                  <td className="border px-4 py-2">
                    <code>{toUnit === "px" ? "font-size: 16px" : 
                           toUnit === "em" ? "font-size: 1em" : "font-size: 1rem"}</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="mt-6 max-w-3xl mx-auto text-gray-700">
            {category === "px-to-rem" ? 
              "While PX (pixels) provides fixed, precise sizing, REM (root em) offers scalability and better accessibility. REM units adjust when users change their browser's font size preferences, making your design more inclusive and adaptable." :
              "Both units have their place in modern web development. Choose based on your specific needs for either fixed precision or responsive scaling."}
          </p>
        </div>
      </section>

      {/* Enhanced CSS Examples Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Practical CSS Examples with {toUnit.toUpperCase()} Units
          </h2>
          <p className="mb-6 max-w-3xl">
            {category === "px-to-rem" ?
              "See how REM units can be used throughout your CSS to create responsive, scalable designs. These examples show how to apply REM to various properties beyond just typography." :
              `See how ${toUnit} units work in CSS after converting from ${fromUnit}. These examples highlight practical usage.`}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Typography</h3>
              <pre className="text-sm overflow-x-auto bg-gray-100 p-4 rounded">
                {`html {
  font-size: 16px; /* Base size */
}

h1 { 
  font-size: ${category === "px-to-rem" ? "2rem" : "32px"}; 
  /* ${category === "px-to-rem" ? "32px" : "2rem"} */ 
}

h2 {
  font-size: ${category === "px-to-rem" ? "1.5rem" : "24px"};
  /* ${category === "px-to-rem" ? "24px" : "1.5rem"} */
}

p { 
  font-size: ${category === "px-to-rem" ? "1rem" : "16px"}; 
  /* ${category === "px-to-rem" ? "16px" : "1rem"} */ 
}

small {
  font-size: ${category === "px-to-rem" ? "0.875rem" : "14px"};
  /* ${category === "px-to-rem" ? "14px" : "0.875rem"} */
}`}
              </pre>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Layout & Spacing</h3>
              <pre className="text-sm overflow-x-auto bg-gray-100 p-4 rounded">
                {`.container {
  max-width: ${category === "px-to-rem" ? "60rem" : "960px"}; 
  /* ${category === "px-to-rem" ? "960px" : "60rem"} */
  padding: ${category === "px-to-rem" ? "1.5rem" : "24px"};
  margin: ${category === "px-to-rem" ? "1rem" : "16px"} auto;
}

.card {
  width: ${category === "px-to-rem" ? "20rem" : "320px"};
  /* ${category === "px-to-rem" ? "320px" : "20rem"} */
  border-radius: ${category === "px-to-rem" ? "0.5rem" : "8px"};
  /* ${category === "px-to-rem" ? "8px" : "0.5rem"} */
}

.button {
  height: ${category === "px-to-rem" ? "2.5rem" : "40px"};
  padding: ${category === "px-to-rem" ? "0.5rem 1rem" : "8px 16px"};
}`}
              </pre>
            </div>
          </div>
          
          {category === "px-to-rem" && (
            <div className="bg-blue-50 p-6 rounded-lg mt-8 max-w-3xl mx-auto">
              <h3 className="text-lg font-semibold mb-2 text-blue-700">Why REM works better than PX</h3>
              <p className="text-blue-800">
                Notice how all sizes are defined relative to the root font size (16px). If a user changes their browser font size or you adjust the root size in your CSS, all elements using REM will scale proportionally, maintaining your design's harmony while adapting to different viewing conditions.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">How do I convert {fromUnit} to {toUnit}?</h3>
              <p>
                {category === "px-to-em"
                  ? "Divide the PX value by the parent font size (e.g., 16px). For example, 16px to EM = 16 ÷ 16 = 1em."
                  : category === "px-to-rem"
                  ? "Divide the PX value by the root font size (e.g., 16px). For example, 24px to REM = 24 ÷ 16 = 1.5rem."
                  : category === "em-to-px"
                  ? "Multiply the EM value by the parent font size (e.g., 16px). For example, 1em to PX = 1 × 16 = 16px."
                  : "Multiply the REM value by the root font size (e.g., 16px). For example, 1.5rem to PX = 1.5 × 16 = 24px."}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What's the difference between EM and REM?</h3>
              <p>
                EM is relative to the parent element's font size, while REM is relative to the root font size. This means REM provides more consistent sizing across your entire website, while EM scaling depends on the local context of each element.
              </p>
            </div>
            
            {/* 添加新的FAQ问题 */}
            {category === "px-to-rem" && (
              <>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can I use REM for properties other than font-size?</h3>
                  <p>
                    Yes! REM can be used for any CSS length property, including margins, padding, width, height, and border-radius. This creates a consistent scaling system throughout your entire design.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Why should I use REM instead of PX?</h3>
                  <p>
                    REM units create more accessible and responsive designs. They automatically adjust when users change their browser's font size, making your site more usable for people with visual impairments. They also maintain proportions when scaling across different screen sizes.
                  </p>
                </div>
              </>
            )}
            
            {category === "rem-to-px" && (
              <div>
                <h3 className="text-xl font-semibold mb-2">When should I convert REM back to PX?</h3>
                <p>
                  Converting REM to PX is useful when communicating with designers who work in pixel values, debugging layout issues, or when working with tools and libraries that require pixel inputs.
                </p>
              </div>
            )}
            
            <div>
              <h3 className="text-xl font-semibold mb-2">What if my base font size is not 16px?</h3>
              <p>
                Not a problem! Our converter allows you to adjust the root font size setting to match your project's base font size, ensuring accurate conversions specific to your design system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-12 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Start Converting {fromUnit.toUpperCase()} to {toUnit.toUpperCase()} Now
          </h2>
          <p className="mb-8 max-w-2xl mx-auto">
            {category === "px-to-rem" 
              ? "Ready to make your designs more responsive and accessible? Use our free PX to REM converter to transform your pixel values into scalable REM units today!"
              : `Simplify your CSS with our free ${fromUnit} to ${toUnit} converter. Convert values like ${category === "em-to-px" ? "1em to PX" : category === "px-to-em" ? "16px to EM" : category === "px-to-rem" ? "16px to REM" : "1rem to PX"} instantly!`}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/${category}`} className="inline-block bg-white text-primary-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100">
              {category === "px-to-rem" 
                ? "Convert PX to REM" 
                : category === "rem-to-px" 
                ? "Convert REM to PX"
                : `Convert ${fromUnit.toUpperCase()} to ${toUnit.toUpperCase()}`}
            </Link>
            
            {/* 添加相关转换工具链接 */}
            {category === "px-to-rem" ? (
              <Link href={`/${locale}/rem-to-px`} className="inline-block bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-800">
                Try REM to PX Converter
              </Link>
            ) : category === "rem-to-px" ? (
              <Link href={`/${locale}/px-to-rem`} className="inline-block bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-800">
                Try PX to REM Converter
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}