-- 1. Allow the Agriculture class
ALTER TABLE land_class_snapshots DROP CONSTRAINT land_class_snapshots_land_class_check;
ALTER TABLE land_class_snapshots ADD CONSTRAINT land_class_snapshots_land_class_check
  CHECK (land_class IN ('Vegetation','Water','Agriculture','Built-up','Barren'));
ALTER TABLE change_events DROP CONSTRAINT change_events_from_class_check;
ALTER TABLE change_events DROP CONSTRAINT change_events_to_class_check;
ALTER TABLE change_events ADD CONSTRAINT change_events_from_class_check
  CHECK (from_class IN ('Vegetation','Water','Agriculture','Built-up','Barren'));
ALTER TABLE change_events ADD CONSTRAINT change_events_to_class_check
  CHECK (to_class IN ('Vegetation','Water','Agriculture','Built-up','Barren'));

-- 2. Match the frontend's region names (boundaries are placeholders)
UPDATE regions SET name = 'Jaipur Study Area' WHERE id = 1;
INSERT INTO regions (name, description, boundary) VALUES
('Sambhar Lake Region', 'Sample study area',
 ST_Multi(ST_GeomFromText('POLYGON((74.90 26.85, 75.15 26.85, 75.15 27.05, 74.90 27.05, 74.90 26.85))', 4326))),
('Ranthambore Study Area', 'Sample study area',
 ST_Multi(ST_GeomFromText('POLYGON((76.35 25.90, 76.60 25.90, 76.60 26.10, 76.35 26.10, 76.35 25.90))', 4326)));

INSERT INTO protected_zones (region_id, name, zone_type, boundary)
SELECT id, 'Sample Wetland Reserve', 'wetland',
 ST_Multi(ST_GeomFromText('POLYGON((74.95 26.90, 75.08 26.90, 75.08 27.00, 74.95 27.00, 74.95 26.90))', 4326))
FROM regions WHERE name = 'Sambhar Lake Region';
INSERT INTO protected_zones (region_id, name, zone_type, boundary)
SELECT id, 'Sample National Park', 'sanctuary',
 ST_Multi(ST_GeomFromText('POLYGON((76.40 25.93, 76.55 25.93, 76.55 26.05, 76.40 26.05, 76.40 25.93))', 4326))
FROM regions WHERE name = 'Ranthambore Study Area';

-- 3. Use the frontend's default dates and add more sample changes
UPDATE change_events SET date_from = '2024-06-12', date_to = '2025-06-12';

INSERT INTO change_events (region_id, from_class, to_class, date_from, date_to, confidence, area_ha, geom)
SELECT r.id, v.f, v.t, DATE '2024-06-12', DATE '2025-06-12', v.c,
       ROUND((ST_Area(g.geom::geography) / 10000)::numeric, 2), g.geom
FROM (VALUES
 ('Jaipur Study Area', 'Agriculture', 'Built-up', 89.0, 'POLYGON((75.81 26.42, 75.83 26.42, 75.83 26.44, 75.81 26.44, 75.81 26.42))'),
 ('Jaipur Study Area', 'Vegetation',  'Barren',   84.5, 'POLYGON((75.87 26.40, 75.885 26.40, 75.885 26.41, 75.87 26.41, 75.87 26.40))'),
 ('Jaipur Study Area', 'Water',       'Vegetation', 78.0, 'POLYGON((75.90 26.44, 75.91 26.44, 75.91 26.45, 75.90 26.45, 75.90 26.44))'),
 ('Sambhar Lake Region', 'Water',       'Barren', 90.0, 'POLYGON((75.00 26.92, 75.04 26.92, 75.04 26.96, 75.00 26.96, 75.00 26.92))'),
 ('Sambhar Lake Region', 'Agriculture', 'Barren', 82.0, 'POLYGON((74.92 26.86, 74.94 26.86, 74.94 26.89, 74.92 26.89, 74.92 26.86))'),
 ('Ranthambore Study Area', 'Vegetation', 'Built-up',    93.0, 'POLYGON((76.45 25.98, 76.47 25.98, 76.47 26.00, 76.45 26.00, 76.45 25.98))'),
 ('Ranthambore Study Area', 'Vegetation', 'Agriculture', 80.0, 'POLYGON((76.36 25.91, 76.38 25.91, 76.38 25.92, 76.36 25.92, 76.36 25.91))')
) AS v(rname, f, t, c, wkt)
JOIN regions r ON r.name = v.rname
CROSS JOIN LATERAL (SELECT ST_Multi(ST_GeomFromText(v.wkt, 4326)) AS geom) g;

-- 4. Flag changes that overlap protected zones
UPDATE change_events c
SET in_protected_zone = TRUE, protected_zone_id = z.id
FROM protected_zones z
WHERE z.region_id = c.region_id AND ST_Intersects(c.geom, z.boundary);
