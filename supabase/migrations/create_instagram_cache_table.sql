-- Create Instagram cache table for storing cached Instagram data
CREATE TABLE instagram_cache (
  id SERIAL PRIMARY KEY,
  data_type VARCHAR(50) NOT NULL CHECK (data_type IN ('follower_count', 'posts')),
  content JSONB NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for efficient queries by data type and last updated
CREATE INDEX idx_instagram_cache_type_updated ON instagram_cache(data_type, last_updated DESC);

-- Enable Row Level Security
ALTER TABLE instagram_cache ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access only
CREATE POLICY "Allow public read access" ON instagram_cache 
  FOR SELECT 
  USING (true);

-- Add comments for documentation
COMMENT ON TABLE instagram_cache IS 'Stores cached Instagram data including follower counts and posts';
COMMENT ON COLUMN instagram_cache.data_type IS 'Type of cached data: follower_count or posts';
COMMENT ON COLUMN instagram_cache.content IS 'JSON content containing the actual Instagram data';
COMMENT ON COLUMN instagram_cache.last_updated IS 'Timestamp when this cache entry was last updated';
COMMENT ON COLUMN instagram_cache.created_at IS 'Timestamp when this cache entry was first created';