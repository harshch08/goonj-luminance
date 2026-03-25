-- Create artist comments table
CREATE TABLE IF NOT EXISTS artist_comments (
  id SERIAL PRIMARY KEY,
  artist_id INTEGER NOT NULL,
  artist_name VARCHAR(255) NOT NULL,
  session_id VARCHAR(255) NOT NULL,
  user_name VARCHAR(100),
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_artist_comments_artist_id ON artist_comments(artist_id);
CREATE INDEX IF NOT EXISTS idx_artist_comments_created_at ON artist_comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_artist_comments_session_id ON artist_comments(session_id);

-- Enable Row Level Security
ALTER TABLE artist_comments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read comments
CREATE POLICY "Anyone can read comments" ON artist_comments
  FOR SELECT USING (true);

-- Create policy to allow anyone to insert comments
CREATE POLICY "Anyone can insert comments" ON artist_comments
  FOR INSERT WITH CHECK (true);

-- Create policy to allow users to delete their own comments
CREATE POLICY "Users can delete their own comments" ON artist_comments
  FOR DELETE USING (session_id = current_setting('request.jwt.claim.sub', true));
