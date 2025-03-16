import { useTranslations } from 'next-intl';

interface CategoryIntroProps {
  category: string;
}

export default function CategoryIntro({ category }: CategoryIntroProps) {
  const isPxToRem = category === 'px-to-rem';
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {isPxToRem ? 'PX to REM Converter' : 'REM to PX Converter'}
      </h1>
      <p className="text-lg text-gray-600">
        {isPxToRem 
          ? 'Convert pixels (px) to rem units instantly with our free online converter. Perfect for responsive web design and accessibility.'
          : 'Convert rem units back to pixels (px) quickly and accurately. Helpful when you need to understand the absolute size of your elements.'
        }
      </p>
    </div>
  );
} 