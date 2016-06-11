--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = off;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET escape_string_warning = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: carts; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE carts (
    cart_id integer NOT NULL,
    user_id integer NOT NULL,
    order_date timestamp without time zone
);


ALTER TABLE public.carts OWNER TO postgres;

--
-- Name: carts_cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE carts_cart_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.carts_cart_id_seq OWNER TO postgres;

--
-- Name: carts_cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE carts_cart_id_seq OWNED BY carts.cart_id;


--
-- Name: carts_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE carts_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.carts_user_id_seq OWNER TO postgres;

--
-- Name: carts_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE carts_user_id_seq OWNED BY carts.user_id;


--
-- Name: coupon; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE coupon (
    coupon_id integer NOT NULL,
    coupon_code character varying(15) NOT NULL,
    discount double precision NOT NULL,
    expired timestamp without time zone NOT NULL
);


ALTER TABLE public.coupon OWNER TO postgres;

--
-- Name: coupon_coupon_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE coupon_coupon_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.coupon_coupon_id_seq OWNER TO postgres;

--
-- Name: coupon_coupon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE coupon_coupon_id_seq OWNED BY coupon.coupon_id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE orders (
    order_id integer NOT NULL,
    cart_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE orders_cart_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_cart_id_seq OWNER TO postgres;

--
-- Name: orders_cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE orders_cart_id_seq OWNED BY orders.cart_id;


--
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE orders_order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_order_id_seq OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE orders_order_id_seq OWNED BY orders.order_id;


--
-- Name: orders_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE orders_product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_product_id_seq OWNER TO postgres;

--
-- Name: orders_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE orders_product_id_seq OWNED BY orders.product_id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE products (
    product_id integer NOT NULL,
    p_name character varying(50) NOT NULL,
    p_description character varying(400),
    price double precision NOT NULL,
    stock integer NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE products_product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_product_id_seq OWNER TO postgres;

--
-- Name: products_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE products_product_id_seq OWNED BY products.product_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE users (
    user_id integer NOT NULL,
    username character varying(40) NOT NULL,
    email character varying(40) NOT NULL,
    full_name character varying(100) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE users_user_id_seq OWNED BY users.user_id;


--
-- Name: cart_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY carts ALTER COLUMN cart_id SET DEFAULT nextval('carts_cart_id_seq'::regclass);


--
-- Name: user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY carts ALTER COLUMN user_id SET DEFAULT nextval('carts_user_id_seq'::regclass);


--
-- Name: coupon_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY coupon ALTER COLUMN coupon_id SET DEFAULT nextval('coupon_coupon_id_seq'::regclass);


--
-- Name: order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY orders ALTER COLUMN order_id SET DEFAULT nextval('orders_order_id_seq'::regclass);


--
-- Name: cart_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY orders ALTER COLUMN cart_id SET DEFAULT nextval('orders_cart_id_seq'::regclass);


--
-- Name: product_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY orders ALTER COLUMN product_id SET DEFAULT nextval('orders_product_id_seq'::regclass);


--
-- Name: product_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY products ALTER COLUMN product_id SET DEFAULT nextval('products_product_id_seq'::regclass);


--
-- Name: user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users ALTER COLUMN user_id SET DEFAULT nextval('users_user_id_seq'::regclass);


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY carts (cart_id, user_id, order_date) FROM stdin;
1	5	2016-06-09 12:31:00
2	7	2016-06-09 10:13:20
3	6	2016-06-09 07:03:24
4	5	2016-06-11 15:33:08
5	4	2016-06-11 15:35:58
6	3	2016-06-11 22:51:11
\.


--
-- Name: carts_cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('carts_cart_id_seq', 6, true);


--
-- Name: carts_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('carts_user_id_seq', 1, false);


--
-- Data for Name: coupon; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY coupon (coupon_id, coupon_code, discount, expired) FROM stdin;
1	AICKWL27ZX9EK1J	25	2016-07-10 00:00:00
2	O2M5LXOQ90WKDZX	50	2016-06-08 00:00:00
3	SKDOW9287ZKQO31	10	2016-08-01 00:00:00
\.


--
-- Name: coupon_coupon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('coupon_coupon_id_seq', 3, true);


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY orders (order_id, cart_id, product_id, quantity) FROM stdin;
6	1	4	2
5	1	1	9
\.


--
-- Name: orders_cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('orders_cart_id_seq', 1, false);


--
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('orders_order_id_seq', 6, true);


--
-- Name: orders_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('orders_product_id_seq', 1, false);


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY products (product_id, p_name, p_description, price, stock) FROM stdin;
1	Edelyna Plain Envelope Hand Bag	Warna Khaki, Milo, Red, Grey, dan Black	175000	10
2	Sulviyarel Plain Mini Sling Bag	Warna Black, Apricot, Brown, dan Grey\nPanjang 19 cm, Tinggi 19 cm, Lebar 12,5 cm, Panjang tali 120 cm\nTerdapat 1 ruang utama dan 2 kantong dibagian dalam menggunakan resleting\nBahan Taiga	139000	3
3	Naniara Studded Longsleeve Blouse	Warna Broken White\nSatu Ukuran Muat Sampai Size L\nLingkar dada 96 cm, Lebar bahu 35 cm, Lingkar lengan 52 cm, Panjang lengan 51 cm, Panjang 64 cm, Lingkar pinggang 94 cm, Lingkar pinggul 100 cm\nBahan Crepe\n4 kancing depan	109000	5
4	Ciyeniva Plain Assymetric Blouse	Warna Yellow, Tosca, Olive, dan Brown\nSatu ukuran muat sampai size L kecil\nLingkar dada 94 cm, Lebar bahu 37 cm, Panjang lengan 49 cm\nLingkar lengan 50 cm, Panjang 48 cm, Lingkar pinggang 150 cm\nBahan Katun\n1 kancing belakang	109000	5
5	Zendikrusta Plain Cold Shoulder Blouse	Warna Black, Tosca, Cream, dan Pink\nSatu Ukuran Muat Sampai Size L\nLingkar dada 100 cm, Lebar bahu 43 cm, Lingkar lengan 52 cm, Panjang 63 cm, Lingkar pinggang 110 cm, Lingkar pinggul 116 cm\nBahan Crepe\n1 Kancing depan	99000	15
6	Ainaha Texture Cold Shoulder Jumpsuit	Warna Milo, Black, Dark Grey, Dark Brown\nSatu ukuran muat sampai size S\nLingkar dada 84cm, Lebar bahu 36cm, Lingkar lengan 48cm,panjang 76cm,Lingkar pinggang 70cm,Lingkar pinggul 74cm\nBahan Wafel\n1 Resleting belakang	99000	25
7	Havisa Plain V-Wrap Jumpsuit	Warna Grey, Navy, Brown, dan Black\nSatu ukuran muat sampai size L kecil\nLingkar dada 95 cm, Panjang 137 cm\nBahan Wedges Milano\nResleting belakang	99000	6
8	Destrifa Plain Sleeveless Jumpsuit	Warna Pink, Black, Choco, Blue\nSatu ukuran muat sampai size M\nLingkar dada 90 cm, Panjang 129 cm, Lebar Bahu 28 Cm, LIngkar Lengan 38 Cm, LIngkar Pinggang 82, Lingkar Paha 80 Cm,\nBahan Wedges Kombinasi Lace\nResleting belakang,	113000	2
9	Farania Ethnic Accordion Mini Skirt	Warna Brick, Purple, Teal dan White\nSatu Ukuran Muat Sampai Size S\nPanjang 48 cm, Lingkar Pinggang 56 cm dan Lingkar Pinggul 58 cm\nBahan Spandek Sutra\nPinggang Full Karet	89000	20
10	Therona Plain Wrap Mini Skirt	Warna Cream, Black, Navy, Red, dan Brown\nSatu ukuran muat sampai size L\nLingkar pinggang 90 cm, Lingkar Pinggul 96 cm, Panjang 59 cm\nBahan Wedges Scuba\nPinggang Karet Full	89000	22
11	Rabba Plain Wrap Mini Skirt	Warna Red, Black, Navy, dan Milo\nSatuan Ukuran Muat Sampai Size L Kecil\nLingkar Pinggang 66-80 cm, Panjang 51 cm, Lingkar Pinggul 80-90 cm\nBahan Spandek\nPinggang full karet	75000	6
\.


--
-- Name: products_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('products_product_id_seq', 11, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY users (user_id, username, email, full_name) FROM stdin;
1	ari123	louis.arianto@gmail.com	Arianto Wibowo
2	andrez	streamzz@gmail.com	Andre Setiawan
3	dinarwm	dinarwm@gmail.com	Dinar Winia
4	meljo	melzzz@gmail.com	Melissa Jotopurnomo
5	debbo	deby.deby@gmail.com	Deborah Natalya
6	carolineong	angel.carol@gmail.com	Angelia Caroline
7	fseve	evelyn@gmail.com	Fransiska Evelyn Sinjaya
\.


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('users_user_id_seq', 7, true);


--
-- Name: carts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (cart_id);


--
-- Name: coupon_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY coupon
    ADD CONSTRAINT coupon_pkey PRIMARY KEY (coupon_id);


--
-- Name: orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- Name: products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: carts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY carts
    ADD CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id);


--
-- Name: orders_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY orders
    ADD CONSTRAINT orders_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES carts(cart_id);


--
-- Name: orders_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY orders
    ADD CONSTRAINT orders_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(product_id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

