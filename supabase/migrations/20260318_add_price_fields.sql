-- Add price column to celebrity_artists
ALTER TABLE celebrity_artists ADD COLUMN IF NOT EXISTS price INTEGER NOT NULL DEFAULT 999;

-- Update with real prices from package strings
UPDATE celebrity_artists SET price = 600000  WHERE name = 'Khullar G';
UPDATE celebrity_artists SET price = 600000  WHERE name = 'Kamakshi';
UPDATE celebrity_artists SET price = 600000  WHERE name = 'Ananya Mishra';
UPDATE celebrity_artists SET price = 600000  WHERE name = 'Priyanka Mehar';
UPDATE celebrity_artists SET price = 650000  WHERE name = 'Sid K';
UPDATE celebrity_artists SET price = 600000  WHERE name = 'Vijay Jamner';
UPDATE celebrity_artists SET price = 800000  WHERE name = 'Yashraj';
UPDATE celebrity_artists SET price = 900000  WHERE name = 'Khusboo Grewal';
UPDATE celebrity_artists SET price = 1000000 WHERE name = 'Sandeep Batraa';
UPDATE celebrity_artists SET price = 1000000 WHERE name = 'Oabu Samwal';
UPDATE celebrity_artists SET price = 1000000 WHERE name = 'Jyotica Tangri';
UPDATE celebrity_artists SET price = 2000000 WHERE name = 'Usha Uthup';
UPDATE celebrity_artists SET price = 1800000 WHERE name = 'Paradox';
UPDATE celebrity_artists SET price = 1700000 WHERE name = 'MC Square';
UPDATE celebrity_artists SET price = 3000000 WHERE name = 'Shaarib & Toshi';
UPDATE celebrity_artists SET price = 6000000 WHERE name = 'Badshah';

-- Add price column to featured_artists
ALTER TABLE featured_artists ADD COLUMN IF NOT EXISTS price INTEGER NOT NULL DEFAULT 999;

-- Verify
SELECT name, price FROM celebrity_artists ORDER BY price DESC;
