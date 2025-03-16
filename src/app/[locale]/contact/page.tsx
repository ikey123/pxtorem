import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslator } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslator(params.locale, 'common');
  
  return {
    title: 'Contact Us - PX to REM Converter',
    description: 'Get in touch with the team behind the PX to REM converter tool. We welcome your feedback and suggestions.',
  };
}

export default function ContactPage() {
  const t = useTranslations();
  
  return (
    <main>
      <section className="bg-gradient-to-b from-primary-50 to-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600">
            We'd love to hear from you! Send us your questions or feedback.
          </p>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-lg shadow-md p-8">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Feedback on PX to REM Converter"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary-600 text-white font-medium rounded-lg shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Ways to Reach Us</h3>
              <div className="space-y-3">
                <p className="flex items-start">
                  <span className="text-gray-600 mr-2">📧</span>
                  <span>Email: contact@pxtorem.org</span>
                </p>
                <p className="flex items-start">
                  <span className="text-gray-600 mr-2">🐦</span>
                  <span>Twitter: @pxtoremconverter</span>
                </p>
                <p className="flex items-start">
                  <span className="text-gray-600 mr-2">💻</span>
                  <span>GitHub: github.com/pxtorem</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 