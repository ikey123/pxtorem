"use client";

import Converter from "@/components/converter/Converter";
import CategoryIntro from "@/components/category/CategoryIntro";
import ConversionTable from "@/components/category/ConversionTable";
import RelatedConversions from "@/components/slug/RelatedConversions";
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

  const keywords = category === "px-to-rem"
    ? ["16px", "14px", "12px", "18px", "20px", "24px", "10px", "8px", "30px", "36px", "40px", "48px", "64px"]
    : ["1rem", "1.5rem", "2rem", "0.5rem", "0.75rem", "1.25rem", "2.5rem", "3rem", "0.25rem", "3.5rem", "4rem", "5rem"];

  const getPath = (value: string) =>
    category === "px-to-rem"
      ? `/${locale}/px-to-rem/${value.replace("px", "")}-px-to-rem`
      : `/${locale}/rem-to-px/${value.replace("rem", "").replace(".", "-")}-rem-to-px`;

  return (
    <main>
      {/* 类别介绍 */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-8">
        <div className="container mx-auto px-4">
          <CategoryIntro category={category} />
        </div>
      </section>

      {/* 转换器 */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {category === "px-to-rem" ? "PX to REM Calculator" : "REM to PX Converter"}
          </h2>
          <Converter
            initialFromUnit={fromUnit as "px" | "rem"}
            initialToUnit={toUnit as "px" | "rem"}
            locale={locale}
          />
        </div>
      </section>

      {/* 关键词表格 */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Popular {category === "px-to-rem" ? "PX to REM" : "REM to PX"} Conversions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {keywords.map((kw) => (
              <Link
                key={kw}
                href={getPath(kw)}
                className="bg-white hover:bg-primary-50 border border-gray-200 rounded-md py-3 px-4 text-center transition-colors"
              >
                {kw}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 转换表格 */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">常用 {category === "px-to-rem" ? "PX 到 REM" : "REM 到 PX"} 转换表</h2>
          <ConversionTable category={category} />
        </div>
      </section>

      {/* 相关转换 */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Conversions</h2>
          <RelatedConversions category={category} currentSlug="" />
        </div>
      </section>
    </main>
  );
} 