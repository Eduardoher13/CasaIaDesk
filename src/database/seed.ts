/**
 * Seed de datos demo para desarrollo.
 *
 *   npm run seed         — inserta solo si la BD no tiene demo@cliente.com
 *   npm run seed:reset   — borra demo + re-inserta (6 categorías del Home)
 *
 * Requiere Postgres (npm run db:up) y backend en :8001 opcional.
 */
import { config } from 'dotenv';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { entities } from './entities';
import { User } from '../users/entities/user.entity';
import { Client } from '../clients/entities/client.entity';
import { Professional } from '../professionals/entities/professional.entity';
import { Company } from '../companies/entities/company.entity';
import { Specialty } from '../specialties/entities/specialty.entity';
import { ProfessionalSpecialty } from '../professional_specialties/entities/professional-specialty.entity';
import { Product } from '../products/entities/product.entity';
import {
  DEMO_CLIENT_EMAIL,
  DEMO_COMPANY_EMAIL,
  DEMO_PASSWORD,
  DEMO_PROFESSIONALS,
  DEMO_PRODUCTS,
  HOME_SPECIALTIES,
} from './seed-data';

config();

export function createDataSource(): DataSource {
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

export interface RunSeedOptions {
  force?: boolean;
}

export async function runSeed(
  dataSource: DataSource,
  options: RunSeedOptions = {},
): Promise<void> {
  const userRepo = dataSource.getRepository(User);

  if (!options.force) {
    const existing = await userRepo.findOne({
      where: { email: DEMO_CLIENT_EMAIL },
    });

    if (existing) {
      console.log('Seed ya aplicado (demo@cliente.com existe). Saltando.');
      console.log('  Usa: npm run seed:reset');
      return;
    }
  }

  const specialtyRepo = dataSource.getRepository(Specialty);
  const clientRepo = dataSource.getRepository(Client);
  const professionalRepo = dataSource.getRepository(Professional);
  const companyRepo = dataSource.getRepository(Company);
  const professionalSpecialtyRepo =
    dataSource.getRepository(ProfessionalSpecialty);
  const productRepo = dataSource.getRepository(Product);

  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);

  console.log('Insertando specialties (6 categorías Home)...');
  const specialties = await specialtyRepo.save(
    HOME_SPECIALTIES.map((s) => ({ ...s })),
  );

  console.log('Insertando usuario cliente demo...');
  const clientUser = await userRepo.save({
    email: DEMO_CLIENT_EMAIL,
    password_hash: passwordHash,
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
    email: DEMO_COMPANY_EMAIL,
    password_hash: passwordHash,
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

  await productRepo.save(
    DEMO_PRODUCTS.map((p) => ({
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

  console.log('Insertando profesionales demo (1+ por categoría)...');
  const slugToId = Object.fromEntries(
    specialties.map((s) => [s.slug, s.id]),
  );

  for (const pro of DEMO_PROFESSIONALS) {
    const proUser = await userRepo.save({
      email: pro.email,
      password_hash: passwordHash,
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

    await professionalSpecialtyRepo.save({
      professional_id: professional.id,
      specialty_id: slugToId[pro.specialtySlug],
      is_primary: true,
    });
  }

  console.log('Seed completado.');
  console.log('  Cliente demo : demo@cliente.com');
  console.log('  Empresa demo : tienda@empresa.com');
  console.log(`  Productos    : ${DEMO_PRODUCTS.length}`);
  console.log(`  Profesionales: ${DEMO_PROFESSIONALS.length}`);
  console.log(`  Especialidades: ${specialties.length}`);
  console.log('  Slugs        :', specialties.map((s) => s.slug).join(', '));
  console.log(`  Password demo: ${DEMO_PASSWORD}`);
}

async function seed() {
  const dataSource = createDataSource();
  await dataSource.initialize();
  await runSeed(dataSource);
  await dataSource.destroy();
}

if (require.main === module) {
  seed().catch((err) => {
    console.error('Error en seed:', err);
    process.exit(1);
  });
}
