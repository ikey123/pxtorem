"use client";

import { useTranslations } from "next-intl";
import Converter from "@/components/converter/Converter";
import Link from "next/link";

export default function HomeContent({ locale }: { locale: string }) {
  const t = useTranslations("home");

  // Popular Unit Conversions 数据，仅显示已有类别页的转换
  const popularConversions = [
    {
      category: "PX",
      conversions: [
        { title: "PX to REM", path: `/${locale}/px-to-rem`, active: true },
        // 以下未实现，暂时隐藏
        // { title: "PX to EM", path: `/${locale}/px-to-em` },
        // { title: "PX to VW", path: `/${locale}/px-to-vw` },
        // { title: "PX to VH", path: `/${locale}/px-to-vh` },
        // { title: "PX to PT", path: `/${locale}/px-to-pt` },
        // { title: "PX to IN", path: `/${locale}/px-to-in` },
        // { title: "PX to PC", path: `/${locale}/px-to-pc` },
        // { title: "PX to CM", path: `/${locale}/px-to-cm` },
        // { title: "PX to MM", path: `/${locale}/px-to-mm` },
        // { title: "PX to Percent", path: `/${locale}/px-to-percent` },
      ],
    },
    {
      category: "REM",
      conversions: [
        { title: "REM to PX", path: `/${locale}/rem-to-px`, active: true },
        // 以下未实现，暂时隐藏
        // { title: "REM to EM", path: `/${locale}/rem-to-em` },
        // { title: "REM to VW", path: `/${locale}/rem-to-vw` },
        // { title: "REM to VH", path: `/${locale}/rem-to-vh` },
        // { title: "REM to PT", path: `/${locale}/rem-to-pt` },
        // { title: "REM to IN", path: `/${locale}/rem-to-in` },
        // { title: "REM to PC", path: `/${locale}/rem-to-pc` },
        // { title: "REM to CM", path: `/${locale}/rem-to-cm` },
        // { title: "REM to MM", path: `/${locale}/rem-to-mm` },
        // { title: "REM to Percent", path: `/${locale}/rem-to-percent` },
      ],
    },
  ];

  return (
    <main className="text-gray-700">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            CSS Unit Converter: PX to REM, REM to PX, and More
          </h1>
          <p className="text-lg mb-8 text-gray-600">
            Instantly convert between PX to REM, REM to PX, and other CSS units with our free online tool. Whether you're designing responsive layouts or ensuring accessibility, our converter simplifies your workflow. Try it now and see how easy it is to switch from PX to REM or REM to PX!
          </p>
          <Converter />
        </div>
      </section>

      {/* Popular Unit Conversions Section - 上移且紧凑 */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t("popular.title") || "Popular Unit Conversions"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {popularConversions.map((group) => (
              <div
                key={group.category}
                className="bg-white p-5 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{group.category}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {group.conversions
                    .filter((conv) => conv.active) // 只显示激活的转换
                    .map((conv) => (
                      <Link
                        key={conv.title}
                        href={conv.path}
                        className="text-gray-600 hover:text-primary-600 transition-colors text-sm"
                      >
                        {conv.title}
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Features of Our CSS Unit Converter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Fast PX to REM Conversion</h3>
              <p>
                Convert PX to REM instantly with precision. Perfect for developers needing quick calculations to adapt designs from pixel-based mockups to scalable REM units for modern web design.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Accurate REM to PX Results</h3>
              <p>
                Switch from REM to PX effortlessly. Understand the exact pixel values of your REM-based designs, ensuring consistency across devices and screen sizes with our reliable REM to PX tool.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Future-Ready for More Units</h3>
              <p>
                Beyond PX to REM and REM to PX, our tool is built to expand. Soon, you'll convert to EM, VH, VW, and more, making it your go-to resource for all CSS unit conversions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Use PX to REM and REM to PX?</h2>
          <p className="mb-6 max-w-3xl mx-auto">
            Choosing between PX to REM or REM to PX depends on your project's needs. Pixels (PX) offer fixed, predictable sizing, while REM units scale dynamically with the root font size, enhancing accessibility and responsiveness. Our tool bridges these units seamlessly, helping you optimize your CSS workflow. Whether you're converting PX to REM for scalable layouts or REM to PX for precise debugging, we've got you covered.
          </p>
          <ul className="list-disc pl-6 max-w-3xl mx-auto">
            <li>Improve accessibility with REM units that respect user font preferences.</li>
            <li>Simplify responsive design by converting PX to REM for fluid scaling.</li>
            <li>Debug layouts easily by switching REM to PX for absolute measurements.</li>
            <li>Ensure consistency across your team with accurate PX to REM conversions.</li>
          </ul>
        </div>
      </section>

      {/* What Is Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Are PX and REM Units?</h2>
          <p className="mb-6 max-w-3xl mx-auto">
            In CSS, PX (pixels) and REM (root em) are essential units for sizing elements. PX represents a fixed length, typically tied to screen pixels, making it ideal for precise control. REM, however, is relative to the root element's font size (usually 16px by default), offering flexibility for responsive designs. Converting PX to REM or REM to PX helps developers balance precision and scalability in their projects.
          </p>
          <p className="max-w-3xl mx-auto">
            For example, if the root font size is 16px, then 16px converts to 1rem, and 1.5rem converts to 24px. Our PX to REM and REM to PX converter automates these calculations, saving you time and ensuring accuracy.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How Our Converter Works</h2>
          <p className="mb-6 max-w-3xl mx-auto">
            Using our PX to REM and REM to PX converter is straightforward. Enter your value, select your units, and get instant results. Here's how it works:
          </p>
          <ol className="list-decimal pl-6 max-w-3xl mx-auto">
            <li>Input your PX or REM value in the provided field.</li>
            <li>Choose whether to convert PX to REM or REM to PX.</li>
            <li>The tool calculates based on a default 16px root font size (customizable).</li>
            <li>Get your result instantly—no manual math required!</li>
          </ol>
          <p className="mt-6 max-w-3xl mx-auto">
            Whether you're adjusting a design from PX to REM or verifying a REM to PX value, our tool ensures precision every time.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Developers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <p className="italic">"This PX to REM converter saved me hours of manual calculations. It's a must-have for responsive design!"</p>
              <p className="mt-4 font-semibold">— Sarah, Frontend Developer</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <p className="italic">"Switching REM to PX has never been easier. I use it daily for debugging layouts."</p>
              <p className="mt-4 font-semibold">— Mark, Web Designer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Twitter Card Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Join the Conversation</h2>
          <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <p className="mb-4">
              "Loving this PX to REM converter from pxtorem.org! Makes responsive CSS a breeze. #WebDesign #CSSTools"
            </p>
            <a
              href="https://twitter.com/intent/tweet?text=Loving%20this%20PX%20to%20REM%20converter%20from%20pxtorem.org!%20Makes%20responsive%20CSS%20a%20breeze.%20%23WebDesign%20%23CSSTools"
              className="text-primary-600 hover:underline"
            >
              Share on Twitter
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Why convert PX to REM?</h3>
              <p>Converting PX to REM enhances scalability and accessibility, as REM adjusts to the root font size, unlike fixed PX units.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">How do I convert REM to PX?</h3>
              <p>Multiply your REM value by the root font size (e.g., 16px). Our REM to PX tool does this automatically!</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Is this tool free?</h3>
              <p>Yes, our PX to REM and REM to PX converter is completely free to use.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Start Converting Now</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Ready to simplify your CSS unit conversions? Use our free PX to REM and REM to PX tool today and take your web design to the next level.
          </p>
          <Link href={`/${locale}/px-to-rem`} className="inline-block bg-white text-primary-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100">
            Convert PX to REM Now
          </Link>
        </div>
      </section>
    </main>
  );
}