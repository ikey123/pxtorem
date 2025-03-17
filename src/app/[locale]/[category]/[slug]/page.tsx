// src/app/[locale]/[category]/[slug]/page.tsx
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { locales, defaultLocale, validCategories } from "@/i18n/request";
import SlugContent from "@/components/slug/SlugContent"; // 假设有这个组件

type SlugParams = {
  params: { locale: string; category: string; slug: string };
};

export async function generateMetadata({ 
  params 
}: SlugParams): Promise<Metadata> {
  try {
  const { locale, category, slug } = params;
    
    // 使用有效的语言或默认回退
    const effectiveLocale = locales.includes(locale) ? locale : defaultLocale;
  
  // 验证类别
    if (!validCategories.includes(category)) {
      return {
        title: "Invalid Category",
        description: "The requested category does not exist",
      };
    }
    
    // 获取翻译
    const t = await getTranslations({ locale: effectiveLocale, namespace: "Slug" });
  
  return {
      title: t("metaTitle", { slug, category }),
      description: t("metaDescription", { slug, category }),
    };
  } catch (error) {
    console.error("Error in generateMetadata:", error);
    return {
      title: "Converter Tool",
      description: "Unit conversion tool",
    };
  }
}

export default async function SlugPage({ 
  params 
}: SlugParams) {
  try {
    const { locale, category, slug } = params;
    
    console.log(`SlugPage - 语言: ${locale}, 类别: ${category}, Slug: ${slug}`);
    
    // 使用有效的语言或默认回退
    const effectiveLocale = locales.includes(locale) ? locale : defaultLocale;
  
  // 验证类别
    if (!validCategories.includes(category)) {
      console.warn(`无效的类别 in SlugPage: ${category}`);
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">类别不存在</h1>
          <p className="mb-6">抱歉，您请求的类别 "{category}" 不存在。</p>
        </div>
      );
    }
    
    // 验证 slug 格式
    let isValidSlug = false;
    let value = 0;
  
  if (category === 'px-to-rem') {
      const match = slug.match(/^(\d+)-px-to-rem$/);
      if (match) {
        isValidSlug = true;
        value = parseInt(match[1]);
      }
    } else if (category === 'rem-to-px') {
      const match = slug.match(/^(\d+(?:\.\d+)?)-rem-to-px$/);
      if (match) {
        isValidSlug = true;
        value = parseFloat(match[1]);
      }
    }
    
    if (!isValidSlug) {
      console.warn(`无效的 slug 格式 in SlugPage: ${slug}`);
  return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">无效的转换值</h1>
          <p className="mb-6">抱歉，"{slug}" 不是有效的转换值格式。</p>
        </div>
      );
    }
    
    // 获取翻译
    const t = await getTranslations({ locale: effectiveLocale, namespace: "Slug" });
    const title = t("title", { slug, category });
    
    // 渲染转换器组件
    return <SlugContent 
             locale={effectiveLocale} 
             category={category} 
             slug={slug} 
             title={title}
             initialValue={value} 
           />;
  } catch (error) {
    console.error("Error in SlugPage:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">加载错误</h1>
        <p className="mb-6">抱歉，加载页面时发生错误，请稍后再试。</p>
        </div>
  );
} 
}
