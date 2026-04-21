--
-- PostgreSQL database dump
--

\restrict qnBPtSTtcyA5Bh5bRjzu8EBBLebgnTE2J5nDWuVwKGqUm7nj4ghfzQGzX2XRzTq

-- Dumped from database version 13.23 (Debian 13.23-1.pgdg13+1)
-- Dumped by pg_dump version 13.23 (Debian 13.23-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: ObservationStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ObservationStatus" AS ENUM (
    'CASUAL',
    'NEEDS_ID',
    'IDENTIFIED'
);


ALTER TYPE public."ObservationStatus" OWNER TO postgres;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'MODERATOR',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO postgres;

--
-- Name: TaxonRank; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TaxonRank" AS ENUM (
    'DOMAIN',
    'KINGDOM',
    'PHYLUM',
    'CLASS',
    'ORDER',
    'FAMILY',
    'GENUS',
    'SPECIES'
);


ALTER TYPE public."TaxonRank" OWNER TO postgres;

--
-- Name: ValidationStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ValidationStatus" AS ENUM (
    'PENDING',
    'VALIDATED',
    'REJECTED'
);


ALTER TYPE public."ValidationStatus" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: EmailVerificationToken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EmailVerificationToken" (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."EmailVerificationToken" OWNER TO postgres;

--
-- Name: EmailVerificationToken_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EmailVerificationToken_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."EmailVerificationToken_id_seq" OWNER TO postgres;

--
-- Name: EmailVerificationToken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EmailVerificationToken_id_seq" OWNED BY public."EmailVerificationToken".id;


--
-- Name: Observation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Observation" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    description text,
    "observedAt" timestamp(3) without time zone NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    "placeName" text,
    status public."ObservationStatus" DEFAULT 'NEEDS_ID'::public."ObservationStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."Observation" OWNER TO postgres;

--
-- Name: ObservationImage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ObservationImage" (
    id integer NOT NULL,
    "observationId" integer NOT NULL,
    url text NOT NULL,
    "providerId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ObservationImage" OWNER TO postgres;

--
-- Name: ObservationImage_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ObservationImage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ObservationImage_id_seq" OWNER TO postgres;

--
-- Name: ObservationImage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ObservationImage_id_seq" OWNED BY public."ObservationImage".id;


--
-- Name: Observation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Observation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Observation_id_seq" OWNER TO postgres;

--
-- Name: Observation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Observation_id_seq" OWNED BY public."Observation".id;


--
-- Name: PasswordResetToken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PasswordResetToken" (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer NOT NULL,
    attempts integer DEFAULT 0 NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."PasswordResetToken" OWNER TO postgres;

--
-- Name: PasswordResetToken_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PasswordResetToken_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PasswordResetToken_id_seq" OWNER TO postgres;

--
-- Name: PasswordResetToken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PasswordResetToken_id_seq" OWNED BY public."PasswordResetToken".id;


--
-- Name: Taxon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Taxon" (
    id integer NOT NULL,
    name text NOT NULL,
    rank public."TaxonRank" NOT NULL,
    "parentId" integer,
    description text,
    "validationStatus" public."ValidationStatus" DEFAULT 'PENDING'::public."ValidationStatus" NOT NULL,
    "createdBy" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."Taxon" OWNER TO postgres;

--
-- Name: Taxon_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Taxon_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Taxon_id_seq" OWNER TO postgres;

--
-- Name: Taxon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Taxon_id_seq" OWNED BY public."Taxon".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    cellphone text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    "avatarUrl" text,
    "emailVerified" boolean DEFAULT false NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "lastLoginAt" timestamp(3) without time zone,
    "lastName" text NOT NULL,
    name text NOT NULL,
    username text NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: EmailVerificationToken id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EmailVerificationToken" ALTER COLUMN id SET DEFAULT nextval('public."EmailVerificationToken_id_seq"'::regclass);


--
-- Name: Observation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Observation" ALTER COLUMN id SET DEFAULT nextval('public."Observation_id_seq"'::regclass);


--
-- Name: ObservationImage id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ObservationImage" ALTER COLUMN id SET DEFAULT nextval('public."ObservationImage_id_seq"'::regclass);


--
-- Name: PasswordResetToken id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PasswordResetToken" ALTER COLUMN id SET DEFAULT nextval('public."PasswordResetToken_id_seq"'::regclass);


--
-- Name: Taxon id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Taxon" ALTER COLUMN id SET DEFAULT nextval('public."Taxon_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: EmailVerificationToken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."EmailVerificationToken" (id, token, "userId", "expiresAt", "createdAt") FROM stdin;
9	6d173a3e24e98083e3f1de2e25830396ab41300f8a0f80893bf4786927e9f8b5	8	2026-04-08 22:29:19.716	2026-04-08 21:29:19.728
10	cac9bfb4f71126c0367e9273aa0879435a3cfbdc2ed8fe45d2e41ed40a688566	18	2026-04-08 23:20:08.198	2026-04-08 22:20:08.201
13	2cd7cf443571777bd21ca0c934b01bd8037bd6dee1f19deebcc1d9e2ef659d6e	22	2026-04-10 18:25:47.575	2026-04-10 17:25:47.578
\.


--
-- Data for Name: Observation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Observation" (id, "userId", description, "observedAt", latitude, longitude, "placeName", status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	7	Araña negra en el baño, bastante grande	2026-04-18 15:30:00	19.9	-98	Huauchinango, Puebla	NEEDS_ID	2026-04-20 04:13:13.762	2026-04-20 04:13:13.762	\N
2	7	Araña negra en el baño, bastante grande	2026-04-18 15:30:00	19.9	-98	Huauchinango, Puebla	NEEDS_ID	2026-04-20 04:19:24.087	2026-04-20 04:19:24.087	\N
3	7	Planta con flores moradas y un poco de amarillo	2026-04-18 09:00:00	19.9	-98	\N	NEEDS_ID	2026-04-20 04:22:31.701	2026-04-20 05:19:26.781	\N
\.


--
-- Data for Name: ObservationImage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ObservationImage" (id, "observationId", url, "providerId", "createdAt") FROM stdin;
1	1	https://res.cloudinary.com/demo/image/upload/sample.jpg	sample	2026-04-20 04:13:13.762
2	2	https://res.cloudinary.com/demo/image/upload/sample.jpg	sample	2026-04-20 04:19:24.087
3	3	https://res.cloudinary.com/demo/image/upload/sample.jpg	img1	2026-04-20 04:22:31.701
4	3	https://res.cloudinary.com/demo/image/upload/sample.jpg	img2	2026-04-20 04:22:31.701
\.


--
-- Data for Name: PasswordResetToken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PasswordResetToken" (id, token, "userId", attempts, "expiresAt", "createdAt") FROM stdin;
\.


--
-- Data for Name: Taxon; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Taxon" (id, name, rank, "parentId", description, "validationStatus", "createdBy", "createdAt", "updatedAt", "deletedAt") FROM stdin;
2	bacteria	DOMAIN	\N	Seres vivos microscópicos unicelulares o que forman agregados, sin núcleo ni orgánulos celulares, se caracterizan además por tener una pared celular de peptidoglucano.	PENDING	7	2026-04-02 20:12:48.352	2026-04-02 20:12:48.352	\N
3	homo	SPECIES	\N	\N	PENDING	7	2026-04-02 20:24:00.079	2026-04-02 20:24:00.079	\N
11	plantae	KINGDOM	1	\N	PENDING	7	2026-04-02 22:44:22.576	2026-04-02 22:44:22.576	\N
24	ascomycota	PHYLUM	10	Filo de hongos caracterizado por producir esporas en estructuras en forma de saco llamadas ascas; incluye levaduras, mohos y trufas, y desempeña funciones clave en la descomposición, la fermentación y diversas relaciones simbióticas.	PENDING	2	2026-04-05 00:19:25.283	2026-04-05 00:19:25.283	\N
1	eukarya	DOMAIN	\N	\N	VALIDATED	7	2026-04-02 20:02:24.079	2026-04-03 03:52:39.068	\N
10	fungi	KINGDOM	1	Seres vivos unicelulares o multicelulares, se caracterizan además por tener una pared celular de quitina.	VALIDATED	7	2026-04-02 21:13:38.589	2026-04-02 21:13:38.589	\N
12	archaea	DOMAIN	\N	Las arqueas son microorganismos unicelulares procariotas distintos de bacterias y eucariotas. Habitan ambientes extremos como fuentes hidrotermales, salinas y zonas anaerobias, aunque también existen en entornos comunes. Desempeñan roles clave en ciclos biogeoquímicos y metabolismo extremo.	VALIDATED	8	2026-04-03 03:58:52.992	2026-04-05 17:11:48.452	\N
26	protista	KINGDOM	1	\N	PENDING	7	2026-04-05 17:17:30.095	2026-04-05 17:32:38.012	\N
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, password, cellphone, "createdAt", "updatedAt", "deletedAt", role, "avatarUrl", "emailVerified", "isActive", "lastLoginAt", "lastName", name, username) FROM stdin;
8	tripas@example.com	$2b$10$WCuM1MUmBbrJzcuFuk.BjOcHNEBAeEFWGLCdRdy4Lte7ZA95BIq5u	+5215512345678	2026-04-03 02:01:56.819	2026-04-04 04:58:32.476	\N	USER	\N	f	t	2026-04-04 04:58:32.465	Picas	pepe	pripas
22	antoniodeveloper2813@gmail.com	$2b$10$s6CnWE.SmwgFswVd4QUDuugSrtK8Po92Q5KeA4NT8CZGITw/KAn9e	+5215512345678	2026-04-10 17:25:47.545	2026-04-10 17:25:47.545	\N	USER	\N	f	t	\N	estrada	Jesus Antonio	carlosName
6	thriller@example.com	$2b$10$TrXqMGDN1mxx5OC4nggmTuRfZYNQcLmKFS93j80NlrRajm6wVc6Ga	+5215512345678	2026-03-12 19:07:31.551	2026-03-12 19:07:31.551	\N	USER	\N	f	t	\N	Jackson	Michael	moonwalker
21	antoniodeveloper28@gmail.com	$2b$10$wgEgM0/FxF39UQwgl.fEKO/e4IfJclNc1cZkQ4FrGoIl9/VnG/4Bm	\N	2026-04-09 19:42:03.052	2026-04-13 06:39:17.553	\N	USER	\N	t	t	2026-04-09 19:43:13.186	Estrada	Jesus Antonio	CarlosName
2	moon@example.com	$2b$10$3A.wpNh8a2PgQYNob8848Ot6IEkzs9Loiuaxhc0Eo714dw0Gzje5e	\N	2026-03-12 02:00:33.112	2026-04-08 06:20:42.843	\N	USER	\N	f	t	2026-04-08 06:20:42.835	Martín	Ana	moon
18	marshday5@gmail.com	$2b$10$I1xN2NEgwn09yWx8IqHS.eJX2w90SXAL9zIyo8YH6o6cMxRedpaJq	\N	2026-04-08 22:20:08.164	2026-04-08 22:20:08.164	\N	USER	\N	f	t	\N	listo	juan	pepe
16	jesusa2813@gmail.com	$2b$10$kl3vftEq9QihD18nXdousuxV023WvfyF8lRPM.Of3tDREfVzAVGea	\N	2026-04-08 19:10:40.776	2026-04-09 04:15:11.585	\N	USER	\N	t	t	2026-04-09 04:15:11.582	Arteaga	Ailton	pepe_el_malo
5	barca_alv@example.com	$2b$10$XLTNW5nhfa4yAITbRcvsR.00D/qh1rQYUAiFwz6qyrtorwlf3Ue4u	\N	2026-03-12 04:22:37.66	2026-03-12 04:22:46.635	2026-03-12 04:22:46.63	ADMIN	\N	f	f	\N	Martín	Ana	la_barca
7	jesus@example.com	$2b$10$P6KMQpDnje85H1g3pa54V.vk1NztONs77X1hJKECYUzuODX4ZTBBe	+525571108125	2026-03-17 05:54:27.117	2026-04-20 16:45:15.848	\N	ADMIN	\N	t	t	2026-04-20 16:45:15.844	Estrada	Jesús	yisusdev
4	underside@example.com	$2b$10$DoQBqY9lhQiGH0x4zsEMsOzEjW8FvZTLOQ6dzMK330h4AQ3QHqVym	\N	2026-03-12 04:11:50.01	2026-03-17 06:04:28.557	\N	MODERATOR	\N	f	t	2026-03-17 06:04:28.555	Perez	Juan	rap_on_the_streets
20	anamartiin7@gmail.com	$2b$10$1U8PLI1lrpBvKN.fHlnloepMAPWxACSn3rCqjq1EZFXtFmckNxlN2	\N	2026-04-09 05:24:22.627	2026-04-09 05:28:55.622	\N	USER	\N	t	t	2026-04-09 05:28:55.622	Martín	Anhi	Anhi Moon
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
68a47950-7dc1-4096-8ed4-905e26fe81a6	b7d02767ebd679a4dcbd0c076662f1e65472dbd284f2600544f37d1906374c22	2026-03-07 03:38:46.912336+00	20260307033846_init	\N	\N	2026-03-07 03:38:46.888402+00	1
0da6d78b-ddc8-4600-b4d7-e9af95825505	a8c4372acfb61c1292a46fae8d775fb8d8f3bdcccba037df6854a8ea702f82e4	2026-03-07 03:56:32.887787+00	20260307035632_add_user	\N	\N	2026-03-07 03:56:32.868602+00	1
e75b5484-3fee-4ecb-bc52-47049572c227	f51f10dd4ca33d521392a36fd10023619ef98a755e76a2d00cdf01fe178c034e	2026-03-11 05:10:32.065441+00	20260311051032_add_user_fields	\N	\N	2026-03-11 05:10:32.034607+00	1
e176772e-f758-4067-be84-a1994be2af06	7bc857a05a0862100fbce3fb3d7a8e99590075546cb22f4ac145613710d4790a	2026-03-17 05:12:24.399283+00	20260317051224_add_admin_role	\N	\N	2026-03-17 05:12:24.386144+00	1
25d894bf-40a6-4a9f-b6c6-76142016022c	2dcb8c79a2299310c32a470b49d98a389e60a93206f390987d78122774894b39	2026-03-26 05:47:32.692011+00	20260326054732_init_taxon	\N	\N	2026-03-26 05:47:32.597298+00	1
240fb220-69b4-4b4f-9efc-5d32fe647bca	5bf5d5b7b3ca528e661f457e5c027fb4159cbb45f564ebfdcebf0893e0d701ae	2026-03-29 02:08:21.656928+00	20260329020821_update_taxon	\N	\N	2026-03-29 02:08:21.604056+00	1
0f70ffac-3a11-407f-b80b-b116acb5a08b	74883c22336efc4aec100ae7af033db98146124b61d8884916038fbe570341a2	2026-04-02 16:43:33.969183+00	20260402164333_update_taxon_constraint	\N	\N	2026-04-02 16:43:33.93984+00	1
f3d52158-19ba-41f4-bf14-f67878ee22b1	37bbf14ff840c86d8d9b165234240ceb879c77158d0a06c1636b4250a4d4d401	2026-04-02 20:28:41.288852+00	20260402202841_update_taxon_name_constraint	\N	\N	2026-04-02 20:28:41.273427+00	1
fac56c54-e052-438d-9c7d-eb1c025e9f51	5e0283258503815b966fc5ca4e5ead9d321450b76e2d53404e3bdbd253a90d76	2026-04-02 20:39:59.199359+00	20260402203959_removing_my_idiont_idea	\N	\N	2026-04-02 20:39:59.191113+00	1
01d64157-a779-4d17-827f-0658bf5848e9	4e352381822cedc6d7d3b1f3fa8de552627af0d96cf84a0a4aad8561b310d344	2026-04-08 08:15:55.671453+00	20260408081555_email_verification	\N	\N	2026-04-08 08:15:55.620114+00	1
bb2cbc57-c6f3-4ff2-8074-8e3c9fb8def8	ffad94da677d844214352e92cc23241ab5ed0b30c2c44bae4f4b41cb64087f5e	2026-04-09 00:40:01.499307+00	20260409004001_password_reset	\N	\N	2026-04-09 00:40:01.349655+00	1
6aa87a87-19c8-42b0-bd73-713ff5fc355d	c65effccf950d9f9c3e2946de046d952f31f689dd840e8547f0af0e894425ac6	2026-04-18 20:31:31.880317+00	20260418203131_observation	\N	\N	2026-04-18 20:31:31.785244+00	1
\.


--
-- Name: EmailVerificationToken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EmailVerificationToken_id_seq"', 13, true);


--
-- Name: ObservationImage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ObservationImage_id_seq"', 4, true);


--
-- Name: Observation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Observation_id_seq"', 3, true);


--
-- Name: PasswordResetToken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PasswordResetToken_id_seq"', 27, true);


--
-- Name: Taxon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Taxon_id_seq"', 26, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 22, true);


--
-- Name: EmailVerificationToken EmailVerificationToken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EmailVerificationToken"
    ADD CONSTRAINT "EmailVerificationToken_pkey" PRIMARY KEY (id);


--
-- Name: ObservationImage ObservationImage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ObservationImage"
    ADD CONSTRAINT "ObservationImage_pkey" PRIMARY KEY (id);


--
-- Name: Observation Observation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Observation"
    ADD CONSTRAINT "Observation_pkey" PRIMARY KEY (id);


--
-- Name: PasswordResetToken PasswordResetToken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PasswordResetToken"
    ADD CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY (id);


--
-- Name: Taxon Taxon_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Taxon"
    ADD CONSTRAINT "Taxon_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: EmailVerificationToken_token_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "EmailVerificationToken_token_idx" ON public."EmailVerificationToken" USING btree (token);


--
-- Name: EmailVerificationToken_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "EmailVerificationToken_userId_idx" ON public."EmailVerificationToken" USING btree ("userId");


--
-- Name: ObservationImage_observationId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ObservationImage_observationId_idx" ON public."ObservationImage" USING btree ("observationId");


--
-- Name: Observation_latitude_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Observation_latitude_idx" ON public."Observation" USING btree (latitude);


--
-- Name: Observation_longitude_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Observation_longitude_idx" ON public."Observation" USING btree (longitude);


--
-- Name: Observation_observedAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Observation_observedAt_idx" ON public."Observation" USING btree ("observedAt");


--
-- Name: Observation_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Observation_status_idx" ON public."Observation" USING btree (status);


--
-- Name: Observation_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Observation_userId_idx" ON public."Observation" USING btree ("userId");


--
-- Name: PasswordResetToken_token_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "PasswordResetToken_token_idx" ON public."PasswordResetToken" USING btree (token);


--
-- Name: PasswordResetToken_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "PasswordResetToken_userId_idx" ON public."PasswordResetToken" USING btree ("userId");


--
-- Name: Taxon_deletedAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Taxon_deletedAt_idx" ON public."Taxon" USING btree ("deletedAt");


--
-- Name: Taxon_name_parentId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Taxon_name_parentId_key" ON public."Taxon" USING btree (name, "parentId");


--
-- Name: Taxon_parentId_rank_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Taxon_parentId_rank_idx" ON public."Taxon" USING btree ("parentId", rank);


--
-- Name: User_email_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "User_email_idx" ON public."User" USING btree (email);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_username_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "User_username_idx" ON public."User" USING btree (username);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: EmailVerificationToken EmailVerificationToken_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EmailVerificationToken"
    ADD CONSTRAINT "EmailVerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ObservationImage ObservationImage_observationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ObservationImage"
    ADD CONSTRAINT "ObservationImage_observationId_fkey" FOREIGN KEY ("observationId") REFERENCES public."Observation"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Observation Observation_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Observation"
    ADD CONSTRAINT "Observation_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PasswordResetToken PasswordResetToken_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PasswordResetToken"
    ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Taxon Taxon_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Taxon"
    ADD CONSTRAINT "Taxon_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Taxon Taxon_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Taxon"
    ADD CONSTRAINT "Taxon_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."Taxon"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict qnBPtSTtcyA5Bh5bRjzu8EBBLebgnTE2J5nDWuVwKGqUm7nj4ghfzQGzX2XRzTq

