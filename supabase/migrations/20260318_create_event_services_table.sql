-- Create event_services table
CREATE TABLE IF NOT EXISTS event_services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  package VARCHAR(255) NOT NULL DEFAULT 'Price on Request',
  price INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_event_services_active ON event_services(is_active);
CREATE INDEX IF NOT EXISTS idx_event_services_sort ON event_services(sort_order);

-- Insert Event Services
INSERT INTO event_services (name, description, package, price, image_url, sort_order) VALUES
('Female Anchor', 'Female Anchor for Haldi + Sangeet + Wedding (2 Days)', '45K + GST Inclusive of Travel & Accomodation', 45000, NULL, 1),
('Wedding Planner Team', 'Wedding Planner + Guest Management (2 Days)', '1Lacs + GST Inclusive of Travel & Accomodation', 100000, NULL, 2),
('Decor Touchup', 'Premium Decor Touchup Package', '1Lacs + GST Inclusive of Travel & Accomodation', 100000, NULL, 3),
('Digital Invitation + Goodies', 'Digital Invitation Card Video + Customized Wedding Goodies (3 Functions)', '36K + GST Inclusive of Travel & Accomodation', 36000, NULL, 4),
('Mirror Ramp Walk + Photography', 'Mirror Ramp Walk + Brand Stall 1x + Photographer', '1.8Lacs + GST Inclusive of Travel & Accomodation', 180000, NULL, 5),
('Bridal Entry Package', 'Bridal Themed Entry + Bridal Entry Dance + Makeup & Mehndi Artist', '1.5Lacs + GST Inclusive of Travel & Accomodation', 150000, NULL, 6);

COMMENT ON TABLE event_services IS 'Wedding and event services for quotation system';
