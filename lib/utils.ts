/**
 * 숫자를 천 단위 콤마가 포함된 문자열로 변환
 */
export function formatNumber(num: number): string {
  if (!isFinite(num)) return '∞';
  return Math.round(num).toLocaleString('ko-KR');
}

/**
 * 숫자를 원화 형식으로 변환
 */
export function formatCurrency(num: number): string {
  if (!isFinite(num)) return '계산 불가';
  return `${formatNumber(num)}원`;
}

/**
 * 퍼센트 형식으로 변환
 */
export function formatPercent(num: number, decimals: number = 1): string {
  if (!isFinite(num)) return '∞%';
  return `${num.toFixed(decimals)}%`;
}

/**
 * CSV 다운로드
 */
export function downloadCSV(data: string[][], filename: string) {
  const csvContent = data.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * JSON을 클립보드에 복사
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('클립보드 복사 실패:', err);
    return false;
  }
}

/**
 * 인쇄
 */
export function printPage() {
  window.print();
}
