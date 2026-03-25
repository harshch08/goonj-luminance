-- Add missing columns to existing live_artists table
ALTER TABLE live_artists ADD COLUMN IF NOT EXISTS genre VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE live_artists ADD COLUMN IF NOT EXISTS tag VARCHAR(100) NOT NULL DEFAULT 'Singer & Performer';
ALTER TABLE live_artists ADD COLUMN IF NOT EXISTS bio TEXT NOT NULL DEFAULT '';
ALTER TABLE live_artists ADD COLUMN IF NOT EXISTS package VARCHAR(255) NOT NULL DEFAULT 'Price on Request';
ALTER TABLE live_artists ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_live_artists_category ON live_artists(category);
CREATE INDEX IF NOT EXISTS idx_live_artists_active ON live_artists(is_active);
CREATE INDEX IF NOT EXISTS idx_live_artists_sort ON live_artists(sort_order);

-- Clear existing data
TRUNCATE TABLE live_artists RESTART IDENTITY;

-- Insert Live Music artists
INSERT INTO live_artists (id, name, genre, tag, bio, description, category, package, price, image_url, sort_order) VALUES
(201, 'Rahul Thapa Ryan', 'Western, Bollywood & Retro', 'Singer & Performer',
  'A versatile artist with a powerful voice, Rahul brings energy and emotion to every performance.',
  'Solo Singer & Performer – Western, Bollywood & Retro', 'Live Music', 'Price on Request', 999, '/Rahul_Thapa_Ryan.jpeg', 1),
(204, 'Ranjan', 'Bolly Mix', 'Singer & Performer',
  'A talented musician and vocalist, Ranjan brings a unique blend of traditional and modern sounds.',
  'Solo Singer & Performer – Bolly Mix', 'Live Music', 'Price on Request', 999, '/ranjan.jpeg', 2),
(207, 'Ajay', 'Bolly Mix', 'Singer & Performer',
  'A dynamic performer with a charismatic stage presence, Ajay specializes in high-energy performances.',
  'Solo Singer & Performer – Bolly Mix', 'Live Music', 'Price on Request', 999, '/Ajay.jpeg', 3),
(301, 'Rahul Thapa Ryan Duo', 'Bolly Mix', 'Singer & Performer',
  'A perfect harmony of vocals and piano, this duo creates an intimate and sophisticated musical experience.',
  'Duo Performers – Bolly Mix', 'Live Music', 'Price on Request', 999, '/Rahul_Thapa_Ryan.jpeg', 4),
(302, 'Ranjan & Vansh Duo', 'Bolly Mix', 'Singer & Performer',
  'This unique duo combines vocal excellence with masterful piano accompaniment.',
  'Duo Performers – Bolly Mix', 'Live Music', 'Price on Request', 999, '/ranjan duo.jpeg', 5),
(303, 'Manisha & Aditya Duo', 'Bolly Mix', 'Singer & Performer',
  'The combination of Manisha''s melodious voice with skilled guitar work creates a captivating experience.',
  'Duo Performers – Bolly Mix', 'Live Music', 'Price on Request', 999, '/manisha.jpeg', 6),
(305, 'Sirat Band', 'Bolly Mix', 'Singer & Performer',
  'A powerful combination of strong vocals and guitar expertise that engages and entertains crowds.',
  'Band – Bolly Mix', 'Live Music', 'Price on Request', 999, '/Sirat band.jpeg', 7);

-- Insert Second Performers
INSERT INTO live_artists (name, genre, tag, bio, description, category, package, price, image_url, sort_order) VALUES
('Rahul Thapa Ryan', 'Western Music', 'Musician & Music Teacher',
  'Western musician and music teacher with exceptional skill.',
  'Western Musician & Music Teacher', 'Second Performers', '50K + GST Inclusive of Travel & Accomodation', 50000, '/Rahul_Thapa_Ryan.jpeg', 1),
('Rahul Thapa Ryan', 'Western Music Band', 'Singer & Performer',
  'Western music band performance with full ensemble.',
  'Western Music Band', 'Second Performers', '1Lacs + GST Inclusive of Travel & Accomodation', 100000, '/Rahul_Thapa_Ryan.jpeg', 2),
('Brij Instrumental', 'Violin Instrumental Indo Western', 'Instrumentalist',
  'Mesmerizing violin instrumental performances blending Indo-Western styles.',
  'Violin Instrumental Indo Western Band', 'Second Performers', '60K + GST Inclusive of Travel & Accomodation', 60000, NULL, 3),
('Monu Melodies', 'Qawalli & Sufi & Gazals', 'Singer & Performer',
  'Soulful Qawalli, Sufi and Ghazal performances that touch the heart.',
  'Qawalli & Sufi & Gazals', 'Second Performers', '75K + GST Inclusive of Travel & Accomodation', 75000, NULL, 4),
('Arjun', 'Western & Indian Mix', 'Singer & Performer',
  'Versatile performer blending Western and Indian musical styles.',
  'Western & Indian Mix', 'Second Performers', '3Lacs + GST Inclusive of Travel & Accomodation', 300000, NULL, 5),
('Cardamom', 'Western Music', 'Band',
  'A talented Western music band delivering premium live performances.',
  'Western Music Band', 'Second Performers', '3Lacs + GST Inclusive of Travel & Accomodation', 300000, NULL, 6),
('KUBE - The Band', 'Mix Genre', 'Band',
  'High-energy mix genre band covering multiple musical styles.',
  'Mix Genre Band', 'Second Performers', '4Lacs + GST Inclusive of Travel & Accomodation', 400000, NULL, 7),
('Rehnuma Band', 'Qawali & Bollywood Fusion', 'Band',
  'Unique fusion of Qawali and Bollywood creating an unforgettable experience.',
  'Qawali & Bollywood Fusion', 'Second Performers', '4Lacs + GST Inclusive of Travel & Accomodation', 400000, NULL, 8),
('Azaadi The Band', 'Mix Genre', 'Band',
  'Dynamic mix genre band known for electrifying live performances.',
  'Mix Genre Band', 'Second Performers', '4Lacs + GST Inclusive of Travel & Accomodation', 400000, NULL, 9),
('Deeksha Toor', 'Bollywood', 'Singer & Performer',
  'Indian Idol Season 6 contestant – Bollywood Singer (2 Artists).',
  'Indian Idol S6 – Bollywood Singer (2 Artists)', 'Second Performers', '4Lacs + GST Inclusive of Travel & Accomodation', 400000, NULL, 10),
('Deeksha Toor', 'Bollywood', 'Singer & Performer',
  'Indian Idol Season 6 contestant – Bollywood Singer (4 Artists).',
  'Indian Idol S6 – Bollywood Singer (4 Artists)', 'Second Performers', '5Lacs + GST Inclusive of Travel & Accomodation', 500000, NULL, 11),
('Amika Shail', 'Bollywood', 'Singer',
  'Popular Bollywood singer known for soulful and energetic performances.',
  'Bollywood Singer', 'Second Performers', '6Lacs + GST Inclusive of Travel & Accomodation', 600000, NULL, 12),
('Anjusha Sharma', 'Bollywood', 'Singer',
  'Talented Bollywood singer delivering captivating live performances.',
  'Bollywood Singer', 'Second Performers', '5Lacs + GST Inclusive of Travel & Accomodation', 500000, NULL, 13);

-- Insert DJ Services
INSERT INTO live_artists (name, genre, tag, bio, description, category, package, price, image_url, sort_order) VALUES
('DJ With LED Wall 8x8', 'DJ & Entertainment', 'DJ',
  'Premium DJ setup with LED Wall 8x8 and guest transfer included.',
  'DJ + LED Wall 8x8 + Guest Transfer 4x – Per Day', 'DJ Services', '1.3Lacs + GST Inclusive of Travel & Accomodation', 130000, NULL, 1),
('DJ Setup (Basic)', 'DJ & Entertainment', 'DJ',
  'Professional DJ with full sound system for your event.',
  'Professional DJ with sound system', 'DJ Services', '50K + GST Inclusive of Travel & Accomodation', 50000, NULL, 2);

-- Insert Event Services
INSERT INTO live_artists (name, genre, tag, bio, description, category, package, price, image_url, sort_order) VALUES
('Female Anchor', 'Event Services', 'Anchor',
  'Professional female anchor for your wedding functions.',
  'Female Anchor for Haldi + Sangeet + Wedding (2 Days)', 'Event Services', '45K + GST Inclusive of Travel & Accomodation', 45000, NULL, 1),
('Wedding Planner Team', 'Event Services', 'Planner',
  'Complete wedding planning and guest management team.',
  'Wedding Planner + Guest Management (2 Days)', 'Event Services', '1Lacs + GST Inclusive of Travel & Accomodation', 100000, NULL, 2),
('Decor Touchup', 'Event Services', 'Decor',
  'Premium decor touchup package for your wedding venue.',
  'Premium Decor Touchup Package', 'Event Services', '1Lacs + GST Inclusive of Travel & Accomodation', 100000, NULL, 3),
('Digital Invitation + Goodies', 'Event Services', 'Digital',
  'Custom digital invitation video and personalized wedding goodies.',
  'Digital Invitation Card Video + Customized Wedding Goodies (3 Functions)', 'Event Services', '36K + GST Inclusive of Travel & Accomodation', 36000, NULL, 4),
('Mirror Ramp Walk + Photography', 'Event Services', 'Photography',
  'Mirror ramp walk experience with brand stall and professional photographer.',
  'Mirror Ramp Walk + Brand Stall 1x + Photographer', 'Event Services', '1.8Lacs + GST Inclusive of Travel & Accomodation', 180000, NULL, 5),
('Bridal Entry Package', 'Event Services', 'Bridal',
  'Complete bridal entry package with themed entry, dance, makeup and mehndi artist.',
  'Bridal Themed Entry + Bridal Entry Dance + Makeup & Mehndi Artist', 'Event Services', '1.5Lacs + GST Inclusive of Travel & Accomodation', 150000, NULL, 6);

-- Reset sequence
SELECT setval('live_artists_id_seq', (SELECT MAX(id) FROM live_artists));
