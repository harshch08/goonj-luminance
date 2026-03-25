# Instagram Data Fetching Edge Function

This Supabase Edge Function fetches Instagram follower count and recent posts from the Instagram Graph API and caches them in the database with comprehensive error handling and logging.

## Enhanced Error Handling and Logging

### Error Categories

The function implements comprehensive error handling with custom error classes:

- **ConfigurationError**: Missing or invalid environment variables
- **InstagramAPIError**: Instagram Graph API failures (rate limits, authentication, etc.)
- **DatabaseError**: Supabase database operation failures
- **ValidationError**: Data validation failures
- **CacheValidationError**: Cache data structure validation failures
- **CacheStorageError**: Cache storage operation failures
- **CacheRetrievalError**: Cache retrieval operation failures

### Structured Logging

All operations are logged with structured JSON format including:

- **Level**: INFO, WARN, ERROR
- **Context**: Component/function name
- **Message**: Human-readable description
- **Timestamp**: ISO 8601 timestamp
- **Data**: Relevant operation data
- **Error Details**: Stack traces, error names, and messages

### Fallback Mechanisms

1. **API Failure Fallback**: If Instagram API fails, the function attempts to return cached data
2. **Cache Failure Tolerance**: Cache storage failures don't prevent successful API responses
3. **Graceful Degradation**: Partial failures are handled without breaking the entire operation

### Retry Logic

- **Exponential Backoff**: Failed requests are retried with increasing delays
- **Rate Limit Handling**: Respects Instagram API rate limits with proper wait times
- **Maximum Retries**: Configurable retry attempts (default: 3)

## Environment Variables Required

Set these in your Supabase project settings under Edge Functions:

- `INSTAGRAM_ACCESS_TOKEN`: Your Instagram Graph API access token
- `INSTAGRAM_BUSINESS_ACCOUNT_ID`: Your Instagram Business Account ID
- `SUPABASE_URL`: Your Supabase project URL (automatically available)
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (automatically available)

## Instagram Graph API Setup

1. Create a Facebook App at https://developers.facebook.com/
2. Add Instagram Graph API product to your app
3. Get a long-lived access token for your Instagram Business Account
4. Find your Instagram Business Account ID

## Deployment

Deploy this function using the Supabase CLI:

```bash
supabase functions deploy fetch-instagram-data
```

## Scheduling

To run this function on a schedule, you can:

1. Use Supabase's built-in cron functionality (if available)
2. Use an external cron service to call the function endpoint
3. Set up a GitHub Action or similar CI/CD pipeline

Example cron job (runs every hour):
```bash
0 * * * * curl -X POST https://your-project.supabase.co/functions/v1/fetch-instagram-data \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Instagram data cached successfully",
  "data": {
    "followers_count": 12345,
    "posts_count": 8,
    "last_updated": "2024-01-01T12:00:00.000Z",
    "cache_stats": {
      "total_entries": 2,
      "follower_count_age": 5,
      "posts_age": 5
    },
    "execution_time_ms": 1250
  }
}
```

### Fallback Response (API Error with Cached Data)
```json
{
  "success": true,
  "message": "Using cached data due to API unavailability",
  "warning": "Data may be stale due to Instagram API issues",
  "data": {
    "followers_count": 12345,
    "posts_count": 8,
    "last_updated": "2024-01-01T10:00:00.000Z",
    "is_fallback": true,
    "execution_time_ms": 500
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Instagram API error",
  "error_type": "InstagramAPIError",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "execution_time_ms": 2000
}
```

## Function Behavior

- Fetches follower count from Instagram Graph API
- Fetches up to 12 recent posts (filtered to images only)
- Stores data in `instagram_cache` table with timestamps
- Implements retry logic with exponential backoff
- Handles rate limiting gracefully
- Returns success/error status with details
- Provides fallback data when API fails
- Comprehensive logging for monitoring and debugging

## Error Handling Flow

1. **Environment Validation**: Checks all required environment variables
2. **Cache Manager Initialization**: Validates database connection
3. **Fallback Data Retrieval**: Attempts to get existing cache as fallback
4. **API Data Fetching**: Fetches from Instagram with retry logic
5. **Data Validation**: Validates API response structure
6. **Cache Storage**: Stores data with error tolerance
7. **Response Generation**: Returns appropriate success/error response

## Monitoring and Debugging

- **Execution Time Tracking**: All operations include execution time metrics
- **Cache Statistics**: Provides cache age and entry count information
- **Error Categorization**: Errors are categorized for better monitoring and alerting
- **Debug Information**: Development environment includes detailed error information

### Logging Examples

#### Info Log
```json
{
  "level": "INFO",
  "context": "fetch-instagram-data",
  "message": "Successfully fetched follower count",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "data": {
    "followers_count": 12345
  }
}
```

#### Error Log
```json
{
  "level": "ERROR",
  "context": "fetch-instagram-data",
  "message": "Function execution failed",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "error": {
    "message": "Failed to fetch follower count: 429 Too Many Requests",
    "stack": "InstagramAPIError: Failed to fetch...",
    "name": "InstagramAPIError"
  },
  "data": {
    "error_type": "InstagramAPIError",
    "execution_time_ms": 2000,
    "has_fallback_data": true,
    "status_code": 429
  }
}
```

## Cache Management Error Handling

The `InstagramCacheManager` class includes comprehensive error handling for:

- **Connection Failures**: Database connection initialization errors
- **Query Failures**: Database query and operation errors
- **Data Validation**: Content structure validation before storage
- **Cleanup Operations**: Old cache entry cleanup with error tolerance
- **Statistics Retrieval**: Cache statistics with fallback values

## Best Practices Implemented

1. **Fail Fast**: Configuration errors are caught early
2. **Graceful Degradation**: Partial failures don't break the entire system
3. **Comprehensive Logging**: All operations are logged for monitoring
4. **Error Categorization**: Different error types for better handling
5. **Fallback Strategies**: Multiple fallback mechanisms for reliability
6. **Performance Monitoring**: Execution time tracking for optimization
7. **Security**: Sensitive data (tokens) are masked in logs