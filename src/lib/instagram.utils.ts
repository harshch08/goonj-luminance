export function formatFollowerCount(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return count.toString();
}

export function extractTitle(caption?: string): string | null {
  if (!caption) return null;
  
  const firstLine = caption.split('\n')[0];
  const cleanedLine = firstLine.replace(/#[\w\u0590-\u05ff]+/g, '').trim();
  
  if (!cleanedLine) return null;
  
  return cleanedLine.length > 50 
    ? cleanedLine.substring(0, 50) + '...' 
    : cleanedLine;
}

export function isInstagramUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === 'www.instagram.com' || urlObj.hostname === 'instagram.com';
  } catch {
    return false;
  }
}
