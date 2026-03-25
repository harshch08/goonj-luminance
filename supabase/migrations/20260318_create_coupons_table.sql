CREATE TABLE IF NOT EXISTS coupons (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  discount_type VARCHAR(10) NOT NULL CHECK (discount_type IN ('flat', 'percent')),
  discount_value INTEGER NOT NULL,
  max_discount_amount INTEGER DEFAULT NULL, -- max cap for percent coupons (NULL = no cap)
  min_order_amount INTEGER DEFAULT 0,
  max_uses INTEGER DEFAULT NULL,
  used_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sample coupons
INSERT INTO coupons (code, discount_type, discount_value, max_discount_amount, min_order_amount, max_uses) VALUES
('GOONJ10', 'percent', 10, 50000, 50000, 100),
('FLAT5000', 'flat', 5000, NULL, 100000, 50),
('WEDDING20', 'percent', 20, 100000, 200000, 20),
('NEWCLIENT', 'flat', 10000, NULL, 0, NULL);
