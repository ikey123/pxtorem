import { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Converter from '@/components/converter/Converter';
import PopularConversions from '@/components/home/PopularConversions';
import FeatureSection from '@/components/home/FeatureSection';
import { notFound, redirect } from "next/navigation";
import { locales, defaultLocale } from "@/i18n/request";
import HomeContent from "@/components/home/HomeContent";

// 定义 Locale 类型
type Locale = typeof locales[number];

// 类型守卫函数
function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

type PageParams = {
  params: Promise<{ locale: string }>;
};

export async function generateViewport({
  params,
}: PageParams): Promise<Viewport> {
  const { locale } = await params;
  return {
    width: "device-width",
    initialScale: 1,
  };
}

export async function generateMetadata({ 
  params 
}: PageParams): Promise<Metadata> {
  try {
    const { locale } = await params;
    
    // 使用类型守卫确保 locale 是有效的 Locale 类型
    const effectiveLocale: Locale = isLocale(locale) ? locale : defaultLocale;
    
    // 获取翻译
    const t = await getTranslations({ locale: effectiveLocale, namespace: "common" });
    
    return {
      title: t("title"),
      description: t("description"),
    };
  } catch (error) {
    console.error("Error in generateMetadata:", error);
    return {
      title: "PX to REM Converter",
      description: "Convert between PX and REM units",
    };
  }
}

// 因为内部使用 async/await，所以页面组件也需要是 async
export default async function Home({
  params
}: PageParams) {
  try {
    const { locale } = await params;
    
    // 使用类型守卫确保 locale 是有效的 Locale 类型
    const effectiveLocale: Locale = isLocale(locale) ? locale : defaultLocale;
    
    // 使用类型安全的 effectiveLocale 变量
    console.log(`Home - 原始语言: ${locale}, 解析后语言: ${effectiveLocale}`);
    
    // 渲染主页内容
    return <HomeContent locale={effectiveLocale} />;
  } catch (error) {
    console.error("Error in Home:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">加载错误</h1>
        <p className="mb-6">抱歉，加载页面时发生错误，请稍后再试。</p>
      </div>
    );
  }
} 