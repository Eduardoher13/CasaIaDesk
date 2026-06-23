/**
 * Datos demo alineados con las 6 categorías del Home (mi-app-delivery/utils/constants.ts).
 */

export const DEMO_CLIENT_EMAIL = 'demo@cliente.com';
/** Empresa principal: mantiene el login demo de empresa del frontend. */
export const DEMO_COMPANY_EMAIL = 'tienda@empresa.com';
export const DEMO_DRIVER_EMAIL = 'repartidor@demo.com';

/** Emails de todas las empresas demo (ferreterías de Managua). */
import { DEMO_COMPANIES } from './seed-companies';
export { DEMO_COMPANIES } from './seed-companies';
export type { SeedProduct } from './seed-companies';

export const DEMO_COMPANY_EMAILS = DEMO_COMPANIES.map(
  (company) => company.email,
) as unknown as readonly [
  typeof DEMO_COMPANY_EMAIL,
  ...string[],
];

/** Password en texto plano para todos los usuarios demo (se hashea con bcrypt en el seed). */
export const DEMO_PASSWORD = 'demo123';

/** Emails de usuarios demo (cliente, empresas, profesionales y repartidor). */
export const DEMO_USER_EMAILS = [
  DEMO_CLIENT_EMAIL,
  DEMO_DRIVER_EMAIL,
  ...DEMO_COMPANY_EMAILS,
  'carlos.fontaneria@demo.com',
  'mario.electrica@demo.com',
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

/** Emails demo renombrados (patch encuentra el usuario por el email viejo). */
export const DEMO_PROFESSIONAL_LEGACY_EMAILS: Record<string, string> = {
  'ana.electrica@demo.com': 'mario.electrica@demo.com',
};

export const DEMO_PROFESSIONALS = [
  {
    email: 'mario.electrica@demo.com',
    first_name: 'Mario',
    last_name: 'Gutiérrez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80',
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

/** @deprecated Usar DEMO_COMPANIES en seed-companies.ts */
