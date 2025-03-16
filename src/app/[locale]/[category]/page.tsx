import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslator } from 'next-intl/server';
import Converter from '@/components/converter/Converter';
import CategoryIntro from '@/components/category/CategoryIntro';
import ConversionTable from '@/components/category/ConversionTable';

type CategoryParams = {
  params: {
    locale: string;
    category: string;
  };
};

export async function generateMetadata({ params }: CategoryParams): Promise<Metadata> {
  const { locale, category } = params;
  
  // 验证类别
  if (category !== 'px-to-rem' && category !== 'rem-to-px') {
    return notFound();
  }
  
  const t = await getTranslator(locale, 'common');
  
  const title = category === 'px-to-rem' 
    ? 'PX to REM Converter - Free CSS Unit Tool'
    : 'REM to PX Converter - Free CSS Unit Tool';
    
  const description = category === 'px-to-rem'
    ? 'Convert pixels (px) to rem units instantly with our free online converter. Perfect for responsive web design and accessibility.'
    : 'Convert rem units back to pixels (px) quickly and accurately. Helpful when you need to understand the absolute size of your elements.';
  
  return {
    title,
    description,
    alternates: {
      languages: {
        'en': `https://pxtorem.org/en/${category}`,
        'es': `https://pxtorem.org/es/${category}`,
      },
    },
  };
}

export default function CategoryPage({ params }: CategoryParams) {
  const { category } = params;
  
  // 验证类别
  if (category !== 'px-to-rem' && category !== 'rem-to-px') {
    notFound();
  }
  
  const fromUnit = category === 'px-to-rem' ? 'px' : 'rem';
  const toUnit = category === 'px-to-rem' ? 'rem' : 'px';
  
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
            initialFromUnit={fromUnit as 'px' | 'rem'} 
            initialToUnit={toUnit as 'px' | 'rem'} 
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