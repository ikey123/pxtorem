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
    // 对于px，生成附近的值
    const baseValues = [8, 10, 12, 14, 16, 18, 20, 24, 32, 48, 64];
    
    // 找到当前值在数组中的位置，或者最接近的位置
    let index = baseValues.indexOf(currentValue);
    if (index === -1) {
      // 如果不在数组中，找到最接近的值
      for (let i = 0; i < baseValues.length; i++) {
        if (baseValues[i] > currentValue) {
          index = i;
          break;
        }
      }
      if (index === -1) index = baseValues.length;
    }
    
    // 获取前后的值
    const start = Math.max(0, index - 3);
    const end = Math.min(baseValues.length, index + 4);
    
    for (let i = start; i < end; i++) {
      if (baseValues[i] !== currentValue) {
        relatedValues.push({
          value: baseValues[i],
          slug: `${baseValues[i]}-px-to-rem`
        });
      }
    }
  } else {
    // 对于rem，生成附近的值
    const baseValues = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5];
    
    // 找到当前值在数组中的位置，或者最接近的位置
    let index = baseValues.indexOf(currentValue);
    if (index === -1) {
      // 如果不在数组中，找到最接近的值
      for (let i = 0; i < baseValues.length; i++) {
        if (baseValues[i] > currentValue) {
          index = i;
          break;
        }
      }
      if (index === -1) index = baseValues.length;
    }
    
    // 获取前后的值
    const start = Math.max(0, index - 3);
    const end = Math.min(baseValues.length, index + 4);
    
    for (let i = start; i < end; i++) {
      if (baseValues[i] !== currentValue) {
        relatedValues.push({
          value: baseValues[i],
          slug: `${baseValues[i].toString().replace('.', '-')}-rem-to-px`
        });
      }
    }
  }
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {relatedValues.map((item) => (
        <Link 
          key={item.slug}
          href={`/${category}/${item.slug}`}
          className="px-4 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-md text-gray-700 text-center transition-colors shadow-sm"
        >
          {category === 'px-to-rem' 
            ? `${item.value}px to rem`
            : `${item.value}rem to px`
          }
        </Link>
      ))}
    </div>
  );
} 