/**
 * Datos demo alineados con las 6 categorías del Home (mi-app-delivery/utils/constants.ts).
 */

export const DEMO_CLIENT_EMAIL = 'demo@cliente.com';
/** Empresa principal: mantiene el login demo de empresa del frontend. */
export const DEMO_COMPANY_EMAIL = 'tienda@empresa.com';
export const DEMO_DRIVER_EMAIL = 'repartidor@demo.com';

/** Emails de todas las empresas demo (ferreterías nicaragüenses). */
export const DEMO_COMPANY_EMAILS = [
  DEMO_COMPANY_EMAIL,
  'epa@empresa.com',
  'jenny@empresa.com',
  'blandon@empresa.com',
] as const;

/** Password en texto plano para todos los usuarios demo (se hashea con bcrypt en el seed). */
export const DEMO_PASSWORD = 'demo123';

/** Emails de usuarios demo (cliente, empresas, profesionales y repartidor). */
export const DEMO_USER_EMAILS = [
  DEMO_CLIENT_EMAIL,
  DEMO_DRIVER_EMAIL,
  ...DEMO_COMPANY_EMAILS,
  'carlos.fontaneria@demo.com',
  'ana.electrica@demo.com',
  'luis.jardin@demo.com',
  'maria.pintura@demo.com',
  'pedro.remodelacion@demo.com',
  'emergencia.24h@demo.com',
  'sofia.emergencia@demo.com',
] as const;

/** Slugs legacy del seed anterior (eliminar en reset). */
export const LEGACY_SPECIALTY_SLUGS = [
  'plomeria',
  'limpieza',
  'carpinteria',
] as const;

export const HOME_SPECIALTIES = [
  {
    name: 'Electricidad',
    slug: 'electricidad',
    description: 'Cableado, tableros, iluminación y reparaciones eléctricas',
  },
  {
    name: 'Fontanería',
    slug: 'fontaneria',
    description: 'Instalaciones, fugas, tuberías y sanitarios',
  },
  {
    name: 'Jardinería',
    slug: 'jardineria',
    description: 'Mantenimiento de jardines, poda y paisajismo',
  },
  {
    name: 'Pintura',
    slug: 'pintura',
    description: 'Pintura interior, exterior y acabados',
  },
  {
    name: 'Remodelación',
    slug: 'remodelacion',
    description: 'Reformas, ampliaciones y trabajos generales de construcción',
  },
  {
    name: 'Emergencia',
    slug: 'emergencia',
    description: 'Servicios urgentes 24/7',
  },
] as const;

export const DEMO_PROFESSIONALS = [
  {
    email: 'ana.electrica@demo.com',
    first_name: 'Ana',
    last_name: 'Torres',
    avatar: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=400&fit=crop&q=80',
    bio: 'Electricista residencial. Instalaciones seguras y garantizadas.',
    years: 8,
    base_price: 40,
    rating: 4.9,
    reviews: 62,
    specialtySlug: 'electricidad',
  },
  {
    email: 'carlos.fontaneria@demo.com',
    first_name: 'Carlos',
    last_name: 'Ramírez',
    avatar: 'https://loremflickr.com/400/400/plumber?lock=22',
    bio: 'Fontanero certificado con 12 años de experiencia en residencias.',
    years: 12,
    base_price: 35,
    rating: 4.8,
    reviews: 47,
    specialtySlug: 'fontaneria',
  },
  {
    email: 'luis.jardin@demo.com',
    first_name: 'Luis',
    last_name: 'Martínez',
    avatar: 'https://loremflickr.com/400/400/gardener?lock=33',
    bio: 'Especialista en jardines tropicales y mantenimiento semanal.',
    years: 6,
    base_price: 28,
    rating: 4.6,
    reviews: 31,
    specialtySlug: 'jardineria',
  },
  {
    email: 'maria.pintura@demo.com',
    first_name: 'María',
    last_name: 'Castillo',
    avatar: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=400&fit=crop&q=80',
    bio: 'Pintora profesional. Interiores, exteriores y acabados decorativos.',
    years: 7,
    base_price: 38,
    rating: 4.7,
    reviews: 44,
    specialtySlug: 'pintura',
  },
  {
    email: 'pedro.remodelacion@demo.com',
    first_name: 'Pedro',
    last_name: 'Solís',
    avatar: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop&q=80',
    bio: 'Maestro de obra. Remodelaciones completas y ampliaciones.',
    years: 15,
    base_price: 50,
    rating: 4.8,
    reviews: 56,
    specialtySlug: 'remodelacion',
  },
  {
    email: 'emergencia.24h@demo.com',
    first_name: 'Equipo',
    last_name: 'Urgente 24h',
    avatar: 'https://loremflickr.com/400/400/repairman?lock=66',
    bio: 'Atención de emergencias domésticas las 24 horas.',
    years: 10,
    base_price: 60,
    rating: 4.9,
    reviews: 88,
    specialtySlug: 'emergencia',
  },
  {
    email: 'sofia.emergencia@demo.com',
    first_name: 'Sofía',
    last_name: 'Mendoza',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&q=80',
    bio: 'Respuesta rápida en fontanería y electricidad de emergencia.',
    years: 9,
    base_price: 55,
    rating: 4.8,
    reviews: 73,
    specialtySlug: 'emergencia',
  },
] as const;

/**
 * Empresas demo: ferreterías nicaragüenses, cada una con su catálogo.
 * La primera (tienda@empresa.com) conserva el login demo de empresa.
 * Las imágenes con URL de tienda real (SINSA / Walmart NI) se conservan tal
 * cual; las nuevas usan loremflickr por nombre y puedes cambiarlas a una URL
 * real cuando quieras.
 */
export const DEMO_COMPANIES = [
  {
    email: DEMO_COMPANY_EMAIL,
    commercial_name: 'Ferretería SINSA',
    first_name: 'Ferretería',
    last_name: 'SINSA',
    ruc: 'J0310000000001',
    logo: 'https://loremflickr.com/200/200/hardware,store?lock=201',
    city: 'Managua',
    products: [
      {
        name: 'Taladro inalámbrico 20V',
        price: 89.99,
        stock: 25,
        image:
          'https://b2csinsa.vtexassets.com/arquivos/ids/616460/152737183-1.jpg?v=639010640795770000',
        description:
          'Taladro percutor con batería de litio. Ideal para electricidad y remodelación.',
      },
      {
        name: 'Juego de destornilladores',
        price: 24.5,
        stock: 60,
        image:
          'https://www.bt-ingenieros.com/19461-large_default/destornilladores-de-precision-15-piezas-planoss-philllis-cruz-y-torx.jpg',
        description: 'Set de 12 piezas con mango ergonómico.',
      },
      {
        name: 'Caja de herramientas plástica',
        price: 29.99,
        stock: 18,
        image:
          'https://walmartni.vtexassets.com/arquivos/ids/352470/Caja-Herramientas-Handi-Works-Pl-stica-16-Pulgadas-2-14990.jpg?v=638420748980330000',
        description: 'Organizador con compartimentos y asa reforzada.',
      },
      {
        name: 'Sierra circular 7 1/4"',
        price: 119.0,
        stock: 10,
        image: 'https://loremflickr.com/400/400/circular,saw?lock=108',
        description: 'Corte preciso en madera. Útil en remodelación.',
      },
      {
        name: 'Esmeriladora angular 4 1/2"',
        price: 54.5,
        stock: 22,
        image: 'https://loremflickr.com/400/400/angle,grinder?lock=109',
        description: 'Pulidora de 750W para corte y desbaste de metal.',
      },
      {
        name: 'Martillo de uña 16oz',
        price: 12.75,
        stock: 50,
        image: 'https://loremflickr.com/400/400/hammer,tool?lock=110',
        description: 'Cabeza de acero forjado con mango antideslizante.',
      },
    ],
  },
  {
    email: 'epa@empresa.com',
    commercial_name: 'EPA Nicaragua',
    first_name: 'EPA',
    last_name: 'Nicaragua',
    ruc: 'J0310000000002',
    logo: 'https://loremflickr.com/200/200/construction,materials?lock=202',
    city: 'Managua',
    products: [
      {
        name: 'Saco de cemento Canal 42.5kg',
        price: 9.5,
        stock: 200,
        image: 'https://loremflickr.com/400/400/cement,bag?lock=111',
        description: 'Cemento gris uso general para construcción.',
      },
      {
        name: 'Carretilla de construcción',
        price: 65.0,
        stock: 15,
        image: 'https://loremflickr.com/400/400/wheelbarrow?lock=112',
        description: 'Cuerpo metálico reforzado, llanta neumática.',
      },
      {
        name: 'Pala cuadrada',
        price: 14.25,
        stock: 40,
        image: 'https://loremflickr.com/400/400/shovel?lock=113',
        description: 'Hoja de acero con mango de madera.',
      },
      {
        name: 'Nivel de aluminio 24"',
        price: 18.9,
        stock: 30,
        image: 'https://loremflickr.com/400/400/spirit,level?lock=114',
        description: 'Tres burbujas, perfil de aluminio resistente.',
      },
      {
        name: 'Cinta métrica 8m',
        price: 7.99,
        stock: 80,
        image: 'https://loremflickr.com/400/400/tape,measure?lock=115',
        description: 'Carcasa de goma con freno y gancho metálico.',
      },
      {
        name: 'Escalera de aluminio 6 pies',
        price: 89.0,
        stock: 12,
        image: 'https://loremflickr.com/400/400/ladder?lock=116',
        description: 'Tipo tijera, liviana y de alta capacidad.',
      },
    ],
  },
  {
    email: 'jenny@empresa.com',
    commercial_name: 'Ferretería Jenny',
    first_name: 'Ferretería',
    last_name: 'Jenny',
    ruc: 'J0310000000003',
    logo: 'https://loremflickr.com/200/200/paint,store?lock=203',
    city: 'Managua',
    products: [
      {
        name: 'Pintura látex blanco 1 gal',
        price: 32.0,
        stock: 40,
        image:
          'https://b2csinsa.vtexassets.com/arquivos/ids/839869/100415692-1.jpg?v=639130243459330000',
        description: 'Acabado mate, alta cobertura para interiores.',
      },
      {
        name: 'Rodillo para pintura 9"',
        price: 6.5,
        stock: 70,
        image: 'https://loremflickr.com/400/400/paint,roller?lock=117',
        description: 'Felpa antigota con mango plástico.',
      },
      {
        name: 'Brocha 4"',
        price: 4.25,
        stock: 90,
        image: 'https://loremflickr.com/400/400/paintbrush?lock=118',
        description: 'Cerda suave para acabados uniformes.',
      },
      {
        name: 'Thinner 1 gal',
        price: 11.0,
        stock: 35,
        image: 'https://loremflickr.com/400/400/solvent,can?lock=119',
        description: 'Diluyente para pinturas y limpieza de herramientas.',
      },
      {
        name: 'Lija para pared pack x10',
        price: 5.75,
        stock: 120,
        image: 'https://loremflickr.com/400/400/sandpaper?lock=120',
        description: 'Grano surtido para preparar superficies.',
      },
      {
        name: 'Cinta adhesiva de pintor',
        price: 3.5,
        stock: 150,
        image: 'https://loremflickr.com/400/400/masking,tape?lock=121',
        description: 'Enmascarado limpio sin residuos.',
      },
    ],
  },
  {
    email: 'blandon@empresa.com',
    commercial_name: 'Ferretería Blandón Moreno',
    first_name: 'Blandón',
    last_name: 'Moreno',
    ruc: 'J0310000000004',
    logo: 'https://loremflickr.com/200/200/tools?lock=204',
    city: 'Managua',
    products: [
      {
        name: 'Foco LED 12W pack x4',
        price: 12.99,
        stock: 100,
        image:
          'https://papeleriadelahorro.mx/cdn/shop/products/1637050.jpg?v=1751744389',
        description: 'Luz cálida, bajo consumo. Categoría electricidad.',
      },
      {
        name: 'Llave stillson 14"',
        price: 18.75,
        stock: 35,
        image:
          'https://b2csinsa.vtexassets.com/arquivos/ids/616257/152735760-1.jpg?v=638950355265670000',
        description: 'Acero forjado para trabajos de fontanería.',
      },
      {
        name: 'Manguera reforzada 25m',
        price: 45.0,
        stock: 20,
        image:
          'https://walmartni.vtexassets.com/arquivos/ids/388111/Manguera-Truper-Reforzada-Con-3-Capas-15mts-2-9436.jpg?v=638496888477500000',
        description: 'Ideal para riego y jardinería.',
      },
      {
        name: 'Cable eléctrico THHN 100m',
        price: 45.0,
        stock: 25,
        image: 'https://loremflickr.com/400/400/electrical,wire?lock=122',
        description: 'Calibre 12, cobre, para instalaciones residenciales.',
      },
      {
        name: 'Tubo PVC 1/2" x 6m',
        price: 3.8,
        stock: 160,
        image: 'https://loremflickr.com/400/400/pvc,pipe?lock=123',
        description: 'Para agua potable, presión estándar.',
      },
      {
        name: 'Candado de seguridad 50mm',
        price: 8.4,
        stock: 75,
        image: 'https://loremflickr.com/400/400/padlock?lock=124',
        description: 'Cuerpo de latón con tres llaves.',
      },
    ],
  },
] as const;
