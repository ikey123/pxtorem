/**
 * 格式化数字，去除末尾多余的零
 */
export function formatNumber(num: number): string {
  return num.toFixed(4).replace(/\.?0+$/, '');
}

/**
 * 将URL友好的slug转换回原始值
 * 例如: "1-5" -> "1.5"
 */
export function slugToValue(slug: string): string {
  return slug.replace('-', '.');
}

/**
 * 将值转换为URL友好的slug
 * 例如: "1.5" -> "1-5"
 */
export function valueToSlug(value: string): string {
  return value.replace('.', '-');
}

/**
 * 生成一个范围内的数字数组
 */
export function range(start: number, end: number, step: number = 1): number[] {
  const result = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
} 