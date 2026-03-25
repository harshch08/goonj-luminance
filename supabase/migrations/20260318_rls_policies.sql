-- ─────────────────────────────────────────────
-- Enable RLS on all unrestricted tables
-- ─────────────────────────────────────────────
ALTER TABLE celebrity_artists      ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons                ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_services         ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_artists       ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_artists           ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotation_records      ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────────
-- celebrity_artists — public read only
-- ─────────────────────────────────────────────
CREATE POLICY "Public read celebrity_artists"
  ON celebrity_artists FOR SELECT USING (true);

-- ─────────────────────────────────────────────
-- coupons — public read active coupons only (no internal fields exposed)
-- ─────────────────────────────────────────────
CREATE POLICY "Public read active coupons"
  ON coupons FOR SELECT USING (is_active = true);

-- ─────────────────────────────────────────────
-- event_services — public read active only
-- ─────────────────────────────────────────────
CREATE POLICY "Public read event_services"
  ON event_services FOR SELECT USING (is_active = true);

-- ─────────────────────────────────────────────
-- featured_artists — public read active only
-- ─────────────────────────────────────────────
CREATE POLICY "Public read featured_artists"
  ON featured_artists FOR SELECT USING (is_active = true);

-- ─────────────────────────────────────────────
-- live_artists — public read active only
-- ─────────────────────────────────────────────
CREATE POLICY "Public read live_artists"
  ON live_artists FOR SELECT USING (is_active = true);

-- ─────────────────────────────────────────────
-- quotation_records — insert only (no public read/update/delete)
-- clients can submit but never read others' records
-- ─────────────────────────────────────────────
CREATE POLICY "Public insert quotation_records"
  ON quotation_records FOR INSERT WITH CHECK (true);
