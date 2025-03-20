export interface ConversionResult {
  value: number;
  formula: string;
  formattedResult: string;
}

export const rootFontSize = 16;

// PX 转换为 REM
export function pxToRem(px: number, base = rootFontSize): number {
  return px / base;
}

// REM 转换为 PX
export function remToPx(rem: number, base = rootFontSize): number {
  return rem * base;
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
  fromUnit: "px" | "rem",
  toUnit: "px" | "rem",
  base: number = rootFontSize
): string {
  if (fromUnit === toUnit) return value.toString();

  if (fromUnit === "px" && toUnit === "rem") {
    return formatNumber(pxToRem(value, base));
  } else if (fromUnit === "rem" && toUnit === "px") {
    return remToPx(value, base).toFixed(0);
  }
  return value.toString();
}

// 格式化数字，去除末尾多余的零
function formatNumber(num: number): string {
  return num.toFixed(4).replace(/\.?0+$/, '');
} 