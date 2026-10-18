--
-- PostgreSQL database dump
--

\restrict JChb6qUFIcYexyDlXPar1lNWNvHr0GMUPufZhiEG18GmMz9GzTfxpif8mhHxsO7

-- Dumped from database version 18.4 (Postgres.app)
-- Dumped by pg_dump version 18.4 (Postgres.app)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: analysis_runs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.analysis_runs (
    id integer NOT NULL,
    region_id integer NOT NULL,
    date_from date NOT NULL,
    date_to date NOT NULL,
    status character varying(20) DEFAULT 'pending'::character varying NOT NULL,
    total_change_ha numeric(12,2),
    alert_count integer DEFAULT 0,
    requested_at timestamp with time zone DEFAULT now() NOT NULL,
    finished_at timestamp with time zone,
    CONSTRAINT analysis_runs_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'running'::character varying, 'done'::character varying, 'failed'::character varying])::text[])))
);


--
-- Name: analysis_runs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.analysis_runs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: analysis_runs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.analysis_runs_id_seq OWNED BY public.analysis_runs.id;


--
-- Name: change_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.change_events (
    id integer NOT NULL,
    region_id integer NOT NULL,
    from_class character varying(20) NOT NULL,
    to_class character varying(20) NOT NULL,
    date_from date NOT NULL,
    date_to date NOT NULL,
    area_ha numeric(12,2),
    confidence numeric(5,2),
    in_protected_zone boolean DEFAULT false NOT NULL,
    protected_zone_id integer,
    geom public.geometry(MultiPolygon,4326) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT change_events_check CHECK ((date_to > date_from)),
    CONSTRAINT change_events_check1 CHECK (((from_class)::text <> (to_class)::text)),
    CONSTRAINT change_events_confidence_check CHECK (((confidence >= (0)::numeric) AND (confidence <= (100)::numeric))),
    CONSTRAINT change_events_from_class_check CHECK (((from_class)::text = ANY ((ARRAY['Vegetation'::character varying, 'Water'::character varying, 'Agriculture'::character varying, 'Built-up'::character varying, 'Barren'::character varying])::text[]))),
    CONSTRAINT change_events_to_class_check CHECK (((to_class)::text = ANY ((ARRAY['Vegetation'::character varying, 'Water'::character varying, 'Agriculture'::character varying, 'Built-up'::character varying, 'Barren'::character varying])::text[])))
);


--
-- Name: change_events_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.change_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: change_events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.change_events_id_seq OWNED BY public.change_events.id;


--
-- Name: land_class_snapshots; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.land_class_snapshots (
    id integer NOT NULL,
    region_id integer NOT NULL,
    snapshot_date date NOT NULL,
    land_class character varying(20) NOT NULL,
    area_ha numeric(12,2),
    geom public.geometry(MultiPolygon,4326) NOT NULL,
    CONSTRAINT land_class_snapshots_land_class_check CHECK (((land_class)::text = ANY ((ARRAY['Vegetation'::character varying, 'Water'::character varying, 'Agriculture'::character varying, 'Built-up'::character varying, 'Barren'::character varying])::text[])))
);


--
-- Name: land_class_snapshots_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.land_class_snapshots_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: land_class_snapshots_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.land_class_snapshots_id_seq OWNED BY public.land_class_snapshots.id;


--
-- Name: protected_zones; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.protected_zones (
    id integer NOT NULL,
    region_id integer NOT NULL,
    name character varying(150) NOT NULL,
    zone_type character varying(50),
    boundary public.geometry(MultiPolygon,4326) NOT NULL
);


--
-- Name: protected_zones_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.protected_zones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: protected_zones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.protected_zones_id_seq OWNED BY public.protected_zones.id;


--
-- Name: regions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.regions (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    boundary public.geometry(MultiPolygon,4326) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: regions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.regions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: regions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.regions_id_seq OWNED BY public.regions.id;


--
-- Name: analysis_runs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.analysis_runs ALTER COLUMN id SET DEFAULT nextval('public.analysis_runs_id_seq'::regclass);


--
-- Name: change_events id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.change_events ALTER COLUMN id SET DEFAULT nextval('public.change_events_id_seq'::regclass);


--
-- Name: land_class_snapshots id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.land_class_snapshots ALTER COLUMN id SET DEFAULT nextval('public.land_class_snapshots_id_seq'::regclass);


--
-- Name: protected_zones id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.protected_zones ALTER COLUMN id SET DEFAULT nextval('public.protected_zones_id_seq'::regclass);


--
-- Name: regions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.regions ALTER COLUMN id SET DEFAULT nextval('public.regions_id_seq'::regclass);


--
-- Data for Name: analysis_runs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.analysis_runs (id, region_id, date_from, date_to, status, total_change_ha, alert_count, requested_at, finished_at) FROM stdin;
1	1	2023-01-01	2024-01-01	done	0.00	0	2026-10-18 13:18:59.655457+05:30	2026-10-18 13:18:59.655457+05:30
2	1	2024-06-12	2025-06-12	done	939.51	2	2026-10-18 13:22:28.688816+05:30	2026-10-18 13:22:28.688816+05:30
3	1	2023-01-01	2024-01-01	done	939.51	2	2026-10-18 13:33:28.375389+05:30	2026-10-18 13:33:28.375389+05:30
\.


--
-- Data for Name: change_events; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.change_events (id, region_id, from_class, to_class, date_from, date_to, area_ha, confidence, in_protected_zone, protected_zone_id, geom, created_at) FROM stdin;
2	1	Barren	Built-up	2024-06-12	2025-06-12	110.58	87.00	f	\N	0106000020E610000001000000010300000001000000050000007B14AE47E1FA52405C8FC2F5285C3A40EC51B81E85FB52405C8FC2F5285C3A40EC51B81E85FB52401F85EB51B85E3A407B14AE47E1FA52401F85EB51B85E3A407B14AE47E1FA52405C8FC2F5285C3A40	2026-10-15 19:38:30.270844+05:30
3	1	Water	Vegetation	2024-06-12	2025-06-12	110.50	78.00	f	\N	0106000020E610000001000000010300000001000000050000009A99999999F95240713D0AD7A3703A400AD7A3703DFA5240713D0AD7A3703A400AD7A3703DFA52403333333333733A409A99999999F952403333333333733A409A99999999F95240713D0AD7A3703A40	2026-10-17 00:02:18.046258+05:30
5	1	Agriculture	Built-up	2024-06-12	2025-06-12	442.07	89.00	f	\N	0106000020E61000000100000001030000000100000005000000A4703D0AD7F35240EC51B81E856B3A4085EB51B81EF55240EC51B81E856B3A4085EB51B81EF55240713D0AD7A3703A40A4703D0AD7F35240713D0AD7A3703A40A4703D0AD7F35240EC51B81E856B3A40	2026-10-17 00:02:18.046258+05:30
6	2	Agriculture	Barren	2024-06-12	2025-06-12	660.58	82.00	f	\N	0106000020E610000001000000010300000001000000050000007B14AE47E1BA52405C8FC2F528DC3A405C8FC2F528BC52405C8FC2F528DC3A405C8FC2F528BC5240A4703D0AD7E33A407B14AE47E1BA5240A4703D0AD7E33A407B14AE47E1BA52405C8FC2F528DC3A40	2026-10-17 00:02:18.046258+05:30
8	3	Vegetation	Agriculture	2024-06-12	2025-06-12	221.99	80.00	f	\N	0106000020E61000000100000001030000000100000005000000D7A3703D0A175340295C8FC2F5E83940B81E85EB51185340295C8FC2F5E83940B81E85EB51185340EC51B81E85EB3940D7A3703D0A175340EC51B81E85EB3940D7A3703D0A175340295C8FC2F5E83940	2026-10-17 00:02:18.046258+05:30
1	1	Vegetation	Built-up	2024-06-12	2025-06-12	110.55	91.50	t	1	0106000020E610000001000000010300000001000000050000006666666666F65240A4703D0AD7633A40D7A3703D0AF75240A4703D0AD7633A40D7A3703D0AF752406666666666663A406666666666F652406666666666663A406666666666F65240A4703D0AD7633A40	2026-10-15 19:38:30.270844+05:30
4	1	Vegetation	Barren	2024-06-12	2025-06-12	165.81	84.50	t	1	0106000020E6100000010000000103000000010000000500000048E17A14AEF752406666666666663A40713D0AD7A3F852406666666666663A40713D0AD7A3F85240295C8FC2F5683A4048E17A14AEF75240295C8FC2F5683A4048E17A14AEF752406666666666663A40	2026-10-17 00:02:18.046258+05:30
7	2	Water	Barren	2024-06-12	2025-06-12	1760.56	90.00	t	2	0106000020E610000001000000010300000001000000050000000000000000C05240EC51B81E85EB3A40C3F5285C8FC25240EC51B81E85EB3A40C3F5285C8FC25240F6285C8FC2F53A400000000000C05240F6285C8FC2F53A400000000000C05240EC51B81E85EB3A40	2026-10-17 00:02:18.046258+05:30
9	3	Vegetation	Built-up	2024-06-12	2025-06-12	443.71	93.00	t	3	0106000020E61000000100000001030000000100000005000000CDCCCCCCCC1C53407B14AE47E1FA3940AE47E17A141E53407B14AE47E1FA3940AE47E17A141E53400000000000003A40CDCCCCCCCC1C53400000000000003A40CDCCCCCCCC1C53407B14AE47E1FA3940	2026-10-17 00:02:18.046258+05:30
\.


--
-- Data for Name: land_class_snapshots; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.land_class_snapshots (id, region_id, snapshot_date, land_class, area_ha, geom) FROM stdin;
1	1	2023-01-01	Vegetation	3316.25	0106000020E61000000100000001030000000100000005000000F6285C8FC2F55240E17A14AE47613A409A99999999F95240E17A14AE47613A409A99999999F95240AE47E17A146E3A40F6285C8FC2F55240AE47E17A146E3A40F6285C8FC2F55240E17A14AE47613A40
\.


--
-- Data for Name: protected_zones; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.protected_zones (id, region_id, name, zone_type, boundary) FROM stdin;
1	1	Sample Forest Reserve	forest	0106000020E61000000100000001030000000100000005000000F6285C8FC2F55240E17A14AE47613A409A99999999F95240E17A14AE47613A409A99999999F95240AE47E17A146E3A40F6285C8FC2F55240AE47E17A146E3A40F6285C8FC2F55240E17A14AE47613A40
2	2	Sample Wetland Reserve	wetland	0106000020E61000000100000001030000000100000005000000CDCCCCCCCCBC52406666666666E63A4085EB51B81EC552406666666666E63A4085EB51B81EC552400000000000003B40CDCCCCCCCCBC52400000000000003B40CDCCCCCCCCBC52406666666666E63A40
3	3	Sample National Park	sanctuary	0106000020E610000001000000010300000001000000050000009A99999999195340AE47E17A14EE39403333333333235340AE47E17A14EE39403333333333235340CDCCCCCCCC0C3A409A99999999195340CDCCCCCCCC0C3A409A99999999195340AE47E17A14EE3940
\.


--
-- Data for Name: regions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.regions (id, name, description, boundary, created_at) FROM stdin;
1	Jaipur Study Area	Test study area near Banasthali	0106000020E610000001000000010300000001000000050000003333333333F352409A99999999593A40CDCCCCCCCCFC52409A99999999593A40CDCCCCCCCCFC52403333333333733A403333333333F352403333333333733A403333333333F352409A99999999593A40	2026-10-15 19:38:30.252308+05:30
2	Sambhar Lake Region	Sample study area	0106000020E610000001000000010300000001000000050000009A99999999B952409A99999999D93A409A99999999C952409A99999999D93A409A99999999C95240CDCCCCCCCC0C3B409A99999999B95240CDCCCCCCCC0C3B409A99999999B952409A99999999D93A40	2026-10-17 00:02:18.041571+05:30
3	Ranthambore Study Area	Sample study area	0106000020E6100000010000000103000000010000000500000066666666661653406666666666E6394066666666662653406666666666E6394066666666662653409A99999999193A4066666666661653409A99999999193A4066666666661653406666666666E63940	2026-10-17 00:02:18.041571+05:30
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Name: analysis_runs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.analysis_runs_id_seq', 3, true);


--
-- Name: change_events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.change_events_id_seq', 9, true);


--
-- Name: land_class_snapshots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.land_class_snapshots_id_seq', 1, true);


--
-- Name: protected_zones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.protected_zones_id_seq', 3, true);


--
-- Name: regions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.regions_id_seq', 3, true);


--
-- Name: analysis_runs analysis_runs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.analysis_runs
    ADD CONSTRAINT analysis_runs_pkey PRIMARY KEY (id);


--
-- Name: change_events change_events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.change_events
    ADD CONSTRAINT change_events_pkey PRIMARY KEY (id);


--
-- Name: land_class_snapshots land_class_snapshots_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.land_class_snapshots
    ADD CONSTRAINT land_class_snapshots_pkey PRIMARY KEY (id);


--
-- Name: protected_zones protected_zones_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.protected_zones
    ADD CONSTRAINT protected_zones_pkey PRIMARY KEY (id);


--
-- Name: regions regions_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.regions
    ADD CONSTRAINT regions_name_key UNIQUE (name);


--
-- Name: regions regions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.regions
    ADD CONSTRAINT regions_pkey PRIMARY KEY (id);


--
-- Name: idx_changes_geom; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_changes_geom ON public.change_events USING gist (geom);


--
-- Name: idx_changes_protected; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_changes_protected ON public.change_events USING btree (in_protected_zone) WHERE in_protected_zone;


--
-- Name: idx_changes_region_dt; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_changes_region_dt ON public.change_events USING btree (region_id, date_from, date_to);


--
-- Name: idx_regions_boundary; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_regions_boundary ON public.regions USING gist (boundary);


--
-- Name: idx_snapshots_geom; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_snapshots_geom ON public.land_class_snapshots USING gist (geom);


--
-- Name: idx_snapshots_region_dt; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_snapshots_region_dt ON public.land_class_snapshots USING btree (region_id, snapshot_date);


--
-- Name: idx_zones_boundary; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_zones_boundary ON public.protected_zones USING gist (boundary);


--
-- Name: idx_zones_region; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_zones_region ON public.protected_zones USING btree (region_id);


--
-- Name: analysis_runs analysis_runs_region_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.analysis_runs
    ADD CONSTRAINT analysis_runs_region_id_fkey FOREIGN KEY (region_id) REFERENCES public.regions(id) ON DELETE CASCADE;


--
-- Name: change_events change_events_protected_zone_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.change_events
    ADD CONSTRAINT change_events_protected_zone_id_fkey FOREIGN KEY (protected_zone_id) REFERENCES public.protected_zones(id) ON DELETE SET NULL;


--
-- Name: change_events change_events_region_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.change_events
    ADD CONSTRAINT change_events_region_id_fkey FOREIGN KEY (region_id) REFERENCES public.regions(id) ON DELETE CASCADE;


--
-- Name: land_class_snapshots land_class_snapshots_region_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.land_class_snapshots
    ADD CONSTRAINT land_class_snapshots_region_id_fkey FOREIGN KEY (region_id) REFERENCES public.regions(id) ON DELETE CASCADE;


--
-- Name: protected_zones protected_zones_region_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.protected_zones
    ADD CONSTRAINT protected_zones_region_id_fkey FOREIGN KEY (region_id) REFERENCES public.regions(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict JChb6qUFIcYexyDlXPar1lNWNvHr0GMUPufZhiEG18GmMz9GzTfxpif8mhHxsO7

