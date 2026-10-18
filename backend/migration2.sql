-- BHUnetra migration 2: Rajasthan state + cities/towns (SAMPLE DATA, approximate geometry)
BEGIN;

-- ---------- 1. Regions ----------
CREATE TEMP TABLE new_regions (
  name text, description text, lon double precision, lat double precision,
  hw double precision, hh double precision
) ON COMMIT DROP;

INSERT INTO new_regions VALUES
('Jodhpur Study Area',     'Sample study area around Jodhpur (approximate boundary).',     73.02, 26.27, 0.28, 0.22),
('Udaipur Study Area',     'Sample study area around Udaipur (approximate boundary).',     73.65, 24.60, 0.30, 0.22),
('Kota Study Area',        'Sample study area around Kota (approximate boundary).',        75.85, 25.20, 0.25, 0.20),
('Ajmer Study Area',       'Sample study area around Ajmer (approximate boundary).',       74.64, 26.45, 0.28, 0.22),
('Bikaner Study Area',     'Sample study area around Bikaner (approximate boundary).',     73.31, 28.02, 0.35, 0.25),
('Alwar Study Area',       'Sample study area around Alwar and Sariska (approximate).',    76.50, 27.45, 0.30, 0.22),
('Bharatpur Study Area',   'Sample study area around Bharatpur and Keoladeo (approximate).',77.45, 27.20, 0.22, 0.18),
('Jaisalmer Study Area',   'Sample study area around Jaisalmer and Thar desert (approximate).',70.95, 26.90, 0.50, 0.35),
('Sikar Study Area',       'Sample study area around Sikar, Shekhawati (approximate).',    75.14, 27.61, 0.26, 0.24),
('Mount Abu Study Area',   'Sample study area around Mount Abu (approximate boundary).',   72.72, 24.62, 0.18, 0.15),
('Chittorgarh Study Area', 'Sample study area around Chittorgarh (approximate boundary).', 74.63, 24.88, 0.25, 0.20);

INSERT INTO regions (name, description, boundary)
SELECT name, description,
       ST_Multi(ST_MakeEnvelope(lon - hw, lat - hh, lon + hw, lat + hh, 4326))
FROM new_regions
ON CONFLICT (name) DO NOTHING;

-- Whole state: rough outline (approximate, not an official boundary)
INSERT INTO regions (name, description, boundary)
VALUES (
  'Rajasthan State',
  'Sample state-level region covering Rajasthan (approximate outline, not an official boundary).',
  ST_Multi(ST_GeomFromText('POLYGON((
    69.50 26.90, 70.30 27.90, 71.90 27.95, 73.00 29.20, 74.00 30.15, 74.80 29.60,
    75.40 29.00, 75.60 28.40, 76.30 28.10, 76.90 27.85, 77.30 27.45, 77.65 27.25,
    78.20 26.85, 78.25 26.30, 77.50 26.10, 76.80 25.30, 76.60 24.80, 76.40 24.20,
    75.60 24.10, 74.80 23.60, 74.40 23.05, 73.60 23.35, 73.10 24.10, 72.70 24.60,
    72.10 24.75, 71.20 24.50, 70.10 25.60, 69.55 26.20, 69.50 26.90))', 4326))
)
ON CONFLICT (name) DO NOTHING;

-- ---------- 2. Protected zones (approximate rectangles around real reserves) ----------
CREATE TEMP TABLE zone_defs (
  region_name text, name text, zone_type text,
  lon double precision, lat double precision, hw double precision, hh double precision
) ON COMMIT DROP;

INSERT INTO zone_defs VALUES
('Alwar Study Area',       'Sariska Tiger Reserve',            'Tiger Reserve',        76.42, 27.33, 0.10, 0.08),
('Bharatpur Study Area',   'Keoladeo National Park',           'National Park',        77.52, 27.16, 0.04, 0.03),
('Jaisalmer Study Area',   'Desert National Park',             'National Park',        70.80, 26.80, 0.25, 0.18),
('Udaipur Study Area',     'Sajjangarh Wildlife Sanctuary',    'Wildlife Sanctuary',   73.65, 24.62, 0.05, 0.04),
('Mount Abu Study Area',   'Mount Abu Wildlife Sanctuary',     'Wildlife Sanctuary',   72.72, 24.60, 0.10, 0.08),
('Kota Study Area',        'Darrah National Park',             'National Park',        75.97, 25.06, 0.05, 0.05),
('Chittorgarh Study Area', 'Bassi Wildlife Sanctuary',         'Wildlife Sanctuary',   74.47, 24.92, 0.06, 0.05),
('Jodhpur Study Area',     'Guda Vishnoi Conservation Reserve','Conservation Reserve', 73.00, 26.13, 0.04, 0.03),
('Bikaner Study Area',     'Gajner Wildlife Sanctuary',        'Wildlife Sanctuary',   73.08, 27.95, 0.05, 0.04),
('Rajasthan State',        'Ranthambore National Park',        'National Park',        76.50, 26.02, 0.15, 0.12),
('Rajasthan State',        'Sariska Tiger Reserve',            'Tiger Reserve',        76.42, 27.33, 0.10, 0.08),
('Rajasthan State',        'Keoladeo National Park',           'National Park',        77.52, 27.16, 0.04, 0.03),
('Rajasthan State',        'Desert National Park',             'National Park',        70.80, 26.80, 0.25, 0.18),
('Rajasthan State',        'Kumbhalgarh Wildlife Sanctuary',   'Wildlife Sanctuary',   73.58, 25.15, 0.10, 0.12),
('Rajasthan State',        'Mount Abu Wildlife Sanctuary',     'Wildlife Sanctuary',   72.72, 24.60, 0.10, 0.08),
('Rajasthan State',        'Darrah National Park',             'National Park',        75.97, 25.06, 0.05, 0.05),
('Rajasthan State',        'Sambhar Lake Ramsar Site',         'Wetland',              75.08, 26.95, 0.18, 0.10);

INSERT INTO protected_zones (region_id, name, zone_type, boundary)
SELECT r.id, z.name, z.zone_type,
       ST_Multi(ST_MakeEnvelope(z.lon - z.hw, z.lat - z.hh, z.lon + z.hw, z.lat + z.hh, 4326))
FROM zone_defs z
JOIN regions r ON r.name = z.region_name
WHERE NOT EXISTS (
  SELECT 1 FROM protected_zones p WHERE p.region_id = r.id AND p.name = z.name
);

-- ---------- 3. Land-cover snapshots (all 5 classes, two dates) ----------
CREATE TEMP TABLE mix (
  region_name text, veg numeric, water numeric, agri numeric, built numeric, barren numeric
) ON COMMIT DROP;

INSERT INTO mix VALUES
('Rajasthan State',        0.12, 0.02, 0.30, 0.05, 0.51),
('Jaipur Study Area',      0.15, 0.02, 0.35, 0.30, 0.18),
('Sambhar Lake Region',    0.05, 0.35, 0.10, 0.05, 0.45),
('Ranthambore Study Area', 0.55, 0.04, 0.12, 0.05, 0.24),
('Jodhpur Study Area',     0.06, 0.01, 0.22, 0.14, 0.57),
('Udaipur Study Area',     0.38, 0.10, 0.22, 0.16, 0.14),
('Kota Study Area',        0.20, 0.08, 0.45, 0.15, 0.12),
('Ajmer Study Area',       0.14, 0.03, 0.33, 0.15, 0.35),
('Bikaner Study Area',     0.03, 0.01, 0.20, 0.10, 0.66),
('Alwar Study Area',       0.28, 0.02, 0.38, 0.14, 0.18),
('Bharatpur Study Area',   0.12, 0.10, 0.55, 0.15, 0.08),
('Jaisalmer Study Area',   0.02, 0.01, 0.03, 0.04, 0.90),
('Sikar Study Area',       0.08, 0.01, 0.55, 0.12, 0.24),
('Mount Abu Study Area',   0.55, 0.05, 0.08, 0.12, 0.20),
('Chittorgarh Study Area', 0.25, 0.06, 0.42, 0.10, 0.17);

WITH base AS (
  SELECT r.id AS region_id, r.boundary, ST_Envelope(r.boundary) AS env,
         m.veg, m.water, m.agri, m.built, m.barren
  FROM regions r JOIN mix m ON m.region_name = r.name
),
dates(d, dv) AS (
  VALUES (DATE '2024-06-12', 0.00::numeric), (DATE '2025-06-12', 0.01::numeric)
),
classes AS (
  SELECT b.region_id, b.boundary, dt.d, c.land_class, c.ord,
         ST_XMin(b.env) AS x0, ST_XMax(b.env) - ST_XMin(b.env) AS w,
         ST_YMin(b.env) AS y0, ST_YMax(b.env) AS y1,
         CASE c.land_class
           WHEN 'Vegetation'  THEN b.veg - dt.dv
           WHEN 'Water'       THEN b.water
           WHEN 'Agriculture' THEN b.agri
           WHEN 'Built-up'    THEN b.built + dt.dv
           ELSE b.barren
         END AS frac
  FROM base b
  CROSS JOIN dates dt
  CROSS JOIN (VALUES ('Vegetation',1),('Water',2),('Agriculture',3),('Built-up',4),('Barren',5))
             AS c(land_class, ord)
),
cum AS (
  SELECT *,
         COALESCE(SUM(frac) OVER (PARTITION BY region_id, d ORDER BY ord
                  ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING), 0) AS start_frac
  FROM classes
),
cells AS (
  SELECT region_id, d, land_class,
         ST_Multi(ST_CollectionExtract(
           ST_Intersection(
             boundary,
             ST_MakeEnvelope(x0 + w * (start_frac)::float8, y0,
                             x0 + w * ((start_frac + frac)::float8), y1, 4326)),
           3)) AS geom
  FROM cum
)
INSERT INTO land_class_snapshots (region_id, snapshot_date, land_class, area_ha, geom)
SELECT c.region_id, c.d, c.land_class,
       ROUND((ST_Area(c.geom::geography) / 10000)::numeric, 2), c.geom
FROM cells c
WHERE NOT ST_IsEmpty(c.geom)
  AND NOT EXISTS (
    SELECT 1 FROM land_class_snapshots s
    WHERE s.region_id = c.region_id AND s.snapshot_date = c.d AND s.land_class = c.land_class
  );

-- ---------- 4. Change events (sample; protected-zone flag computed with ST_Intersects) ----------
CREATE TEMP TABLE event_defs (
  region_name text, from_class text, to_class text,
  lon double precision, lat double precision, hw double precision, hh double precision,
  confidence numeric
) ON COMMIT DROP;

INSERT INTO event_defs VALUES
-- Jodhpur
('Jodhpur Study Area','Agriculture','Built-up', 73.10,26.38,0.015,0.012,91.0),
('Jodhpur Study Area','Barren','Built-up',      72.90,26.33,0.012,0.010,88.5),
('Jodhpur Study Area','Vegetation','Barren',    73.00,26.13,0.012,0.010,83.0),
('Jodhpur Study Area','Water','Barren',         73.20,26.20,0.010,0.008,79.5),
('Jodhpur Study Area','Agriculture','Barren',   72.82,26.15,0.014,0.010,85.0),
-- Udaipur
('Udaipur Study Area','Vegetation','Built-up',  73.66,24.62,0.015,0.012,92.5),
('Udaipur Study Area','Agriculture','Built-up', 73.80,24.55,0.014,0.012,90.0),
('Udaipur Study Area','Water','Barren',         73.50,24.50,0.010,0.008,81.0),
('Udaipur Study Area','Vegetation','Agriculture',73.75,24.72,0.012,0.010,86.5),
('Udaipur Study Area','Barren','Built-up',      73.45,24.68,0.010,0.008,87.0),
-- Kota
('Kota Study Area','Agriculture','Built-up',    75.82,25.22,0.015,0.012,93.0),
('Kota Study Area','Vegetation','Barren',       75.97,25.06,0.012,0.010,84.5),
('Kota Study Area','Water','Agriculture',       75.75,25.30,0.010,0.008,77.0),
('Kota Study Area','Barren','Built-up',         75.95,25.28,0.012,0.010,88.0),
('Kota Study Area','Vegetation','Built-up',     75.99,25.04,0.009,0.008,90.5),
-- Ajmer
('Ajmer Study Area','Barren','Built-up',        74.65,26.47,0.014,0.012,90.0),
('Ajmer Study Area','Agriculture','Built-up',   74.50,26.38,0.012,0.010,88.0),
('Ajmer Study Area','Vegetation','Barren',      74.78,26.55,0.012,0.010,82.5),
('Ajmer Study Area','Water','Barren',           74.45,26.55,0.008,0.008,78.0),
-- Bikaner
('Bikaner Study Area','Agriculture','Built-up', 73.31,28.02,0.015,0.012,91.5),
('Bikaner Study Area','Barren','Agriculture',   73.50,27.90,0.020,0.015,80.0),
('Bikaner Study Area','Vegetation','Barren',    73.08,27.95,0.012,0.010,81.5),
('Bikaner Study Area','Barren','Built-up',      73.40,28.12,0.012,0.010,86.0),
('Bikaner Study Area','Water','Barren',         73.20,28.15,0.008,0.008,76.5),
-- Alwar
('Alwar Study Area','Vegetation','Barren',      76.42,27.33,0.015,0.012,85.5),
('Alwar Study Area','Agriculture','Built-up',   76.60,27.55,0.015,0.012,92.0),
('Alwar Study Area','Vegetation','Built-up',    76.38,27.30,0.010,0.008,89.5),
('Alwar Study Area','Barren','Built-up',        76.70,27.40,0.010,0.010,87.5),
('Alwar Study Area','Water','Vegetation',       76.30,27.55,0.008,0.008,75.0),
-- Bharatpur
('Bharatpur Study Area','Water','Agriculture',  77.52,27.16,0.012,0.010,83.0),
('Bharatpur Study Area','Agriculture','Built-up',77.42,27.25,0.015,0.012,93.5),
('Bharatpur Study Area','Vegetation','Barren',  77.55,27.17,0.008,0.006,80.5),
('Bharatpur Study Area','Barren','Built-up',    77.33,27.12,0.010,0.008,86.0),
-- Jaisalmer
('Jaisalmer Study Area','Barren','Built-up',    70.92,26.92,0.015,0.012,89.0),
('Jaisalmer Study Area','Barren','Agriculture', 71.20,27.00,0.025,0.020,78.5),
('Jaisalmer Study Area','Vegetation','Barren',  70.75,26.78,0.020,0.015,80.0),
('Jaisalmer Study Area','Water','Barren',       70.95,26.70,0.008,0.008,74.0),
('Jaisalmer Study Area','Agriculture','Barren', 71.30,26.75,0.015,0.012,82.0),
-- Sikar
('Sikar Study Area','Agriculture','Built-up',   75.15,27.62,0.015,0.012,92.5),
('Sikar Study Area','Barren','Built-up',        75.30,27.50,0.012,0.010,87.0),
('Sikar Study Area','Vegetation','Barren',      74.98,27.72,0.010,0.008,81.0),
('Sikar Study Area','Barren','Agriculture',     75.05,27.45,0.015,0.012,79.5),
-- Mount Abu
('Mount Abu Study Area','Vegetation','Built-up',72.71,24.59,0.010,0.008,94.0),
('Mount Abu Study Area','Vegetation','Barren',  72.78,24.63,0.008,0.007,85.0),
('Mount Abu Study Area','Agriculture','Built-up',72.60,24.52,0.010,0.008,88.5),
('Mount Abu Study Area','Barren','Vegetation',  72.82,24.70,0.008,0.008,79.0),
-- Chittorgarh
('Chittorgarh Study Area','Agriculture','Built-up',74.62,24.88,0.014,0.012,91.0),
('Chittorgarh Study Area','Vegetation','Barren',74.47,24.92,0.012,0.010,84.0),
('Chittorgarh Study Area','Barren','Agriculture',74.75,24.80,0.015,0.012,80.5),
('Chittorgarh Study Area','Water','Agriculture',74.55,25.00,0.008,0.008,77.5),
-- Rajasthan State (larger-scale sample changes)
('Rajasthan State','Agriculture','Built-up',    75.80,26.90,0.060,0.050,94.0),
('Rajasthan State','Barren','Agriculture',      73.60,29.40,0.080,0.060,83.0),
('Rajasthan State','Vegetation','Barren',       76.42,27.33,0.050,0.040,86.0),
('Rajasthan State','Water','Barren',            77.52,27.16,0.030,0.025,80.0),
('Rajasthan State','Vegetation','Built-up',     73.58,25.15,0.040,0.030,88.0),
('Rajasthan State','Barren','Built-up',         73.02,26.27,0.050,0.040,90.5),
('Rajasthan State','Agriculture','Built-up',    75.85,25.18,0.050,0.040,91.0),
('Rajasthan State','Vegetation','Barren',       70.80,26.80,0.120,0.080,79.0),
('Rajasthan State','Vegetation','Built-up',     72.72,24.60,0.030,0.025,92.0);

INSERT INTO change_events
  (region_id, from_class, to_class, date_from, date_to, area_ha, confidence,
   in_protected_zone, protected_zone_id, geom)
SELECT r.id, e.from_class, e.to_class, DATE '2024-06-12', DATE '2025-06-12',
       ROUND((ST_Area(g.geom::geography) / 10000)::numeric, 2),
       e.confidence,
       (z.id IS NOT NULL), z.id, g.geom
FROM event_defs e
JOIN regions r ON r.name = e.region_name
CROSS JOIN LATERAL (
  SELECT ST_Multi(ST_MakeEnvelope(e.lon - e.hw, e.lat - e.hh, e.lon + e.hw, e.lat + e.hh, 4326)) AS geom
) g
LEFT JOIN LATERAL (
  SELECT p.id FROM protected_zones p
  WHERE p.region_id = r.id AND ST_Intersects(p.boundary, g.geom)
  ORDER BY ST_Area(ST_Intersection(p.boundary, g.geom)) DESC
  LIMIT 1
) z ON TRUE
WHERE NOT EXISTS (SELECT 1 FROM change_events c WHERE c.region_id = r.id);

-- ---------- 5. Safety check ----------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM regions WHERE NOT ST_IsValid(boundary)) THEN
    RAISE EXCEPTION 'A region boundary is invalid, rolling back';
  END IF;
END $$;

COMMIT;

-- Summary
SELECT r.id, r.name,
       (SELECT count(*) FROM protected_zones p WHERE p.region_id = r.id) AS zones,
       (SELECT count(*) FROM change_events c WHERE c.region_id = r.id) AS changes,
       (SELECT count(*) FROM change_events c WHERE c.region_id = r.id AND c.in_protected_zone) AS alerts,
       (SELECT count(DISTINCT land_class) FROM land_class_snapshots s WHERE s.region_id = r.id) AS classes
FROM regions r ORDER BY r.id;
