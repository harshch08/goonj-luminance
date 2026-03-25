-- Fix RLS for artist_likes table and artist_like_counts view

-- Enable RLS on artist_likes
ALTER TABLE artist_likes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read likes (needed for counts)
CREATE POLICY "Public read artist_likes"
  ON artist_likes FOR SELECT USING (true);

-- Allow anyone to insert likes
CREATE POLICY "Public insert artist_likes"
  ON artist_likes FOR INSERT WITH CHECK (true);

-- Grant access to anon and authenticated roles
GRANT SELECT, INSERT ON artist_likes TO anon, authenticated;

-- Grant access to the view
GRANT SELECT ON artist_like_counts TO anon, authenticated;
