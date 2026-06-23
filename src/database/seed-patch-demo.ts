/**
 * Sincroniza usuarios y perfiles demo con seed-data.ts (sin borrar pedidos ni datos).
 *
 *   npm run seed:patch
 */
import { config } from 'dotenv';
import { Repository } from 'typeorm';
import { createDataSource } from './seed';
import {
  DEMO_PROFESSIONAL_LEGACY_EMAILS,
  DEMO_PROFESSIONALS,
} from './seed-data';
import { Professional } from '../professionals/entities/professional.entity';
import { User } from '../users/entities/user.entity';

config();

async function findDemoUser(
  userRepo: Repository<User>,
  targetEmail: string,
): Promise<User | null> {
  const direct = await userRepo.findOne({ where: { email: targetEmail } });
  if (direct) {
    return direct;
  }

  for (const [legacyEmail, nextEmail] of Object.entries(
    DEMO_PROFESSIONAL_LEGACY_EMAILS,
  )) {
    if (nextEmail === targetEmail) {
      return userRepo.findOne({ where: { email: legacyEmail } });
    }
  }

  return null;
}

async function patchDemoProfessionals(): Promise<void> {
  const dataSource = createDataSource();
  await dataSource.initialize();

  const userRepo = dataSource.getRepository(User);
  const professionalRepo = dataSource.getRepository(Professional);

  let updated = 0;

  for (const demo of DEMO_PROFESSIONALS) {
    const user = await findDemoUser(userRepo, demo.email);
    if (!user) {
      console.log(`  Omitido (no existe): ${demo.email}`);
      continue;
    }

    await userRepo.update(user.id, {
      email: demo.email,
      first_name: demo.first_name,
      last_name: demo.last_name,
      avatar_url: demo.avatar,
    });

    const professional = await professionalRepo.findOne({
      where: { user_id: user.id },
    });

    if (professional) {
      await professionalRepo.update(professional.id, {
        bio: demo.bio,
        years_experience: demo.years,
        base_price: demo.base_price,
        avg_rating: demo.rating,
        total_reviews: demo.reviews,
      });
    }

    console.log(`  ✓ ${demo.first_name} ${demo.last_name} (${demo.email})`);
    updated += 1;
  }

  await dataSource.destroy();
  console.log(`\nPatch completado: ${updated} profesional(es) demo actualizado(s).`);
}

if (require.main === module) {
  patchDemoProfessionals().catch((err) => {
    console.error('Error en seed:patch:', err);
    process.exit(1);
  });
}
