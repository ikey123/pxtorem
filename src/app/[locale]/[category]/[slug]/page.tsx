import { Metadata } from 'next';
import { getTranslator } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Converter from '@/components/converter/Converter';
import RelatedConversions from '@/components/slug/RelatedConversions';

type SlugParams = {
  params: {
    locale: string;
    category: string;
    slug: string;
  };
};

export async function generateMetadata({ params }: SlugParams): Promise<Metadata> {
  const { locale, category, slug } = params;
  
  // 验证类别
  if (category !== 'px-to-rem' && category !== 'rem-to-px') {
    return notFound();
  }
  
  // 解析slug
  let title = '';
  let description = '';
  
  if (category === 'px-to-rem') {
    const pxMatch = slug.match(/^(\d+)-px-to-rem$/);
    if (!pxMatch) return notFound();
    
    const px = parseInt(pxMatch[1]);
    const rem = (px / 16).toFixed(4).replace(/\.?0+$/, '');
    
    title = `${px}px to rem - ${px}px = ${rem}rem`;
    description = `Convert ${px} pixels to rem units. ${px}px equals ${rem}rem with a root font size of 16px. Learn how to use this conversion in your CSS.`;
  } else {
    const remMatch = slug.match(/^(\d+(?:-\d+)?)-rem-to-px$/);
    if (!remMatch) return notFound();
    
    const remStr = remMatch[1].replace('-', '.');
    const rem = parseFloat(remStr);
    const px = Math.round(rem * 16);
    
    title = `${remStr}rem to px - ${remStr}rem = ${px}px`;
    description = `Convert ${remStr} rem to pixels. ${remStr}rem equals ${px}px with a root font size of 16px. Learn how to use this conversion in your CSS.`;
  }
  
  return {
    title,
    description,
    alternates: {
      languages: {
        'en': `https://pxtorem.org/en/${category}/${slug}`,
        'es': `https://pxtorem.org/es/${category}/${slug}`,
      },
    },
  };
}

export default function SlugPage({ params }: SlugParams) {
  const { category, slug } = params;
  
  // 验证类别
  if (category !== 'px-to-rem' && category !== 'rem-to-px') {
    notFound();
  }
  
  // 解析slug和初始值
  let initialValue = '';
  let initialFromUnit: 'px' | 'rem' = 'px';
  let initialToUnit: 'px' | 'rem' = 'rem';
  
  if (category === 'px-to-rem') {
    const pxMatch = slug.match(/^(\d+)-px-to-rem$/);
    if (!pxMatch) return notFound();
    
    initialValue = pxMatch[1];
    initialFromUnit = 'px';
    initialToUnit = 'rem';
  } else {
    const remMatch = slug.match(/^(\d+(?:-\d+)?)-rem-to-px$/);
    if (!remMatch) return notFound();
    
    initialValue = remMatch[1].replace('-', '.');
    initialFromUnit = 'rem';
    initialToUnit = 'px';
  }
  
  return (
    <main>
      <section className="bg-gradient-to-b from-primary-50 to-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {category === 'px-to-rem' 
              ? `${initialValue}px to rem Conversion`
              : `${initialValue}rem to px Conversion`
            }
          </h1>
          <p className="text-lg text-gray-600">
            {category === 'px-to-rem'
              ? `Learn how to convert ${initialValue} pixels to rem units for responsive web design.`
              : `Learn how to convert ${initialValue} rem to pixels for precise measurements.`
            }
          </p>
        </div>
      </section>
      
      <section className="py-10">
        <div className="container mx-auto px-4">
          <Converter 
            initialValue={initialValue}
            initialFromUnit={initialFromUnit} 
            initialToUnit={initialToUnit} 
          />
        </div>
      </section>
      
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {category === 'px-to-rem'
                ? `Understanding ${initialValue}px to rem Conversion`
                : `Understanding ${initialValue}rem to px Conversion`
              }
            </h2>
            
            <div className="prose lg:prose-lg">
              {category === 'px-to-rem' ? (
                <>
                  <p>
                    When converting {initialValue} pixels to rem units, we divide the pixel value by the root font size (typically 16px by default in most browsers).
                  </p>
                  <p>
                    <strong>Formula:</strong> {initialValue}px ÷ 16px = {(parseInt(initialValue) / 16).toFixed(4).replace(/\.?0+$/, '')}rem
                  </p>
                  <p>
                    This means that {initialValue}px is equivalent to {(parseInt(initialValue) / 16).toFixed(4).replace(/\.?0+$/, '')}rem when the root font size is 16px.
                  </p>
                  <h3>Why Use REM Instead of Pixels?</h3>
                  <p>
                    Using rem units instead of pixels makes your design more accessible and responsive. When users change their browser's font size, elements sized with rem will scale proportionally, while pixel-based elements remain fixed.
                  </p>
                  <h3>Example CSS Code</h3>
                  <pre className="bg-gray-800 text-gray-100 p-4 rounded-md">
{`/* Using pixels */
.element {
  font-size: ${initialValue}px;
}

/* Using rem - recommended */
.element {
  font-size: ${(parseInt(initialValue) / 16).toFixed(4).replace(/\.?0+$/, '')}rem;
}`}
                  </pre>
                </>
              ) : (
                <>
                  <p>
                    When converting {initialValue} rem to pixels, we multiply the rem value by the root font size (typically 16px by default in most browsers).
                  </p>
                  <p>
                    <strong>Formula:</strong> {initialValue}rem × 16px = {Math.round(parseFloat(initialValue) * 16)}px
                  </p>
                  <p>
                    This means that {initialValue}rem is equivalent to {Math.round(parseFloat(initialValue) * 16)}px when the root font size is 16px.
                  </p>
                  <h3>When to Convert REM to Pixels?</h3>
                  <p>
                    Converting rem to pixels can be helpful when you need to understand the absolute size of elements in your design or when working with design tools that use pixel measurements.
                  </p>
                  <h3>Example CSS Code</h3>
                  <pre className="bg-gray-800 text-gray-100 p-4 rounded-md">
{`/* Using rem */
.element {
  font-size: ${initialValue}rem;
}

/* Equivalent in pixels */
.element {
  font-size: ${Math.round(parseFloat(initialValue) * 16)}px;
}`}
                  </pre>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related Conversions
          </h2>
          <RelatedConversions category={category} currentSlug={slug} />
        </div>
      </section>
    </main>
  );
} 