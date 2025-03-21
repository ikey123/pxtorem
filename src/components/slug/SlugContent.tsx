"use client";

import Converter from "@/components/converter/Converter";

export default function SlugContent({ 
  locale, 
  category, 
  slug, 
  title, 
  initialValue 
}: { 
  locale: string; 
  category: string; 
  slug: string; 
  title: string;
  initialValue: number;
}) {
  const getIntro = () => {
    switch (slug) {
      case '1-rem-to-px':
        return (
          <p className="mb-4">
            Convert 1rem to pixels to verify the baseline REM conversion. This is a core test case to ensure accuracy with a standard root font size of 16px, resulting in 16px.
          </p>
        );
      case '0-5-rem-to-px':
        return (
          <p className="mb-4">
            Convert 0.5rem to pixels to test small decimal REM values. With a 16px root font size, expect 8px as the result.
          </p>
        );
      case '1-5-rem-to-px':
        return (
          <p className="mb-4">
            Convert 1.5rem to pixels to check intermediate REM values. At 16px root font size, this should yield 24px.
          </p>
        );
      case '16-px-to-rem':
        return (
          <p className="mb-4">
            Convert 16px to REM, the default browser font size, to validate bidirectional conversion. This should result in 1rem with a 16px root font size.
          </p>
        );
      default:
        return <p className="mb-4">Use this tool to convert between {category.replace('-', ' to ')} units effortlessly.</p>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      {getIntro()}
      <Converter 
        initialValue={initialValue.toString()}
        initialFromUnit={category === 'px-to-rem' ? 'px' : 'rem'} 
        initialToUnit={category === 'px-to-rem' ? 'rem' : 'px'} 
      />
    </div>
  );
} 