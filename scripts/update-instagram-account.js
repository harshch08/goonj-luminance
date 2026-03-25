#!/usr/bin/env node

/**
 * Instagram Account Updater
 * 
 * This script updates all Instagram account references in the codebase
 * Usage: node scripts/update-instagram-account.js NEW_USERNAME NEW_PROFILE_URL
 */

const fs = require('fs');
const path = require('path');

// Get new username and URL from command line
const newUsername = process.argv[2];
const newProfileUrl = process.argv[3];

if (!newUsername || !newProfileUrl) {
  console.error('❌ Error: Missing required arguments');
  console.log('\n📋 Usage:');
  console.log('  node scripts/update-instagram-account.js NEW_USERNAME NEW_PROFILE_URL');
  console.log('\n📝 Example:');
  console.log('  node scripts/update-instagram-account.js "my_new_account" "https://www.instagram.com/my_new_account"');
  process.exit(1);
}

console.log('🔄 Updating Instagram account references...\n');
console.log(`📱 New Username: @${newUsername}`);
console.log(`🔗 New Profile URL: ${newProfileUrl}\n`);

// Files to update
const filesToUpdate = [
  'src/components/sections/InstagramSection.tsx',
  'src/components/sections/Footer.tsx',
  'src/components/sections/SocialProofSection.tsx'
];

// Old values to replace
const oldUsername = 'goonj_entertainment__';
const oldUrl = 'https://www.instagram.com/goonj_entertainment__?igsh=MTZuYno5eHY5bjJ0';

let updatedFiles = 0;
let totalReplacements = 0;

filesToUpdate.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }
  
  try {
    let content = fs.readFileSync(fullPath, 'utf8');
    let fileReplacements = 0;
    
    // Replace username
    const usernameRegex = new RegExp(oldUsername, 'g');
    const usernameMatches = content.match(usernameRegex);
    if (usernameMatches) {
      content = content.replace(usernameRegex, newUsername);
      fileReplacements += usernameMatches.length;
    }
    
    // Replace URL
    const urlRegex = new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const urlMatches = content.match(urlRegex);
    if (urlMatches) {
      content = content.replace(urlRegex, newProfileUrl);
      fileReplacements += urlMatches.length;
    }
    
    if (fileReplacements > 0) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Updated ${filePath} (${fileReplacements} replacements)`);
      updatedFiles++;
      totalReplacements += fileReplacements;
    } else {
      console.log(`ℹ️  No changes needed in ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
});

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`✨ Update complete!`);
console.log(`📁 Files updated: ${updatedFiles}`);
console.log(`🔄 Total replacements: ${totalReplacements}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

console.log('\n📋 Next Steps:');
console.log('1. Update Supabase environment variables:');
console.log('   - INSTAGRAM_ACCESS_TOKEN');
console.log('   - INSTAGRAM_BUSINESS_ACCOUNT_ID');
console.log('2. Test the Instagram feed on your site');
console.log('3. Commit and deploy the changes');
