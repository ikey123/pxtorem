"use client";

import Converter from "@/components/converter/Converter";
import CategoryIntro from "@/components/category/CategoryIntro";
import ConversionTable from "@/components/category/ConversionTable";
import Link from "next/link";

export default function CategoryContent({
  locale,
  category,
  title,
}: {
  locale: string;
  category: string;
  title: string;
}) {
  const fromUnit = category === "px-to-rem" ? "px" : "rem";
  const toUnit = category === "px-to-rem" ? "rem" : "px";

  // Common conversion values based on keyword research
  const commonValues = category === "px-to-rem"
    ? [8, 10, 12, 14, 16, 18, 20, 24, 32, 36, 40, 48, 64]
    : [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6];

  // Conversion function (assuming 16px root font size)
  const formatConversion = (value: number): string => {
    if (category === "px-to-rem") {
      const result = value / 16;
      return result.toFixed(4).replace(/\.?0+$/, "");
    } else {
      return (value * 16).toString();
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
            {category === "px-to-rem" ? "PX to REM Converter" : "REM to PX Converter"}
          </h1>
          <p className="mb-6 max-w-3xl">
            {category === "px-to-rem"
              ? "Easily convert PX to REM with our free online PX to REM converter. Perfect for responsive web design, this tool helps you transform pixel values into scalable REM units, ensuring your layouts adapt seamlessly to any screen size or user preference."
              : "Instantly convert REM to PX with our free REM to PX converter. Designed for developers and designers, this tool provides accurate pixel values from REM units, making it simple to debug layouts or align designs with pixel-based mockups."}
          </p>
          <Converter initialFromUnit={fromUnit as "px" | "rem"} initialToUnit={toUnit as "px" | "rem"} locale={locale} />
        </div>
      </section>

      {/* Popular Conversions Grid */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Popular {fromUnit.toUpperCase()} to {toUnit.toUpperCase()} Conversions
          </h2>
          <p className="mb-6 max-w-3xl">
            Check out these popular {fromUnit} to {toUnit} conversions based on a standard 16px root font size. Whether you need to convert 16px to REM or 1.5rem to PX, our tool makes it fast and accurate.
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
            Converting {fromUnit} to {toUnit} is essential for modern web development. Whether you're switching from PX to REM for responsive design or REM to PX for precise debugging, understanding when and why to use these units can elevate your projects.
          </p>
          <ul className="list-disc pl-6 max-w-3xl space-y-2">
            <li>
              <strong>Responsive Design:</strong> {category === "px-to-rem" ? "PX to REM conversion ensures your layouts scale smoothly across devices." : "REM to PX conversion helps verify responsive designs in pixel terms."}
            </li>
            <li>
              <strong>Accessibility:</strong> {category === "px-to-rem" ? "REM units adapt to user font size preferences, unlike fixed PX values." : "Converting REM to PX lets you check accessibility compliance."}
            </li>
            <li>
              <strong>Consistency:</strong> Maintain uniform spacing and typography by using {toUnit} units effectively.
            </li>
            <li>
              <strong>Efficiency:</strong> Save time with our {fromUnit} to {toUnit} calculator instead of manual calculations.
            </li>
          </ul>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">PX vs REM: Key Differences</h2>
          <p className="mb-6 max-w-3xl">
            Wondering about PX vs REM? Here's a breakdown to help you decide when to convert PX to REM or REM to PX in your CSS projects.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">PX (Pixels)</h3>
              <ul className="space-y-2">
                <li>Fixed units, ideal for precise control (e.g., 1px borders).</li>
                <li>Doesn't scale with user font settings.</li>
                <li>Best for small, static elements like shadows or hairlines.</li>
                <li>Common in design mockups (e.g., 16px text).</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">REM (Root EM)</h3>
              <ul className="space-y-2">
                <li>Relative to root font size (default 16px), scales dynamically.</li>
                <li>Perfect for typography, spacing, and responsive layouts.</li>
                <li>Enhances accessibility by respecting user preferences.</li>
                <li>Simplifies maintenance with fewer media queries.</li>
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
            Explore our detailed {fromUnit} to {toUnit} conversion table. Whether you're converting 16px to REM or 1.5rem to PX, this table provides quick reference values based on a 16px root font size.
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
            See how to use {toUnit} units in your CSS after converting from {fromUnit}. These practical examples show PX to REM and REM to PX in action.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Typography</h3>
              <pre className="text-sm overflow-x-auto bg-gray-100 p-4 rounded">
                {`html {
  font-size: 16px;
}
h1 { font-size: ${category === "px-to-rem" ? "2rem" : "32px"}; /* ${category === "px-to-rem" ? "32px" : "2rem"} */ }
p { font-size: ${category === "px-to-rem" ? "1rem" : "16px"}; /* ${category === "px-to-rem" ? "16px" : "1rem"} */ }
small { font-size: ${category === "px-to-rem" ? "0.75rem" : "12px"}; /* ${category === "px-to-rem" ? "12px" : "0.75rem"} */ }`}
              </pre>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Spacing</h3>
              <pre className="text-sm overflow-x-auto bg-gray-100 p-4 rounded">
                {`.container {
  padding: ${category === "px-to-rem" ? "1.5rem" : "24px"}; /* ${category === "px-to-rem" ? "24px" : "1.5rem"} */
  margin: ${category === "px-to-rem" ? "1rem" : "16px"} auto; /* ${category === "px-to-rem" ? "16px" : "1rem"} */
}
.card {
  border: 1px solid #ddd; /* PX for precision */
  border-radius: ${category === "px-to-rem" ? "0.5rem" : "8px"}; /* ${category === "px-to-rem" ? "8px" : "0.5rem"} */
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Design Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {fromUnit.toUpperCase()} to {toUnit.toUpperCase()} in Responsive Design
          </h2>
          <p className="mb-6 max-w-3xl">
            Using a {fromUnit} to {toUnit} converter is key to building responsive websites. Here's how {toUnit} units enhance your design workflow.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Media Queries</h3>
              <pre className="text-sm overflow-x-auto bg-gray-100 p-4 rounded mb-4">
                {`@media (min-width: ${category === "px-to-rem" ? "48rem" : "768px"}) { /* ${category === "px-to-rem" ? "768px" : "48rem"} */
  .content {
    font-size: ${category === "px-to-rem" ? "1.125rem" : "18px"}; /* ${category === "px-to-rem" ? "18px" : "1.125rem"} */
  }
}`}
              </pre>
              <p>REM-based media queries scale with user settings, improving accessibility.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Component Scaling</h3>
              <pre className="text-sm overflow-x-auto bg-gray-100 p-4 rounded mb-4">
                {`.button {
  padding: ${category === "px-to-rem" ? "0.75rem 1.25rem" : "12px 20px"}; /* ${category === "px-to-rem" ? "12px 20px" : "0.75rem 1.25rem"} */
  font-size: ${category === "px-to-rem" ? "1rem" : "16px"}; /* ${category === "px-to-rem" ? "16px" : "1rem"} */
}`}
              </pre>
              <p>Components scale proportionally with {toUnit} units.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">How do I convert {fromUnit} to {toUnit}?</h3>
              <p>
                {category === "px-to-rem"
                  ? "To convert PX to REM, divide the pixel value by the root font size (e.g., 16px). For example, 24px to REM is 24 ÷ 16 = 1.5rem."
                  : "To convert REM to PX, multiply the REM value by the root font size (e.g., 16px). For example, 1.5rem to PX is 1.5 × 16 = 24px."}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Why use a {fromUnit} to {toUnit} converter?</h3>
              <p>
                A {fromUnit} to {toUnit} converter saves time and ensures accuracy, especially for common values like 16px to REM or 1rem to PX.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What's better: PX or REM?</h3>
              <p>
                REM is better for responsive design and accessibility, while PX offers precision for fixed elements. Use our PX to REM converter to find the perfect balance.
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
            Ready to streamline your CSS workflow? Use our free {fromUnit} to {toUnit} calculator now and make your designs more responsive and accessible.
          </p>
          <Link
            href={`/${locale}/${category}`}
            className="inline-block bg-white text-primary-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100"
          >
            Convert Now
          </Link>
        </div>
      </section>
    </main>
  );
}