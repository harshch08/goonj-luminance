#!/bin/bash

# Instagram Data Fetching Edge Function Deployment Script
# This script deploys the function and sets up scheduling

set -e

echo "🚀 Deploying Instagram Data Fetching Edge Function..."

# Deploy the function
echo "📦 Deploying function to Supabase..."
supabase functions deploy fetch-instagram-data

# Get the function URL
PROJECT_REF=$(supabase status | grep "API URL" | awk '{print $3}' | sed 's/https:\/\///' | sed 's/\.supabase\.co//')
FUNCTION_URL="https://${PROJECT_REF}.supabase.co/functions/v1/fetch-instagram-data"

echo "✅ Function deployed successfully!"
echo "🔗 Function URL: $FUNCTION_URL"

# Check if cron configuration exists
if [ -f "cron.json" ]; then
    echo "⏰ Setting up scheduled execution..."
    
    # Read cron configuration
    SCHEDULE=$(cat cron.json | jq -r '.schedule')
    DESCRIPTION=$(cat cron.json | jq -r '.description')
    ENABLED=$(cat cron.json | jq -r '.enabled')
    
    echo "📅 Schedule: $SCHEDULE ($DESCRIPTION)"
    echo "🔄 Enabled: $ENABLED"
    
    # Note: Supabase doesn't have built-in cron scheduling yet
    # This section provides instructions for external scheduling
    echo ""
    echo "⚠️  Note: Supabase Edge Functions don't have built-in cron scheduling yet."
    echo "📋 To set up scheduled execution, use one of these options:"
    echo ""
    echo "1. 🐙 GitHub Actions (Recommended):"
    echo "   Create .github/workflows/instagram-refresh.yml with the schedule"
    echo ""
    echo "2. 🖥️  External Cron Job:"
    echo "   Add this to your server's crontab:"
    echo "   $SCHEDULE curl -X POST '$FUNCTION_URL' -H 'Authorization: Bearer \$SUPABASE_ANON_KEY'"
    echo ""
    echo "3. ☁️  Cloud Scheduler (GCP/AWS/Azure):"
    echo "   Set up a cloud scheduler to call the function URL"
    echo ""
    echo "4. 🔄 Monitoring Service:"
    echo "   Use services like UptimeRobot or Pingdom with webhook functionality"
    
else
    echo "⚠️  No cron.json configuration found. Skipping scheduling setup."
fi

echo ""
echo "🎉 Deployment complete!"
echo "🔍 Monitor function logs with: supabase functions logs fetch-instagram-data"
echo "🧪 Test function with: curl -X POST '$FUNCTION_URL' -H 'Authorization: Bearer \$SUPABASE_ANON_KEY'"