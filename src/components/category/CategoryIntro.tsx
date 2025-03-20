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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-lg text-gray-600">{description}</p>
    </div>
  );
} 