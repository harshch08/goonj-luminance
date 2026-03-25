-- Rename Oabu Samwal to Charu Semwal and fix image
UPDATE celebrity_artists SET
  name = 'Charu Semwal',
  image_url = '/charu-semwal.jpeg',
  bio = 'Charu Semwal is a dynamic Bollywood singer and performer known for her versatility and crowd engagement. Her live sets are a perfect blend of energy, emotion, and entertainment — guaranteed to keep your guests on their feet all night long.'
WHERE name = 'Oabu Samwal';

-- Fix Vijay Jammer image path
UPDATE celebrity_artists SET image_url = '/vijay-jammer.jpeg' WHERE name = 'Vijay Jamner';
