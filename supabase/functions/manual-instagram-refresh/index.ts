import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { InstagramCacheManager } from '../_shared/cache-utils.ts'

interface ManualRefreshRequest {
  force?: boolean
  data_types?: ('follower_count' | 'posts')[]
  reason?: string
  admin_key?: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const startTime = Date.now()
  
  try {
    // Validate environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const adminKey = Deno.env.get('INSTAGRAM_ADMIN_KEY') // Optional admin key for security

    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required environment variables',
          timestamp: new Date().toISOString()
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 503,
        }
      )
    }

    // Parse request body
    let requestData: ManualRefreshRequest = {}
    
    if (req.method === 'POST') {
      try {
        requestData = await req.json()
      } catch (error) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Invalid JSON in request body',
            timestamp: new Date().toISOString()
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          }
        )
      }
    }

    // Check admin key if configured
    if (adminKey && requestData.admin_key !== adminKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid admin key',
          timestamp: new Date().toISOString()
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      )
    }

    // Initialize cache manager
    const cacheManager = new InstagramCacheManager(supabaseUrl, serviceRoleKey)

    // Get current cache health
    const healthStatus = await cacheManager.getCacheHealth()

    // Trigger manual refresh by calling the main fetch function
    let refreshResult;
    let actualDataRefresh = false;
    
    if (requestData.force || healthStatus.followerCountStale || healthStatus.postsStale) {
      try {
        // Call the main Instagram data fetch function
        const fetchResponse = await fetch(`${supabaseUrl}/functions/v1/fetch-instagram-data`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${serviceRoleKey}`,
            'Content-Type': 'application/json'
          }
        });

        if (fetchResponse.ok) {
          const fetchData = await fetchResponse.json();
          actualDataRefresh = true;
          refreshResult = {
            triggered: true,
            message: 'Manual refresh completed with fresh data',
            refresh_id: `manual_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            data_refreshed: fetchData.data
          };
        } else {
          throw new Error(`Fetch function returned ${fetchResponse.status}`);
        }
      } catch (error) {
        console.error('Failed to call main fetch function:', error);
        // Fallback to metadata-only refresh
        refreshResult = await cacheManager.triggerManualRefresh({
          force: requestData.force || false,
          dataTypes: requestData.data_types || ['follower_count', 'posts'],
          reason: requestData.reason || 'Manual refresh via admin endpoint (fallback)'
        });
      }
    } else {
      refreshResult = {
        triggered: false,
        message: 'Cache is fresh, manual refresh skipped',
        refresh_id: `manual_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
    }

    // Get updated cache stats after refresh
    const cacheStats = await cacheManager.getCacheStats()

    const executionTime = Date.now() - startTime

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Manual refresh processed',
        data: {
          refresh_result: refreshResult,
          cache_health: healthStatus,
          cache_stats: cacheStats,
          execution_time_ms: executionTime,
          timestamp: new Date().toISOString()
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    const executionTime = Date.now() - startTime
    
    console.error('Manual refresh endpoint error:', {
      error: error.message,
      stack: error.stack,
      execution_time_ms: executionTime,
      timestamp: new Date().toISOString()
    })

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error',
        error_details: error.message,
        execution_time_ms: executionTime,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})