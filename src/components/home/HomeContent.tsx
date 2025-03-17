"use client";

import { useTranslations } from "next-intl";
import Converter from "@/components/converter/Converter";
import PopularConversions from "@/components/home/PopularConversions";

// 同步组件用于渲染和使用钩子
export default function HomeContent({ locale }: { locale: string }) {
  // 使用 useTranslations 获取翻译
  const t = useTranslations('common');
  const homeT = useTranslations('home');
  
  return (
    <main>
      {/* 英雄区域 */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {homeT('hero.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {homeT('hero.subtitle')}
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
            {homeT('popular.title')}
          </h2>
          <PopularConversions locale={locale} />
        </div>
      </section>
    </main>
  );
}