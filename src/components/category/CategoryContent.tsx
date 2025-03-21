"use client";

import Converter from "@/components/converter/Converter";
import CategoryIntro from "@/components/category/CategoryIntro";
import ConversionTable from "@/components/category/ConversionTable";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

interface CategoryContentProps {
  locale: string;
  category: string;
}

export default function CategoryContent({ locale, category }: CategoryContentProps) {
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
      
      {/* 转换表部分 */}
      <div className="my-12">
        {/* <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {category === 'px-to-rem' ? 'PX to REM Conversion Table' : 'REM to PX Conversion Table'}
        </h2> */}
        <div className="overflow-x-auto max-w-4xl mx-auto">
          <ConversionTable 
            category={category} 
          />
        </div>
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
                  <li>Enter your {category === 'px-to-rem' ? 'px' : 'rem'} value in the 'From' field</li>
                  <li>Adjust the root font size if needed (default is 16px)</li>
                  <li>Get your converted {category === 'px-to-rem' ? 'rem' : 'px'} value instantly</li>
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
                initialFromUnit={category === 'px-to-rem' ? 'px' : 'rem'} 
                initialToUnit={category === 'px-to-rem' ? 'rem' : 'px'} 
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
            Why Convert {category === 'px-to-rem' ? 'px' : 'rem'} to {category === 'px-to-rem' ? 'rem' : 'px'}?
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
            ) : (
              <p className="mb-6">
                Converting {category === 'px-to-rem' ? 'px' : 'rem'} to {category === 'px-to-rem' ? 'rem' : 'px'} is crucial for modern web development. Whether you're switching {category === "em-to-px" ? "EM to PX for precise debugging" : category === "px-to-em" ? "PX to EM for parent-based scaling" : "REM to PX for pixel accuracy"}, this tool simplifies your workflow.
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
              ) : (
                <>
                  <li>
                    {category === "em-to-px"
                      ? "Convert EM to PX to align with pixel-based designs or mockups."
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
            {category === 'px-to-rem' ? 'px' : 'rem'} vs {category === 'px-to-rem' ? 'rem' : 'px'}: Key Differences
          </h2>
          <p className="mb-6 max-w-3xl">
            Understanding the differences between {category === 'px-to-rem' ? 'px' : 'rem'} and {category === 'px-to-rem' ? 'rem' : 'px'} helps you choose the right unit for your CSS projects.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full max-w-3xl mx-auto border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Feature</th>
                  <th className="border px-4 py-2 text-left">{category === 'px-to-rem' ? 'px' : 'rem'}</th>
                  <th className="border px-4 py-2 text-left">{category === 'px-to-rem' ? 'rem' : 'px'}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-medium">Unit Type</td>
                  <td className="border px-4 py-2">
                    {category === 'px-to-rem' ? "Absolute" : "Relative"}
                  </td>
                  <td className="border px-4 py-2">
                    {category === 'px-to-rem' ? "Relative" : "Absolute"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">Relative To</td>
                  <td className="border px-4 py-2">
                    {category === 'px-to-rem' ? "None (fixed)" : 
                     category === 'rem-to-px' ? "Parent element" : "Root element"}
                  </td>
                  <td className="border px-4 py-2">
                    {category === 'px-to-rem' ? "None (fixed)" : 
                     category === 'rem-to-px' ? "Parent element" : "Root element"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">Best For</td>
                  <td className="border px-4 py-2">
                    {category === 'px-to-rem' ? "Fixed layouts, small details" : 
                     category === 'rem-to-px' ? "Component-based scaling" : "Global responsive scaling"}
                  </td>
                  <td className="border px-4 py-2">
                    {category === 'px-to-rem' ? "Fixed layouts, small details" : 
                     category === 'rem-to-px' ? "Component-based scaling" : "Global responsive scaling"}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">Example</td>
                  <td className="border px-4 py-2">
                    <code>{category === 'px-to-rem' ? "font-size: 16px" : "font-size: 1rem"}</code>
                  </td>
                  <td className="border px-4 py-2">
                    <code>{category === 'px-to-rem' ? "font-size: 16px" : "font-size: 1rem"}</code>
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
            Practical CSS Examples with {category === 'px-to-rem' ? 'rem' : 'px'} Units
          </h2>
          <p className="mb-6 max-w-3xl">
            {category === "px-to-rem" ?
              "See how REM units can be used throughout your CSS to create responsive, scalable designs. These examples show how to apply REM to various properties beyond just typography." :
              `See how ${category === 'px-to-rem' ? 'rem' : 'px'} units work in CSS after converting from ${category === 'px-to-rem' ? 'px' : 'rem'}. These examples highlight practical usage.`}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Typography</h3>
              <pre className="text-sm overflow-x-auto bg-gray-100 p-4 rounded">
                {`html {
  font-size: 16px; /* Base size */
}

h1 { 
  font-size: ${category === 'px-to-rem' ? '2rem' : '32px'}; 
  /* ${category === 'px-to-rem' ? '32px' : '2rem'} */ 
}

h2 {
  font-size: ${category === 'px-to-rem' ? '1.5rem' : '24px'};
  /* ${category === 'px-to-rem' ? '24px' : '1.5rem'} */
}

p { 
  font-size: ${category === 'px-to-rem' ? '1rem' : '16px'}; 
  /* ${category === 'px-to-rem' ? '16px' : '1rem'} */ 
}

small {
  font-size: ${category === 'px-to-rem' ? '0.875rem' : '14px'};
  /* ${category === 'px-to-rem' ? '14px' : '0.875rem'} */
}`}
              </pre>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Layout & Spacing</h3>
              <pre className="text-sm overflow-x-auto bg-gray-100 p-4 rounded">
                {`.container {
  max-width: ${category === 'px-to-rem' ? '60rem' : '960px'}; 
  /* ${category === 'px-to-rem' ? '960px' : '60rem'} */
  padding: ${category === 'px-to-rem' ? '1.5rem' : '24px'};
  margin: ${category === 'px-to-rem' ? '1rem' : '16px'} auto;
}

.card {
  width: ${category === 'px-to-rem' ? '20rem' : '320px'};
  /* ${category === 'px-to-rem' ? '320px' : '20rem'} */
  border-radius: ${category === 'px-to-rem' ? '0.5rem' : '8px'};
  /* ${category === 'px-to-rem' ? '8px' : '0.5rem'} */
}

.button {
  height: ${category === 'px-to-rem' ? '2.5rem' : '40px'};
  padding: ${category === 'px-to-rem' ? '0.5rem 1rem' : '8px 16px'};
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
              <h3 className="text-xl font-semibold mb-2">How do I convert {category === 'px-to-rem' ? 'px' : 'rem'} to {category === 'px-to-rem' ? 'rem' : 'px'}?</h3>
              <p>
                {category === "px-to-rem"
                  ? "Divide the PX value by the root font size (e.g., 16px). For example, 24px to REM = 24 ÷ 16 = 1.5rem."
                  : "Multiply the REM value by the root font size (e.g., 16px). For example, 1.5rem to PX = 1.5 × 16 = 24px."}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What's the difference between REM and PX?</h3>
              <p>
                REM is relative to the root font size, while PX is absolute. This means REM provides more consistent sizing across your entire website, while PX provides fixed, precise sizing.
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
            Start Converting {category === 'px-to-rem' ? 'px' : 'rem'} to {category === 'px-to-rem' ? 'rem' : 'px'} Now
          </h2>
          <p className="mb-8 max-w-2xl mx-auto">
            {category === "px-to-rem" 
              ? "Ready to make your designs more responsive and accessible? Use our free PX to REM converter to transform your pixel values into scalable REM units today!"
              : `Simplify your CSS with our free ${category === 'px-to-rem' ? 'px' : 'rem'} to ${category === 'px-to-rem' ? 'rem' : 'px'} converter. Convert values like ${category === 'px-to-rem' ? '16px to REM' : '1rem to PX'} instantly!`}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/${category}`} className="inline-block bg-white text-primary-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100">
              {category === "px-to-rem" 
                ? "Convert PX to REM" 
                : "Convert REM to PX"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}