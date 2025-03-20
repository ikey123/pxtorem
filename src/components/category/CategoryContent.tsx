"use client";

import Converter from "@/components/converter/Converter";
import CategoryIntro from "@/components/category/CategoryIntro";
import ConversionTable from "@/components/category/ConversionTable";
import Link from "next/link";
import { useTranslations } from "next-intl";

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

  // 转换函数，默认基准字体 16px
  const formatConversion = (value: number): string => {
    if (category === "px-to-em" || category === "px-to-rem") {
      const result = value / 16;
      return result.toFixed(4).replace(/\.?0+$/, "");
    } else {
      return (value * 16).toString(); // em-to-px 和 rem-to-px 都乘以 16
    }
  };

  return (
    <main className="text-gray-700">
      {/* Intro Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-8">
        <div className="container mx-auto px-4">
          <CategoryIntro category={category} />
        </div>
      </section>

      {/* Converter Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {category === "em-to-px" ? "EM to PX Converter" 
              : category === "px-to-em" ? "PX to EM Converter" 
              : category === "px-to-rem" ? "PX to REM Converter" 
              : "REM to PX Converter"}
          </h1>
          <p className="mb-6 max-w-3xl">
            {category === "em-to-px"
              ? "Instantly convert EM to PX with our free EM to PX converter. Designed for web developers, this tool transforms EM units into pixel values, making it easy to align designs with pixel-based specifications or debug layouts."
              : category === "px-to-em"
              ? "Effortlessly convert PX to EM with our free PX to EM converter. Tailored for web developers, this tool transforms pixels into EM units, perfect for flexible layouts that adapt to parent font sizes."
              : category === "px-to-rem"
              ? "Easily convert PX to REM with our free online PX to REM converter. Perfect for responsive web design, this tool helps you transform pixel values into scalable REM units."
              : "Instantly convert REM to PX with our free REM to PX converter. Designed for developers and designers, this tool provides accurate pixel values from REM units."}
          </p>
          <Converter 
            initialFromUnit={fromUnit as "px" | "rem" | "em"} 
            initialToUnit={toUnit as "px" | "rem" | "em"} 
            locale={locale} 
          />
        </div>
      </section>

      {/* Popular Conversions Grid */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Popular {fromUnit.toUpperCase()} to {toUnit.toUpperCase()} Conversions
          </h2>
          <p className="mb-6 max-w-3xl">
            Explore the most popular {fromUnit} to {toUnit} conversions, such as {category === "em-to-px" ? "1em to PX" : category === "px-to-em" ? "16px to EM" : category === "px-to-rem" ? "16px to REM" : "1.5rem to PX"}, based on a standard 16px font size.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {commonValues.map((value) => (
              <div
                key={value}
                className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow duration-200"
              >
                <div className="font-medium">
                  {value}
                  {fromUnit}
                </div>
                <div className="text-gray-500">↓</div>
                <div className="font-medium">
                  {formatConversion(value)}
                  {toUnit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Use Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Why Convert {fromUnit.toUpperCase()} to {toUnit.toUpperCase()}?
          </h2>
          <p className="mb-6 max-w-3xl">
            Converting {fromUnit} to {toUnit} is crucial for modern web development. Whether you're switching {category === "em-to-px" ? "EM to PX for precise debugging" : category === "px-to-em" ? "PX to EM for parent-based scaling" : category === "px-to-rem" ? "PX to REM for responsive design" : "REM to PX for pixel accuracy"}, this tool simplifies your workflow.
          </p>
          <ul className="list-disc pl-6 max-w-3xl space-y-2">
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
            <li>Fast conversions for values like {category === "em-to-px" ? "1.5em to PX" : category === "px-to-em" ? "24px to EM" : category === "px-to-rem" ? "24px to REM" : "2rem to PX"}.</li>
          </ul>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {fromUnit.toUpperCase()} vs {toUnit.toUpperCase()}: Key Differences
          </h2>
          <p className="mb-6 max-w-3xl">
            Understanding {fromUnit} vs {toUnit} helps you choose the right unit for your CSS. Here's how they compare.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">{fromUnit.toUpperCase()}</h3>
              <ul className="space-y-2">
                <li>{category === "em-to-px" || category === "px-to-em" ? "Relative to parent font size (e.g., 1em)." : category === "px-to-rem" ? "Fixed units (e.g., 16px)." : "Relative to root font size (e.g., 1rem)."}</li>
                <li>{category === "em-to-px" || category === "px-to-em" ? "Ideal for nested scaling." : category === "px-to-rem" ? "Best for static elements." : "Scales with root settings."}</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">{toUnit.toUpperCase()}</h3>
              <ul className="space-y-2">
                <li>{category === "em-to-px" ? "Fixed units for precision (e.g., 16px)." : category === "px-to-em" ? "Relative to parent font size (e.g., 1em)." : category === "px-to-rem" ? "Relative to root font size (e.g., 1rem)." : "Fixed units (e.g., 16px)."}</li>
                <li>{category === "em-to-px" ? "Perfect for debugging." : category === "px-to-em" || category === "px-to-rem" ? "Ideal for responsive design." : "Best for static precision."}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Table Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {fromUnit.toUpperCase()} to {toUnit.toUpperCase()} Conversion Table
          </h2>
          <p className="mb-6 max-w-3xl">
            Browse our detailed {fromUnit} to {toUnit} conversion table for quick reference. Convert values like {category === "em-to-px" ? "1em to PX" : category === "px-to-em" ? "16px to EM" : category === "px-to-rem" ? "16px to REM" : "1.5rem to PX"} effortlessly.
          </p>
          <ConversionTable category={category} hideSearchVolume={true} />
        </div>
      </section>

      {/* CSS Examples Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            CSS Examples with {toUnit.toUpperCase()} Units
          </h2>
          <p className="mb-6 max-w-3xl">
            See how {toUnit} units work in CSS after converting from {fromUnit}. These examples highlight practical usage.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Typography</h3>
              <pre className="text-sm overflow-x-auto bg-gray-100 p-4 rounded">
                {`.parent {
  font-size: 16px;
}
h1 { font-size: ${category === "em-to-px" ? "32px" : category === "px-to-em" ? "2em" : category === "px-to-rem" ? "2rem" : "32px"}; /* ${category === "em-to-px" ? "2em" : category === "px-to-em" ? "32px" : category === "px-to-rem" ? "32px" : "2rem"} */ }
p { font-size: ${category === "em-to-px" ? "16px" : category === "px-to-em" ? "1em" : category === "px-to-rem" ? "1rem" : "16px"}; /* ${category === "em-to-px" ? "1em" : category === "px-to-em" ? "16px" : category === "px-to-rem" ? "16px" : "1rem"} */ }`}
              </pre>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Spacing</h3>
              <pre className="text-sm overflow-x-auto bg-gray-100 p-4 rounded">
                {`.container {
  padding: ${category === "em-to-px" ? "24px" : category === "px-to-em" ? "1.5em" : category === "px-to-rem" ? "1.5rem" : "24px"}; /* ${category === "em-to-px" ? "1.5em" : category === "px-to-em" ? "24px" : category === "px-to-rem" ? "24px" : "1.5rem"} */
  margin: ${category === "em-to-px" ? "16px" : category === "px-to-em" ? "1em" : category === "px-to-rem" ? "1rem" : "16px"} auto; /* ${category === "em-to-px" ? "1em" : category === "px-to-em" ? "16px" : category === "px-to-rem" ? "16px" : "1rem"} */
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">How do I convert {fromUnit} to {toUnit}?</h3>
              <p>
                {category === "em-to-px"
                  ? "Multiply the EM value by the parent font size (e.g., 16px). For example, 1em to PX = 1 × 16 = 16px."
                  : category === "px-to-em"
                  ? "Divide the PX value by the parent font size (e.g., 16px). For example, 16px to EM = 16 ÷ 16 = 1em."
                  : category === "px-to-rem"
                  ? "Divide the PX value by the root font size (e.g., 16px). For example, 24px to REM = 24 ÷ 16 = 1.5rem."
                  : "Multiply the REM value by the root font size (e.g., 16px). For example, 1.5rem to PX = 1.5 × 16 = 24px."}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What's the difference between EM and REM?</h3>
              <p>
                EM is relative to the parent font size, while REM is relative to the root font size. Use our EM to PX converter for precise pixel values or PX to EM for parent-based scaling.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Why use an {fromUnit} to {toUnit} converter?</h3>
              <p>
                An {fromUnit} to {toUnit} converter ensures accuracy and saves time, especially for values like {category === "em-to-px" ? "2em to PX" : category === "px-to-em" ? "24px to EM" : category === "px-to-rem" ? "16px to REM" : "1rem to PX"}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Try Our {fromUnit.toUpperCase()} to {toUnit.toUpperCase()} Converter</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Simplify your CSS with our free {fromUnit} to {toUnit} converter. Convert values like {category === "em-to-px" ? "1em to PX" : category === "px-to-em" ? "16px to EM" : category === "px-to-rem" ? "16px to REM" : "1rem to PX"} instantly!
          </p>
          <Link href={`/${locale}/${category}`} className="inline-block bg-white text-primary-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100">
            Convert Now
          </Link>
        </div>
      </section>
    </main>
  );
}