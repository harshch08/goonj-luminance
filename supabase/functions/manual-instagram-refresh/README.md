# Manual Instagram Refresh Edge Function

This Supabase Edge Function provides administrative capabilities for manually triggering Instagram data refresh and managing the cache system.

## Features

- **Manual Refresh Triggering**: Force refresh of Instagram data outside of scheduled intervals
- **Cache Health Monitoring**: Check the current status of cached Instagram data
- **Administrative Security**: Optional admin key protection for sensitive operations
- **Comprehensive Logging**: Detailed logging for monitoring and debugging

## Environment Variables

### Required
- `SUPABASE_URL`: Your Supabase project URL (automatically available)
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (automatically available)

### Optional
- `INSTAGRAM_ADMIN_KEY`: Admin key for securing manual refresh operations

## API Endpoints

### GET /functions/v1/manual-instagram-refresh

Returns cache health status and statistics without triggering a refresh.

**Response:**
```json
{
  "success": true,
  "message": "Manual refresh processed",
  "data": {
    "cache_health": {
      "overall_status": "healthy",
      "follower_count_status": "fresh",
      "posts_status": "fresh",
      "issues": [],
      "recommendations": []
    },
    "cache_stats": {
      "total_entries": 2,
      "follower_count_age": 15,
      "posts_age": 15
    },
    "execution_time_ms": 250,
    "timestamp": "2024-01-01T12:00:00.000Z"
  }
}
```

### POST /functions/v1/manual-instagram-refresh

Triggers a manual refresh of Instagram data.

**Request Body:**
```json
{
  "force": false,
  "data_types": ["follower_count", "posts"],
  "reason": "Manual refresh requested",
  "admin_key": "your-admin-key"
}
```

**Parameters:**
- `force` (boolean, optional): Force refresh even if cache is fresh. Default: `false`
- `data_types` (array, optional): Types of data to refresh. Default: `["follower_count", "posts"]`
- `reason` (string, optional): Reason for manual refresh (for logging). Default: `"Manual refresh via admin endpoint"`
- `admin_key` (string, optional): Admin key if `INSTAGRAM_ADMIN_KEY` is configured

**Response:**
```json
{
  "success": true,
  "message": "Manual refresh processed",
  "data": {
    "refresh_result": {
      "triggered": true,
      "message": "Manual refresh triggered successfully (ID: manual_1234567890_abc123)",
      "refresh_id": "manual_1234567890_abc123"
    },
    "cache_health": {
      "overall_status": "healthy",
      "follower_count_status": "fresh",
      "posts_status": "fresh",
      "issues": [],
      "recommendations": []
    },
    "cache_stats": {
      "total_entries": 2,
      "follower_count_age": 0,
      "posts_age": 0
    },
    "execution_time_ms": 500,
    "timestamp": "2024-01-01T12:00:00.000Z"
  }
}
```

## Cache Health Status

### Overall Status
- `healthy`: All cache data is fresh and available
- `warning`: Some cache data is stale but available
- `critical`: Cache data is missing or severely outdated

### Individual Data Status
- `fresh`: Data is recent (less than 90 minutes old)
- `stale`: Data is outdated (more than 90 minutes old)
- `missing`: No cached data available

## Usage Examples

### Using cURL

**Check cache health:**
```bash
curl -X GET "https://your-project.supabase.co/functions/v1/manual-instagram-refresh" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

**Trigger manual refresh:**
```bash
curl -X POST "https://your-project.supabase.co/functions/v1/manual-instagram-refresh" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "force": true,
    "reason": "API issues resolved, forcing fresh data"
  }'
```

**Refresh specific data types:**
```bash
curl -X POST "https://your-project.supabase.co/functions/v1/manual-instagram-refresh" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "data_types": ["follower_count"],
    "reason": "Only refresh follower count"
  }'
```

### Using the Cache Management Script

The project includes a Node.js script for easier cache management:

```bash
# Check cache health
npm run cache:health

# Get cache statistics
npm run cache:stats

# Trigger manual refresh
npm run cache:refresh

# Force refresh regardless of cache age
npm run cache:refresh:force

# Warm cache (refresh if stale)
npm run cache:warm
```

## Security Considerations

### Admin Key Protection
If you set the `INSTAGRAM_ADMIN_KEY` environment variable, all POST requests to this endpoint will require the admin key in the request body. This prevents unauthorized manual refreshes.

### Rate Limiting
The function doesn't implement its own rate limiting, but you should consider implementing rate limiting at the API gateway level to prevent abuse.

### Logging
All operations are logged with structured JSON format for monitoring and security auditing.

## Error Handling

### Common Error Responses

**Missing Environment Variables (503):**
```json
{
  "success": false,
  "error": "Missing required environment variables",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

**Invalid Admin Key (401):**
```json
{
  "success": false,
  "error": "Invalid admin key",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

**Invalid JSON (400):**
```json
{
  "success": false,
  "error": "Invalid JSON in request body",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

**Internal Server Error (500):**
```json
{
  "success": false,
  "error": "Internal server error",
  "error_details": "Detailed error message",
  "execution_time_ms": 1000,
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Deployment

Deploy this function using the Supabase CLI:

```bash
supabase functions deploy manual-instagram-refresh
```

## Monitoring and Alerting

### Key Metrics to Monitor
- Function execution time
- Success/failure rates
- Cache health status changes
- Manual refresh frequency

### Recommended Alerts
- Alert when cache health becomes "critical"
- Alert on repeated manual refresh failures
- Alert on unusually high manual refresh frequency (potential abuse)

### Log Analysis
All logs are structured JSON and can be easily parsed for monitoring:

```bash
# View function logs
supabase functions logs manual-instagram-refresh

# Filter for errors
supabase functions logs manual-instagram-refresh | grep '"level":"ERROR"'
```

## Integration with Monitoring Systems

This function is designed to integrate with monitoring systems:

1. **Health Checks**: Use GET requests for regular health monitoring
2. **Automated Recovery**: Use POST requests to trigger refresh when issues are detected
3. **Dashboard Integration**: Parse JSON responses for dashboard displays
4. **Alerting**: Set up alerts based on cache health status

## Best Practices

1. **Regular Health Checks**: Monitor cache health every 15-30 minutes
2. **Automated Recovery**: Trigger manual refresh when cache becomes stale
3. **Admin Key Security**: Use strong admin keys and rotate them regularly
4. **Log Monitoring**: Set up log analysis for error detection and performance monitoring
5. **Rate Limiting**: Implement appropriate rate limiting to prevent abuse