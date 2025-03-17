import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, defaultLocale, validCategories } from "@/i18n/request";
import CategoryContent from "@/components/category/CategoryContent";

// 定义有效的工具类别
const validCategories = ['px-to-rem', 'rem-to-px'];

type CategoryParams = {
  params: { locale: string; category: string };
};

export async function generateMetadata({ 
  params 
}: CategoryParams): Promise<Metadata> {
  try {
    const { locale, category } = await params;
    
    console.log(`generateMetadata - 语言: ${locale}, 类别: ${category}`);
    
    // 验证有效类别，不是 slug
    if (!validCategories.includes(category)) {
      // 检查是否可能是 slug 误识别为类别
      if (category.includes('px-to-rem') || category.includes('rem-to-px')) {
        // 是包含类别名称的 slug
        const baseCategory = category.includes('px-to-rem') ? 'px-to-rem' : 'rem-to-px';
        return {
          title: `${baseCategory.toUpperCase()} - ${category}`,
          description: `Convert ${baseCategory} units easily`,
        };
      }
      
      console.warn(`Invalid category in generateMetadata: ${category}`);
      return {
        title: "Category Not Found",
        description: "The requested category does not exist",
      };
    }
    
    // 使用有效的语言或默认回退
    const effectiveLocale = locales.includes(locale) ? locale : defaultLocale;
    
    // 获取翻译
    const t = await getTranslations({ locale: effectiveLocale, namespace: "Category" });
      
    return {
      title: t("metaTitle", { category }),
      description: t("metaDescription", { category }),
    };
  } catch (error) {
    console.error("Error in generateMetadata:", error);
    return {
      title: "Converter Tool",
      description: "Unit conversion tool",
    };
  }
}

export default async function CategoryPage({ 
  params 
}: CategoryParams) {
  try {
    const { locale, category } = await params;
    
    console.log(`CategoryPage - 语言: ${locale}, 类别: ${category}`);
    
    // 使用有效的语言或默认回退
    const effectiveLocale = locales.includes(locale) ? locale : defaultLocale;
    
    // 验证类别并处理 slug 误识别情况
    if (!validCategories.includes(category)) {
      // 检查是否可能是 slug 误识别为类别
      if (category.includes('px-to-rem')) {
        // 返回 px-to-rem 转换器
        const actualCategory = 'px-to-rem';
        const t = await getTranslations({ locale: effectiveLocale, namespace: "Category" });
        return <CategoryContent 
                 locale={effectiveLocale} 
                 category={actualCategory} 
                 title={`PX to REM - ${category}`} 
               />;
      } else if (category.includes('rem-to-px')) {
        // 返回 rem-to-px 转换器
        const actualCategory = 'rem-to-px';
        const t = await getTranslations({ locale: effectiveLocale, namespace: "Category" });
        return <CategoryContent 
                 locale={effectiveLocale} 
                 category={actualCategory} 
                 title={`REM to PX - ${category}`} 
               />;
      }
      
      console.warn(`无效的类别 in CategoryPage: ${category}`);
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">类别不存在</h1>
          <p className="mb-6">抱歉，您请求的类别 "{category}" 不存在。</p>
        </div>
      );
    }
    
    // 获取翻译标题
    const t = await getTranslations({ locale: effectiveLocale, namespace: "Category" });
    const title = t("title", { category });
    
    // 渲染内容
    return <CategoryContent locale={effectiveLocale} category={category} title={title} />;
  } catch (error) {
    console.error("Error in CategoryPage:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">加载错误</h1>
        <p className="mb-6">抱歉，加载页面时发生错误，请稍后再试。</p>
      </div>
    );
  }
}