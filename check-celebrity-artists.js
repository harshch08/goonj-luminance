// Check celebrity artists in Supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jtwquvxjipjspqiykoic.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3F1dnhqaXBqc3BxaXlrb2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4NDY3ODcsImV4cCI6MjA4NTQyMjc4N30.eUvI0OHUyrSx3LVhXBFml3Kmd0VdSZP8ULvSc-53WeY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCelebrityArtists() {
  console.log('🎤 Checking celebrity artists in Supabase...\n');
  
  try {
    const { data, error } = await supabase
      .from('celebrity_artists')
      .select('*')
      .order('tier', { ascending: true })
      .order('name', { ascending: true });
    
    if (error) {
      console.error('❌ Error:', error.message);
      if (error.message.includes('relation') || error.message.includes('does not exist')) {
        console.log('\n⚠️  Table does not exist. Please run:');
        console.log('   1. Execute supabase/celebrity-artists-schema.sql in Supabase dashboard');
        console.log('   2. Then run: node scripts/setup-celebrity-artists.js');
      }
      return;
    }
    
    if (!data || data.length === 0) {
      console.log('⚠️  No celebrity artists found in database');
      console.log('\nTo add artists, run: node scripts/setup-celebrity-artists.js');
      return;
    }
    
    console.log(`✅ Found ${data.length} celebrity artists\n`);
    
    // Group by tier
    const greenArtists = data.filter(a => a.tier === 'green');
    const yellowArtists = data.filter(a => a.tier === 'yellow');
    const redArtists = data.filter(a => a.tier === 'red');
    
    console.log('🟢 GREEN TIER (' + greenArtists.length + ' artists):');
    greenArtists.forEach(a => {
      console.log(`   - ${a.name} | ${a.niche}`);
    });
    
    console.log('\n🟡 YELLOW TIER (' + yellowArtists.length + ' artists):');
    yellowArtists.forEach(a => {
      console.log(`   - ${a.name} | ${a.niche}`);
    });
    
    console.log('\n🔴 RED TIER (' + redArtists.length + ' artists):');
    redArtists.forEach(a => {
      console.log(`   - ${a.name} | ${a.niche}`);
    });
    
    console.log('\n✅ Celebrity artists are ready!');
    console.log('   Visit /services/celebrity to see them on your website.');
    
  } catch (err) {
    console.error('❌ Check failed:', err.message);
  }
}

checkCelebrityArtists();
