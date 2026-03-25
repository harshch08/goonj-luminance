#!/usr/bin/env node

/**
 * Instagram Cache Management Utility
 * 
 * This script provides administrative tools for managing the Instagram data cache.
 * It can be used for manual refresh, cache cleanup, health checks, and monitoring.
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  INSTAGRAM_ADMIN_KEY: process.env.INSTAGRAM_ADMIN_KEY,
  TIMEOUT_MS: 30000
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

class CacheManager {
  constructor() {
    this.validateConfig();
  }

  validateConfig() {
    if (!CONFIG.SUPABASE_URL || !CONFIG.SUPABASE_ANON_KEY) {
      this.log('error', 'Missing required environment variables: SUPABASE_URL, SUPABASE_ANON_KEY');
      process.exit(1);
    }
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

  async makeRequest(endpoint, options = {}) {
    return new Promise((resolve, reject) => {
      const url = `${CONFIG.SUPABASE_URL}/functions/v1/${endpoint}`;
      
      const requestOptions = {
        method: options.method || 'GET',
        headers: {
          'Authorization': `Bearer ${CONFIG.SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Instagram-Cache-Manager/1.0',
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

  async manualRefresh(options = {}) {
    this.log('info', 'Triggering manual cache refresh...');
    
    const requestBody = {
      force: options.force || false,
      data_types: options.dataTypes || ['follower_count', 'posts'],
      reason: options.reason || 'Manual refresh via cache manager script'
    };

    if (CONFIG.INSTAGRAM_ADMIN_KEY) {
      requestBody.admin_key = CONFIG.INSTAGRAM_ADMIN_KEY;
    }

    try {
      const response = await this.makeRequest('manual-instagram-refresh', {
        method: 'POST',
        body: requestBody
      });

      if (response.statusCode === 200 && response.data.success) {
        this.log('success', 'Manual refresh completed successfully');
        this.log('info', 'Refresh details:', response.data.data);
        return response.data;
      } else {
        this.log('error', `Manual refresh failed (${response.statusCode})`, response.data);
        throw new Error(`Manual refresh failed: ${response.data.error || 'Unknown error'}`);
      }
    } catch (error) {
      this.log('error', 'Manual refresh request failed', { error: error.message });
      throw error;
    }
  }

  async checkHealth() {
    this.log('info', 'Checking cache health...');
    
    try {
      const response = await this.makeRequest('manual-instagram-refresh', {
        method: 'GET'
      });

      if (response.statusCode === 200 && response.data.success) {
        const healthData = response.data.data.cache_health;
        
        this.log('info', `Overall cache health: ${healthData.overall_status}`);
        this.log('info', `Follower count status: ${healthData.follower_count_status}`);
        this.log('info', `Posts status: ${healthData.posts_status}`);
        
        if (healthData.issues.length > 0) {
          this.log('warning', 'Issues found:');
          healthData.issues.forEach(issue => console.log(`  - ${issue}`));
        }
        
        if (healthData.recommendations.length > 0) {
          this.log('info', 'Recommendations:');
          healthData.recommendations.forEach(rec => console.log(`  - ${rec}`));
        }
        
        return response.data;
      } else {
        this.log('error', `Health check failed (${response.statusCode})`, response.data);
        throw new Error(`Health check failed: ${response.data.error || 'Unknown error'}`);
      }
    } catch (error) {
      this.log('error', 'Health check request failed', { error: error.message });
      throw error;
    }
  }

  async getStats() {
    this.log('info', 'Retrieving cache statistics...');
    
    try {
      const response = await this.makeRequest('fetch-instagram-data');

      if (response.statusCode === 200 && response.data.success) {
        const stats = response.data.data.cache_stats;
        
        this.log('success', 'Cache statistics retrieved');
        this.log('info', 'Statistics:', stats);
        
        return stats;
      } else {
        this.log('error', `Stats retrieval failed (${response.statusCode})`, response.data);
        throw new Error(`Stats retrieval failed: ${response.data.error || 'Unknown error'}`);
      }
    } catch (error) {
      this.log('error', 'Stats request failed', { error: error.message });
      throw error;
    }
  }

  async warmCache() {
    this.log('info', 'Warming cache...');
    
    try {
      // Trigger a refresh with force=false to warm the cache
      const result = await this.manualRefresh({
        force: false,
        reason: 'Cache warming operation'
      });
      
      this.log('success', 'Cache warming completed');
      return result;
    } catch (error) {
      this.log('error', 'Cache warming failed', { error: error.message });
      throw error;
    }
  }

  printUsage() {
    console.log(`
${colors.bright}Instagram Cache Management Utility${colors.reset}

${colors.cyan}Usage:${colors.reset}
  node scripts/manage-instagram-cache.js <command> [options]

${colors.cyan}Commands:${colors.reset}
  ${colors.green}health${colors.reset}                    Check cache health status
  ${colors.green}stats${colors.reset}                     Get cache statistics
  ${colors.green}refresh${colors.reset}                   Trigger manual refresh
  ${colors.green}refresh --force${colors.reset}           Force refresh regardless of cache age
  ${colors.green}warm${colors.reset}                      Warm cache (refresh if stale)
  ${colors.green}help${colors.reset}                      Show this help message

${colors.cyan}Options:${colors.reset}
  ${colors.yellow}--force${colors.reset}                  Force operation regardless of current state
  ${colors.yellow}--reason "text"${colors.reset}          Specify reason for manual operations
  ${colors.yellow}--data-types "type1,type2"${colors.reset} Specify data types (follower_count,posts)

${colors.cyan}Environment Variables:${colors.reset}
  ${colors.yellow}SUPABASE_URL${colors.reset}             Your Supabase project URL (required)
  ${colors.yellow}SUPABASE_ANON_KEY${colors.reset}        Your Supabase anon key (required)
  ${colors.yellow}INSTAGRAM_ADMIN_KEY${colors.reset}      Admin key for manual refresh endpoint (optional)

${colors.cyan}Examples:${colors.reset}
  node scripts/manage-instagram-cache.js health
  node scripts/manage-instagram-cache.js refresh --force --reason "API issues resolved"
  node scripts/manage-instagram-cache.js stats
  node scripts/manage-instagram-cache.js warm
`);
  }

  async run() {
    const args = process.argv.slice(2);
    const command = args[0];
    
    // Parse options
    const options = {
      force: args.includes('--force'),
      reason: null,
      dataTypes: null
    };

    // Parse reason
    const reasonIndex = args.indexOf('--reason');
    if (reasonIndex !== -1 && args[reasonIndex + 1]) {
      options.reason = args[reasonIndex + 1];
    }

    // Parse data types
    const dataTypesIndex = args.indexOf('--data-types');
    if (dataTypesIndex !== -1 && args[dataTypesIndex + 1]) {
      options.dataTypes = args[dataTypesIndex + 1].split(',').map(t => t.trim());
    }

    try {
      switch (command) {
        case 'health':
          await this.checkHealth();
          break;
          
        case 'stats':
          await this.getStats();
          break;
          
        case 'refresh':
          await this.manualRefresh(options);
          break;
          
        case 'warm':
          await this.warmCache();
          break;
          
        case 'help':
        case '--help':
        case '-h':
          this.printUsage();
          break;
          
        default:
          if (!command) {
            this.log('error', 'No command specified');
          } else {
            this.log('error', `Unknown command: ${command}`);
          }
          this.printUsage();
          process.exit(1);
      }
      
      this.log('success', 'Operation completed successfully');
      
    } catch (error) {
      this.log('error', `Operation failed: ${error.message}`);
      process.exit(1);
    }
  }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const manager = new CacheManager();
  manager.run();
}

export default CacheManager;