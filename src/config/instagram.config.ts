export const instagramConfig = {
  accessToken: import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN || '',
  userId: import.meta.env.VITE_INSTAGRAM_USER_ID || '',
  apiVersion: import.meta.env.VITE_INSTAGRAM_API_VERSION || 'v18.0',
  refreshInterval: 5 * 60 * 1000, // 5 minutes
  cacheExpiry: 5, // minutes
  mediaLimit: 12, // number of posts to fetch
};

export function validateInstagramConfig(): boolean {
  return !!(instagramConfig.accessToken && instagramConfig.userId);
}
