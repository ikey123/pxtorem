import { useTranslations } from 'next-intl';

interface CategoryIntroProps {
  category: string;
}

export default function CategoryIntro({ category }: CategoryIntroProps) {
  const t = useTranslations('CategoryIntro');

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {t(`${category}.title`)}
      </h1>
      <p className="text-lg text-gray-600">
        {t(`${category}.description`)}
      </p>
    </div>
  );
} 