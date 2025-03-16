export interface ConversionResult {
  value: number;
  formula: string;
  formattedResult: string;
}

// PX 转换为 REM
export function pxToRem(px: number, rootFontSize: number = 16): number {
  return px / rootFontSize;
}

// REM 转换为 PX
export function remToPx(rem: number, rootFontSize: number = 16): number {
  return rem * rootFontSize;
}

// 获取PX到REM的计算公式
export function getPxToRemFormula(px: number, rootFontSize: number = 16): string {
  return `${px}px ÷ ${rootFontSize}px = ${(px / rootFontSize).toFixed(4).replace(/\.?0+$/, '')}rem`;
}

// 获取REM到PX的计算公式
export function getRemToPxFormula(rem: number, rootFontSize: number = 16): string {
  return `${rem}rem × ${rootFontSize}px = ${(rem * rootFontSize).toFixed(0)}px`;
}

// 格式化转换结果
export function formatConversionResult(
  value: number,
  fromUnit: 'px' | 'rem',
  toUnit: 'px' | 'rem',
  rootFontSize: number = 16
): string {
  if (fromUnit === 'px' && toUnit === 'rem') {
    const result = pxToRem(value, rootFontSize);
    return result.toFixed(4).replace(/\.?0+$/, '');
  } else if (fromUnit === 'rem' && toUnit === 'px') {
    const result = remToPx(value, rootFontSize);
    return result.toFixed(0);
  }
  return value.toString();
}

// 二期功能
export function pxToEm(px: number, contextFontSize: number = 16): ConversionResult {
  const emValue = px / contextFontSize;
  const formula = `${px} ÷ ${contextFontSize}`;
  
  return {
    value: emValue,
    formula: formula,
    formattedResult: formatNumber(emValue)
  };
}

// 二期功能
export function emToPx(em: number, contextFontSize: number = 16): ConversionResult {
  const pxValue = em * contextFontSize;
  const formula = `${em} × ${contextFontSize}`;
  
  return {
    value: pxValue,
    formula: formula,
    formattedResult: formatNumber(pxValue)
  };
}

// 格式化数字，去除末尾多余的零
function formatNumber(num: number): string {
  return num.toFixed(4).replace(/\.?0+$/, '');
} 