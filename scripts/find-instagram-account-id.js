#!/usr/bin/env node

/**
 * Instagram Business Account ID Finder
 * 
 * This script helps you find your Instagram Business Account ID using your access token.
 */

const https = require('https');

// Get access token from command line argument or environment variable
const accessToken = process.argv[2] || process.env.INSTAGRAM_ACCESS_TOKEN;

if (!accessToken) {
  console.error('❌ Error: No access token provided');
  console.log('\n📋 Usage:');
  console.log('  node scripts/find-instagram-account-id.js YOUR_ACCESS_TOKEN');
  console.log('  or set INSTAGRAM_ACCESS_TOKEN environment variable');
  console.log('\n🔗 Get your access token from:');
  console.log('  https://developers.facebook.com/tools/explorer/');
  process.exit(1);
}

console.log('🔍 Finding Instagram Business Account ID...\n');

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          reject(new Error(`Failed to parse JSON: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

async function findInstagramAccountId() {
  try {
    // First, get all connected accounts
    console.log('📡 Fetching connected accounts...');
    const accountsUrl = `https://graph.facebook.com/v18.0/me/accounts?access_token=${accessToken}`;
    const accountsResponse = await makeRequest(accountsUrl);
    
    if (accountsResponse.error) {
      throw new Error(`API Error: ${accountsResponse.error.message}`);
    }
    
    if (!accountsResponse.data || accountsResponse.data.length === 0) {
      console.log('⚠️  No Facebook pages found. Make sure you have:');
      console.log('   1. A Facebook page connected to your Instagram Business account');
      console.log('   2. Proper permissions in your access token');
      return;
    }
    
    console.log(`✅ Found ${accountsResponse.data.length} Facebook page(s)\n`);
    
    // Check each page for Instagram Business account
    for (const page of accountsResponse.data) {
      console.log(`🔍 Checking page: ${page.name} (ID: ${page.id})`);
      
      try {
        // Get Instagram account for this page
        const instagramUrl = `https://graph.facebook.com/v18.0/${page.id}?fields=instagram_business_account&access_token=${page.access_token}`;
        const instagramResponse = await makeRequest(instagramUrl);
        
        if (instagramResponse.instagram_business_account) {
          const instagramId = instagramResponse.instagram_business_account.id;
          
          // Get Instagram account details
          const detailsUrl = `https://graph.facebook.com/v18.0/${instagramId}?fields=id,username,name,followers_count&access_token=${page.access_token}`;
          const detailsResponse = await makeRequest(detailsUrl);
          
          console.log('🎉 Found Instagram Business Account!');
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log(`📱 Instagram Username: @${detailsResponse.username || 'N/A'}`);
          console.log(`📝 Account Name: ${detailsResponse.name || 'N/A'}`);
          console.log(`👥 Followers: ${detailsResponse.followers_count || 'N/A'}`);
          console.log(`🆔 Instagram Business Account ID: ${instagramId}`);
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log('\n📋 Copy this ID to your environment variables:');
          console.log(`INSTAGRAM_BUSINESS_ACCOUNT_ID=${instagramId}`);
          
          return instagramId;
        } else {
          console.log('   ❌ No Instagram Business account connected to this page');
        }
      } catch (error) {
        console.log(`   ⚠️  Error checking page: ${error.message}`);
      }
    }
    
    console.log('\n❌ No Instagram Business accounts found.');
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Make sure your Instagram account is a Business account');
    console.log('   2. Connect your Instagram Business account to a Facebook page');
    console.log('   3. Ensure your access token has instagram_basic permissions');
    console.log('   4. Make sure you\'re an admin of the Facebook page');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('Invalid OAuth access token')) {
      console.log('\n🔧 Your access token appears to be invalid or expired.');
      console.log('   Get a new one from: https://developers.facebook.com/tools/explorer/');
    }
  }
}

findInstagramAccountId();