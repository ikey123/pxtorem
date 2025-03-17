"use client";

import Converter from "@/components/converter/Converter";

export default function CategoryContent({ 
  locale, 
  category, 
  title 
}: { 
  locale: string; 
  category: string; 
  title: string;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <p className="mb-6">请选择一个具体的转换值，或使用下面的转换器：</p>
      <Converter initialCategory={category} locale={locale} />
    </div>
  );
} 