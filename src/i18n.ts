import {getRequestConfig} from 'next-intl/server';
import {locales} from '../next-intl.config.js';

export default getRequestConfig(async ({locale}) => {
  // 验证请求的语言是否支持
  if (!locales.includes(locale)) {
    throw new Error('Invalid locale');
  }

  return {
    messages: (await import(`../locales/${locale}.json`)).default
  };
}); 