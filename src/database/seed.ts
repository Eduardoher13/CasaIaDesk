import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { entities } from './entities';
import { User } from '../users/entities/user.entity';
import { Client } from '../clients/entities/client.entity';
import { Professional } from '../professionals/entities/professional.entity';
import { Company } from '../companies/entities/company.entity';
import { Specialty } from '../specialties/entities/specialty.entity';
import { ProfessionalSpecialty } from '../professional_specialties/entities/professional-specialty.entity';
import { Product } from '../products/entities/product.entity';

config();

function createDataSource(): DataSource {
  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl) {
    return new DataSource({
      type: 'postgres',
      url: databaseUrl,
      ssl:
        process.env.DB_SSL === 'true'
          ? { rejectUnauthorized: false }
          : false,
      entities,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
    });
  }

  return new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    database: process.env.DB_DATABASE ?? 'casa_ia_desk',
    entities,
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
  });
}

const DEMO_CLIENT_EMAIL = 'demo@cliente.com';

async function seed() {
  const dataSource = createDataSource();
  await dataSource.initialize();

  const userRepo = dataSource.getRepository(User);
  const existing = await userRepo.findOne({
    where: { email: DEMO_CLIENT_EMAIL },
  });

  if (existing) {
    console.log('Seed ya aplicado (demo@cliente.com existe). Saltando.');
    await dataSource.destroy();
    return;
  }

  const specialtyRepo = dataSource.getRepository(Specialty);
  const clientRepo = dataSource.getRepository(Client);
  const professionalRepo = dataSource.getRepository(Professional);
  const companyRepo = dataSource.getRepository(Company);
  const professionalSpecialtyRepo = dataSource.getRepository(ProfessionalSpecialty);
  const productRepo = dataSource.getRepository(Product);

  console.log('Insertando specialties...');
  const specialties = await specialtyRepo.save([
    {
      name: 'Plomería',
      slug: 'plomeria',
      description: 'Instalaciones, fugas, tuberías y sanitarios',
    },
    {
      name: 'Electricidad',
      slug: 'electricidad',
      description: 'Cableado, tableros, iluminación y reparaciones',
    },
    {
      name: 'Jardinería',
      slug: 'jardineria',
      description: 'Mantenimiento de jardines, poda y paisajismo',
    },
    {
      name: 'Limpieza',
      slug: 'limpieza',
      description: 'Limpieza profunda de hogar y oficina',
    },
    {
      name: 'Pintura',
      slug: 'pintura',
      description: 'Pintura interior, exterior y acabados',
    },
    {
      name: 'Carpintería',
      slug: 'carpinteria',
      description: 'Muebles, reparaciones y trabajos en madera',
    },
  ]);

  console.log('Insertando usuario cliente demo...');
  const clientUser = await userRepo.save({
    email: DEMO_CLIENT_EMAIL,
    password_hash: '$2b$10$demo.hash.placeholder',
    role: 'cliente',
    first_name: 'María',
    last_name: 'González',
    phone: '+505 8888-0001',
    avatar_url: 'https://i.pravatar.cc/150?u=demo-cliente',
    is_active: true,
    city: 'Managua',
  });

  await clientRepo.save({
    user_id: clientUser.id,
    address: 'Colonia Los Robles, Managua',
    points_balance: 150,
  });

  console.log('Insertando empresa demo y productos...');
  const companyUser = await userRepo.save({
    email: 'tienda@empresa.com',
    password_hash: '$2b$10$demo.hash.placeholder',
    role: 'empresa',
    first_name: 'Casa',
    last_name: 'Ferretería',
    avatar_url: 'https://i.pravatar.cc/150?u=demo-empresa',
    is_active: true,
    city: 'Managua',
  });

  const company = await companyRepo.save({
    user_id: companyUser.id,
    commercial_name: 'Ferretería El Tornillo',
    ruc: 'J-12345678-9',
    logo_url: 'https://picsum.photos/seed/ferreteria/200/200',
  });

  const productsData = [
    {
      name: 'Taladro inalámbrico 20V',
      price: 89.99,
      stock: 25,
      image: 'https://picsum.photos/seed/taladro/400/400',
      description: 'Taladro percutor con batería de litio y maletín.',
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
      description: 'Acero forjado para trabajos de plomería.',
    },
    {
      name: 'Manguera reforzada 25m',
      price: 45.0,
      stock: 20,
      image: 'https://picsum.photos/seed/manguera/400/400',
      description: 'Ideal para riego y limpieza de exteriores.',
    },
    {
      name: 'Foco LED 12W pack x4',
      price: 12.99,
      stock: 100,
      image: 'https://picsum.photos/seed/foco/400/400',
      description: 'Luz cálida, bajo consumo energético.',
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
      description: 'Corte preciso en madera y derivados.',
    },
  ];

  await productRepo.save(
    productsData.map((p) => ({
      company_id: company.id,
      name: p.name,
      description: p.description,
      image_url: p.image,
      price: p.price,
      stock: p.stock,
      avg_rating: 4.5,
      is_active: true,
    })),
  );

  console.log('Insertando profesionales demo...');
  const professionalsData = [
    {
      email: 'carlos.plomero@demo.com',
      first_name: 'Carlos',
      last_name: 'Ramírez',
      avatar: 'https://i.pravatar.cc/150?u=carlos-plomero',
      bio: 'Plomero certificado con 12 años de experiencia en residencias.',
      years: 12,
      base_price: 35,
      rating: 4.8,
      reviews: 47,
      specialtySlugs: ['plomeria'],
    },
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
      specialtySlugs: ['electricidad'],
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
      specialtySlugs: ['jardineria'],
    },
    {
      email: 'rosa.limpieza@demo.com',
      first_name: 'Rosa',
      last_name: 'Herrera',
      avatar: 'https://i.pravatar.cc/150?u=rosa-limpieza',
      bio: 'Limpieza profunda de hogares y oficinas pequeñas.',
      years: 5,
      base_price: 25,
      rating: 4.7,
      reviews: 28,
      specialtySlugs: ['limpieza'],
    },
    {
      email: 'miguel.multiservicio@demo.com',
      first_name: 'Miguel',
      last_name: 'Vega',
      avatar: 'https://i.pravatar.cc/150?u=miguel-multi',
      bio: 'Pintor y carpintero. Proyectos completos llave en mano.',
      years: 10,
      base_price: 38,
      rating: 4.5,
      reviews: 39,
      specialtySlugs: ['pintura', 'carpinteria'],
    },
  ];

  const slugToId = Object.fromEntries(
    specialties.map((s) => [s.slug, s.id]),
  );

  for (const pro of professionalsData) {
    const proUser = await userRepo.save({
      email: pro.email,
      password_hash: '$2b$10$demo.hash.placeholder',
      role: 'profesional',
      first_name: pro.first_name,
      last_name: pro.last_name,
      avatar_url: pro.avatar,
      is_active: true,
      city: 'Managua',
    });

    const professional = await professionalRepo.save({
      user_id: proUser.id,
      bio: pro.bio,
      years_experience: pro.years,
      base_price: pro.base_price,
      avg_rating: pro.rating,
      total_reviews: pro.reviews,
      is_available: true,
      service_radius_km: 25,
    });

    for (const slug of pro.specialtySlugs) {
      await professionalSpecialtyRepo.save({
        professional_id: professional.id,
        specialty_id: slugToId[slug],
        is_primary: slug === pro.specialtySlugs[0],
      });
    }
  }

  console.log('Seed completado.');
  console.log('  Cliente demo : demo@cliente.com');
  console.log('  Empresa demo : tienda@empresa.com');
  console.log(`  Productos    : ${productsData.length}`);
  console.log(`  Profesionales: ${professionalsData.length}`);
  console.log(`  Especialidades: ${specialties.length}`);

  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('Error en seed:', err);
  process.exit(1);
});
