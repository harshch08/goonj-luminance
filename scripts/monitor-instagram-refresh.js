#!/usr/bin/env node

/**
 * Instagram Data Refresh Monitoring Script
 * 
 * This script monitors the health and performance of the Instagram data refresh process.
 * It can be run manually or integrated into monitoring systems.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  FUNCTION_NAME: 'fetch-instagram-data',
  MAX_DATA_AGE_HOURS: 2, // Alert if data is older than 2 hours
  MIN_FOLLOWERS: 0, // Minimum expected followers (set based on your account)
  MIN_POSTS: 1, // Minimum expected posts
  TIMEOUT_MS: 30000, // 30 second timeout
  RETRY_COUNT: 3,
  RETRY_DELAY_MS: 5000
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

class InstagramMonitor {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      function_health: null,
      data_freshness: null,
      data_quality: null,
      performance: null,
      alerts: []
    };
  }

  log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const colorMap = {
      info: colors.blue,
      success: colors.green,
      warning: colors.yellow,
      error: colors.red
    };
    
    const color = colorMap[level] || colors.reset;
    console.log(`${color}[${timestamp}] ${level.toUpperCase()}: ${message}${colors.reset}`);
    
    if (data) {
      console.log(`${colors.cyan}${JSON.stringify(data, null, 2)}${colors.reset}`);
    }
  }

  async makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${CONFIG.SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Instagram-Monitor/1.0',
          ...options.headers
        },
        timeout: CONFIG.TIMEOUT_MS
      };

      const req = https.request(url, requestOptions, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              data: jsonData
            });
          } catch (error) {
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              data: data,
              parseError: error.message
            });
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      if (options.body) {
        req.write(JSON.stringify(options.body));
      }

      req.end();
    });
  }

  async testFunctionHealth() {
    this.log('info', 'Testing Instagram function health...');
    
    const functionUrl = `${CONFIG.SUPABASE_URL}/functions/v1/${CONFIG.FUNCTION_NAME}`;
    
    try {
      const startTime = Date.now();
      const response = await this.makeRequest(functionUrl, {
        headers: { 'X-Monitor-Test': 'true' }
      });
      const responseTime = Date.now() - startTime;

      this.results.function_health = {
        status: response.statusCode < 400 ? 'healthy' : 'unhealthy',
        status_code: response.statusCode,
        response_time_ms: responseTime,
        success: response.data?.success || false,
        error: response.data?.error || null
      };

      if (response.statusCode < 400) {
        this.log('success', `Function is healthy (${responseTime}ms)`);
      } else {
        this.log('error', `Function is unhealthy (${response.statusCode})`, response.data);
        this.results.alerts.push({
          type: 'function_health',
          severity: 'high',
          message: `Function returned ${response.statusCode}`,
          details: response.data
        });
      }

      return response;
    } catch (error) {
      this.log('error', 'Function health check failed', { error: error.message });
      this.results.function_health = {
        status: 'error',
        error: error.message,
        response_time_ms: null
      };
      
      this.results.alerts.push({
        type: 'function_health',
        severity: 'critical',
        message: 'Function is unreachable',
        details: { error: error.message }
      });
      
      throw error;
    }
  }

  async checkDataFreshness() {
    this.log('info', 'Checking data freshness...');
    
    // This would typically query the Supabase database directly
    // For now, we'll use the function response to check data age
    const functionUrl = `${CONFIG.SUPABASE_URL}/functions/v1/${CONFIG.FUNCTION_NAME}`;
    
    try {
      const response = await this.makeRequest(functionUrl);
      
      if (response.data?.data?.last_updated) {
        const lastUpdated = new Date(response.data.data.last_updated);
        const now = new Date();
        const ageHours = (now - lastUpdated) / (1000 * 60 * 60);
        
        this.results.data_freshness = {
          last_updated: response.data.data.last_updated,
          age_hours: Math.round(ageHours * 100) / 100,
          is_stale: ageHours > CONFIG.MAX_DATA_AGE_HOURS,
          is_fallback: response.data.data.is_fallback || false
        };

        if (ageHours > CONFIG.MAX_DATA_AGE_HOURS) {
          this.log('warning', `Data is stale (${ageHours.toFixed(1)} hours old)`);
          this.results.alerts.push({
            type: 'data_freshness',
            severity: 'medium',
            message: `Data is ${ageHours.toFixed(1)} hours old`,
            details: { max_age_hours: CONFIG.MAX_DATA_AGE_HOURS }
          });
        } else {
          this.log('success', `Data is fresh (${ageHours.toFixed(1)} hours old)`);
        }

        if (response.data.data.is_fallback) {
          this.log('warning', 'Using fallback data due to API issues');
          this.results.alerts.push({
            type: 'data_quality',
            severity: 'medium',
            message: 'Using fallback data',
            details: { reason: 'Instagram API issues' }
          });
        }
      } else {
        this.log('error', 'No timestamp found in response');
        this.results.alerts.push({
          type: 'data_freshness',
          severity: 'high',
          message: 'No timestamp found in data',
          details: response.data
        });
      }
    } catch (error) {
      this.log('error', 'Data freshness check failed', { error: error.message });
      this.results.data_freshness = {
        error: error.message
      };
    }
  }

  async checkDataQuality() {
    this.log('info', 'Checking data quality...');
    
    const functionUrl = `${CONFIG.SUPABASE_URL}/functions/v1/${CONFIG.FUNCTION_NAME}`;
    
    try {
      const response = await this.makeRequest(functionUrl);
      
      if (response.data?.data) {
        const data = response.data.data;
        const followersCount = data.followers_count || 0;
        const postsCount = data.posts_count || 0;
        
        this.results.data_quality = {
          followers_count: followersCount,
          posts_count: postsCount,
          meets_minimum_followers: followersCount >= CONFIG.MIN_FOLLOWERS,
          meets_minimum_posts: postsCount >= CONFIG.MIN_POSTS,
          has_execution_time: !!data.execution_time_ms
        };

        // Check data quality thresholds
        if (followersCount < CONFIG.MIN_FOLLOWERS) {
          this.log('warning', `Follower count below minimum (${followersCount} < ${CONFIG.MIN_FOLLOWERS})`);
          this.results.alerts.push({
            type: 'data_quality',
            severity: 'medium',
            message: 'Follower count below expected minimum',
            details: { actual: followersCount, expected: CONFIG.MIN_FOLLOWERS }
          });
        }

        if (postsCount < CONFIG.MIN_POSTS) {
          this.log('warning', `Post count below minimum (${postsCount} < ${CONFIG.MIN_POSTS})`);
          this.results.alerts.push({
            type: 'data_quality',
            severity: 'medium',
            message: 'Post count below expected minimum',
            details: { actual: postsCount, expected: CONFIG.MIN_POSTS }
          });
        }

        if (followersCount >= CONFIG.MIN_FOLLOWERS && postsCount >= CONFIG.MIN_POSTS) {
          this.log('success', `Data quality good (${followersCount} followers, ${postsCount} posts)`);
        }
      } else {
        this.log('error', 'No data found in response');
        this.results.alerts.push({
          type: 'data_quality',
          severity: 'high',
          message: 'No data found in function response',
          details: response.data
        });
      }
    } catch (error) {
      this.log('error', 'Data quality check failed', { error: error.message });
      this.results.data_quality = {
        error: error.message
      };
    }
  }

  async checkPerformance() {
    this.log('info', 'Checking performance metrics...');
    
    const functionUrl = `${CONFIG.SUPABASE_URL}/functions/v1/${CONFIG.FUNCTION_NAME}`;
    const performanceTests = [];
    
    // Run multiple requests to get average performance
    for (let i = 0; i < 3; i++) {
      try {
        const startTime = Date.now();
        const response = await this.makeRequest(functionUrl);
        const responseTime = Date.now() - startTime;
        
        performanceTests.push({
          response_time_ms: responseTime,
          success: response.statusCode < 400,
          execution_time_ms: response.data?.data?.execution_time_ms || null
        });
        
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        performanceTests.push({
          response_time_ms: null,
          success: false,
          error: error.message
        });
      }
    }

    const successfulTests = performanceTests.filter(test => test.success);
    const avgResponseTime = successfulTests.length > 0 
      ? successfulTests.reduce((sum, test) => sum + test.response_time_ms, 0) / successfulTests.length
      : null;

    this.results.performance = {
      tests_run: performanceTests.length,
      successful_tests: successfulTests.length,
      success_rate: (successfulTests.length / performanceTests.length) * 100,
      avg_response_time_ms: avgResponseTime ? Math.round(avgResponseTime) : null,
      tests: performanceTests
    };

    if (successfulTests.length === 0) {
      this.log('error', 'All performance tests failed');
      this.results.alerts.push({
        type: 'performance',
        severity: 'critical',
        message: 'All performance tests failed',
        details: { tests: performanceTests }
      });
    } else if (avgResponseTime > 10000) { // 10 seconds
      this.log('warning', `Slow response time (${avgResponseTime.toFixed(0)}ms average)`);
      this.results.alerts.push({
        type: 'performance',
        severity: 'medium',
        message: 'Slow response time detected',
        details: { avg_response_time_ms: avgResponseTime }
      });
    } else {
      this.log('success', `Performance good (${avgResponseTime.toFixed(0)}ms average, ${this.results.performance.success_rate}% success rate)`);
    }
  }

  generateReport() {
    this.log('info', 'Generating monitoring report...');
    
    const report = {
      ...this.results,
      summary: {
        overall_health: this.results.alerts.length === 0 ? 'healthy' : 
                       this.results.alerts.some(a => a.severity === 'critical') ? 'critical' : 'warning',
        total_alerts: this.results.alerts.length,
        critical_alerts: this.results.alerts.filter(a => a.severity === 'critical').length,
        high_alerts: this.results.alerts.filter(a => a.severity === 'high').length,
        medium_alerts: this.results.alerts.filter(a => a.severity === 'medium').length
      }
    };

    // Save report to file
    const reportPath = path.join(__dirname, '..', 'logs', `instagram-monitor-${Date.now()}.json`);
    
    try {
      // Ensure logs directory exists
      const logsDir = path.dirname(reportPath);
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
      }
      
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      this.log('info', `Report saved to ${reportPath}`);
    } catch (error) {
      this.log('error', 'Failed to save report', { error: error.message });
    }

    return report;
  }

  async run() {
    this.log('info', 'Starting Instagram data refresh monitoring...');
    
    try {
      // Validate configuration
      if (!CONFIG.SUPABASE_URL || !CONFIG.SUPABASE_ANON_KEY) {
        throw new Error('Missing required environment variables: SUPABASE_URL, SUPABASE_ANON_KEY');
      }

      // Run all checks
      await this.testFunctionHealth();
      await this.checkDataFreshness();
      await this.checkDataQuality();
      await this.checkPerformance();

      // Generate and return report
      const report = this.generateReport();
      
      this.log('info', 'Monitoring complete');
      
      // Print summary
      console.log(`\n${colors.bright}=== MONITORING SUMMARY ===${colors.reset}`);
      console.log(`Overall Health: ${report.summary.overall_health === 'healthy' ? colors.green : 
                   report.summary.overall_health === 'critical' ? colors.red : colors.yellow}${report.summary.overall_health}${colors.reset}`);
      console.log(`Total Alerts: ${report.summary.total_alerts}`);
      
      if (report.summary.total_alerts > 0) {
        console.log(`  Critical: ${report.summary.critical_alerts}`);
        console.log(`  High: ${report.summary.high_alerts}`);
        console.log(`  Medium: ${report.summary.medium_alerts}`);
      }

      return report;
    } catch (error) {
      this.log('error', 'Monitoring failed', { error: error.message });
      throw error;
    }
  }
}

// CLI execution
if (require.main === module) {
  const monitor = new InstagramMonitor();
  
  monitor.run()
    .then((report) => {
      process.exit(report.summary.overall_health === 'critical' ? 1 : 0);
    })
    .catch((error) => {
      console.error(`${colors.red}Monitoring failed: ${error.message}${colors.reset}`);
      process.exit(1);
    });
}

module.exports = InstagramMonitor;