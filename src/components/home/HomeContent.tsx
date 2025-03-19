"use client";

import { useTranslations } from "next-intl";
import Converter from "@/components/converter/Converter";
import FeatureSection from "@/components/home/FeatureSection";
import Link from "next/link";

// 同步组件用于渲染和使用钩子
export default function HomeContent({ locale }: { locale: string }) {
  // 使用 useTranslations 获取翻译
  const t = useTranslations('common');
  const homeT = useTranslations('home');
  
  const unitGroups = [
    {
      title: "PX ↔ REM",
      items: [
        { name: "16px", path: "/px-to-rem/16-px-to-rem" },
        { name: "14px", path: "/px-to-rem/14-px-to-rem" },
        { name: "12px", path: "/px-to-rem/12-px-to-rem" },
        { name: "18px", path: "/px-to-rem/18-px-to-rem" },
        { name: "20px", path: "/px-to-rem/20-px-to-rem" },
        { name: "24px", path: "/px-to-rem/24-px-to-rem" },
      ],
    },
    {
      title: "REM ↔ PX",
      items: [
        { name: "1rem", path: "/rem-to-px/1-rem-to-px" },
        { name: "1.5rem", path: "/rem-to-px/1-5-rem-to-px" },
        { name: "2rem", path: "/rem-to-px/2-rem-to-px" },
        { name: "0.5rem", path: "/rem-to-px/0-5-rem-to-px" },
        { name: "0.75rem", path: "/rem-to-px/0-75-rem-to-px" },
        { name: "1.25rem", path: "/rem-to-px/1-25-rem-to-px" },
      ],
    },
    {
      title: "Other Units",
      items: [
        { name: "PX to EM", path: "/px-to-em" },
        { name: "EM to PX", path: "/em-to-px" },
        { name: "PX to VW", path: "/px-to-vw" },
        { name: "PX to VH", path: "/px-to-vh" },
      ],
    },
  ];

  return (
    <main>
      {/* 英雄区域 */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              CSS Unit Converter
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Fast and accurate conversions for PX, REM, EM, VH, VW, and more
            </p>
            
            {/* 转换器 */}
            <div className="mt-8">
              <Converter locale={locale} />
            </div>
          </div>
        </div>
      </section>
      
      {/* 热门转换 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Popular Unit Conversions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {unitGroups.map((group) => (
              <div key={group.title} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{group.title}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {group.items.map((item) => (
                    <Link
                      key={item.path}
                      href={`/${locale}${item.path}`}
                      className="text-gray-700 hover:text-primary-600 hover:underline transition-colors py-1"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 关于 REM 的信息 */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureSection
              title={homeT("about.whatIsRem.title")}
              content={homeT("about.whatIsRem.content")}
            />
            <FeatureSection
              title={homeT("about.whyUseRem.title")}
              content={homeT("about.whyUseRem.content")}
            />
            <FeatureSection
              title={homeT("about.howToUse.title")}
              content={homeT("about.howToUse.content")}
              codeExample={`html {
  font-size: 16px;
}

.title {
  font-size: 1.5rem;  /* 24px */
  margin-bottom: 1rem; /* 16px */
}

.container {
  padding: 0.75rem; /* 12px */
}`}
            />
          </div>
        </div>
      </section>
    </main>
  );
}