// Setup celebrity artists in Supabase
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const celebrityArtists = [
  { name: 'Khullar G', package: '6Lacs + GST Inclusive of Travel & Accomodation', niche: 'Punjabi Rapper & Singer', tier: 'green', image_url: '/khullar-g.jpeg', bio: 'Dynamic Punjabi rapper and singer known for energetic performances' },
  { name: 'Kamakshi', package: '6Lacs + GST Inclusive of Travel & Accomodation', niche: 'Bollywood & Punjabi Set', tier: 'green', image_url: '/kamakshi.jpeg', bio: 'Versatile performer specializing in Bollywood and Punjabi music' },
  { name: 'Ananya Mishra', package: '6Lacs + GST Inclusive of Travel & Accomodation', niche: 'Singer & Performer (4 Artists)', tier: 'green', image_url: '/ananya-mishra.jpeg', bio: 'Talented singer leading a group of 4 artists' },
  { name: 'Priyanka Mehar', package: '6Lacs + GST Inclusive of Travel & Accomodation', niche: 'Folk & Bollywood Set', tier: 'green', image_url: '/priyanka-meher.png', bio: 'Folk and Bollywood music specialist with soulful performances' },
  { name: 'Sid K', package: '6.5Lacs + GST Inclusive of Travel & Accomodation', niche: 'Punjabi & Bollywood Singer', tier: 'green', image_url: '/sid-k.jpeg', bio: 'Popular Punjabi and Bollywood singer' },
  { name: 'Vijay Jamner', package: '6 Lacs + GST Inclusive of Travel & Accomodation', niche: 'Sufi & Bollywood Singer', tier: 'green', image_url: '/vijay-jamner.jpeg', bio: 'Sufi and Bollywood vocalist with mesmerizing voice' },
  { name: 'Yashraj', package: '8Lacs + GST Inclusive of Travel & Accomodation', niche: 'Rapper', tier: 'yellow', image_url: '/yashraj.jpeg', bio: 'Rising star in the rap scene' },
  { name: 'Khusboo Grewal', package: '9Lacs + GST Inclusive of Travel & Accomodation', niche: 'Bollywood Singer', tier: 'yellow', image_url: '/khusboo-grewal.jpeg', bio: 'Renowned Bollywood playback singer' },
  { name: 'Sandeep Batraa', package: '10Lacs + GST Inclusive of Travel & Accomodation', niche: 'Bollywood Singer & Performer', tier: 'yellow', image_url: '/sandeep-batraa.jpeg', bio: 'Versatile Bollywood singer and performer' },
  { name: 'Oabu Samwal', package: '10Lacs + GST Inclusive of Travel & Accomodation', niche: 'Bollywood Singer & Performer', tier: 'yellow', image_url: '/oabu-samwal.jpeg', bio: 'Dynamic Bollywood performer' },
  { name: 'Jyotica Tangri', package: '10Lacs + GST Inclusive of Travel & Accomodation', niche: 'Bollywood Singer', tier: 'yellow', image_url: '/jyotica-tangri.jpeg', bio: 'Popular Bollywood playback singer' },
  { name: 'Usha Uthup', package: '20Lacs + GST Inclusive of Travel & Accomodation', niche: 'Traditional Indian Melodies', tier: 'red', image_url: '/usha-uthup.jpeg', bio: 'Legendary singer known for traditional Indian melodies' },
  { name: 'Paradox', package: '18Lacs + GST Inclusive of Travel & Accomodation', niche: 'Bollywood Mix', tier: 'red', image_url: '/paradox.png', bio: 'Unique Bollywood music performer' },
  { name: 'MC Square', package: '17Lacs + GST Inclusive of Travel & Accomodation', niche: 'Rapper', tier: 'red', image_url: '/mcsquare.png', bio: 'Famous rapper and hip-hop artist' },
  { name: 'Shaarib & Toshi', package: '30Lacs + GST Inclusive of Travel & Accomodation', niche: 'Bollywood Music Directors & Performer [2 Artists]', tier: 'red', image_url: '/shaarib-toshi.jpeg', bio: 'Acclaimed Bollywood music director duo' },
  { name: 'Badshah', package: '60Lacs + GST Inclusive of Travel & Accomodation', niche: 'Bollywood Singer & Punjabi Rapper', tier: 'red', image_url: '/badshah.png', bio: 'Superstar rapper and Bollywood sensation' }
];

async function setupCelebrityArtists() {
  console.log('🎤 Setting up celebrity artists in Supabase...\n');

  try {
    // Check if table exists by trying to query it
    console.log('1. Checking if celebrity_artists table exists...');
    const { error: checkError } = await supabase
      .from('celebrity_artists')
      .select('count')
      .limit(1);

    if (checkError) {
      console.error('❌ Table does not exist. Please run the SQL schema first:');
      console.log('   supabase/celebrity-artists-schema.sql\n');
      console.log('   You can run it in your Supabase dashboard SQL editor.');
      return;
    }
    console.log('✅ Table exists\n');

    // Clear existing data
    console.log('2. Clearing existing celebrity artists...');
    const { error: deleteError } = await supabase
      .from('celebrity_artists')
      .delete()
      .neq('id', 0); // Delete all records

    if (deleteError) {
      console.error('❌ Error clearing data:', deleteError.message);
      return;
    }
    console.log('✅ Existing data cleared\n');

    // Insert new data
    console.log('3. Inserting celebrity artists...');
    const { data, error: insertError } = await supabase
      .from('celebrity_artists')
      .insert(celebrityArtists)
      .select();

    if (insertError) {
      console.error('❌ Error inserting data:', insertError.message);
      return;
    }

    console.log(`✅ Successfully inserted ${data.length} celebrity artists\n`);

    // Display summary
    console.log('📊 Summary by tier:');
    const greenCount = data.filter(a => a.tier === 'green').length;
    const yellowCount = data.filter(a => a.tier === 'yellow').length;
    const redCount = data.filter(a => a.tier === 'red').length;
    
    console.log(`   🟢 Green tier: ${greenCount} artists`);
    console.log(`   🟡 Yellow tier: ${yellowCount} artists`);
    console.log(`   🔴 Red tier: ${redCount} artists`);
    
    console.log('\n🎉 Celebrity artists setup complete!');
    console.log('   You can now view them on the Celebrity Concerts page.');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  }
}

setupCelebrityArtists();
