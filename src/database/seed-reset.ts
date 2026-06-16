import { config } from 'dotenv';
import { DataSource, In } from 'typeorm';
import { createDataSource, runSeed } from './seed';
import {
  DEMO_USER_EMAILS,
  LEGACY_SPECIALTY_SLUGS,
} from './seed-data';
import { User } from '../users/entities/user.entity';
import { Client } from '../clients/entities/client.entity';
import { Professional } from '../professionals/entities/professional.entity';
import { Company } from '../companies/entities/company.entity';
import { Product } from '../products/entities/product.entity';
import { ProfessionalSpecialty } from '../professional_specialties/entities/professional-specialty.entity';
import { Specialty } from '../specialties/entities/specialty.entity';

config();

/** Emails del seed anterior que ya no se usan. */
const LEGACY_PROFESSIONAL_EMAILS = [
  'carlos.plomero@demo.com',
  'rosa.limpieza@demo.com',
  'miguel.multiservicio@demo.com',
];

export async function deleteDemoData(dataSource: DataSource): Promise<void> {
  const userRepo = dataSource.getRepository(User);
  const allDemoEmails = [
    ...DEMO_USER_EMAILS,
    ...LEGACY_PROFESSIONAL_EMAILS,
  ];

  const demoUsers = await userRepo.find({
    where: { email: In([...allDemoEmails]) },
    withDeleted: true,
  });

  if (demoUsers.length === 0) {
    console.log('No hay usuarios demo para borrar.');
  }

  const demoUserIds = demoUsers.map((u) => u.id);

  const professionalRepo = dataSource.getRepository(Professional);
  const companyRepo = dataSource.getRepository(Company);
  const clientRepo = dataSource.getRepository(Client);
  const productRepo = dataSource.getRepository(Product);
  const professionalSpecialtyRepo =
    dataSource.getRepository(ProfessionalSpecialty);
  const specialtyRepo = dataSource.getRepository(Specialty);

  const demoCompanies = demoUserIds.length
    ? await companyRepo.find({ where: { user_id: In(demoUserIds) } })
    : [];
  const companyIds = demoCompanies.map((c) => c.id);

  if (companyIds.length > 0) {
    await productRepo.delete({ company_id: In(companyIds) });
    console.log(`  Productos demo eliminados (${companyIds.length} empresa(s)).`);
  }

  const demoProfessionals = demoUserIds.length
    ? await professionalRepo.find({ where: { user_id: In(demoUserIds) } })
    : [];
  const professionalIds = demoProfessionals.map((p) => p.id);

  if (professionalIds.length > 0) {
    await professionalSpecialtyRepo.delete({
      professional_id: In(professionalIds),
    });
    await professionalRepo.delete({ id: In(professionalIds) });
    console.log(`  Profesionales demo eliminados: ${professionalIds.length}`);
  }

  if (demoUserIds.length > 0) {
    await companyRepo.delete({ user_id: In(demoUserIds) });
    await clientRepo.delete({ user_id: In(demoUserIds) });
    await userRepo.delete({ id: In(demoUserIds) });
    console.log(`  Usuarios demo eliminados: ${demoUserIds.length}`);
  }

  const slugsToRemove = [
    ...LEGACY_SPECIALTY_SLUGS,
    'electricidad',
    'fontaneria',
    'jardineria',
    'pintura',
    'remodelacion',
    'emergencia',
  ];

  const specialtiesToRemove = await specialtyRepo.find({
    where: { slug: In(slugsToRemove) },
  });

  if (specialtiesToRemove.length > 0) {
    const specialtyIds = specialtiesToRemove.map((s) => s.id);
    await professionalSpecialtyRepo.delete({
      specialty_id: In(specialtyIds),
    });
    await specialtyRepo.delete({ id: In(specialtyIds) });
    console.log(`  Especialidades eliminadas: ${specialtiesToRemove.length}`);
  }
}

async function seedReset() {
  const dataSource = createDataSource();
  await dataSource.initialize();

  console.log('Borrando datos demo...');
  await deleteDemoData(dataSource);

  console.log('Re-insertando seed...');
  await runSeed(dataSource, { force: true });

  await dataSource.destroy();
}

if (require.main === module) {
  seedReset().catch((err) => {
    console.error('Error en seed:reset:', err);
    process.exit(1);
  });
}
