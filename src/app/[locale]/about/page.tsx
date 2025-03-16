import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslator } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslator(params.locale, 'common');
  
  return {
    title: 'About PX to REM Converter',
    description: 'Learn about our free CSS unit converter tool and how it can help with your responsive web design.',
  };
}

export default function AboutPage() {
  const t = useTranslations();
  
  return (
    <main>
      <section className="bg-gradient-to-b from-primary-50 to-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About PX to REM Converter
          </h1>
          <p className="text-lg text-gray-600">
            Learn about our free tool for converting between CSS units
          </p>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="prose lg:prose-lg max-w-4xl mx-auto">
            <h2>Our Mission</h2>
            <p>
              At pxtorem.org, our mission is to provide web developers and designers with simple, 
              reliable tools that make responsive web design easier. We believe that using relative 
              units like REM is essential for creating accessible, user-friendly websites that work 
              well across all devices and respect user preferences.
            </p>
            
            <h2>Why We Built This Tool</h2>
            <p>
              Converting between pixels and REM units is a common task in modern web development. 
              While the calculation is simple (dividing by the root font size), having a dedicated 
              tool saves time and reduces errors, especially when working with multiple conversions.
            </p>
            
            <h2>Features</h2>
            <ul>
              <li>Fast, accurate conversions between PX and REM</li>
              <li>Adjustable root font size</li>
              <li>Copy results with one click</li>
              <li>Detailed explanations of each conversion</li>
              <li>Mobile-friendly interface</li>
              <li>No ads or distractions</li>
            </ul>
            
            <h2>About the Team</h2>
            <p>
              This tool was created by a small team of web developers who were tired of manually 
              calculating these conversions or searching for this information repeatedly. We wanted 
              to create something simple, fast, and useful for the web development community.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              Have suggestions for improving our tool? Found a bug? Want to see additional features? 
              We'd love to hear from you! Please reach out to us at contact@pxtorem.org.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
} 