"use client";

import Converter from "@/components/converter/Converter";
import CategoryIntro from "@/components/category/CategoryIntro";
import ConversionTable from "@/components/category/ConversionTable";

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
          <Converter
            initialFromUnit={fromUnit as "px" | "rem"}
            initialToUnit={toUnit as "px" | "rem"}
            locale={locale}
          />
        </div>
      </section>

      {/* 转换表格 */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <ConversionTable category={category} />
        </div>
      </section>
    </main>
  );
} 