/**
 * Datos demo alineados con las 6 categorías del Home (mi-app-delivery/utils/constants.ts).
 */

export const DEMO_CLIENT_EMAIL = 'demo@cliente.com';
export const DEMO_COMPANY_EMAIL = 'tienda@empresa.com';
export const DEMO_DRIVER_EMAIL = 'repartidor@demo.com';

/** Password en texto plano para todos los usuarios demo (se hashea con bcrypt en el seed). */
export const DEMO_PASSWORD = 'demo123';

/** Emails de usuarios demo (cliente, empresa, profesionales y repartidor). */
export const DEMO_USER_EMAILS = [
  DEMO_CLIENT_EMAIL,
  DEMO_COMPANY_EMAIL,
  DEMO_DRIVER_EMAIL,
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
    avatar: 'https://i.pravatar.cc/150?u=ana-electrica',
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
    avatar: 'https://i.pravatar.cc/150?u=carlos-fontaneria',
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
    avatar: 'https://i.pravatar.cc/150?u=luis-jardin',
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
    avatar: 'https://i.pravatar.cc/150?u=maria-pintura',
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
    avatar: 'https://i.pravatar.cc/150?u=pedro-remodelacion',
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
    avatar: 'https://i.pravatar.cc/150?u=emergencia-24h',
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
    avatar: 'https://i.pravatar.cc/150?u=sofia-emergencia',
    bio: 'Respuesta rápida en fontanería y electricidad de emergencia.',
    years: 9,
    base_price: 55,
    rating: 4.8,
    reviews: 73,
    specialtySlug: 'emergencia',
  },
] as const;

export const DEMO_PRODUCTS = [
  {
    name: 'Taladro inalámbrico 20V',
    price: 89.99,
    stock: 25,
    image: 'https://picsum.photos/seed/taladro/400/400',
    description:
      'Taladro percutor con batería de litio. Ideal para electricidad y remodelación.',
  },
  {
    name: 'Juego de destornilladores',
    price: 24.5,
    stock: 60,
    image: 'https://picsum.photos/seed/destornilladores/400/400',
    description: 'Set de 12 piezas con mango ergonómico.',
  },
  {
    name: 'Pintura látex blanco 1 gal',
    price: 32.0,
    stock: 40,
    image: 'https://picsum.photos/seed/pintura/400/400',
    description: 'Acabado mate, alta cobertura para interiores.',
  },
  {
    name: 'Llave stillson 14"',
    price: 18.75,
    stock: 35,
    image: 'https://picsum.photos/seed/llave/400/400',
    description: 'Acero forjado para trabajos de fontanería.',
  },
  {
    name: 'Manguera reforzada 25m',
    price: 45.0,
    stock: 20,
    image: 'https://picsum.photos/seed/manguera/400/400',
    description: 'Ideal para riego y jardinería.',
  },
  {
    name: 'Foco LED 12W pack x4',
    price: 12.99,
    stock: 100,
    image: 'https://picsum.photos/seed/foco/400/400',
    description: 'Luz cálida, bajo consumo. Categoría electricidad.',
  },
  {
    name: 'Caja de herramientas plástica',
    price: 29.99,
    stock: 18,
    image: 'https://picsum.photos/seed/caja/400/400',
    description: 'Organizador con compartimentos y asa reforzada.',
  },
  {
    name: 'Sierra circular 7 1/4"',
    price: 119.0,
    stock: 10,
    image: 'https://picsum.photos/seed/sierra/400/400',
    description: 'Corte preciso en madera. Útil en remodelación.',
  },
] as const;
