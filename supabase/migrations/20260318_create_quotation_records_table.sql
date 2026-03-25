CREATE TABLE IF NOT EXISTS quotation_records (
  id SERIAL PRIMARY KEY,
  quote_no VARCHAR(50) UNIQUE NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  contact_number VARCHAR(20) NOT NULL,
  event_type VARCHAR(100) NOT NULL,
  event_from_date DATE NOT NULL,
  event_to_date DATE NOT NULL,
  venue VARCHAR(255) DEFAULT NULL,
  items JSONB NOT NULL,
  subtotal INTEGER NOT NULL,
  discount INTEGER DEFAULT 0,
  gst INTEGER NOT NULL,
  total INTEGER NOT NULL,
  coupon_code VARCHAR(50) DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quotation_records_quote_no ON quotation_records(quote_no);
CREATE INDEX IF NOT EXISTS idx_quotation_records_created_at ON quotation_records(created_at DESC);
