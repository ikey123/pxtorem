import { useTranslations } from 'next-intl';

interface CategoryIntroProps {
  category: string;
}

export default function CategoryIntro({ category }: CategoryIntroProps) {
  const t = useTranslations('CategoryIntro');
  
  // 添加错误处理和默认值
  const title = t(`${category}.title`, {
    fallback: category === 'px-to-rem' ? 'PX to REM Converter' : 'REM to PX Converter'
  });
  
  const description = t(`${category}.description`, {
    fallback: 'Convert units with our free online tool.'
  });

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">{description}</p>
      
      {/* 增加针对不同类别的更详细介绍 */}
      {category === 'px-to-rem' && (
        <p className="text-gray-700 max-w-3xl mx-auto">
          Struggling with fixed pixel sizes in your CSS? Our free PX to REM converter makes it easy to switch to scalable REM units, ensuring your designs adapt seamlessly to any screen size. Whether you're designing typography, layouts, or spacing, this tool simplifies your workflow.
        </p>
      )}
      
      {category === 'rem-to-px' && (
        <p className="text-gray-700 max-w-3xl mx-auto">
          Need to verify exact pixel values for your designs? Our REM to PX converter helps you debug layouts and ensure pixel-perfect implementation. Convert REM units back to pixels for precise measurements and alignment.
        </p>
      )}
    </div>
  );
} 