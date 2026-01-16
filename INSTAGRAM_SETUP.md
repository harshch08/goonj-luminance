# Instagram Integration Setup Guide

This guide will help you set up the Instagram integration for the Goonj Luminance website.

## Features Implemented

✅ **Home Page**: Live Instagram follower count widget  
✅ **Gallery Page**: Instagram images integrated with local gallery  
✅ **Tag Filtering**: Filter gallery images by Instagram hashtags  
✅ **Caching**: 5-minute cache to minimize API calls  
✅ **Error Handling**: Graceful fallbacks when Instagram API is unavailable  
✅ **Responsive Design**: Works seamlessly on all devices  

## Setup Instructions

### 1. Get Instagram Credentials

You need two pieces of information:
- **Access Token**: Your Instagram API access token
- **User ID**: Your Instagram user ID

#### Option A: Instagram Basic Display API (Recommended for Testing)

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app (choose "Consumer" type)
3. Add "Instagram Basic Display" product
4. Configure OAuth redirect URIs (use `https://localhost/` for testing)
5. Add yourself as an Instagram Tester:
   - Go to Roles → Instagram Testers
   - Add your Instagram username
   - Accept the invite in your Instagram app settings
6. Generate a User Token:
   - Go to Basic Display → User Token Generator
   - Click "Generate Token"
   - Copy the token and user ID

#### Option B: Instagram Graph API (For Business Accounts)

1. Convert your Instagram account to a Business account
2. Link it to a Facebook Page
3. Create a Facebook app and add Instagram product
4. Use Graph API Explorer to generate a token with required permissions

### 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   VITE_INSTAGRAM_ACCESS_TOKEN=your_access_token_here
   VITE_INSTAGRAM_USER_ID=your_user_id_here
   VITE_INSTAGRAM_API_VERSION=v18.0
   ```

### 3. Test the Integration

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit the home page - you should see the follower count widget

3. Visit the gallery page - you should see Instagram images integrated with local gallery

## How It Works

### Architecture

```
┌─────────────────┐
│   Home Page     │──> InstagramFollowerWidget ──┐
└─────────────────┘                              │
                                                 │
┌─────────────────┐                              │
│  Gallery Page   │──> useInstagramMedia ────────┤
└─────────────────┘                              │
                                                 │
                                                 ▼
                                    ┌────────────────────┐
                                    │ Instagram Service  │
                                    │  - API Calls       │
                                    │  - Caching         │
                                    │  - Error Handling  │
                                    └────────────────────┘
                                                 │
                                                 ▼
                                    ┌────────────────────┐
                                    │ Instagram Graph API│
                                    └────────────────────┘
```

### Caching Strategy

- **Cache Duration**: 5 minutes
- **Storage**: Browser localStorage
- **Behavior**: Shows cached data immediately, fetches fresh data in background
- **Fallback**: If API fails, shows cached data with stale indicator

### API Endpoints Used

1. **User Profile**: `GET /{user-id}?fields=username,followers_count,media_count`
2. **Media Items**: `GET /{user-id}/media?fields=id,media_type,media_url,permalink,caption,timestamp,thumbnail_url`

## Features

### Home Page Widget

- Displays current follower count with Instagram branding
- Auto-refreshes every 5 minutes
- Shows loading skeleton on initial load
- Displays error message if API fails
- Shows stale data indicator if data is older than 10 minutes

### Gallery Integration

- Fetches up to 12 most recent Instagram images
- Filters to show only IMAGE type posts (excludes videos)
- Extracts hashtags from captions for tag filtering
- Displays Instagram badge on Instagram-sourced images
- Opens original Instagram post when clicked in lightbox
- Lazy loads images for better performance

### Tag Filtering

- Automatically extracts hashtags from Instagram captions
- Shows tag count badges
- Supports multi-tag selection
- "Clear all" button to reset filters
- Works alongside category filtering

## Troubleshooting

### No Instagram Images Showing

1. Check that your `.env` file has valid credentials
2. Open browser console and look for error messages
3. Verify your Instagram account has public posts
4. Check that your access token hasn't expired (tokens expire after 60 days)

### "Instagram connection expired" Error

Your access token has expired. Generate a new token:
1. Go to Facebook Developers
2. Navigate to your app → Instagram Basic Display
3. Generate a new User Token
4. Update your `.env` file with the new token

### Rate Limit Errors

Instagram API has rate limits (200 requests per hour per user). The integration uses caching to minimize API calls, but if you're testing frequently:
1. Clear your browser's localStorage
2. Wait for the rate limit to reset (usually 1 hour)
3. Consider increasing the cache duration in `src/config/instagram.config.ts`

## Configuration

You can customize the integration in `src/config/instagram.config.ts`:

```typescript
export const instagramConfig = {
  refreshInterval: 5 * 60 * 1000, // How often to refresh data (5 minutes)
  cacheExpiry: 5,                 // Cache duration in minutes
  mediaLimit: 12,                 // Number of posts to fetch
};
```

## Token Refresh

Instagram Basic Display tokens expire after 60 days. To extend:

1. Exchange short-lived token for long-lived token:
   ```
   GET https://graph.instagram.com/access_token
     ?grant_type=ig_exchange_token
     &client_secret={your-client-secret}
     &access_token={short-lived-token}
   ```

2. Refresh long-lived token before expiry:
   ```
   GET https://graph.instagram.com/refresh_access_token
     ?grant_type=ig_refresh_token
     &access_token={long-lived-token}
   ```

For production, consider implementing automatic token refresh on the backend.

## Production Considerations

For production deployment:

1. **Use Backend Proxy**: Move API calls to a backend service to protect your access token
2. **Implement Token Refresh**: Automatically refresh tokens before they expire
3. **Add Monitoring**: Track API errors and rate limits
4. **Consider Webhooks**: Use Instagram webhooks for real-time updates
5. **CDN for Images**: Cache Instagram images on a CDN for better performance

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Instagram credentials are correct
3. Ensure your Instagram account is public or properly configured
4. Review the [Instagram Basic Display API documentation](https://developers.facebook.com/docs/instagram-basic-display-api)

## Files Modified/Created

### New Files
- `src/services/instagram.service.ts` - Instagram API client
- `src/hooks/useInstagramFollowers.ts` - Hook for follower data
- `src/hooks/useInstagramMedia.ts` - Hook for media data
- `src/components/sections/InstagramFollowerWidget.tsx` - Follower count widget
- `src/components/gallery/TagFilter.tsx` - Tag filtering component
- `src/lib/instagram.utils.ts` - Utility functions
- `src/lib/instagram.logger.ts` - Logging utility
- `src/components/ErrorBoundary.tsx` - Error boundary component
- `src/types/instagram.types.ts` - TypeScript types
- `src/config/instagram.config.ts` - Configuration
- `.env.example` - Environment template

### Modified Files
- `src/pages/Gallery.tsx` - Enhanced with Instagram integration
- `src/components/sections/IntroSection.tsx` - Added follower widget
- `.env` - Added Instagram credentials (not committed)

## Next Steps

Once you have your Instagram credentials:
1. Add them to the `.env` file
2. Restart the development server
3. The integration will automatically start working
4. Test both the home page widget and gallery integration

Enjoy your Instagram integration! 🎉
