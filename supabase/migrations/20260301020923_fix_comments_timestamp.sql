-- Update the created_at column to use TIMESTAMPTZ (timestamp with timezone)
ALTER TABLE artist_comments 
  ALTER COLUMN created_at TYPE TIMESTAMPTZ USING created_at AT TIME ZONE 'UTC',
  ALTER COLUMN created_at SET DEFAULT NOW();

-- Update existing records to ensure they have proper timestamps
UPDATE artist_comments 
SET created_at = NOW() 
WHERE created_at IS NULL;
