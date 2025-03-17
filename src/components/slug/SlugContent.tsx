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
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <Converter 
        initialValue={initialValue} 
        initialCategory={category} 
        locale={locale} 
      />
    </div>
  );
} 