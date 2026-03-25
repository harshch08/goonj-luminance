-- Update live artists descriptions and prices for 2026
-- price = minimum party gig rate (used in cart)
-- description = shown in cart card
-- package = full rate details shown on artist profile

-- ── SOLO ARTISTS ──────────────────────────────────────────────

UPDATE live_artists SET
  genre = 'Western Country Pop Indie',
  bio = 'A Western Country Pop Indie Musician with a stage experience of 15+ years. An experienced judge, a music teacher, and a Guitar + Piano grade & degree holder with mastery in western vocals.',
  description = 'Solo Singer & Performer – Western Country Pop Indie | Per Weekend Gig: ₹6,000 | Per Party Gig: ₹10,000 to ₹15,000',
  package = 'Per Weekend Gig: ₹6,000 | Per Party Gig: ₹10,000 to ₹15,000',
  price = 10000
WHERE name = 'Rahul Thapa Ryan' AND category = 'Live Music';

UPDATE live_artists SET
  bio = 'A Bollywood Mix Musician experienced in gigs, bringing energy and versatility to every performance.',
  description = 'Solo Singer & Performer – Bolly Mix | Per Weekend Gig: ₹4,000 | Per Party Gig: ₹8,000 to ₹10,000',
  package = 'Per Weekend Gig: ₹4,000 | Per Party Gig: ₹8,000 to ₹10,000',
  price = 8000
WHERE name = 'Ranjan' AND category = 'Live Music';

UPDATE live_artists SET
  bio = 'A Bollywood Mix Musician and new beginner artist with a fresh and enthusiastic approach to every performance.',
  description = 'Solo Singer & Performer – Bolly Mix | Per Weekend/Party Gig: ₹4,000',
  package = 'Per Weekend/Party Gig: ₹4,000',
  price = 4000
WHERE name = 'Ajay' AND category = 'Live Music';

-- Insert Vansh, Manisha (solo), Krrish — upsert by id
INSERT INTO live_artists (id, name, genre, tag, bio, description, category, package, price, image_url, sort_order)
VALUES
  (208, 'Vansh', 'Bolly Mix', 'Singer & Performer',
    'A Bollywood Mix Musician and a regular gigs performer, delivering consistent and engaging live performances.',
    'Solo Singer & Performer – Bolly Mix | Per Weekend/Party Gig: ₹4,000',
    'Live Music', 'Per Weekend/Party Gig: ₹4,000', 4000, '/Vansh.png', 4),
  (209, 'Manisha', 'Bolly Mix', 'Singer & Performer',
    'A Bollywood Mix Musician trained in classical music, bringing depth and finesse to every performance.',
    'Solo Singer & Performer – Bolly Mix | Per Weekend Gig: ₹6,000 | Per Party Gig: ₹8,000 to ₹10,000',
    'Live Music', 'Per Weekend Gig: ₹6,000 | Per Party Gig: ₹8,000 to ₹10,000', 8000, '/manisha.jpeg', 5),
  (210, 'Krrish', 'Bolly Mix', 'Singer & Performer',
    'A Bollywood Mix Musician and new beginner artist with a fresh and enthusiastic approach to every performance.',
    'Solo Singer & Performer – Bolly Mix | Per Weekend/Party Gig: ₹4,000',
    'Live Music', 'Per Weekend/Party Gig: ₹4,000', 4000, '/krish.jpeg', 6)
ON CONFLICT (id) DO UPDATE SET
  genre = EXCLUDED.genre,
  bio = EXCLUDED.bio,
  description = EXCLUDED.description,
  package = EXCLUDED.package,
  price = EXCLUDED.price,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order;

-- ── BAND ──────────────────────────────────────────────────────

UPDATE live_artists SET
  bio = 'A Bollywood Mix Musician with an artist trained in classical music, delivering powerful ensemble performances.',
  description = 'Band – Bolly Mix | Per Weekend Gig: ₹15,000 | Per Party Gig: ₹20,000 to ₹25,000',
  package = 'Per Weekend Gig: ₹15,000 | Per Party Gig: ₹20,000 to ₹25,000',
  price = 20000
WHERE name = 'Sirat Band' AND category = 'Live Music';

-- ── DUO ARTISTS ───────────────────────────────────────────────

UPDATE live_artists SET
  name = 'Rahul Thapa Ryan + Pianist',
  genre = 'Western Country Pop Indie',
  bio = 'A Western Country Pop Indie Musician with a stage experience of 15+ years. An experienced judge, a music teacher, and a Guitar + Piano grade & degree holder with mastery in western vocals.',
  description = 'Duo Performers – Western Country Pop Indie | Per Weekend Gig: ₹10,000 | Per Party Gig: ₹15,000 to ₹20,000',
  package = 'Per Weekend Gig: ₹10,000 | Per Party Gig: ₹15,000 to ₹20,000',
  price = 15000
WHERE id = 301;

UPDATE live_artists SET
  name = 'Manisha + Guitarist',
  bio = 'A Bollywood Mix Musician trained in classical music, bringing depth and finesse to every performance.',
  description = 'Duo Performers – Bolly Mix | Per Weekend Gig: ₹8,000 | Per Party Gig: ₹10,000',
  package = 'Per Weekend Gig: ₹8,000 | Per Party Gig: ₹10,000',
  price = 10000,
  image_url = '/manisha.jpeg'
WHERE id = 302;

UPDATE live_artists SET
  name = 'Ranjan + Pianist',
  bio = 'A Bollywood Mix Musician experienced in gigs, bringing energy and versatility to every performance.',
  description = 'Duo Performers – Bolly Mix | Per Weekend Gig: ₹6,000 | Per Party Gig: ₹8,000 to ₹10,000',
  package = 'Per Weekend Gig: ₹6,000 | Per Party Gig: ₹8,000 to ₹10,000',
  price = 8000,
  image_url = '/ranjan.jpeg'
WHERE id = 303;

-- Fix Krrish image path
UPDATE live_artists SET image_url = '/krish.jpeg' WHERE name = 'Krrish' AND category = 'Live Music';

-- Fix Vansh image path
UPDATE live_artists SET image_url = '/Vansh.png' WHERE name = 'Vansh' AND category = 'Live Music';
