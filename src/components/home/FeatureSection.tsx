import { CodeBracketIcon } from '@heroicons/react/24/outline';

interface FeatureSectionProps {
  title: string;
  content: string;
  codeExample?: string;
}

export default function FeatureSection({ title, content, codeExample }: FeatureSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{content}</p>
      
      {codeExample && (
        <div className="bg-gray-800 rounded-md p-4 overflow-x-auto">
          <pre className="text-gray-100 text-sm font-mono">
            {codeExample}
          </pre>
        </div>
      )}
    </div>
  );
} 