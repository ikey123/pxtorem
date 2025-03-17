import Link from 'next/link';
import { defaultLocale } from '@/i18n/request';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 - 页面未找到</h1>
      <p className="text-lg mb-8">抱歉，您请求的页面不存在。</p>
      <Link href={`/${defaultLocale}`} className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700">
        返回首页
      </Link>
    </div>
  );
}