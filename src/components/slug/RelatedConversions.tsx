import Link from 'next/link';

interface RelatedConversionsProps {
  category: string;
  currentSlug: string;
}

export default function RelatedConversions({ category, currentSlug }: RelatedConversionsProps) {
  // 获取当前值
  let currentValue = 0;
  
  if (category === 'px-to-rem') {
    const match = currentSlug.match(/^(\d+)-px-to-rem$/);
    if (match) {
      currentValue = parseInt(match[1]);
    }
  } else {
    const match = currentSlug.match(/^(\d+(?:-\d+)?)-rem-to-px$/);
    if (match) {
      currentValue = parseFloat(match[1].replace('-', '.'));
    }
  }
  
  // 生成相关转换
  const relatedValues = [];
  
  if (category === 'px-to-rem') {
    const baseValues = [10, 12, 16, 20];
    baseValues.forEach(val => {
      if (val !== currentValue) relatedValues.push({ value: val, slug: `${val}-px-to-rem`, label: `${val}px to rem` });
    });
  } else {
    const baseValues = [0.5, 1, 1.5, 2];
    baseValues.forEach(val => {
      if (val !== currentValue) relatedValues.push({ value: val, slug: `${val.toString().replace('.', '-')}-rem-to-px`, label: `${val}rem to px` });
    });
  }
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {relatedValues.slice(0, 4).map((item) => (
        <Link 
          key={item.slug}
          href={`/${category}/${item.slug}`}
          className="px-4 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-md text-gray-700 text-center transition-colors shadow-sm"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
} 